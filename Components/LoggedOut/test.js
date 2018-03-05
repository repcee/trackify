import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../config/AppTheme'

export default class TTest extends Component {
    render() {

        return (
            <View style={[styles.blackBg, {flex:8}]}>
                <Text style={[styles.buttonPrimary, styles.bigText]}>Test Component</Text>
            </View>
        );
    }
}

export const Test = () => {
    return(
        <View>
            <Text>Test</Text>
        </View>
    );
};