import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Register from './Register';

export const LoggedOutNavigator = StackNavigator({
    Home: {
      screen: Home
    },
    Register: {
      screen: Register
    }
  },
  {
    headerMode: 'none'
});