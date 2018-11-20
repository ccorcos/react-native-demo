import React, { Component } from "react"
import { WebView } from "react-native-webview"

interface AppProps {}

interface AppState {}

export default class App extends Component<AppProps, AppState> {
	render() {
		return (
			<WebView
				style={{ flex: 1 }}
				automaticallyAdjustContentInsets={false}
				overScrollMode="never"
				bounces={false}
				hideKeyboardAccessoryView={true}
				source={{ uri: "http://localhost:8000/index.html" }}
			/>
		)
	}
}
