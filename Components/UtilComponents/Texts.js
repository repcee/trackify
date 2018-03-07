import React, { Component } from 'react';
import { Text } from 'react-native';
import { Styles } from '../../config/AppTheme';

export const NormalText = (props) => {
    return (
        <Text style={[Styles.textRegular, props.style]}
            onPress={() => { props.onPress ? props.onPress() : undefined }}>
            {props.children}
        </Text>
    );
}

export const HeadingText = (props) => {
    return (
        <Text style={[Styles.textHeading, props.style]}
            onPress={() => { props.onPress ? props.onPress() : undefined }}>
            {props.children}
        </Text>

    );
}

export const SubHeadingText = (props) => {
    return (
        <Text style={[Styles.textSubHeading, props.style]}
            onPress={() => { props.onPress ? props.onPress() : undefined }}>
            {props.children}
        </Text>
    );
}