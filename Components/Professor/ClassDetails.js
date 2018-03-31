import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, PrimaryButton, AccentButton, HeadingText, NormalInput, BlackButton} from '../UtilComponents';
import Modal from 'react-native-modal';
import ClassService from '../../Services/ClassService';
import LinkStudentQRScanner from './LinkStudentQRScanner';


export default class ClassDetails extends Component {
    constructor(props) {
        super(props);

        const classId = this.props.navigation.getParam('classData').classId;
        this.state = {
            classId: classId,
            isLoading: true,
            addStudentModal: false,
            submitDisabled: false,

            isEditingUnlinked: false,
            currentUnlinkedIndex: null,


            // modal inputs
            firstName: null,
            lastName:  null,

            classData: null,

            enrolledStudents: null,
            unlinkedStudents: [],

            attendance: null,
            classData: null,
            indexInProfList: null
        }
        
    }

    componentWillMount() {
        const classd = ClassService.getClass(this.state.classId, (classDets) => {
            if (classDets !== null) {
                this.setState({
                    classData: classDets,

                    // Used for quick access. classDets object is actually passed to AddEdit screen.
                    enrolledStudents: classDets.enrolledStudents ? Object.values(classDets.enrolledStudents).reverse() : [],
                    unlinkedStudents: classDets.unlinkedStudents || [],

                    attendance: classDets.attendance,

                    isLoading: false,
                    indexInProfList: this.props.navigation.getParam('classData').indexInProfList
                });
            } else {
                this.props.navigation.dispatch(
                    NavigationActions.back({
                        key: null
                    })
                );
                alert("Class not found");
            }
        });
    }

    _handleForceUpdate = () => {
        this.forceUpdate();
    }

