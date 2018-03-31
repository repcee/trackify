import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import Settings from './Settings';
import SchoolLocation from './SchoolLocation';
import ClassDetails from './ClassDetails';
import StudentDetails from './StudentDetails';
import ClassAttendance from './ClassAttendance';
import AddEditClass from './AddEditClass';
import { StackNavigator } from 'react-navigation';

const Dashboard = TabNavigator({
		Home: {
			screen: Home,
			navigationOptions: {
				header: null,
				// headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0},
				// headerTitle: 'Home',
				tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} size={24} />
			}
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0 },
				headerTitle: 'Settings',
				tabBarIcon: ({ tintColor }) => <Icon name="cog" color={tintColor} size={24} />
			}
		}
	},
	{
		initialRouteName: 'Home',
		tabBarPosition: 'bottom',
		tabBarOptions: {
			activeTintColor: '#5386E4',
			inactiveTintColor: '#b5b5b5',
			showIcon: 'true',
			labelStyle: {
				fontSize: 10,
			},
			style: {
				backgroundColor: '#fff',
				height: (Platform.OS === 'ios') ? 50 : 60,
			},
			indicatorStyle: {
				backgroundColor: '#5386E4'
			}
		}
	});

	const routeConfigs = {
		Dashboard: {
		  screen: Dashboard,
		  navigationOptions: {
			header: null
		  }
		},
		
		AddEditClass: {
		  screen: AddEditClass,
		  navigationOptions: {
			header: null
		  }
		},

		ClassDetails: {
		  screen: ClassDetails,
		  navigationOptions: {
			header: null
		  }
		},

		ClassAttendance: {
		  screen: ClassAttendance,
		  navigationOptions: {
			header: null
		  }
		},

		StudentDetails: {
		  screen: StudentDetails,
		  navigationOptions: {
			header: null
		  }
		},
		
		SchoolLocation: {
		  screen: SchoolLocation,
		  navigationOptions: {
			header: null
		  }
		}
	  };
	  
	  const navigatorConfigs = {
		  initialRouteName: 'Dashboard'
	  };
	  
	  const ProfessorNavigator = StackNavigator(routeConfigs, navigatorConfigs);
	  
	  export default ProfessorNavigator;
	  
	  