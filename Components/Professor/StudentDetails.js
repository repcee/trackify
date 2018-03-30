import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import DeviceService from '../../Services/DeviceService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, HeadingText, PrimaryDarkButton, BlackButton, NormalInput} from '../UtilComponents';
import ClassService from '../../Services/ClassService';


export default class StudentDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            editStudentModal: false,
            submitDisabled: false,

            classId: this.props.navigation.getParam('classId'),
            deviceId: this.props.navigation.getParam('deviceId'),
            studentData: null,

            // Used for the modal inputs
            firstName: null,
            lastName: null
        }
    }

    componentWillMount() {
        ClassService.getEnrolledStudent(this.state.classId, this.state.deviceId, (studentDets) => {
            if (studentDets !== null) {
                console.log("Student data: ", studentDets);
                this.setState({
                    studentData: studentDets,

                    attendance: null,

                    isLoading: false,
                });
            } else {
                this.props.navigation.dispatch(
                    NavigationActions.back({
                        key: null
                    })
                );
                alert("Student not found");
            }
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

    _handleCancelEditStudentClicked = () => {
        this.setState({
            editStudentModal: false,
            firstName: null,
            lastName: null,

        })
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

    _handleUpdateStudentClicked = () => {
        this.setState({
            submitDisabled: true
        });

        if (!this._isFormDataValid()) {
            alert("First and last name are required.");
        } else {
            let studData = this.state.studentData;
            studData.firstName = this.state.firstName;
            studData.lastName = this.state.lastName;
            studData.classId = this.state.classId;
            
            ClassService.updateEnrolledStudentData(studData).then(res => {
                if (res) {
                    this.setState({
                        submitDisabled: false,
                        editStudentModal: false,
                        firstName: null,
                        lastName: null,
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

    _handleEditStudentClicked = () => {
        this.setState({
            editStudentModal: true,
            firstName: this.state.studentData.firstName,
            lastName: this.state.studentData.lastName
        });
    }

    _handleDeleteStudentClicked = () => {
        Alert.alert(
            'Unregister student?',
            'Are you sure you want to unregister this student?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }


    _renderStudentDetails = () => {
        return (
            <View>
                <HeadingText style={[Styles.textBold]}>
                    Student Name: {this.state.studentData.firstName} {this.state.studentData.lastName}
                </HeadingText>

                <NormalText style={[Styles.textBold]}>
                    Registered: {moment(this.state.studentData.createdAt).format('LL')} 
                </NormalText>
            </View>
        );
    }

    _renderStudentAttendance = () => {

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

                        <Text style={[Styles.pageTitle]}>Student Details</Text>

                        <View style={Styles.navbarRight}>
                            <Icon
                                raised
                                reverse
                                size={20}
                                name='edit'
                                type='font-awesome'
                                color={Colors.black}
                                onPress={() => { this._handleEditStudentClicked() }} />
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[Styles.container]}>
                            {this._renderStudentDetails()}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }]}>
                                    <Icon
                                        style={{ alignSelf: 'center' }}
                                        raised
                                        reverse
                                        size={20}
                                        name='qrcode'
                                        type='font-awesome'
                                        color={Colors.positive}
                                        onPress={() => { this._handleEditStudentClicked() }} />
                                </View>

                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <Icon
                                        raised
                                        reverse
                                        size={20}
                                        name='user-times'
                                        type='font-awesome'
                                        color={Colors.headerTextIcons}
                                        onPress={() => { this._handleDeleteStudentClicked() }} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>


                    <Modal isVisible={this.state.editStudentModal} style={Styles.bottomModal}>
                        <View style={Styles.modalContent}>
                            <HeadingText>Edit student information</HeadingText>

                            <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                                <NormalInput placeholder="First Name" disabled={this.state.submitDisabled}
                                    value={this.state.firstName} style={{ flex: 1 }}
                                    onChangeText={(text) => this._handleFirstNameInputChanged(text)} />

                                <NormalInput placeholder="Last Name" disabled={this.state.submitDisabled}
                                    value={this.state.lastName} style={{ flex: 1 }}
                                    onChangeText={(text) => this._handleLastNameInputChanged(text)} />
                            </View>

                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, Styles.marginT]}>
                                <View style={[{ flex: 1 }]}>
                                    <BlackButton style={[Styles.btnSmall]} disabled={this.state.submitDisabled}
                                        text="Cancel" onPress={() => { this._handleCancelEditStudentClicked() }} />
                                </View>
                                <View style={[{ flex: 1 }]}>
                                    <PrimaryDarkButton disabled={this.state.submitDisabled}
                                        style={[Styles.btnSmall]} text="Update" onPress={() => { this._handleUpdateStudentClicked() }} />
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