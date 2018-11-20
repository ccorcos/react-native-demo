/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import {
	StyleSheet,
	View,
	Platform,
	Dimensions,
	Keyboard,
	LayoutAnimation,
} from "react-native"
import { WebView } from "react-native-webview"

interface AppProps {}

interface AppState {
	height: number
}

const updateListener =
	Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow"
const resetListener =
	Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide"

const noAnimation = {
	duration: 0,
	// create: {
	// 	type: LayoutAnimation.Types.linear,
	// },
	// update: {
	// 	type: LayoutAnimation.Types.linear,
	// },
	// delete: {
	// 	type: LayoutAnimation.Types.linear,
	// },
}

const sprigAnimation = {
	duration: 500,
	create: {
		duration: 300,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.spring,
		springDamping: 200,
	},
}

const resizeAnimation = sprigAnimation

export default class App extends Component<AppProps, AppState> {
	state = {
		height: Dimensions.get("window").height,
	}

	componentDidMount() {
		Keyboard.addListener(updateListener, this.updateKeyboardSpace)
		Keyboard.addListener(resetListener, this.resetKeyboardSpace)
	}

	componentWillUnmount() {
		Keyboard.removeListener(updateListener, this.updateKeyboardSpace)
		Keyboard.removeListener(resetListener, this.resetKeyboardSpace)
	}

	updateKeyboardSpace = event => {
		LayoutAnimation.configureNext(resizeAnimation)
		this.setState({
			height: event.endCoordinates.screenY,
		})
	}

	resetKeyboardSpace = () => {
		LayoutAnimation.configureNext(resizeAnimation)
		this.setState({ height: Dimensions.get("window").height })
	}

	render() {
		console.log("HEIGHT:", this.state.height)
		return (
			<View style={{ flex: 1 }}>
				<WebView
					style={{
						flex: 1,
						// The web view has a blue border around it.
						// The html body has a red border arounf it.
						borderColor: "blue",
						borderStyle: "solid",
						borderWidth: 4,
						backgroundColor: " blue",
					}}
					automaticallyAdjustContentInsets={false}
					overScrollMode="never"
					bounces={false}
					hideKeyboardAccessoryView={true}
					source={{ uri: "http://localhost:8000/index.html" }}
				/>
				<View
					style={{
						height: Dimensions.get("window").height - this.state.height,
					}}
				/>
			</View>
		)
	}
}
