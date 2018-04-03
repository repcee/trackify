import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, Animated, Easing, YellowBox, PermissionsAndroid} from 'react-native';
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
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Deprecation warning']);
        YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']);
        this.state = {
            deviceInfo: DeviceInfo.getUniqueID(),
            isLoading: true,
            deviceData: null,
            height: undefined,
            width: undefined,
            checkedIn: false,
            checkinDisabled: true,
            circles: [],
            toggleViewDeviceInfo: false,

            shouldCheckTime: false,
            soonClasses: [],
            classId: undefined
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

    _requestLocationPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'Trackify needs to accesses your location.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err)
            return false;
        }
    }
    
    _getUsersCurrentLocation = () => {
        this._requestLocationPermissions().then(res => {
            if (res) {
                console.log("Persmission granted.");
                navigator.geolocation.getCurrentPosition(pos => {
                    console.log("CURURUUE: ", pos);
                });
            } else {
                console.log("Denied.")
            }
        })
    }


    componentWillMount() {
        const { width, height } = Dimensions.get('window');

        ClassService.getClassWithTime(this.state.deviceInfo).then(classId => {
            this.setState({ checkinDisabled: !classId, classId });
            ClassService.checkIfAlreadyCheckedIn(classId, this.state.deviceInfo).then(res => {
                this.setState({checkedIn: res});
            });
        });

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

            this._getUsersCurrentLocation();
        });

        // console.log(this.state);
        if(this.state.shouldCheckTime) {
            console.log("OKay immm");
        }
        setInterval(() => {
            this.setState({ circles: [...this.state.circles, 1] });
        }, 2000);
    }

    refresh() {
        ClassService.getClassWithTime(this.state.deviceInfo)
            .then(classId => {
                this.setState({ checkinDisabled: !classId, classId });
            })
            .catch(err => {
                this.setState({ checkinDisabled: true });
            });
    }

    checkIn() {
        if(this.state.classId && !this.state.checkedIn) {
            ClassService.classCheckIn(this.state.classId, this.state.deviceInfo);
            if (!this.state.checkinDisabled) {
                this.setState({checkedIn: !this.state.checkedIn});
            }
        }
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
                                    this.state.checkinDisabled ?
                                        <Icon name='close' size={80} color='rgb(234, 98, 121)' /> :
                                        <Image source={require('../../Assets/trackify-logo2.png')} style={{height: 100, width: 100}}/>
                        }
                    </View>
                    </TouchableWithoutFeedback>
                    {!this.state.checkedIn && !this.state.checkinDisabled && this.state.circles.map((circle, i) => <Pulse key={i}/>)}
                </View>
                <View style={{flex: 1}}>
                    {
                        this.state.checkedIn ?
                            <Text style={{fontSize: 18}}>You have successfully checked in to class</Text> :
                            this.state.checkinDisabled ? 
                                <Text style={{fontSize: 18}}>You do not have any classes during current time</Text> :
                                <Text style={{fontSize: 18}}>You have not yet checked in to class</Text>
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 25, alignItems: 'center'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Icon name='tablet' size={35} onPress={() => this.setState({toggleViewDeviceInfo: true})} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon name='refresh' size={35} onPress={() => this.refresh()} />
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