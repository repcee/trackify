import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class Pulse extends React.Component {
	constructor(props) {
		super(props);
	
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: 1500,
			easing: Easing.in,
		})
		.start();
	}

	render() {
		const { size, pulseMaxSize, borderColor, backgroundColor } = this.props;

		return (
			<View style={[styles.circleWrapper, {
				width: 300,
				height: 300,
				marginLeft: -300/2,
				marginTop: -300/2,
			}]}>
				<Animated.View
					style={[styles.circle, {
						borderColor: 'rgba(234, 98, 121, 0.85)',
						backgroundColor: 'rgba(243, 165, 179, 0.9)',
						width: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 300]
						}),
						height: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 300]
						}),
						borderRadius: 300/2,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0]
						})
					}]}
				/>
			</View>
		);
	}	
}


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: width/2,
		top: (height/2) - (height/9),
		zIndex: -1
	},
	circle: {
		borderWidth: 4 * StyleSheet.hairlineWidth,
	},
});