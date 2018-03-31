import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import Utils from '../../config/Utils';

import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, EmailInput, PasswordInput,
    FirstNameInput, LastNameInput, SchoolInput, ConfirmPasswordInput  } from '../UtilComponents';



import { Styles, Colors, Defaults } from '../../config/AppTheme';


export default class SignUp extends Component {
    // Will hold reference to unregister authStateChangeListener.
    // To be assigned in componentWillMount and invoked in componentWillUnmount.
    authStateListenerUnsubscriber = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            inputEmail: null,
            inputPassword: null,
            inputConfirmPassword: null,
            inputFirstName: null,
            inputLastName: null,
            inputSchool: null,
            errorMessage: null
        };
    }

    handleBackButtonClick = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }

    // Todo: redirect user to dashboard when authstate changes.
    // componentWillMount() {
    //     authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
    //         if (user) {
    //             alert("congratulation! you have created an account. \nRedirecting you to your Dashboard.");
    //         } else {
    //             console.log("something is wrong")
    //         }
    //     });
    //
    //
    // }


    // componentWillUnmount() {
    //     authStateListenerUnsubscriber();
    // }


    handleSignUpClick = () => {

        this.setState({
            isLoading: true,
            errorMessage: null
        });
        inputEmail = this.state.inputEmail;
        inputPassword = this.state.inputPassword;
        inputFirstName = this.state.inputFirstName;
        inputLastName = this.state.inputLastName;
        inputSchool = this.state.inputSchool;

        AuthService.createUser(inputEmail,inputPassword)
            .catch((err) => {
                this.setState({
                    errorMessage: err,
                    isLoading: false
                })
            });

    }


    handleEmailInputChanged = (input) => {
        this.setState({
            inputEmail: input
        });
    }
    handlePasswordInputChanged = (input) => {
        this.setState({
            inputPassword: input
        });
    }
    handleConfirmPasswordInputChanged = (input) => {
        this.setState({
            inputConfirmPassword: input
        });
    }
    handleFirstNameInputChanged = (input) => {
        this.setState(
            {
                inputFirstName: input
            }
        );
    }
    handleLastNameInputChanged = (input) => {
        this.setState(
            {
                inputLastName: input
            }
        );
    }
    handleSchoolInputChanged = (input) => {
        this.setState(
            {
                inputSchool: input
            }
        );
    }

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                              color={Colors.headerTextIcons}
                              onPress={() => { this.handleBackButtonClick() }} />
                    </View>

                    <Text style={[Styles.pageTitle]}>Professor Sign Up</Text>

                    <View style={Styles.navbarRight}>
                        <Text></Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={[Styles.container, Styles.centerContentsCrossAxis, { alignItems: 'stretch' }]}>

                        <KeyboardAvoidingView behavior='padding'>

                            <View style={[{ alignSelf: 'stretch', backgroundColor: '#eeeeee' }]}>
                                <Text>Email:</Text>
                                <EmailInput  value={this.state.inputEmail}
                                             onChangeText={(text) => this.handleEmailInputChanged(text)} />

                                <Text>Password:</Text>
                                <PasswordInput  value={this.state.inputPassword}
                                                onChangeText={(text) => this.handlePasswordInputChanged(text)} />

                                <Text>Confirm Password:</Text>
                                <ConfirmPasswordInput  value={this.state.inputConfirmPassword}
                                                       onChangeText={(text) => this.handleConfirmPasswordInputChanged(text)} />

                                <Text>First Name:</Text>
                                <FirstNameInput value= {this.state.inputFirstName}
                                                onChangeText={(text) => this.handleFirstNameInputChanged(text)} />

                                <Text>Last Name:</Text>
                                <LastNameInput  value= {this.state.inputLastName}
                                                onChangeText={(text) => this.handleLastNameInputChanged(text)}/>

                                <Text>School:</Text>
                                <SchoolInput  value= {this.state.inputSchool}
                                              onChangeText={(text) => this.handleSchoolInputChanged(text)}/>

                            </View>

                            <View style={[Styles.marginTB, { alignSelf: 'center' }]}>
                                {
                                    this.state.isLoading ? (
                                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                                    ) : (null)
                                }
                                <NormalText style={[Styles.textErrorMessage]}>{this.state.errorMessage}</NormalText>


                            </View>

                            <View style={[Styles.centerContentsCrossAxis, Styles.marginT]}>
                                <PrimaryDarkButton text='Sign Up!'
                                                   onPress={() => { this.handleSignUpClick() }} />
                            </View>
                        </KeyboardAvoidingView>



                    </View>
                </ScrollView>

            </View>
        );
    }
}