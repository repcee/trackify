import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';


export default class LinkStudentToClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classId: this.props.navigation.getParam('classId'),
            className: this.props.navigation.getParam('className'),
            unlinkedIndex: this.props.navigation.getParam('unlinkedIndex'),
            studentName: this.props.navigation.getParam('studentName')
        };
    }
    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} />
                    </View>

                    <Text style={[Styles.pageTitle]}>Link Student</Text>

                    <View style={Styles.navbarRight}>
                       
                    </View>
                </View>
                <ScrollView>
                    <View style={[Styles.container]}>
                        <NormalText>Linking {this.state.studentName} to {this.state.className}</NormalText>
                    </View>
                </ScrollView>

            </View>
        );
    }
}