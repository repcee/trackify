import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Styles } from '../../config/AppTheme';

export const PrimaryButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnPrimary, props.style]}
        />
    );
}

export const PrimaryDarkButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnPrimaryDark, props.style]}
        />
    );
}

export const AccentButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnAccent, props.style]}
        />
    );
}

export const PositiveButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnPositive, props.style]}
        />
    );
}

export const WarningButton = (props) => {
    let { buttonStyle,disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnWarning, props.style]}
        />
    );
}

export const NegativeButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnNegative, props.style]}
        />
    );
}

export const BlackButton = (props) => {
    let { buttonStyle, disabledStyle, ...others } = props;
    return (
        <Button {...others} disabledStyle={[Styles.btnDisabled]}
            buttonStyle={[Styles.btn, Styles.btnBlack, props.style]}
        />
    );
}