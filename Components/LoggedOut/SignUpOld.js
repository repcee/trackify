import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

import {AuthService} from '../../Services/AuthService';

import {Styles} from '../../config/AppTheme';


export default class SignUpOld extends Component {

    constructor(props) {
        super(props);
    }

   

    _loadSignIn = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
       

    }

    render() {
        return (
            <View style={[Styles.container, { backgroundColor: 'red' }]}>
                <Text style={[Styles.textHeading]}>Signup Screen...</Text>
                <Button onPress={() => { this._loadSignIn() }} text="<< Sign In" buttonStyle={{
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