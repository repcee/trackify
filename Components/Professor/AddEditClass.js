import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, NormalInput } from '../UtilComponents';



export default class AddEditClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: null,
            classDesciption: null,
            schoolname: null,

            schAddrStr: null,
            schAddrLine1: null,
            schAddrCity: null,
            schAddrState: null,
            schAddrZip: null,
            schAddrLat: 33.7531,
            schAddrLng:  84.3853,

            classStartDate: null,
            classEndDate: null,
            classMeetingStart: null,
            classMeetingEnd: null,
            classMeetingDays: Array(7).fill(false),

        };
    }

    _handleBackButtonClick = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }


    _handleSchoolLocationClicked = () => {
        const _currentAddress = {
            schAddrStr,
            schAddrLine1,
            schAddrCity,
            schAddrState,
            schAddrZip,
            schAddrLat,
            schAddrLng
        } = this.state;

        this.props.navigation.navigate('SchoolLocation', {appState: Object.assign({}, this.state),
            returnData: this._schoolLocationReturnData.bind(this)
        });
    }

    _schoolLocationReturnData = (returnData) => {   
        this.setState({
            schAddrStr,
            schAddrLine1,
            schAddrCity,
            schAddrState,
            schAddrZip,
            schAddrLat,
            schAddrLng
        } = returnData);

    }

    _handleDatePickerClicked = async (whatField, currentDate) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                const _date = moment(new Date(year, month, day)).format('LL'); 
                console.log(_date);

                if (whatField == 1) {
                    this.setState({
                        classStartDate: _date
                    });
                } else if (whatField == 2) {
                    this.setState({
                        classEndDate: _date
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

           console.log(displayTime.hour(), displayTime.minutes());

            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: displayTime.hour(),
                minute: displayTime.minutes(),
                is24Hour: false,
            });

            if (action !== TimePickerAndroid.dismissedAction) {
                const _timeStr = moment(`${hour}:${minute}`, ['HH:mm', 'hh:mm A']).format('hh:mm A');

                if (whatField == 1) {
                    this.setState({
                        classMeetingStart: _timeStr
                    });
                } else if (whatField == 2) {
                    this.setState({
                        classMeetingEnd: _timeStr
                    });
                }
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    _handleDaysCheckboxClicked = (which) => {
        let days = this.state.classMeetingDays.slice();
        days[which] = !this.state.classMeetingDays[which];
        console.log(days)
        this.setState({
            classMeetingDays: days
        });
    }

    _handleOnFormSubmit = () => {
        alert("Submitting");
       
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
                                <NormalText>Name:</NormalText>
                                <NormalInput value={this.state.className} />
                            </View>

                            <View  style={[Styles.marginB]}>
                                <NormalText>Description (optional):</NormalText>
                                <TouchableOpacity onPress={() => {this._handleDatePickerClicked(2)}}>
                                    <NormalInput value={this.state.classDesciption} />
                                    </TouchableOpacity>
                            </View>

                            <View  style={[Styles.marginB]}>
                                <NormalText>School name:</NormalText>
                                <NormalInput value={this.state.schoolname} />
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>School/Class Location:</NormalText>
                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <Icon
                                            raised
                                            reverse
                                            name='map'
                                            type='font-awesome'
                                            color={this.state.schAddrStr ? Colors.positive: Colors.negative}
                                            onPress={() => { this._handleSchoolLocationClicked() }} />
                                    </View>

                                    <View style={[{ flex: 3 }]}>
                                        <NormalText>{this.state.schAddrStr}</NormalText>
                                    </View>
                                </View>
 
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Date Range</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>Start Date:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(1, this.state.classStartDate) }}>
                                            <NormalInput editable={false} value={this.state.classStartDate} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Date:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleDatePickerClicked(2, this.state.classEndDate) }}>
                                            <NormalInput editable={false} value={this.state.classEndDate} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Meeting Times</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>Start Time:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleTImePickerClicked(1, this.state.classMeetingStart) }}>
                                            <NormalInput editable={false} value={this.state.classMeetingStart} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[{ flex: 1 }]}>
                                        <NormalText>End Time:</NormalText>
                                        <TouchableOpacity onPress={() => { this._handleTImePickerClicked(2, this.state.classMeetingEnd) }}>
                                            <NormalInput editable={false} value={this.state.classMeetingEnd} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold, Styles.marginBSmall]}>Meeting Days:</NormalText>

                                <View style={[{ flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(0)}}
                                            title='Sunday' checked={this.state.classMeetingDays[0]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(1)}}
                                            title='Monday' checked={this.state.classMeetingDays[1]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(2)}}
                                            title='Tuesday' checked={this.state.classMeetingDays[2]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(3)}}
                                            title='Wednesday' checked={this.state.classMeetingDays[3]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(4)}}
                                            title='Thursday' checked={this.state.classMeetingDays[4]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(5)}}
                                            title='Friday' checked={this.state.classMeetingDays[5]}
                                        />
                                        <CheckBox onPress={() => {this._handleDaysCheckboxClicked(6)}}
                                            title='Saturday' checked={this.state.classMeetingDays[6]}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[Styles.marginT]}>
                                <PrimaryDarkButton disabled={true} text="Submit" onPress={() => { this._handleOnFormSubmit() }} />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>

            </View>
        );
    }
}