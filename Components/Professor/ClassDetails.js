import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';
import ClassService from '../../Services/ClassService';
import LinkStudentQRScanner from './LinkStudentQRScanner';


export default class ClassDetails extends Component {
    constructor(props) {
        super(props);

        const classId = this.props.navigation.getParam('classData').classId;
        this.state = {
            classId: classId,
            isLoading: true,
            classData: null,
            c: null,

            enrolledStudents: null,
            unlinkedStudents: null,

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
                    enrolledStudents: classDets.enrolledStudents ? Object.values(classDets.enrolledStudents).reverse() : null,
                    unlinkedStudents: classDets.unlinkedStudents || null,

                    attendance: null,

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
        console.log("Force updated.");
        this.forceUpdate();
    }

    _linkStudentToClassByDeviceId = (deviceId) => {
        alert("Device id: " + deviceId);
    }

    _handleUnlinkedStudentClicked = async (unlinedStudentIndex) => {
        try {
            const deviceId = await LinkStudentQRScanner.scanQRCode();
            
            this._linkStudentToClassByDeviceId(deviceId);
        } catch(err) {
            console.log(err);
            alert("An error occurred.");
        }         
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

    _renderEnrolledStudents = () => {
        if (this.state.enrolledStudents) {
            return (
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.enrolledStudents.map((l, i) => (
                            <ListItem
                                key={i}
                                title={`${l.firstName} ${l.lastName}`}
                                onPress={() => {
                                    alert("Okay");
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

                <View style={[Styles.marT]}>
                    <SubHeadingText style={[Styles.textBold]}>Unlinked Students</SubHeadingText>
                    {this._renderUnLinkedStudents()}
                </View>

                <View style={[Styles.marginTLarge]}>
                    <SubHeadingText style={[Styles.textBold]}>Enrolled Students</SubHeadingText>
                    {this._renderEnrolledStudents()}
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

                </View>
            );
        } else {
            return (
                <ActivityIndicator size='large' color={Colors.primaryDark} />
            );
        }
    }
}