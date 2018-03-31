import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Styles, Colors } from '../../config/AppTheme';


export const NormalInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            keyboardType='default' {...others}
            style={[Styles.inputField, props.style]} />
    );
}

export const EmailInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            keyboardType='email-address' autoCapitalize='none' autoCorrect={false} {...others}
            style={[Styles.inputField, props.style]} />
    );
}

export const PasswordInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            keyboardType='default' autoCapitalize='none' autoCorrect={false}
            secureTextEntry={true} visible-password={true} {...others}
            style={[Styles.inputField, props.style]} />
    );
}

export const ConfirmPasswordInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
                   keyboardType='default' autoCapitalize='none' autoCorrect={false}
                   secureTextEntry={true} visible-password={true} {...others}
                   style={[Styles.inputField, props.style]} />
    );
}

export const FirstNameInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
                   keyboardType='default' autoCapitalize='none' autoCorrect={false} {...others}
                   style={[Styles.inputField, props.style]} />
    );
}
export const LastNameInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
                   keyboardType='default' autoCapitalize='none' autoCorrect={false} {...others}
                   style={[Styles.inputField, props.style]} />
    );
}
export const SchoolInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
                   keyboardType='default' autoCapitalize='none' autoCorrect={false} {...others}
                   style={[Styles.inputField, props.style]} />
    );
}

export const NumericInput = (props) => {
    let { style,underlineColorAndroid, ...others } = props;
    return (
        <TextInput underlineColorAndroid={props.underlineColor ? props.underlineColor : Colors.inputUnderlineColor}
            keyboardType='numeric' {...others}
            style={[Styles.inputField, props.style]} />
    );
}