import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfessorNavigator } from './ProfessorNavigator';

export const MainLoggedInNavigator = StackNavigator({
    Home: {
      screen: ProfessorNavigator,
    },
    // AddStudent: {
    //   screen: AddStudent,
    //   navigationOptions: {
    //     title: 'AddStudent',
    //     headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 15 }
    //   }
    // }
  },
  {
    headerMode: 'none'
});