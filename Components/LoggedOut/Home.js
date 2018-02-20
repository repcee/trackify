import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      height: undefined,
      width: undefined,
      username: undefined,
      password: undefined
    };
  }

  componentWillMount() {
    const {width, height} = Dimensions.get('window');
    this.setState({width, height});
  }

  login = () => {

    const { username, password } = this.state;

    this.props.screenProps.login(username, password);
    // this.props.navigation.navigate('Login');
  }

  register = () => {
    this.props.navigation.navigate('Register');
  }

  isRegisteredDisabled() {

    const { username, password } = this.state;

    if(!username || !password) {
        return true;
    }
    return false;
  }
  
  render() {

    const { height, width } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../Assets/bg-image.jpeg')} style={styles.backgroundImage}>
          <KeyboardAvoidingView width={width-50} height={height-120} isVisible={true}>
            <View style={styles.contentContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.logoText}>Trackify</Text>
              </View>
              <View style={{marginLeft: 25, marginRight: 25}}>
                <Text style={{color:'#FF5E5B', fontWeight:'bold', alignSelf: 'center'}}>{this.props.screenProps.error}</Text>
                <Input placeholder='username' leftIcon={<Icon name='user' size={24} color='#4c4c4c'/>} autoCapitalize='none' onChangeText={(username) => this.setState({ username })} />
                <Input placeholder='password' leftIcon={<Icon name='lock' size={24} color='#4c4c4c'/>} autoCapitalize='none' secureTextEntry={true} onChangeText={(password) => this.setState({ password })} onSubmitEditing={() => this.login()} />
              </View>
              <Button disabled={this.isRegisteredDisabled()} text='LOGIN' onPress={() => this.login()} buttonStyle={[styles.loginButton, { width: width / 1.5 }, this.isRegisteredDisabled() && {opacity: 0.5}]} />
              <Button text='REGISTER' onPress={() => this.register()} buttonStyle={[styles.registerButton, { width: width / 1.5 }]} />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 15,
    backgroundColor: "#5386E4",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100
  },
  registerButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#ED6A5A",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 65,
    color: '#4c4c4c'
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  topContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});