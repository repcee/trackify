import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, DatePickerAndroid, TimePickerAndroid, PermissionsAndroid } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import ClassService from '../../Services/ClassService';
import Utils from '../../config/Utils';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, NormalInput } from '../UtilComponents';



export default class AddEditClass extends Component {
    authStateListenerUnsubscriber = null;

    constructor(props) {
        super(props);
        const classData = this.props.navigation.getParam('classData', null);
        const mode = this.props.navigation.getParam('mode', 'add');

        
        if (mode === 'edit' && classData !== null) {
            this.state = classData;
            this.state.submitDisabled = false;
            this.state.mode = mode;
            this.state.formErrors = [];

        } else {
            this.state = {
                className: null,
                description: null,
                schoolName: null,

                // These addess details are being used now.
                classAddressString: null,
                classLatitude: null,
                classLongitude: null,

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
                mode: mode,
                formErrors: [],

                // Not used right now.
                addressLine1: null,
                addressCity: null,
                addressState: null,
                addressZip: null

            };
        }
        
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

   
    /**
     * Responds to the user clicking the back icon in the navbar
     */
    _handleBackButtonClick = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }

    /**
     * Send the user to a new screen to add the school/class's address.
     */
    _handleSchoolLocationClicked = () => {
        this.props.navigation.navigate('SchoolLocation', {appState: Object.assign({}, this.state),
            returnData: this._schoolLocationReturnData.bind(this)
        });
    }

    /**
     * Used by the SchoolLocation screen to update the state by setting the school/class's location.
     */
    _schoolLocationReturnData = (returnData) => {   
        this.setState({
            classAddressString,
            classLatitude,
            classLongitude
        } = returnData);

    }

    /**
     * Displays the datepicker UI on Android when the class start and end date inputs are touched.
     * Also updates the state with the with those dates.
     */
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

    /**
     * Displays the timepicker UI on Android. Triggered when the user clicks on the meeting times inputs.
     * Also updates the state with the relevant times.
     */
    _handleTimePickerClicked = async (whatField, currentTime) => {
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

    /**
     * Updates the meetingDays state when the meeting days checkboxes are touched.
     */
    _handleDaysCheckboxClicked = (which) => {
        let days = this.state.meetingDays.slice();
        days[which] = !this.state.meetingDays[which];
        this.setState({
            meetingDays: days
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
        const stringInputs = {'className': 'Class Name', 'schoolName': 'School Name', 'startDate': 'Class start date', 
            'endDate': 'Class end date', 'startTime': 'Class start time', 'endTime': 'Class end time'};        

        let errors = [];

        for(stringInput in stringInputs) {
            if (!this._isValidInput(this.state[stringInput])) {
                errors.push(`${stringInputs[stringInput]} is required.`);
            }
        }

        // Validate school location
        if (this.state.classAddressString == null || this.state.classAddressString < 1) {
            errors.push('School/Class location is required')
        }

        // Validate meeting days checkboxes
        let numDaysSelected = 0;
        for(let day of this.state.meetingDays) {
            day ? numDaysSelected++ : null;
        }

        if (numDaysSelected < 1) {
            errors.push("At least 1 meeting day is required");
        }

        this.setState({
            formErrors: errors
        });

        return errors.length === 0;
    }

    /**
     * Display validation error to the user.
     */
    _displayFormErrors = () => {
        return (
            this.state.formErrors.map((error, index) => {
                return (
                    <NormalText style={[Styles.textColorNegative, Styles.textBold]} key={index}>{error}</NormalText>
                );
            })
        );
    }

    /**
     * Responds when the user clicks the submit button.
     * Validates the form input and depending on the mode, 
     * this method will invoke either the add new class or edit class method.
     */
    _handleOnFormSubmit = () => {
        this.setState({
            submitDisabled: true
        });

        if (this._isFormDataValid()) {
            this.state.mode === 'edit' ? this._updateClass() : this._addClass();
        } else {
            this._displayFormErrors();

            this.setState({ 
                submitDisabled: false
            });

            alert("Please fix all the error and try again");
        }
    }

    /**
     * Adds a new class to the database after it has bee validated.
     */
    _addClass = () => {
        const { submitDisabled, formErrors, mode, ...classData } = this.state;
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

    /**
     * Updates an existing class in the database.
     */
    _updateClass = () => {
        const { submitDisabled, formErrors, mode, ...classData } = this.state;
        const classId = this.props.navigation.getParam('classId');
        classData.updatedAt = Date.now();
        // console.log(classData);

        ClassService.updateClass(classId, classData).then((res) => {
            this.props.navigation.getParam('forceUpdateHandler')()
            this.props.navigation.dispatch(
                NavigationActions.back({
                    key: null
                })
            );
        }).catch((err) => {
            console.log(err);
            alert("An error occurred.");
        });

        // alert("Updating " + classId);
    }

    /**
     * Updates the state whenever the data in the school name input changes.
     */
    _handleschoolNameInputChanged = (text) => {
        this.setState({
            schoolName: text
        });
    }

    /**
    * Updates the state whenever the data in the class name input changes.
    */
    _handleClassNameInputChanged = (text) => {
        this.setState({
            className: text
        });
    }

    /**
    * Updates the state whenever the data in the school name input changes.
    */
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
                            color={Colors.headerTextIcons} onPress={() => { this._handleBackButtonClick() }} />
                    </View>

                    <Text style={[Styles.pageTitle]}>{(this.state.mode === 'edit') ? `Editing ${this.state.className}` : 'Add Class'}</Text>

                    <View style={Styles.navbarRight}>
                    </View>
                </View>
                <ScrollView ref="mainScrollView">
                    <View style={[Styles.container, Styles.centerContentsCrossAxis, { alignItems: 'stretch' }]}>

                        <KeyboardAvoidingView behavior='padding'>
                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold]}>Class Name:</NormalText>
                                <NormalInput value={this.state.className} editable={!this.state.submitDisabled}
                                    onChangeText={(text) => this._handleClassNameInputChanged(text)} />
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold]}>Description (optional):</NormalText>
                                <NormalInput value={this.state.description} editable={!this.state.submitDisabled}
                                    onChangeText={(text) => this._handleClassDescriptionInputChanged(text)} />
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold]}>School name:</NormalText>
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
                                            color={this.state.classAddressString ? Colors.positive : Colors.negative}
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
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(1, this.state.startDate) }}
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.startDate} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Date:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(2, this.state.endDate) }}
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
                                        <TouchableOpacity onPress={() => { this._handleTimePickerClicked(1, this.state.startTime) }}
                                            disabled={this.state.submitDisabled} >
                                            <NormalInput editable={false} value={this.state.startTime} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Time:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleTimePickerClicked(2, this.state.endTime) }}
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
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(0) }}
                                            title='Sunday' checked={this.state.meetingDays['0']} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(1) }}
                                            title='Monday' checked={this.state.meetingDays[1]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(2) }}
                                            title='Tuesday' checked={this.state.meetingDays[2]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(3) }}
                                            title='Wednesday' checked={this.state.meetingDays[3]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(4) }}
                                            title='Thursday' checked={this.state.meetingDays[4]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(5) }}
                                            title='Friday' checked={this.state.meetingDays[5]} disabled={this.state.submitDisabled}
                                        />
                                        <CheckBox onPress={() => { this._handleDaysCheckboxClicked(6) }}
                                            title='Saturday' checked={this.state.meetingDays[6]} disabled={this.state.submitDisabled}
                                        />
                                    </View>
                                </View>
                            </View>

                             <View style={[Styles.marginT]}>
                                {this._displayFormErrors()}
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