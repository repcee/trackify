import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';
import Splash from './Components/Splash';
import LoggedOutNavigator from './Components/LoggedOut/LoggedOutNavigator';
import StudentNavigator from './Components/Student/StudentNavigator';
import TeacherNavigator from './Components/Professor/ProfessorNavigator';


export default class App extends Component {
  componentWillMount() {
    // Check if user is logged in (with firebase)
    this.setState({
      isLoggedIn: false,
      userType: 1,
      endSplashScreen: false
    });
  }
  
  componentDidMount() {
    setTimeout( () => {
      this.setState({
        endSplashScreen: true
      });
    },1500);
  }
  
  _navigateUser = () => {
    const {isLoggedIn, userType} = this.state;

    // User is a teacher
    if (isLoggedIn && userType == 1) {
      return <Dashboard />
      
    // User is a student
    } else if (isLoggedIn && userType == 2) {
      return <Dashboard />
    }
    
    // User isn't logged in
    return <LoggedOutNavigator />
  }
  
  render() {
    if (!this.state.endSplashScreen) {
      return <Splash />   
    } else {
      return this._navigateUser();
    }
  }
}


