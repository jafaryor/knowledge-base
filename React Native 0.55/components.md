## Components and APIs
React Native provides a number of built-in components. You will find a full list of components and APIs on the sidebar to the left. If you're not sure where to get started, take a look at the following categories:
* __Basic Components__

    * `View` - the most fundamental component for building a UI.
    * `Text` - a component for displaying text.
    * `Image` - a component for displaying images.
    * `TextInput` - a component for inputting text into the app via a keyboard.
    * `ScrollView` - provides a scrolling container that can host multiple components and views.
    * `StyleSheet` - provides an abstraction layer similar to CSS stylesheets.

* __User Interface__

    * `Button` - a basic button component for handling touches that should render nicely on any platform.
    * `Picker` - renders the native picker component on `iOS` and `Android`.
    * `Slider` - a component used to select a single value from a range of values.
    * `Switch` - renders a boolean input.

* __List Views__

    * `FlatList` - a component for rendering performant scrollable lists.
    * `SectionList` - like `FlatList`, but for sectioned lists.

* __iOS-specific__

    * `ActionSheetIOS` - API to display an iOS action sheet or share sheet.
    * `AlertIOS` - Create an iOS alert dialog with a message or create a prompt for user input.
    * `DatePickerIOS` - Renders a date/time picker (selector) on iOS.
    * `ImagePickerIOS` - Renders a image picker on iOS.
    * `NavigatorIOS` - A wrapper around `UINavigationController`, enabling you to implement a navigation stack.
    * `ProgressViewIOS` - Renders a `UIProgressView` on iOS.
    * `PushNotificationIOS` - Handle push notifications for your app, including permission handling and icon badge number.
    * `SegmentedControlIOS` - Renders a `UISegmentedControl` on iOS.
    * `TabBarIOS` - Renders a `UITabViewController` on iOS. Use with `TabBarIOS.Item`.

* __Android-specific__

    * `BackHandler` - Detect hardware button presses for back navigation.
    * `DatePickerAndroid` - Opens the standard Android date picker dialog.
    * `DrawerLayoutAndroid` - Renders a `DrawerLayout` on Android.
    * `PermissionsAndroid` - Provides access to the permissions model introduced in Android M.
    * `ProgressBarAndroid` - Renders a `ProgressBar` on Android.
    * `TimePickerAndroid` - Opens the standard Android time picker dialog.
    * `ToastAndroid` - Create an Android Toast alert.
    * `ToolbarAndroid` - Renders a Toolbar on Android.
    * `ViewPagerAndroid` - Container that allows to flip left and right between child views.

* __Others__

    * `ActivityIndicator` - Displays a circular loading indicator.
    * `Alert` - Launches an alert dialog with the specified title and message.
    * `Animated` - A library for creating fluid, powerful animations that are easy to build and maintain.
    * `CameraRoll` - Provides access to the local camera roll / gallery.
    * `Clipboard` - Provides an interface for setting and getting content from the clipboard on both iOS and Android.
    * `Dimensions` - Provides an interface for getting device dimensions.
    * `KeyboardAvoidingView` - Provides a view that moves out of the way of the virtual keyboard automatically.
    * `Linking` - Provides a general interface to interact with both incoming and outgoing app links.
    * `Modal` - Provides a simple way to present content above an enclosing view.
    * `PixelRatio` - Provides access to the device pixel density.
    * `RefreshControl` - This component is used inside a `ScrollView` to add pull to refresh functionality.
    * `StatusBar` - Component to control the app status bar.
    * `WebView` - A component that renders web content in a native view.