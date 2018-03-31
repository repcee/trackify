import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import Modal from 'react-native-modal';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, NegativeButton, HeadingText, NormalInput, BlackButton } from '../UtilComponents';


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userData: null,

            // edit info inputs
            title: null,
            firstName: null,
            lastName: null,

        }
    }
    
    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                UserService.getUserData(user.uid).then((data) => {
                    console.log(data);
                    this.setState({
                        isLoading: false,
                        userData: data
                    });

                }).catch(err => {
                    alert("An error occurred.");
                });
            } else {
                console.log("auth: no user.")
            }
        });
    }

    _handleSiginOutClicked = () => {
        AuthService.signOutCurrentUser().then(mess => {
        }).catch(err => {
            alert("An error occurred.")
        });
    }

    _handleFirstNameInputChanged = (text) => {
        this.setState({
            firstName: text
        });
    }

    _handleLastNameInputChanged = (text) => {
        this.setState({
            lastName: text
        });
    }

    _handletTitleInputChanged = (text) => {
        this.setState({
            title: text
        });
    }

    _handleEditInfoClicked = () => {
        this.setState({
            showEditInfoModal: true,
            firstName: this.state.userData.firstName,
            lastName: this.state.userData.lastName,
            title: this.state.userData.title
        })
    }

    _handleCancelUpdateClicked = () => {
        this.setState({
            showEditInfoModal: false,
            firstName: null,
            lastName: null,
            title: null
        })
    }

     /**
     * Helper method to valid some of the form inputs.
     */
    _isValidInput = (inputText) => {
        return inputText != null && inputText.trim().length > 0;
    }

     /**
     * Validates the data that the user has entered into the form before the data is submitted.
     */
    _isFormDataValid = () => {
        const inputs = ['firstName', 'lastName'];        

        let validInputs = 0;

        for(input of inputs) {
            if (this._isValidInput(this.state[input])) {
                validInputs++;
            }
        }

        return validInputs == inputs.length;
    }


    _handleSubmitUpdateClicked = () => {
        this.setState({
            submitDisabled: true,
        });

        if (!this._isFormDataValid()) {
            alert("First and last names are required.");
        } else {
            let data = Object.assign(this.state.userData);
            data.firstName = this.state.firstName;
            data.lastName = this.state.lastName;
            data.title = this.state.title;

            UserService.updateUser(data.userId, data).then(res =>{
                this.setState({
                    submitDisabled: false,
                    showEditInfoModal: false
                });

            }).catch(err => {
                console.log(err);
                alert("An error occurred.");
                this.setState({
                    submitDisabled: false
                });
            });
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.navbar]}>

                        <View style={[Styles.navbarLeft]}>
                        </View>

                        <Text style={[Styles.pageTitle]}>Settings</Text>

                        <View style={Styles.navbarRight}>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[Styles.container]}>
                            <HeadingText>Account information</HeadingText>
                            <View style={[Styles.marginBLarge]}>
                                <NormalText style={[Styles.textBold]}>Title: {this.state.userData.title}</NormalText>
                                <NormalText style={[Styles.textBold]}>First Name: {this.state.userData.firstName}</NormalText>
                                <NormalText style={[Styles.textBold]}>Last Name: {this.state.userData.lastName}</NormalText>
                            </View>

                            <View style={[Styles.centerContents]}>
                                <AccentButton text="Edit account information" onPress={() => { this._handleEditInfoClicked() }} />
                            </View>

                            <View style={[{ marginTop: 100 }]}>
                                <HeadingText>Account Session</HeadingText>
                                <View style={[Styles.centerContents]}>
                                    <NegativeButton text="Sign Out" onPress={() => { this._handleSiginOutClicked() }} />
                                </View>
                            </View>

                            
                        </View>
                    </ScrollView>


                    <Modal isVisible={this.state.showEditInfoModal} style={Styles.bottomModal} avoidKeyboard={true}>
                        <View style={Styles.modalContent}>
                                <HeadingText>Edit your account information</HeadingText>

                                <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                                    <NormalInput placeholder="Title (optional)" disabled={this.state.submitDisabled}
                                        value={this.state.title} style={{ flex: 1 }}
                                        onChangeText={(text) => this._handletTitleInputChanged(text)} />
                                </View>

                                <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                                    <NormalInput placeholder="First Name" disabled={this.state.submitDisabled}
                                        value={this.state.firstName} style={{ flex: 1 }}
                                        onChangeText={(text) => this._handleFirstNameInputChanged(text)} />
                                </View>

                                <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                                    <NormalInput placeholder="Last Name" disabled={this.state.submitDisabled}
                                        value={this.state.lastName} style={{ flex: 1 }}
                                        onChangeText={(text) => this._handleLastNameInputChanged(text)} />
                                </View>


                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, Styles.marginT]}>
                                    <View style={[{ flex: 1 }]}>
                                        <BlackButton style={[Styles.btnSmall]} disabled={this.state.submitDisabled}
                                            text="Cancel" onPress={() => { this._handleCancelUpdateClicked() }} />
                                    </View>
                                    <View style={[{ flex: 1 }]}>
                                        <PrimaryDarkButton disabled={this.state.submitDisabled}
                                            style={[Styles.btnSmall]} text="Update" onPress={() => { this._handleSubmitUpdateClicked() }} />
                                    </View>
                                </View>
                        </View>
                    </Modal>

                </View>
            );
        } else {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.container, Styles.centerContents]}>
                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                    </View>

                </View>
            );
        }
    }
}