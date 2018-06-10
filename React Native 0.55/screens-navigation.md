## Navigating Between Screens
It provides the greatest amount of configurability as well as flexibility when integrating with state management libraries such as `redux`.

If you'd like to achieve a native look and feel on both `iOS` and `Android`, or you're integrating React Native into an app that already manages navigation natively, the following libraries provide native navigation on both platforms: [native-navigation](http://airbnb.io/native-navigation/), [react-native-navigation](https://github.com/wix/react-native-navigation).

The community solution to navigation is a standalone library that allows developers to set up the screens of an app with just a few lines of code.

The first step is to install in your project:
```
npm install --save react-navigation
```
Then you can quickly create an app with a home screen and a profile screen:
```javascript
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});
```

Each screen component can set navigation options such as the header title. It can use action creators on the `navigation` prop to link to other screens:
```javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
}
```

React Navigation routers make it easy to override navigation logic or integrate it into redux. Because routers can be nested inside each other, developers can override navigation logic for one area of the app without making widespread changes.

The views in React Navigation use native components and the `Animated` library to deliver 60fps animations that are run on the native thread. Plus, the animations and gestures can be easily customized.

For a complete intro to React Navigation, follow the [React Navigation Getting Started Guide](https://reactnavigation.org/docs/getting-started.html), or browse other docs such as the [Intro to Navigators](https://expo.io/@react-navigation/NavigationPlayground).

### NavigatorIOS
If you're only targeting `iOS`, you may want to also check out `NavigatorIOS` as a way of providing a native look and feel with minimal configuration, as it provides a wrapper around the native `UINavigationController` class.

[NavigatorIOS API](http://facebook.github.io/react-native/docs/navigatorios.html)