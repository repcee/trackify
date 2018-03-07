import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Styles, Colors } from '../../config/AppTheme';


export const NormalInput = (props) => {
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            placeholder={props.placeholder ? props.placeholder : undefined} 
            keyboardType='default'
            value={props.value}
            onChangeText={(text) => { props.onChangeText ? props.onChangeText(text) : undefined }}
            style={[Styles.inputField, props.style]} />
    );
}

export const EmailInput = (props) => {
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            placeholder={props.placeholder ? props.placeholder : undefined} 
            value={props.value}
            keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
            onChangeText={(text) => { props.onChangeText ? props.onChangeText(text) : undefined }}
            style={[Styles.inputField, props.style]} />
    );
}

export const PasswordInput = (props) => {
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            placeholder={props.placeholder ? props.placeholder : undefined} 
            keyboardType='default' autoCapitalize='none' autoCorrect={false}
            value={props.value}
            secureTextEntry={true} visible-password={true}
            onChangeText={(text) => { props.onChangeText ? props.onChangeText(text) : undefined }}
            style={[Styles.inputField, props.style]} />
    );
}

export const NumericInput = (props) => {
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            placeholder={props.placeholder ? props.placeholder : undefined}
            keyboardType='numeric'
            value={props.value}
            onChangeText={(text) => { props.onChangeText ? props.onChangeText(text) : undefined }}
            style={[Styles.inputField, props.style]} />
    );
}