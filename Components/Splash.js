import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import UserService from '../Services/UserService';
import AuthService from '../Services/AuthService';


import { Styles, Colors} from '../config/AppTheme';


export default class Splash extends Component {
	
	/**
	 * Checks for an authenticated user.
	 */
	componentWillMount() {
        authStateListenerUnsubscriber = AuthService.notifyOnAuthStateChanged((user) => {
			// If we have a firebase user and the user is not an anonymous user,
			// then the user is a professor.
            if (user && !user.isAnonymous) {
				console.log("You are a professor.");
				this.props.navigation.navigate('ProfessorNavigator');
			
			// If we have a firebase user and the user IS an anonymous user,
			// then the user is a student.
			} else if (user && user.isAnonymous) { 
				// this.props.navigation.navigate('StudentNavigator');
				console.log("You are a student.");
				this.props.navigation.navigate('StudentNavigator');
			}
			else {
				console.log("No user detected.");
				this.props.navigation.navigate('LoggedOutNavigator');
            }
        });
    }


	render() {
		return (
			<View style={[Styles.mainContainer, Styles.centerContents, { backgroundColor: Colors.primaryDark}]}>
				<View style={[Styles.marginB]}>
					<Image source={require('../Assets/trackify-logo.png')} style={{ height: 200, width: 200 }} />
				</View>

				<View>
					<Text style={[Styles.textHeading, Styles.textColorBlack]}>Please wait...</Text>
					<ActivityIndicator size="large" color="white" />
				</View>

			</View>
		);
	}
}