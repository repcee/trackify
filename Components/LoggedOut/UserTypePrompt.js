import React, { Component } from 'react';
import { Text, View, YellowBox } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class UserTypePrompt extends Component {
    // Will hold reference to unregister authStateChangeListener.
    // To be assigned in componentWillMount and invoked in componentWillUnmount.
    authStateListenerUnsubscriber = null;

    constructor(props) {
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Warning: Can only update a mounted or mounting component.']);
        YellowBox.ignoreWarnings(['Deprecation warning']);
        YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']);
        super(props);
        this.state = {
            isLoading: false,
            currentUser: null
        };
    }


    handleStudentClick = () => {
        this.props.navigation.navigate("StudentLoading");
    }

    handleProfessorClick = () => {
        this.props.navigation.navigate("SignInScreen");
    }

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar, { justifyContent: 'center' }]}>
                    <Text style={[Styles.pageTitle]}>Who are you?</Text>
                </View>

                <View style={[Styles.container, Styles.centerContents, { marginTop: 100 }]}>
                    <SubHeadingText>How do you want to sign in?</SubHeadingText>

                    <View style={[{ flex: 1 }]}>
                        <View style={[Styles.marginTB]}>
                            <PrimaryDarkButton text="Sign In as a Student"
                                onPress={() => this.handleStudentClick()} />
                        </View>

                        <View style={[Styles.marginB]}>
                            <AccentButton text="Sign In as a Professor"
                                onPress={() => this.handleProfessorClick()} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}   