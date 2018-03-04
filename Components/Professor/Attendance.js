import React, { Component } from 'react';
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

export default class Attendance extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <Text>Attendance</Text>
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
    }
});