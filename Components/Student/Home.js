import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import DeviceService from '../../Services/DeviceService';
import ClassService from '../../Services/ClassService';
import moment from 'moment';
import Pulse from './Pulse';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            deviceInfo: DeviceInfo.getUniqueID(),
            isLoading: true,
            deviceData: null,
            height: undefined,
            width: undefined,
            checkedIn: false,
            circles: [],
            toggleViewDeviceInfo: false,

            shouldCheckTime: false,
            soonClasses: [],
        };
    }

    _IsActiveClass = (startDate, endDate, startTime, endTime, classDets) => {
        let currDT = moment();
        let currentTime =  moment(currDT, 'hh:mm A');
        const timeDiff = startTime.diff(currentTime, 'minutes');

        const isActive = moment(moment()).isBetween(startDate, endDate);
    
        
        const meetingDays = this._getClassMeetingTimes(classDets.meetingDays);

        const shouldCheck = isActive && (timeDiff > 0 && timeDiff <= 120) && (meetingDays.includes(currDT.format('dddd')));

        this.setState({
            shouldCheckTime: shouldCheck
        });

        return shouldCheck;

    }

    _getClassMeetingTimes = (daysArray) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let classDays = [];

        for(let i = 0; i < days.length; i++) {
            if (daysArray[i]) {
                classDays.push(days[i]);
            } 
        }
        return classDays;
    }

    _findClassesToday = () => {

        if (this.state.deviceData) {
            for(_class in this.state.deviceData.classesEnrolled) {
                ClassService.getClass(_class, (res) => {
                    console.log("RES: ", res)
                    let startDate = moment(res.startDate);
                    let endDate = moment(res.endDate);

                    let startTime = moment(res.startTime,  ['hh:mm A', 'HH:mm A']);
                    let endTime = moment(res.endTime,  ['hh:mm A', 'HH:mm A']);

                    let currentDateTime = moment();

                    if (this._IsActiveClass(startDate, endDate, startTime, endTime, res)) {
                        console.log("this class");
                        let sclasses = this.state.soonClasses.splice();
                        sclasses.push(res);

                        this.setState({
                            soonClasses: sclasses
                        });

                    }

                });
            }
        }
    }

    componentWillMount() {
        const { width, height } = Dimensions.get('window');

        DeviceService.getDevice(this.state.deviceInfo, (res) => {
            if (res == null) {
                DeviceService.addDevice({
                    deviceId: this.state.deviceInfo,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                }).then(mess => {
                }).catch(err => {
                    alert("An error occurred.");
                });
            }
            this.setState({
                isLoading: false,
                deviceData: res,

                width: width,
                height: height
            });

            this._findClassesToday();
        });

        console.log(this.state);
        if(this.state.shouldCheckTime) {
            console.log("OKay immm");
        }
        setInterval(() => {
            // console.log(this.state.soonClasses);
            // for (_class in this.state.soonClasses) {
            //     let currentTime =  moment(moment(), 'hh:mm A');
            //     let startTime = moment(this.state.soonClasses[_class].startTime,  ['hh:mm A', 'HH:mm A']);
            //     let endTime = moment(this.state.soonClasses[_class].endTime,  ['hh:mm A', 'HH:mm A']);

            //     console.log("Time bet: ", currentTime.isBetween(startTime, endTime));

            // }

            this.setState({ circles: [...this.state.circles, 1] });
        }, 2000);
    }

    checkIn() {
        this.setState({checkedIn: !this.state.checkedIn})
    }

    render() {

        const { height, width } = this.state;
        const deviceInfo = DeviceInfo.getUniqueID();

        return (
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                <TouchableWithoutFeedback onPress={() => this.checkIn()} style={{zIndex: 1}}>
                    <View style={styles.checkInButton}>
                        {
                            this.state.checkedIn ?
                                <Icon name='check' size={75} color='#7DD892' /> :
                                <Image source={require('../../Assets/trackify-logo2.png')} style={{height: 100, width: 100}}/>
                        }
                    </View>
                    </TouchableWithoutFeedback>
                    {!this.state.checkedIn && this.state.circles.map((circle, i) => <Pulse key={i}/>)}
                </View>
                <View style={{flex: 1}}>
                    {
                        this.state.checkedIn ?
                            <Text style={{fontSize: 18}}>You have successfully checked in to class</Text> :
                            <Text style={{fontSize: 18}}>You have not yet checked in to class</Text>
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 25, alignItems: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Icon name='tablet' size={35} onPress={() => this.setState({toggleViewDeviceInfo: true})} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon name='info-circle' size={35} />
                    </View>
                </View>
                <Modal
                    isVisible={this.state.toggleViewDeviceInfo}
                    onBackdropPress={() => this.setState({toggleViewDeviceInfo: false})}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.modalContainer}>
                            <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'flex-end', margin: 10}}><Icon name='close' size={25} onPress={() => this.setState({toggleViewDeviceInfo: false})} /></View>
                            <View style={{flex: 6, alignItems: 'center'}}>
                                <Text style={{fontSize: 18}}>Welcome! Your device's id is</Text>
                                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{deviceInfo}</Text>
                                <View style={{marginTop: 10}}>
                                    <QRCode
                                        value={deviceInfo}
                                        size={200}
                                        bgColor='black'
                                        fgColor='white'/>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    checkInButton: {
        elevation: 25,
        alignSelf: 'center',
        height: 200,
        width: 200,
        borderRadius: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 375,
        width: 300,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});