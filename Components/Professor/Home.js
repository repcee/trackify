import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton, HeadingText } from '../UtilComponents';

styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
  });

export default class Home extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            user: null,
            classes: null
        }

    }

    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
            if (user) {
                UserService.getReferenceToUser(user.uid).child('/classesOwned').orderByChild('updatedAt').on('value', (snap) => {
                  
                    this.setState({
                        classes: snap.val() ? Object.values(snap.val()).reverse() : null,
                        isLoading: false,
                        user: user

                    });
                 
                });
            } else {
                console.log("auth: no user.")
            }
        });
    }

    _handleAddClassClick = () => {
        this.props.navigation.navigate('AddEditClass');
    }

    _handleClassListItemClicked = (classData) => {
        this.props.navigation.navigate('ClassDetails', {classData: classData});
    }

    _handleSignOutClick = async () => {
        alert("Signing out...");
        AuthService.signOutCurrentUser();

    }
    _renderClassesList = () => {
        if (this.state.classes) {
            return (
                <List containerStyle={[Styles.marginNone, Styles.listMarginPaddingFix, {paddingLeft: 20, paddingRight: 20}]}>
                    {
                        this.state.classes.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.className}
                                titleStyle={[Styles.textRegular, Styles.textBold]}
                                subtitleStyle={[Styles.textRegualrFontOnly]}
                                onPress={(e) => {
                                    this._handleClassListItemClicked(
                                        { classId: l.classId, className: l.className, indexInProfList: i }, e)
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText style={[Styles.textBold]}>No classes yet. Click the add button to create one.</NormalText>
            );
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.navbar]}>

                        <View style={[Styles.navbarLeft]}>
                        </View>

                        <Text style={[Styles.pageTitle]}>Dashboard</Text>

<<<<<<< HEAD
                        <View style={Styles.navbarRight}>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[Styles.container]}>

                            <View>
                                <View style={[{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <HeadingText>Your Classes</HeadingText>
                                    </View>
                                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                        <Icon
                                            raised
                                            reverse
                                            name='plus'
                                            type='font-awesome'
                                            color={Colors.black}
                                            onPress={() => this._handleAddClassClick()} />
                                    </View>
=======
                    <View style={[Styles.navbarRight]}>
                        <Icon name="sign-out" type="font-awesome"
                              color={Colors.headerTextIcons}
                              onPress={() => { this._handleSignOutClick() }} />
                    </View>
                </View>
                <ScrollView>
                    <View style={[Styles.container]}>
                        
                        <View>
                            <View style={[{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                <View style={[{ flex: 1 }]}>
                                    <SubHeadingText>Your Classes</SubHeadingText>
                                </View>
                                <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                    <Icon
                                        raised
                                        reverse
                                        name='plus'
                                        type='font-awesome'
                                        color={Colors.black}
                                        onPress={() => this._handleSignOutClick()} />
>>>>>>> 2e65b710a18f332da39f591494935ea9489585bd
                                </View>
                            </View>

                            <View>
                                {this._renderClassesList()}
                            </View>


                        </View>
                    </ScrollView>

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