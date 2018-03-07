import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import Utils from '../../config/Utils';

import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, EmailInput, PasswordInput } from '../UtilComponents';



import { Styles, Colors, Defaults } from '../../config/AppTheme';


export default class KeyboardAvoiding extends Component {

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} />
                    </View>

                    <Text style={[Styles.pageTitle]}>Page Title</Text>

                    <View style={Styles.navbarRight}>
                        <Icon name="asterisk" type="font-awesome"
                            color={Colors.headerTextIcons} />
                    </View>
                </View>

                <ScrollView>
                    <View style={[Styles.container, Styles.centerContentsCrossAxis, { alignItems: 'stretch' }]}>

                        <KeyboardAvoidingView behavior='padding'>
                            <NormalText>Keyboard avoiding view.</NormalText>
                        </KeyboardAvoidingView>



                        <View style={[Styles.centerContentsCrossAxis]}>
                            <NormalText>More Stuff here.</NormalText>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}