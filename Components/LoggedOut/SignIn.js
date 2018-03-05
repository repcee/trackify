import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import {Styles} from '../../config/AppTheme';


export default class SignUp extends Component {

    _loadSignUp = () => {
        this.props.navigation.navigate("SignUpScreen");

    }

    render() {
        return (
            <View style={[Styles.container, { backgroundColor: 'yellow' }]}>
                <Text style={[Styles.textHeading]}>SignIn Page....</Text>
                <Button onPress={() => { this._loadSignUp() }} text="Go to Sign Up" buttonStyle={{
                    backgroundColor: "rgba(92, 99,216, 1)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }} />

            </View>
        );
    }
}