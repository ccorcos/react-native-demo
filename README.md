## React Native WebView Resize Bug

This app shows an html webpage inside a webview that resizes when the keyboard opens.

When you focus on the `<input/>` element, the keyboard will open and wehen you click the `<button/>`, the keyboard will dismiss.

You will notice that when the keyboard dismisses, the resize event is fired early, before the `window.innerHeight` of the webview has changed. However, you'll notice that if we poll every 100ms on the `window.innerHeight`, it does change.

## Running the app

```
git clone https://github.com/ccorcos/react-native-demo.git
npm install
python -m SimpleHTTPServer 8000
npm start
open ios/chetapp.xcodeproj
```