import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class PageWithHeaderandScrollView extends Component {
    render() {
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
                    <View style={[Styles.container, Styles.centerContents]}>
                        <SubHeadingText>Professor settings here.</SubHeadingText>
                    </View>
                </ScrollView>

            </View>
        );
    }
}