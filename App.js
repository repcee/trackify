import React, { Component } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import UserService from './Services/UserService';
import { StudentNavigator } from './Components/Student/StudentNavigator';
import { ProfessorNavigator } from './Components/Professor/ProfessorNavigator';
import FirstUse from './Components/FirstUse';

export default class App extends Component {

  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer',
      'FIREBASE WARNING: Invalid query string segment:'
    ];
    this.state = {
      firstName: '',
      lastName: '',
      isLoading: false,
      error: '',
      userType: '',
      studentList: []
    }
  }

  componentWillMount() {
    this.setState({isLoading: true});
    const deviceId = DeviceInfo.getUniqueID();
    // UserService.removeUserType();
    UserService.getUserType().then(userType => {
      console.log(userType);
      if(userType) {
        this.setState({isLoading: false});
        this.setState({userType});
      }
      else {
        UserService.getUserInfoFromDeviceId(deviceId)
          .then(res => {
            this.setState({userType: res.userType});
            this.setState({isLoading: false});
          })
          .catch(err => {
            console.log(err)
            this.setState({isLoading: false});
          });
      }
    });
  }

  linkDevice = (deviceId, firstName, lastName, userType) => {
    UserService.updateDevice(deviceId, firstName, lastName, userType)
      .then(res => {
          this.setState({userType, firstName, lastName});
          // UserService.setUserType(userType);
      })
      .catch(err => {
        console.log('linkDevice() ' + err)
      });
  }
  
  _renderNavigator() {
    return(
      this.state.userType === 'student' ?
        <StudentNavigator screenProps={
          {
            logout: () => this.logout(),
            account: this.state.account,
          }} />
        :
        <ProfessorNavigator screenProps={
          {
            login: (username, password) => this.login(username, password),
            error: this.state.error
          }} />
    );
  }

  render() {
    return (
      this.state.isLoading ?
        <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size='large' color='#5386E4'/></View> :
        this.state.userType ?
          this._renderNavigator() :
          <FirstUse linkDevice={(deviceId, firstName, lastName, userType) => this.linkDevice(deviceId, firstName, lastName, userType)}/>
    );
  }
}