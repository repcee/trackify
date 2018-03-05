import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import {Styles} from '../config/AppTheme';


export default class Splash extends Component {
  
  render() {
    return(
        <View style={[Styles.mainContainer, Styles.centerContents, {backgroundColor: 'blue'}]}>
          <Text style={[Styles.textHeading, Styles.textColorWhite]}>Splash, Splash, Splash...</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
  }
}