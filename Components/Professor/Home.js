import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';

const classes = [
    {
        name: "Math Modes For CS"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
    {
        name: "English Composition II"
    },
];

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
            classes: []
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
                        classes: Object.values(snap.val())
                    });
                 
                });
                // UserService.getUserData(user.uid).then((snap) => {
                //     console.log(snap.classesOwned);
                // }).catch((err) => {
                //     alert("An error occurred while fetching your classes.");
                // });
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

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                    </View>

                    <Text style={[Styles.pageTitle]}>Dashboard</Text>

                    <View style={Styles.navbarRight}>
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
                                        onPress={() => this._handleAddClassClick()} />
                                </View>
                            </View>
                        </View>

                        <View>
                            <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                                {
                                    this.state.classes.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            title={l.className}
                                            onPress={() => { alert(l.className) }}
                                        />
                                    ))
                                }
                            </List>
                        </View>

                        
                    </View>
                </ScrollView>

            </View>
        );
    }
}