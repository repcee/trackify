import React, { Component } from 'react';
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import UserService from '../../Services/UserService';

export default class Class extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {
        UserService.getListOfUsers().then(res => {
            const studentList = res.filter(user => user.userType === 'student');
            console.log(studentList)
            this.setState({studentList});
        });
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <Text>Class</Text>
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