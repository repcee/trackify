import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';

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
    authStateListenerUnsubscriber = null;
    
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            classes: null
        }

    }

    componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                });

                UserService.getReferenceToUser(user.uid).child('/classesOwned').orderByChild('updatedAt').on('value', (snap) => {
                  
                    this.setState({
                        classes: snap.val() ? Object.values(snap.val()).reverse() : null
                    });
                 
                });
            } else {
                console.log("auth: no user.")
            }
        });
    }

    componentWillUnmount() {
        authStateListenerUnsubscriber();
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
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.classes.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.className}
                                onPress={(e) => { this._handleClassListItemClicked(
                                    {classId:l.classId, className: l.className, indexInProfList: i}, e)}}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText>No classes yet. Click the add button to create one.</NormalText>
            );
        }
    }

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                    </View>

                    <Text style={[Styles.pageTitle]}>Dashboard</Text>

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
                                </View>
                            </View>
                        </View>

                        <View>
                            {this._renderClassesList()}
                        </View>

                        
                    </View>
                </ScrollView>

            </View>
        );
    }
}