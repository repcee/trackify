import React, { Component } from 'react';
import { KeyboardAvoidingView, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

export default class FirstUse extends Component {

    constructor() {
        super();
        this.state = {
            firstName: undefined,
            lastName: undefined
        };
    }

    componentWillMount() {
        const { width, height } = Dimensions.get('window');
        this.setState({ width, height });
    }

    isLinkDisabled() {

        const { firstName, lastName } = this.state;

        if (!firstName || !lastName) {
            return true;
        }
        return false;
    }

    linkDevice() {
        const deviceId = DeviceInfo.getUniqueID();
        const { firstName, lastName } = this.state;
        this.props.linkDevice(deviceId, firstName, lastName, 'student');
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <KeyboardAvoidingView width={width - 50} height={height - 50} isVisible={true}>
                    <View style={styles.topContainer}>
                        <Image resizeMode='contain' source={require('../Assets/trackify-brand.png')} style={{ height: 125, width: 150 }} />
                        <Text style={{ fontFamily: 'OpenSans-Light', color: '#000000', fontSize: height / 15 }}>Link Device</Text>
                        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: height / 40 }}>Link your device to an account</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            containerStyle={{ borderBottomWidth: 0 }}
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder='Please enter your first name'
                            onChangeText={(firstName) => this.setState({ firstName })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            containerStyle={{ borderBottomWidth: 0 }}
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder='Please enter your last name'
                            onChangeText={(lastName) => this.setState({ lastName })} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Button disabled={this.isLinkDisabled()} text='LINK DEVICE' onPress={() => this.linkDevice()} buttonStyle={[styles.linkButton, { width: width / 2 }, this.isLinkDisabled() && { opacity: 0.5 }]} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    linkButton: {
        backgroundColor: "#5386E4",
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
    topContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        textAlign: 'center',
        flex: 1,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#ECECEC'
    }
});