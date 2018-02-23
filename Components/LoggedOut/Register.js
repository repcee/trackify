
import React, { Component } from 'react';
import { Dimensions, Keyboard, StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableHighlight } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { checkUsername } from '../../services/AccountService';

export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            height: undefined,
            width: undefined,
            account: {
                firstName: undefined,
                lastName: undefined,
                username: undefined,
                password: undefined,
                email: undefined
            },
            usernameExists: false
        };
    }

    componentWillMount() {
        const { width, height } = Dimensions.get('window');
        this.setState({ width, height });
    }

    register = () => {
        Keyboard.dismiss();
        this.props.screenProps.register(this.state.account);
    }

    cancel = () => {
        this.props.navigation.goBack();
    }

    isRegisteredDisabled() {

        const { firstName, lastName, username, password, email } = this.state.account;

        if(!firstName || !lastName || !username || !password || !email || this.state.usernameExists) {
            return true;
        }
        return false;
    }

    enterUsername(username) {
        this.setState({ account: {...this.state.account,  username }});
        username && checkUsername(username).then(res => {
            this.setState({usernameExists: res});
        });
    }

    render() {

        const { height, width } = this.state;

        // return (
        //     <View style={styles.mainContainer}>
        //         <ImageBackground source={require('../../Assets/bg-image.jpeg')} style={styles.backgroundImage}>
        //             <KeyboardAvoidingView width={width - 50} height={height - 120} isVisible={true}>
        //                 <View style={styles.contentContainer}>
        //                     <View style={styles.topContainer}>
        //                         <Text style={[styles.logoText, { fontSize: height / 15 }]}>REGISTER</Text>
        //                     </View>
        //                     <View style={{ marginLeft: 10, marginRight: 10 }}>
        //                         <View flexDirection='row' style={{marginBottom: 5}}>
        //                             <View style={{flex: 7}}>
        //                                 <Input containerStyle={{ borderBottomWidth: 0 }} style={{backgroundColor: '#F5F5F5', flex: 0.5}} underlineColorAndroid='transparent' placeholder='First Name' onChangeText={(firstName) => this.setState({ account: { ...this.state.account, firstName } })} />
        //                             </View>
        //                             <View style={{flex: 1}}/>
        //                             <View style={{flex: 7}}>
        //                                 <Input containerStyle={{ borderBottomWidth: 0 }} style={{backgroundColor: '#F5F5F5', flex: 0.5}} underlineColorAndroid='transparent' placeholder='Last Name' onChangeText={(lastName) => this.setState({ account: { ...this.state.account, lastName } })} />
        //                             </View>
        //                         </View>
        //                         <Input containerStyle={{ borderBottomWidth: 0 }} autoCapitalize='none' style={{marginBottom: 5, flex:1, backgroundColor: '#F5F5F5'}} underlineColorAndroid='transparent' placeholder='Email' keyboardType='email-address' onChangeText={(email) => this.setState({ account: { ...this.state.account, email } })} />
        //                         <Input containerStyle={{ borderBottomWidth: 0 }} autoCapitalize='none' style={{marginBottom: 5, flex:1, backgroundColor: '#F5F5F5'}}  placeholder='Username' onChangeText={(username) => this.enterUsername(username)} />
        //                         {this.state.usernameExists && <Icon name='exclamation-circle' size={30} color='red' />}
        //                         <Input containerStyle={{ borderBottomWidth: 0 }} autoCapitalize='none' style={{marginBottom: 5, flex:1, backgroundColor: '#F5F5F5'}}  placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ account: { ...this.state.account, password } })} />
        //                     </View>
        //                     <Button disabled={this.isRegisteredDisabled()} text='REGISTER' onPress={() => this.register()} buttonStyle={[styles.loginButton, {width: width / 1.5}, this.isRegisteredDisabled() && {opacity: 0.5}]} />
        //                     <Button text='CANCEL' onPress={() => this.cancel()} buttonStyle={[styles.registerButton, { width: width / 1.5 }]} />
        //                 </View>
        //             </KeyboardAvoidingView>
        //         </ImageBackground>
        //     </View>
        // );

        return (
            <View style={styles.mainContainer}>
                <KeyboardAvoidingView width={width - 50} height={height - 50} isVisible={true}>
                    <Icon name='arrow-left' size={20} style={{position: 'absolute', left: 0, top: 10}} onPress={() => this.cancel()} />
                    <View style={styles.contentContainer}>
                        <View style={styles.topContainer}>
                            <Image resizeMode='contain' source={require('../../Assets/trackify-brand.png')} style={{height: 125, width: 150}} />
                            <Text style={{ fontFamily: 'OpenSans-Light', color:'#000000', fontSize: height / 15 }}>Register</Text>
                            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: height / 40 }}>Create a new account</Text>
                        </View>
                        <View style={{ flex: 8, margin: 20 }}>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    style={{textAlign: 'center', flex: 1, borderWidth: 2, borderRadius: 25, borderColor: '#ECECEC'}}
                                    underlineColorAndroid='transparent'
                                    placeholder='Your name'
                                    placeholderTextColor='#000000'
                                    onChangeText={(lastName) => this.setState({ account: { ...this.state.account, lastName } })} />
                            </View>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    autoCapitalize='none'
                                    style={{textAlign: 'center', flex: 1, borderWidth: 2, borderRadius: 25, borderColor: '#ECECEC'}}
                                    underlineColorAndroid='transparent'
                                    placeholder='Email address'
                                    placeholderTextColor='#000000'
                                    keyboardType='email-address'
                                    onChangeText={(email) => this.setState({ account: { ...this.state.account, email } })} />
                            </View>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    autoCapitalize='none'
                                    style={{textAlign: 'center', flex: 1, borderWidth: 2, borderRadius: 25, borderColor: '#ECECEC'}}
                                    placeholder='Enter username'
                                    // placeholderTextColor='#000000'
                                    onChangeText={(username) => this.enterUsername(username)} />
                                {/* {this.state.usernameExists && <Icon name='exclamation-circle' size={30} color='red' />} */}
                            </View>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    autoCapitalize='none'
                                    style={{textAlign: 'center', flex: 1, borderWidth: 2, borderRadius: 25, borderColor: '#ECECEC'}}
                                    placeholder='Password'
                                    // placeholderTextColor='#000000'
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ account: { ...this.state.account, password } })} />
                            </View>
                            
                        </View>
                        <View style={{flex: 2}}>
                                <Button disabled={this.isRegisteredDisabled()} text='CREATE ACCOUNT' onPress={() => this.register()} buttonStyle={[styles.loginButton, {width: width / 2}, this.isRegisteredDisabled() && {opacity: 0.5}]} />
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton: {
        // marginTop: 15,
        backgroundColor: "#5386E4",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
    },
    input: {
        backgroundColor: '#F5F5F5'
    },
    registerButton: {
        // marginTop: 15,
        // marginBottom: 15,
        backgroundColor: "#ED6A5A",
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
    registerText: {
        // fontFamily: 'OpenSans-Regular',
        // fontWeight: 'bold',
        // fontStyle: 'italic',
        color: '#4c4c4c'
    },
    contentContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        // backgroundColor: 'white',
        // borderRadius: 5,
        // borderWidth: 1
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    topContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});