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

                email: null,
                password: null,
                confirmPassword: null,
                firstName: null,
                lastName: null,

                school: null,
                errorMessage: null,

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
    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
            if (user) {
                console.log("congratulation! you have created an account. \nRedirecting you to your Dashboard.");
            } else {
                console.log("something is wrong")
            }
        });


    }


    ///

    componentWillUnmount() {
        authStateListenerUnsubscriber();
    }

        //partially work, give authorization only
    // handleSignUpClick = () => {
    //
    //     this.setState({
    //         isLoading: true,
    //         errorMessage: null
    //     });
    //     inputEmail = this.state.email;
    //     inputPassword = this.state.password;
    //     inputFirstName = this.state.firstName;
    //     inputLastName = this.state.lastName;
    //     inputSchool = this.state.school;
    //
    //     AuthService.createUser(inputEmail,inputPassword)
    //         .catch((err) => {
    //             this.setState({
    //                 errorMessage: err,
    //                 isLoading: false
    //             })
    //         });
    //
    // }

        //give authorization and add attributes, can't link to user UID
    handleSignUpClick = () => {
        this.setState({
            isLoading: true,
            errorMessage: null
        });
        inputEmail = this.state.email;
        inputPassword = this.state.password;


        if(this.state.email == null || this.state.password == null ||
            this.state.firstName == null || this.state.lastName == null){
            return (
                this.setState({
                    isLoading: false
                }),

                alert("One of the required field need to be fill out")
            )
        } else if (this.state.password !== this.state.confirmPassword){
            return (
                this.setState({
                    isLoading: false
                }),
            alert("Password do not match")
            )
        }

        AuthService.createUser(inputEmail,inputPassword)
            .catch((err) => {
                this.setState({
                    errorMessage: err,
                    isLoading: false
                })
            });

        this.state.mode === 'edit' ? this.updateUser() : this.addNewUser();

    }

    /**
     * Adds a new class to the database after it has bee validated.
     */
    addNewUser = () => {
        const { submitDisabled, formErrors, mode, ...userDetail } = this.state;
        userDetail.createdAt = userDetail.updatedAt = Date.now();

        UserService.addNewUser(userDetail).then((res) => {
            this.props.navigation.dispatch(
                NavigationActions.back({
                    key: null
                })
            );

        }).catch((err) => {
            console.log(err);
            alert("An error occurred.");
        });
    }

    /**
     * Updates an existing class in the database.
     */
    updateUser = () => {
        const { submitDisabled, formErrors, mode, ...userDetail } = this.state;
        const userId = this.props.navigation.getParam('userId');
        userDetail.updatedAt = Date.now();
        // console.log(classData);

        UserService.updateUser(userId, userDetail).then((res) => {
            this.props.navigation.getParam('forceUpdateHandler')()
            this.props.navigation.dispatch(
                NavigationActions.back({
                    key: null
                })
            );
        }).catch((err) => {
            console.log(err);
            alert("An error occurred.");
        });

        // alert("Updating " + classId);
    }



    handleEmailInputChanged = (text) => {
        this.setState({
            email: text
        });
    }
    handlePasswordInputChanged = (text) => {
        this.setState({
            password: text
        });
    }
    handleConfirmPasswordInputChanged = (text) => {
        this.setState({
            confirmPassword: text
        });
    }
    handleFirstNameInputChanged = (text) => {
        this.setState(
            {
                firstName: text
            }
        );
    }
    handleLastNameInputChanged = (text) => {
        this.setState(
            {
                lastName: text
            }
        );
    }
    handleSchoolInputChanged = (text) => {
        this.setState(
            {
                school: text
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

                            <View style={[{ alignSelf: 'stretch'}]}>


                                <Text style={[Styles.textBold]}>*Email:</Text>
                                <EmailInput  value={this.state.email}
                                             onChangeText={(text) => this.handleEmailInputChanged(text)}
                                             />

                                <Text style={[Styles.textBold]}>*Password:</Text>
                                <PasswordInput  value={this.state.password}
                                                onChangeText={(text) => this.handlePasswordInputChanged(text)}
                                                />

                                <Text style={[Styles.textBold]}>*Confirm Password:</Text>
                                <ConfirmPasswordInput  value={this.state.inputConfirmPassword}
                                                       onChangeText={(text) => this.handleConfirmPasswordInputChanged(text)}
                                                       />

                                <Text style={[Styles.textBold]}>*First Name:</Text>
                                <FirstNameInput value= {this.state.firstName}
                                                onChangeText={(text) => this.handleFirstNameInputChanged(text)}
                                                />

                                <Text style={[Styles.textBold]}>*Last Name:</Text>
                                <LastNameInput  value= {this.state.lastName}
                                                onChangeText={(text) => this.handleLastNameInputChanged(text)}
                                                />

                                <Text style={[Styles.textBold]}>School:</Text>
                                <SchoolInput  value= {this.state.school}
                                              onChangeText={(text) => this.handleSchoolInputChanged(text)}
                                              />

                            </View>

                            <View style={[Styles.marginTB, { alignSelf: 'center' }]}>
                                {
                                    this.state.isLoading ? (
                                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                                    ) : (null)
                                }
                                <NormalText style={[Styles.textErrorMessage]}>{this.state.errorMessage}</NormalText>


                            </View>

                            <View>
                                <NormalText style = {[Styles.textColorNegative]}>*Require Field</NormalText>
                            </View>


                            <View style={[Styles.centerContentsCrossAxis, Styles.marginT]}>
                                <PrimaryDarkButton disabled={this.state.submitDisabled}
                                                    text='Sign Up!'
                                                   onPress={() => { this.handleSignUpClick() }} />
                            </View>
                        </KeyboardAvoidingView>



                    </View>
                </ScrollView>

            </View>
        );
    }
}