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
                                    classes.map((l, i) => (
                                        <ListItem
                                            roundAvatar
                                            key={i}
                                            title={l.name}
                                            onPress={() => { alert(l.name) }}
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