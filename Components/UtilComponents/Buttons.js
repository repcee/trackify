import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Styles } from '../../config/AppTheme';

export const PrimaryButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnPrimary, props.style]}
        />
    );
}

export const PrimaryDarkButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnPrimaryDark, props.style]}
        />
    );
}

export const AccentButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnAccent, props.style]}
        />
    );
}

export const PositiveButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnPositive, props.style]}
        />
    );
}

export const WarningButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnWarning, props.style]}
        />
    );
}

export const NegativeButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnNegative, props.style]}
        />
    );
}

export const BlackButton = (props) => {
    return (
        <Button
            text={props.text}
            onPress={() => {props.onPress ? props.onPress(): undefined}}
            buttonStyle={[Styles.btn, Styles.btnBlack, props.style]}
        />
    );
}