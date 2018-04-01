import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import ClassService from '../../Services/ClassService';
import UserService from '../../Services/UserService';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, HeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';
import { NavigationActions } from 'react-navigation';


export default class Attendance extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isAttendanceLoading: false,
            classId: this.props.navigation.getParam('classId', null),
            deviceId: this.props.navigation.getParam('deviceId', null),
            deviceData: this.props.navigation.getParam('deviceData', null),
            classData: null,
            attendance: null,
            selectedDay: null,

            attendanceStatus: this._getAttendanceStatus('a'),
        }
    }

    componentWillMount() {
        const classd = ClassService.getClass(this.state.classId, (classDets) => {
            if (classDets !== null) {
                this.setState({
                    classData: classDets,

                    attendance: classDets.attendance,

                    isLoading: false,
                });
            } else {
                this.props.navigation.dispatch(
                    NavigationActions.back({
                        key: null
                    })
                );
                alert("Class not found.");
            }
        });
    }

    _getAttendanceStatus = (status) => {
        let iconName = 'times-circle';
        let iconColor = Colors.negative;
        let attendanceStatusString = "Absent"

        if (status == 'n') {
           iconName = 'check-circle';
           iconColor = Colors.positive;
           attendanceStatusString = 'Present';

        } else if (status == 'l') {
            iconName = 'check-circle';
            iconColor = Colors.warning;
            attendanceStatusString = 'Late';
        }

        return ({
            code: status,
            iconName:  iconName,
            iconColor: iconColor,
            icon: <Icon name={`${iconName}`}
                    type="font-awesome"
                    color={`${iconColor}`} 
                    size={40}
                    />,
            codeStr: attendanceStatusString
        });
    }


    _handleBackButtonClicked = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }

    _handelCalendarDayPressed = (date) => {
        this.setState({
            isAttendanceLoading: true
        });

        const dayAsTimestamp = moment(date).format('x');
        const dayAsHumanStr = moment(date).format('LL');
        let selectedDay = null;

        if(this.state.classData.attendance && this.state.classData.attendance[`${dayAsTimestamp}`]) {
            selectedDay = this.state.classData.attendance[`${dayAsTimestamp}`];
        }

        if (selectedDay !== null) {
            selectedDay.date = dayAsHumanStr;

            // check to see if student checked in on the given day.
            let deviceAttendance = selectedDay.students[this.state.deviceId];
            if (deviceAttendance) {
                this.setState({
                    attendanceStatus: this._getAttendanceStatus(deviceAttendance.attendanceStatus)
                });

            } else {
                this.setState({
                    attendanceStatus: this._getAttendanceStatus('a')
                });
            }
        }

        this.setState({
            selectedDay: selectedDay,
            isAttendanceLoading: false
        });
    }

    _renderDetailsView = () => {
        if (this.state.selectedDay !== null) {
            return (
                <View>
                    <HeadingText style={[Styles.marginBSmall]}>
                        Attendance: <HeadingText style={[Styles.textColorPrimaryDark]}>{this.state.selectedDay.date}</HeadingText>
                    </HeadingText>
                    <List containerStyle={[Styles.marginNone, Styles.listMarginPaddingFix]}>

                        <ListItem
                            hideChevron={true}
                            titleStyle={[Styles.textRegular, Styles.textBold, Styles.textColorPrimaryDark]}
                            titleContainerStyle={[Styles.marginLSmall]}
                            key={0}
                            leftIcon={this.state.attendanceStatus.icon}
                            title={`You were marked as ${this.state.attendanceStatus.codeStr}`
                            }
                        />
                    </List>
                </View>
            );
        }
    }

    _renderCalenderView = () => {
        let markedDays = {};
        let today = moment().format('YYYY-MM-DD').toString()

        for (day in this.state.attendance) {
            let fday = moment.unix(day/1000).format('YYYY-MM-DD').toString();
            markedDays[`${fday}`] = {
                selected: true, marked: true, selectedColor: 'blue',
            }
        }
       
        return (
            <Calendar
            markedDates={markedDays}
                current={today}
                minDate={this.state.classData.startDate}
                maxDate={today} 
                onDayPress={(day)=>{this._handelCalendarDayPressed(day.dateString)}}
                />
        );
    }

    render() {
        if(!this.state.isLoading) {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} 
                            onPress={() => { this._handleBackButtonClicked() }}
                            />
                    </View>

                    <Text style={[Styles.pageTitle]}>Attendance</Text>

                    <View style={Styles.navbarRight}>
                       
                    </View>
                </View>
                <ScrollView>
                    <View style={[Styles.container]}>
                    <View style={[Styles.marginB]}>
                            <NormalText>Click on one of the highlighted dates to see the attendance record.</NormalText>
                        </View>
                        <View>
                            {this._renderCalenderView()}
                        </View>

                        <View style={[Styles.marginT]}>
                            {
                                this.state.isAttendanceLoading ? (
                                    <View style={[Styles.centerContents, Styles.marginTLarge]}>
                                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                                    </View>
                                ) : (null)
                            }
                            {this._renderDetailsView()}
                        </View>
                    </View>
                </ScrollView>

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