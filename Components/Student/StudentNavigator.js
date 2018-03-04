import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';

export const StudentNavigator = StackNavigator({
    Home: {
      screen: Home
    }
  },
  {
    headerMode: 'none'
});