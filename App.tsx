/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import {
	Platform,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Keyboard,
	LayoutAnimation,
	Dimensions,
	WebViewProperties,
} from "react-native"
import { WebView } from "react-native-webview"
import KeyboardSpacer from "react-native-keyboard-spacer"

const instructions = Platform.select({
	ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
	android:
		"Double tap R on your keyboard to reload,\n" +
		"Shake or press menu button for dev menu",
})

interface AppProps {}

interface AppState {}

const injectScript = `
const event = new Event("deviceready")
document.dispatchEvent(event)
`

// https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#automaticallyadjustcontentinsets

export default class App extends Component<AppProps, AppState> {
	webview = React.createRef<WebView>()

	onMessage = (e: any) => {
		console.log("onMessage", e.nativeEvent.data)
		if (this.webview.current) {
			const webview = this.webview.current as any
			console.log("postMessage", "pong")
			webview.postMessage("pong")
		}
	}

	render() {
		return (
			<View style={styles.view}>
				<WebView
					ref={this.webview}
					automaticallyAdjustContentInsets={false}
					overScrollMode="never"
					bounces={false}
					hideKeyboardAccessoryView={true}
					// contentInset={{top: 10, left: 0, right: 0, bottom: 10}}
					// allowsBackForwardNavigationGestures={true}
					style={styles.webview}
					source={{ uri: "http://localhost:3000/" }}
					injectedJavaScript={injectScript}
					userAgent={
						"Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B91 Cordova"
					}
					onMessage={this.onMessage}
				/>
				<KeyboardSpacer />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: "white",
	},
	webview: {
		flex: 1,
	},
})
