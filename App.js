import React, { Component } from 'react';
// import { Platform } from 'react-native';
import AuthService from './Services/AuthService';
import UserService from './Services/UserService';
import { LoggedOutNavigator } from './Components/LoggedOut/LoggedOutNavigator';
import { MainLoggedInNavigator } from './Components/LoggedIn/MainLoggedInNavigator';

export default class App extends Component {

  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      user: {
        name: '',
        email: '',
        username: '',
        userId: ''
      },
      error: ''
    }
  }

  login = (username, password) => {
    // TODO: Remove hardcoded username and password
    // username = 'jay';
    // password = 'password';
    this.setState({ isLoading: true });
    UserService.getUserInfoFromUsername(username)
      .then(userInfo => this.setState({ user: { ...this.state.user, ...userInfo } }))
      .catch(err => this.setState({ isLoading: false, error: err }));
    AuthService.getEmail(username)
      .then(email => AuthService.authLogin(email, password)
        .then(res => this.setState({ isLoading: false, isLoggedIn: true })))
      .catch(err => this.setState({ isLoading: false, error: err.toString().replace('Error: ', '') }))
      .catch(err => this.setState({ isLoading: false, error: err }));
  }

  register = (userInfo) => {
    AuthService.register(userInfo.email, userInfo.password)
      .then(res => {
        AuthService.updateUser(res.uid, userInfo);
        this.login(userInfo.username, userInfo.password);
      })
      .catch(err => this.setState({ error: err.toString().replace('Error: ', '') }));
  }

  logout = () => {
    // TODO: Logout of firebase
    this.setState({
      ...this.state,
      isLoggedIn: false,
      user: {
        name: '',
        email: '',
        username: '',
        userId: ''
      },
    });
  }

  render() {
    return (
      this.state.isLoggedIn ?
        <MainLoggedInNavigator screenProps={
          {
            logout: () => this.logout(),
            account: this.state.account,
          }} />
        :
        <LoggedOutNavigator screenProps={
          {
            login: (username, password) => this.login(username, password),
            register: (account) => this.register(account),
            isLoading: this.state.isLoading,
            error: this.state.error
          }} />
    );
  }
}