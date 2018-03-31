import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, HeadingText, PrimaryDarkButton, NegativeButton, SubHeadingText } from '../UtilComponents';


export default class PageWithHeaderandScrollView extends Component {
    constructor(props) {
        super(props);
    }

    _handleSiginOutClicked = () => {
        AuthService.signOutCurrentUser().then(mess => {
        }).catch(err => {
            alert("An error occurred.")
        });
    }

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
                    <View style={[Styles.container]}>

                        <View>
                            <HeadingText>Account Session</HeadingText>
                            <View style={[Styles.centerContents]}>
                                <NegativeButton text="Sign Out" onPress={() => { this._handleSiginOutClicked() }} />
                            </View>
                        </View>

                        <View style={[Styles.marginT]}>
                            <SubHeadingText>FAQs</SubHeadingText>

                            <View style={[Styles.marginB]}>
                                <NormalText style={[Styles.textBold]}>Q: How do I unregister from a class?</NormalText>
                                <NormalText>A: Students aren't allowed to unregister themselves from classes. Only teachers/professors can unregister students.</NormalText>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}