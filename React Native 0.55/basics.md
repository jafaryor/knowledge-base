## Basics
React Native is like React, but it uses __native components__ instead of web components as building blocks.

### Style
With React Native, you don't use a special language or syntax for defining styles. You just style your application using JavaScript. All of the core components accept a prop named `style`. The style names and values usually match how CSS works on the web, except names are written using camel casing, e.g `backgroundColor` rather than `background-color`.

The `style` prop can be a plain old JavaScript object. That's the simplest and what we usually use for example code. You can also pass an array of styles - the last style in the array has precedence, so you can use this to inherit styles.

As a component grows in complexity, it is often cleaner to use `StyleSheet.create` to define several styles in one place. Here's an example:
```javascript
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class LotsOfStyles extends Component {
  render() {
    return (
      <View>
        <Text style={styles.red}>just red</Text>
        <Text style={styles.bigblue}>just bigblue</Text>
        <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
        <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfStyles);
```

### Layout with Flexbox
First and the main difference I should start with — is that __all container elements in React Native are Flex containers by default__.

A component can specify the layout of its children using the flexbox algorithm. Flexbox is designed to provide a consistent layout on different screen sizes.

Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. __The defaults are different__:
* `flexDirection` defaulting to `column` instead of `row`.
* `flex` is a __number__ rather than a __string__.

__aspectRatio__

Aspect ratio control the size of the undefined dimension of a node. Aspect ratio is a non-standard property only available in react native and not `CSS`. [More](http://facebook.github.io/react-native/docs/layout-props.html#aspectratio)

[More about ReactNative Layout](https://medium.com/@drorbiran/the-full-react-native-layout-cheat-sheet-a4147802405c)

### Handling Touches
Users interact with mobile apps mainly through touch. They can use a combination of gestures, such as tapping on a button, scrolling a list, or zooming on a map. React Native provides components to handle all sorts of common gestures, as well as a comprehensive gesture responder system to allow for more advanced gesture recognition, but the one component you will most likely be interested in is the basic Button.

If the basic button doesn't look right for your app, you can build your own button using any of the `Touchable` components provided by React Native. The `Touchable` components provide the capability to capture tapping gestures, and can display feedback when a gesture is recognized. These components do not provide any default styling, however, so you will need to do a bit of work to get them looking nicely in your app.

Which `Touchable` component you use will depend on what kind of feedback you want to provide:
* Generally, you can use `TouchableHighlight` anywhere you would use a button or link on web. The view's background will be darkened when the user presses down on the button.

* You may consider using `TouchableNativeFeedback` on Android to display ink surface reaction ripples that respond to the user's touch.

* `TouchableOpacity` can be used to provide feedback by reducing the opacity of the button, allowing the background to be seen through while the user is pressing down.

* If you need to handle a tap gesture but you don't want any feedback to be displayed, use `TouchableWithoutFeedback`.

In some cases, you may want to detect when a user presses and holds a view for a set amount of time. These long presses can be handled by passing a function to the `onLongPress` props of any of the `Touchable` components.

### Networking
Many mobile apps need to load resources from a remote URL. You may want to make a `POST` request to a `REST API`, or you may simply need to fetch a chunk of static content from another server.

React Native provides the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for your networking needs. Fetch will seem familiar if you have used `XMLHttpRequest` or other networking APIs before.

By default, iOS will block any request that's not encrypted using SSL. If you need to fetch from a cleartext URL (one that begins with `http`) you will first need to add an [App Transport Security exception](http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#test-your-integration). If you know ahead of time what domains you will need access to, it is more secure to add exceptions just for those domains; if the domains are not known until runtime you can [disable ATS completely](http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#app-transport-security). Note however that from January 2017, [Apple's App Store review will require reasonable justification for disabling ATS](https://forums.developer.apple.com/thread/48979). See [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33) for more information.

The [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) is built in to React Native. This means that you can use third party libraries such as [frisbee](https://github.com/niftylettuce/frisbee) or [axios](https://github.com/mzabriskie/axios) that depend on it, or you can use the `XMLHttpRequest API` directly if you prefer.

### WebSocket Support
React Native also supports [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket), a protocol which provides full-duplex communication channels over a single TCP connection.

### More Resources
One common question is how to handle the "state" of your React Native application. The most popular library for this is Redux. Don't be afraid of how often [Redux](http://redux.js.org/) uses the word "reducer" - it's a pretty simple library, and there's also a nice [series of videos explaining it](https://egghead.io/courses/getting-started-with-redux).

__If you're looking for a library that does a specific thing, check out [Awesome React Native](http://www.awesome-react-native.com/), a curated list of components that also has demos, articles, and other stuff.__

### Examples
Try out apps from the [Showcase](http://facebook.github.io/react-native/showcase.html) to see what React Native is capable of! There are also some [example apps on GitHub](https://github.com/ReactNativeNews/React-Native-Apps). You can run the apps on a simulator or device, and you can see the source code for these apps, which is neat.

The folks who built the app for Facebook's F8 conference also [open-sourced the code](https://github.com/fbsamples/f8app) and wrote up a [detailed series of tutorials](http://makeitopen.com/). This is useful if you want a more in-depth example that's more realistic than most sample apps out there.

### Development Tools
* [Nuclide](https://nuclide.io/) is the IDE that Facebook uses internally for JavaScript development. The killer feature of Nuclide is its debugging ability. It also has great inline Flow support. VS Code is another IDE that is popular with JavaScript developers.

* [Ignite](https://github.com/infinitered/ignite) is a starter kit that uses Redux and a few different common UI libraries. It has a CLI to generate apps, components, and containers. If you like all of the individual tech choices, Ignite could be perfect for you.

* [CodePush](https://microsoft.github.io/code-push/) is a service from Microsoft that makes it easy to deploy live updates to your React Native app. If you don't like going through the app store process to deploy little tweaks, and you also don't like setting up your own backend, give CodePush a try.

* [Expo](https://docs.expo.io/) is a development environment plus application that focuses on letting you build React Native apps in the Expo development environment, without ever touching Xcode or Android Studio. If you wish React Native was even more JavaScripty and webby, check out Expo.

* The [React Developer Tools](http://facebook.github.io/react-native/docs/debugging.html#react-developer-tools) are great for debugging React and React Native apps.

### Where React Native People Hang Out
The [forum at discuss.reactjs.org](https://discuss.reactjs.org/) is a great place for discussion about best practices and application architecture as well as the future of React Native.

[Reactiflux](https://discord.gg/0ZcbPKXt5bZjGY5n) is a Discord chat where a lot of React-related discussion happens, including React Native. Discord is just like Slack except it works better for open source projects with a zillion contributors. Check out the #react-native channel.

The [React Twitter account](https://twitter.com/reactjs) covers both React and React Native. Follow the React Native [Twitter account](https://twitter.com/reactnative) and [blog](http://facebook.github.io/react-native/blog/) to find out what's happening in the world of React Native.

There are a lot of [React Native Meetups](http://www.meetup.com/topics/react-native/) that happen around the world. Often there is React Native content in React meetups as well.

Sometimes we have React conferences. We posted the [videos from React.js Conf 2017](https://www.youtube.com/playlist?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0), [React.js Conf 2016](https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), and [React.js Conf 2015](https://www.youtube.com/watch?list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr&v=KVZ-P-ZI6W4). We'll probably have more conferences in the future, too. Stay tuned. You can also find a list of dedicated React Native conferences [here](http://www.awesome-react-native.com/#conferences).