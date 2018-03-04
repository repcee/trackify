import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Class from './Class';
import Attendance from './Attendance';
import Student from './Student';

export const ProfessorNavigator = TabNavigator({
    Home: {
      screen: Class,
      navigationOptions: {
        header: null,
        // headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0},
        // headerTitle: 'Home',
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} size={24}/>
      }
    },
    Attendance: {
      screen: Attendance,
      navigationOptions: {
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerTitle: 'Attendance',
        tabBarIcon: ({tintColor}) => <Icon name="commenting" color={tintColor} size={24}/>
      }
    },
    Student: {
      screen: Student,
      navigationOptions: {
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerTitle: 'Student',
        tabBarIcon: ({tintColor}) => <Icon name="user" color={tintColor} size={24}/>
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#5386E4',
      inactiveTintColor: '#b5b5b5',
      showIcon: 'true',
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: '#fff',
        height: (Platform.OS === 'ios') ? 50 : 60,
      },
      indicatorStyle: {
        backgroundColor: '#5386E4'
      }
    }
});