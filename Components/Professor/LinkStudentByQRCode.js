import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class LinkStudentByQRCode extends Component {
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
                            color={Colors.headerTextIcons}/>
                    </View>
                </View>
                <ScrollView>
                    <View style={[Styles.container, Styles.centerContents]}>
                        <SubHeadingText>Template: Page with header and ScrollView</SubHeadingText>
                    </View>
                </ScrollView>

            </View>
        );
    }
}