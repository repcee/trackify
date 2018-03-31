import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import Utils from '../../config/Utils';

import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, EmailInput, PasswordInput } from '../UtilComponents';



import { Styles, Colors, Defaults } from '../../config/AppTheme';


export default class SignIn extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            inputEmail: null,
            inputPassword: null,
            errorMessage: null,
            currentUser: null
        };
    }

    handleBackButtonClick = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }

    handleSignInClick = () => {
        this.setState({
            isLoading: true,
            errorMessage: null
        });
        inputEmail = this.state.inputEmail;
        inputPassword = this.state.inputPassword;

        if (inputEmail == null || inputPassword == null) {
            this.setState({
                errorMessage: 'Email/password cannot be empty.',
                isLoading: false
            });
            return false;
        }

        AuthService.signInUser(inputEmail, inputPassword)
            .catch((err) => {
                this.setState({
                    errorMessage: err,
                    isLoading: false
                });
            });
    }

    handleSignUpClick = () => {
        this.props.navigation.navigate("SignUpScreen");
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

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons}
                            onPress={() => { this.handleBackButtonClick() }} />
                    </View>

                    <Text style={[Styles.pageTitle]}>Professor Sign In</Text>

                    <View style={Styles.navbarRight}>
                        <Text></Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={[Styles.container, Styles.centerContentsCrossAxis, { alignItems: 'stretch' }]}>

                        <KeyboardAvoidingView behavior='padding'>
                            <View style={[Styles.marginTB, { alignItems: 'stretch' }]}>
                                <NormalText style={[Styles.textBold]}>Demo teacher login</NormalText>
                                <NormalText>Email: test.teacher@test.com</NormalText>
                                <NormalText>Password: testteacher</NormalText>
                            </View>
                            <View style={[{ alignSelf: 'stretch', backgroundColor: '#eeeeee' }]}>
                                <EmailInput placeholder="Email" value={this.state.inputEmail}
                                    onChangeText={(text) => this.handleEmailInputChanged(text)} />

                                <PasswordInput placeholder='Password' value={this.state.inputPassword}
                                    onChangeText={(text) => this.handlePasswordInputChanged(text)} />
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
                                <PrimaryDarkButton text='Sign In'
                                    onPress={() => { this.handleSignInClick() }} />
                            </View>
                        </KeyboardAvoidingView>



                        <View style={[Styles.centerContentsCrossAxis]}>
                            <NormalText>Don't have an account?</NormalText>
                            <NormalText style={[Styles.textBold, Styles.textColorPrimaryDark]}
                                onPress={() => this.handleSignUpClick()}>
                                Sign Up
                            </NormalText>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}