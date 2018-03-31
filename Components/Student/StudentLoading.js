import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class StudentLoading extends Component {
    constructor(props) {
        super(props);
        AuthService.siginInStudent().catch(err => {
            console.log("Student sign in error ", err);
            alert("An Error occurred.");
        });
    }

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.container, Styles.centerContents]}>
                    <ActivityIndicator size='large' color={Colors.primaryDark} />
                </View>

            </View>
        );
    }
}