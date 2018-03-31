import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import moment from 'moment';
import { Calendar, Agenda } from 'react-native-calendars';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, HeadingText } from '../UtilComponents';
import Constants from '../../config/Constants';


export default class PageWithHeaderandScrollView extends Component {
    constructor(props) {
        super(props);
        const classData = this.props.navigation.getParam('classData', null);
        let attendance = null;

        if (classData) {
            attendance =  classData.attendance ? Object.values(classData.attendance) : [];
        }

        this.state = {
            isLoading: true,
            isAttendanceLoading: true,
            selectedDay: null,

            classId: this.props.navigation.getParam('classId'),
            classData: this.props.navigation.getParam('classData'),
            attendance:  classData.attendance,
            formattedEnrolledStudents: this._generateFormattedListOfStudents(
                classData.enrolledStudents
            )
        }        
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    _generateFormattedListOfStudents = (enrolledStudents) => {
        let formatedEnrolledStuds = {};
        
        for (student in enrolledStudents) {
            let deviceId = enrolledStudents[student].deviceId;

            formatedEnrolledStuds[deviceId] = {
                deviceId: deviceId,
                firstName: enrolledStudents[student].firstName,
                lastName: enrolledStudents[student].lastName,

                // marked as absent initially.
                attendance: this._getAttendanceStatus('a')

            };
        }

        return formatedEnrolledStuds;
    }

    _handelCalendarDayPressed = (date) => {
        const dayAsTimestamp = moment(date).format('x');
        const dayAsHumanStr = moment(date).format('LL');

        let selectedDay = this.state.classData.attendance[`${dayAsTimestamp}`] || null;
        let enrolledStudents = Object.assign(this.state.formattedEnrolledStudents);

        if (selectedDay !== null) {
            selectedDay.date = dayAsHumanStr;

            for (student in  selectedDay.students) {
                enrolledStudents[student].attendance = 
                    this._getAttendanceStatus(selectedDay.students[student].attendanceStatus);
            }
        }

        this.setState({
            selectedDay: selectedDay,
            formattedEnrolledStudents: enrolledStudents
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

    _renderDetailsView = () => {
        if (this.state.selectedDay) {
            console.log("render ", this.state.selectedDay);
            return (
                <View>
                    <HeadingText style={[Styles.marginBSmall]}>{this.state.selectedDay.date}</HeadingText>
                    <List containerStyle={[Styles.marginNone, Styles.listMarginPaddingFix]}>
                        {
                            Object.keys(this.state.formattedEnrolledStudents).map((i) => (
                                <ListItem
                                    hideChevron={true}
                                    titleStyle={[Styles.textRegular, Styles.textBold, Styles.textColorPrimaryDark]}
                                    titleContainerStyle={[Styles.marginLSmall]}
                                    subtitleContainerStyle={[Styles.marginLSmall]}
                                    subtitleStyle={[Styles.textRegualrFontOnly, {fontSize: 14}]}
                                    key={i}
                                    leftIcon={this.state.formattedEnrolledStudents[`${i}`].attendance.icon}
                                    title={`${this.state.formattedEnrolledStudents[`${i}`].firstName} ${this.state.formattedEnrolledStudents[`${i}`].lastName}`
                                    }
                                    subtitle={`Marked as ${this.state.formattedEnrolledStudents[`${i}`].attendance.codeStr}`}
                                />
                            ))
                        }
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
        if (!this.state.isLoading) {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.navbar]}>

                        <View style={[Styles.navbarLeft]}>
                            <Icon name="arrow-left" type="font-awesome"
                                color={Colors.headerTextIcons} />
                        </View>

                        <Text style={[Styles.pageTitle]}>{this.state.classData.className} Attendance</Text>

                        <View style={Styles.navbarRight}>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[Styles.container]}>
                            <View style={[Styles.marginT]}>
                                {this._renderCalenderView()}
                            </View>
                            
                            <View style={[Styles.marginT]}>
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