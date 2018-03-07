import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class BasicNoHeaderScrollView extends Component {
    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <ScrollView>
                    <View style={[Styles.container, Styles.centerContents]}>
                        <SubHeadingText>Template: No Header with ScrollView</SubHeadingText>
                    </View>
                </ScrollView>

            </View>
        );
    }
}