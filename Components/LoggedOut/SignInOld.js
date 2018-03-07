import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import {Styles} from '../../config/AppTheme';


export default class SignUpOld extends Component {
    // Will hold reference to unregister authStateChangeListener.
    // To be assigned in componentWillMount and invoked in componentWillUnmount.
    authStateListenerUnsubscriber = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            currentUser: null
        };

        this.debugAuth();
      
        // UserService.getUserData('H7UJa1NNGzTQho6fpisqgQeWhND2').then((u)=>{
        //     console.log(u);
        // }).catch((err)=>{
        //     console.log("err", err);
        // });

    }

    _s = (us) => {
        if(us) {
            this.setState({
                currentUser: us.uid
            });
        } else {
            alert("Goodbye. You signed out.");
        }
    }

    debugAuth = () => {
        cha = AuthService.notifyOnAuthStateChanged((uu) => {this._s(uu)});

        // au.signInUser("test.teacher@test.com", "testteacher")
        // .then((message) => {
        //     console.log(message);
        //     au.signOutCurrentUser();
        // })
        // .catch((err) => {
        //     console.log("Yo sign in: ", err);
        // });        
  
    }

    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((uu) => {this._s(uu)});
    }

 
    componentWillUnmount() {
        authStateListenerUnsubscriber();
    }

    _loadSignUp = () => {
        this.props.navigation.navigate("SignUpScreen");

    }

    // TODO: remove
    _loginDemoTeacher = () => {
        // console.log("Logging in...");
        AuthService.signInUser("test.teacher@test.com", "testteacher")
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <View style={[Styles.container, { backgroundColor: 'yellow' }]}>
                <Text style={[Styles.textHeading]}>SignIn Page....</Text>
                <Button onPress={() => { this._loadSignUp() }} text="Go to Sign Up >>" buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 45
                }} />

                <View style={[{marginTop: 100}]}>
                    <Button text="[Login as Demo Teacher]" buttonStyle={[[Styles.btn, Styles.btnPrimary]]} onPress={() => this._loginDemoTeacher()}/>
                </View>

                <Text style={Styles.textSubHeading}>Current userId: {this.state.currentUser}</Text>

             

            </View>
        );
    }
}