    /**
     * Links the student to the class in the database.
     */
    _linkStudentToClassByDeviceId = (deviceId) => {
        let details = {
            classId: this.state.classId,
            className: this.state.classData.className,
            deviceId: deviceId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        ClassService.addEditEnrolledStudentToClass(details).then((res)=>{
            if (this.state.isEditingUnlinked) {
                let unlinkedStuds = this.state.unlinkedStudents;
                // remove the student from the unlinked list.
                unlinkedStuds.splice(this.state.currentUnlinkedIndex, 1);
                ClassService.addEditUnlinkedStudents(this.state.classId, unlinkedStuds).then(res => {
                    if (res) {
                        this.setState({
                            submitDisabled: false,
                            addStudentModal: false,
                            firstName: null,
                            lastName: null,
                            currentUnlinkedIndex: null,
                            isEditingUnlinked: false,
                            unlinkedStudents: unlinkedStuds
                        });
                    } else {
                        alert("An error occurred.");
                    }
                }).catch(err => {
                    console.log(err);
                    alert("An error occurred.");
                });
            }   
        }).catch(err => {
            console.log(err);
            alert("An error occurred.");
        });
    }

    _handleFirstNameInputChanged = (text) => {
        this.setState({
            firstName: text
        });
    }

    _handleLastNameInputChanged = (text) => {
        this.setState({
            lastName: text
        });
    }

    _openQRCodeScanner = async () => {
        try {
            const deviceId = await LinkStudentQRScanner.scanQRCode();

            return deviceId;
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    _handleUnlinkedStudentClicked = async (unlinedStudentIndex) => {
        const [firstName, lastName] = this.state.unlinkedStudents[unlinedStudentIndex].split(" ");
        
        this.setState({
            firstName: firstName,
            lastName: lastName,
            addStudentModal: true,
            isEditingUnlinked: true,
            currentUnlinkedIndex: unlinedStudentIndex
        });
    }

    _onScanDeviceIdSuccess = (deviceId) => {
        alert("Device Id is: " + deviceId);
    }

    _onScanDeviceIdError = () => {
        console.log("Scan error: ", err);
        alert("An error occurred.");
    }

    _handleEditButtonClicked = (err) => {
        this.props.navigation.navigate('AddEditClass', {
            mode: 'edit', classId: this.state.classId, classData: this.state.classData,
            forceUpdateHandler: this._handleForceUpdate.bind(this)
        });
    }

    /**
     * Helper method to valid some of the form inputs.
     */
    _isValidInput = (inputText) => {
        return inputText != null && inputText.trim().length > 0;
    }

     /**
     * Validates the data that the user has entered into the form before the data is submitted.
     */
    _isFormDataValid = () => {
        const inputs = ['firstName', 'lastName'];        

        let validInputs = 0;

        for(input of inputs) {
            if (this._isValidInput(this.state[input])) {
                validInputs++;
            }
        }

        return validInputs == inputs.length;
    }

    /**
     * Responds when the user clicks the "link later" button in the modal.
     * Closes the modal and pushes the new student onto the unlinkedstudents array and updates the database.
     */
    _handleLinkStudentLaterClicked = () => {
        this.setState({
            submitDisabled: true
        });

        if (!this._isFormDataValid()) {
            alert("Please fill in the student's name first");
        } else {
            let unlinkedStuds = this.state.unlinkedStudents;
            const name = `${this.state.firstName} ${this.state.lastName}`;

            if (this.state.isEditingUnlinked) {                
                unlinkedStuds[this.state.currentUnlinkedIndex] = name;
            } else {
                this.state.unlinkedStudents.push(name);
            }
            
            ClassService.addEditUnlinkedStudents(this.state.classId, this.state.unlinkedStudents).then(res => {
                if (res) {
                    this.setState({
                        submitDisabled: false,
                        addStudentModal: false,
                        firstName: null,
                        lastName: null,
                        currentUnlinkedIndex: null,
                        isEditingUnlinked: false
                    });
                } else {
                    alert("An error occurred.");
                }
            }).catch(err => {
                console.log(err);
                alert("An error occurred.");
            });
            
        }

        this.setState({
            submitDisabled: false
        });
    }

    /**
     * Responds to the QR code button being clicked.
     * Call the method to open the QR code scanner.
     */
    _handleLinkStudentClicked = () => {
        this.setState({
            submitDisabled: true
        });

        if (!this._isFormDataValid()) {
            alert("Please fill in the student's name first");
        } else {
            this._openQRCodeScanner().then(deviceId=>{
                if (deviceId != null) {
                    this._linkStudentToClassByDeviceId(deviceId);

                    this.setState({
                        addStudentModal: false,
                        firstName: null,
                        lastName: null
                    });
                    
                }
            });
           
        }

        this.setState({
            submitDisabled: false
        });
    }

    
    _handleCancelAddStudentClicked = () => {
        this.setState({
            addStudentModal: false,
            firstName: null,
            lastName: null,
            isEditingUnlinked: false,
            currentUnlinkedIndex: null
        });
    }

    /**
     * Makes the add student modal visible.
     */
    _handleAddStudentModalClicked = () => {
        this.setState({
            addStudentModal: true
        });
    }

    _handleEnrolledStudentClicked = (deviceId) => {
        this.props.navigation.navigate('StudentDetails', {
            deviceId: deviceId,
            classId: this.state.classId
        });
    }

    /**
     * Opens the class attendance screen.
     */
    _handleClassAttendanceClicked = () => {
        this.props.navigation.navigate('ClassAttendance', {
            classId: this.state.classId,
            classData: this.state.classData
        });
    }

    _renderEnrolledStudents = () => {
        if (this.state.enrolledStudents) {
            return (
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.enrolledStudents.map((l, i) => (
                            <ListItem
                                key={l.deviceId}
                                title={`${l.firstName} ${l.lastName}`}
                                onPress={(e) => {
                                    this._handleEnrolledStudentClicked(l.deviceId, e)
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText>No enrolled students.</NormalText>
            );
        }
    }

    _renderUnLinkedStudents = () => {
        if (this.state.unlinkedStudents) {
            return (
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.unlinkedStudents.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l}
                                onPress={(e) => {
                                    this._handleUnlinkedStudentClicked(i, e);
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText>No unlinked students.</NormalText>
            );
        }
    }

    _rednerDetails = () => {

        return (
            <View style={[Styles.container]}>
                <NormalText>{this.state.classData.description}</NormalText>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }]}>
                                    <Icon
                                        style={{ alignSelf: 'center' }}
                                        raised
                                        reverse
                                        size={20}
                                        name='calendar'
                                        type='font-awesome'
                                        color={Colors.positive}
                                        onPress={() => { this._handleClassAttendanceClicked() }} />
                                </View>

                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <Icon
                                        raised
                                        reverse
                                        size={20}
                                        name='times'
                                        type='font-awesome'
                                        color={Colors.headerTextIcons}
                                        onPress={() => { this._handleDeleteStudentClicked() }} />
                                </View>
                            </View>

                 <View style={[{flex:2, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}]}>
                    <View style={[{ flex: 1 }]}>
                        <HeadingText>Students</HeadingText>
                    </View>
                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                        <Icon
                            raised
                            reverse
                            size={20}
                            name='user-plus'
                            type='font-awesome'
                            color={Colors.black} 
                            onPress={() => {this._handleAddStudentModalClicked()}} />
                    </View>
                </View>

                <View style={[Styles.marginTLarge]}>
                    <SubHeadingText style={[Styles.textBold]}>Enrolled Students</SubHeadingText>
                    {this._renderEnrolledStudents()}
                </View>

                 <View style={[Styles.marT]}>
                    <SubHeadingText style={[Styles.textBold]}>Unlinked Students</SubHeadingText>
                    {this._renderUnLinkedStudents()}
                </View>
            </View>
        );
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.navbar]}>

                        <View style={[Styles.navbarLeft]}>
                            <Icon name="arrow-left" type="font-awesome"
                                color={Colors.headerTextIcons} />
                        </View>

                        <Text style={[Styles.pageTitle]}>{this.state.classData.className}</Text>

                        <View style={Styles.navbarRight}>
                            <Icon name="edit" type="font-awesome"
                                raised
                                reverse
                                size={20}
                                color={Colors.headerTextIcons}
                                onPress={() => { this._handleEditButtonClicked() }}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        {this._rednerDetails()}
                    </ScrollView>

                    <Modal isVisible={this.state.addStudentModal} style={Styles.bottomModal}>
                        <View style={Styles.modalContent}>
                            <HeadingText>Add student to class</HeadingText>

                            <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                                <NormalInput placeholder="First Name" disabled={this.state.submitDisabled} 
                                    value={this.state.firstName} style={{ flex: 1 }}
                                    onChangeText={(text) => this._handleFirstNameInputChanged(text)} />

                                <NormalInput placeholder="Last Name" disabled={this.state.submitDisabled}
                                    value={this.state.lastName} style={{ flex: 1 }}
                                    onChangeText={(text) => this._handleLastNameInputChanged(text)} />
                            </View>

                            <View style={[{alignItems: 'center'}]}>
                                <NormalText style={[Styles.marginBSmall, Styles.textBold]}>Click the button below to scan the student's QR code to link the student to the class.</NormalText>
                                <Icon
                                    disabled={this.state.submitDisabled}
                                    raised
                                    reverse
                                    size={50}
                                    name='qrcode'
                                    type='font-awesome'
                                    color={Colors.positive}
                                    onPress={() => { this._handleLinkStudentClicked() }} />
                            </View>

                            <View  style={[Styles.marginBSmall, Styles.marginTSmall]}>
                                <NormalText>If you just want to add the student and scan the QR code later, press "Link Later".</NormalText>
                            </View>

                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, Styles.marginT]}>
                                <View style={[{ flex: 1 }]}>
                                    <BlackButton style={[Styles.btnSmall]} disabled={this.state.submitDisabled}
                                    text="Cancel" onPress={() => { this._handleCancelAddStudentClicked() }} />
                                </View>
                                <View style={[{ flex: 1 }]}>
                                    <PrimaryDarkButton disabled={this.state.submitDisabled} 
                                    style={[Styles.btnSmall]} text="Link Later" onPress={() => { this._handleLinkStudentLaterClicked() }} />
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            );
        } else {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.container, Styles.centerContents]}>
                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                    </View>
                    
                </View>
            );
        }
    }
}