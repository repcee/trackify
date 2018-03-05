import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Styles from '../config/AppTheme'

export default class Dashboard extends Component {
    render() {
      return(
          <View style={[styles.container, {backgroundColor: 'green'}]}>
            <Text style={[styles.randText]}>You are logged in!!</Text>
          </View>
      );
    }
  }