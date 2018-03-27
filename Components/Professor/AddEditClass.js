import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import ClassService from '../../Services/ClassService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, NormalInput } from '../UtilComponents';



export default class AddEditClass extends Component {
    authStateListenerUnsubscriber = null;

    constructor(props) {
        super(props);
        this.state = {
            className: null,
            description: null,
            schoolName: null,

            // Not used right now.
            addressLine1: null,
            addressCity: null,
            addressState: null,
            addressZip: null,

            // These addess details are being used now.
            classAddressString: null,
            classLatitude: 33.7531,
            classLongitude:  84.3853,

            timezone: 'EST',

            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
            meetingDays: Array(7).fill(false),

            checkInGracePeriodMinutes: 5,
            allowedAttendanceRadiusMiles: 1,
            createdAt: null,
            updatedAt: null,

            teacherId: null,

            // Other state
            submitDisabled: false,

        };
    }

    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    teacherId: user.uid
                });
            } else {
                console.log("auth: no user.")
            }
        });
    }

    componentWillUnmount() {
        authStateListenerUnsubscriber();
    }

    _handleBackButtonClick = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }


    _handleSchoolLocationClicked = () => {
        this.props.navigation.navigate('SchoolLocation', {appState: Object.assign({}, this.state),
            returnData: this._schoolLocationReturnData.bind(this)
        });
    }

    _schoolLocationReturnData = (returnData) => {   
        this.setState({
            classAddressString,
            classLatitude,
            classLongitude
        } = returnData);

    }

    _handleDatePickerClicked = async (whatField, currentDate) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                const _date = moment(new Date(year, month, day)).format('LL'); 

                if (whatField == 1) {
                    this.setState({
                        startDate: _date
                    });
                } else if (whatField == 2) {
                    this.setState({
                        endDate: _date
                    });
                }
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }


    _handleTImePickerClicked = async (whatField, currentTime) => {
        try {
            // Need to convert the time to 24-hour time for the picker
           const displayTime = moment(currentTime || '00:00', ['HH:mm', 'hh:mm A']);

            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: displayTime.hour(),
                minute: displayTime.minutes(),
                is24Hour: false,
            });

            if (action !== TimePickerAndroid.dismissedAction) {
                const _timeStr = moment(`${hour}:${minute}`, ['HH:mm', 'hh:mm A']).format('hh:mm A');

                if (whatField == 1) {
                    this.setState({
                        startTime: _timeStr
                    });
                } else if (whatField == 2) {
                    this.setState({
                        endTime: _timeStr
                    });
                }
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    _handleDaysCheckboxClicked = (which) => {
        let days = this.state.meetingDays.slice();
        days[which] = !this.state.meetingDays[which];
        this.setState({
            meetingDays: days
        });
    }

    _handleOnFormSubmit = () => {
        this.setState({
            submitDisabled: true
        });

        const { submitDisabled, ...classData } = this.state;
        classData.createdAt = classData.updatedAt = Date.now();

        ClassService.addClass(classData).then((res) => {
            this.props.navigation.dispatch(
                NavigationActions.back({
                    key: null
                })
            );
        }).catch((err) => {
            console.log(err);
            alert("An error occurred.");
        });
    }

    _handleschoolNameInputChanged = (text) => {
        this.setState({
            schoolName: text
        });
    }

    _handleClassNameInputChanged = (text) => {
        this.setState({
            className: text
        });
    }

    _handleClassDescriptionInputChanged = (text) => {
        this.setState({
            description: text
        });
    }


    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} onPress={() => {this._handleBackButtonClick()}}/>
                    </View>

                    <Text style={[Styles.pageTitle]}>Add Class</Text>

                    <View style={Styles.navbarRight}>
                    </View>
                </View>
                <ScrollView>
                    <View style={[Styles.container, Styles.centerContentsCrossAxis, { alignItems: 'stretch' }]}>

                        <KeyboardAvoidingView behavior='padding'>
                            <NormalText style={[Styles.textBold, Styles.marginB]}>Enter the details about the class below.</NormalText>
                            
                            <View style={[Styles.marginB]}>
                                <NormalText>Class Name:</NormalText>
                                <NormalInput value={this.state.className} editable={!this.state.submitDisabled}
                                onChangeText={(text) => this._handleClassNameInputChanged(text)}/>
                            </View>

                            <View  style={[Styles.marginB]}>
                                <NormalText>Description (optional):</NormalText>
                                <NormalInput value={this.state.description} editable={!this.state.submitDisabled}
                                     onChangeText={(text) => this._handleClassDescriptionInputChanged(text)} />
                            </View>

                            <View  style={[Styles.marginB]}>
                                <NormalText>School name:</NormalText>
                                <NormalInput value={this.state.schoolName} editable={!this.state.submitDisabled}
                                onChangeText={(text) => this._handleschoolNameInputChanged(text)} />
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>School/Class Location:</NormalText>
                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <Icon
                                            disabled={this.state.submitDisabled}
                                            raised
                                            reverse
                                            name='map'
                                            type='font-awesome'
                                            color={this.state.classAddressString ? Colors.positive: Colors.negative}
                                            onPress={() => { this._handleSchoolLocationClicked() }} />
                                    </View>

                                    <View style={[{ flex: 3 }]}>
                                        <NormalText>{this.state.classAddressString}</NormalText>
                                    </View>
                                </View>
 
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Date Range</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>Start Date:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(1, this.state.startDate)}}
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.startDate} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Date:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(2, this.state.endDate)}} 
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.endDate} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Meeting Times</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>Start Time:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleTImePickerClicked(1, this.state.startTime)}} 
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.startTime} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Time:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleTImePickerClicked(2, this.state.endTime)}} 
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.endTime} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Meeting Days:</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(0)}}
                                            title='Sunday' checked={this.state.meetingDays[0]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(1)}}
                                            title='Monday' checked={this.state.meetingDays[1]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(2)}}
                                            title='Tuesday' checked={this.state.meetingDays[2]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(3)}}
                                            title='Wednesday' checked={this.state.meetingDays[3]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(4)}}
                                            title='Thursday' checked={this.state.meetingDays[4]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(5)}}
                                            title='Friday' checked={this.state.meetingDays[5]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(6)}}
                                            title='Saturday' checked={this.state.meetingDays[6]} disabled={this.state.submitDisabled}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginT]}>
                                <PrimaryDarkButton disabled={this.state.submitDisabled} text="Submit" onPress={() => { this._handleOnFormSubmit() }} />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>

            </View>
        );
    }
}