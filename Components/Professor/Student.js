import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import UserService from '../../Services/UserService';

export default class Student extends Component {

    constructor() {
        super();
        this.state = {
            studentList: undefined
        };
    }

    componentWillMount() {
        UserService.getListOfUsers().then(res => {
            const studentList = res.filter(user => user.userType === 'student');
            this.setState({studentList});
        });
    }

    search = (searchText) => {
        console.log(searchText);
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <SearchBar round placeholder='Search for student' onChangeText={(searchText) => this.search(searchText)} containerStyle={{alignSelf: 'stretch'}}/>
                <ScrollView style={{flex: 1, alignSelf: 'stretch'}}>
                    <List containerStyle={{flex: 1, alignSelf: 'stretch', marginTop: 0}}>
                        {
                            this.state.studentList && this.state.studentList.map((student, i) => 
                                <ListItem
                                    key={i}
                                    title={`${student.firstName[0].toUpperCase()}${student.firstName.substr(1).toLowerCase()} ${student.lastName[0].toUpperCase()}${student.lastName.substr(1).toLowerCase()}`}
                                    subtitle={student.deviceId}/>
                            )
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'stretch'
    }
});