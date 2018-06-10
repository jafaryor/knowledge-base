## Direct Manipulation
It is sometimes necessary to make changes directly to a component without using state/props to trigger a re-render of the entire subtree. When using React in the browser for example, you sometimes need to directly modify a DOM node, and the same is true for views in mobile apps. `setNativeProps` is the React Native equivalent to setting properties directly on a DOM node.

Use `setNativeProps` when frequent re-rendering creates a performance bottleneck

Direct manipulation will not be a tool that you reach for frequently; you will typically only be using it for creating continuous animations to avoid the overhead of rendering the component hierarchy and reconciling many views. `setNativeProps` is imperative and stores state in the native layer (DOM, UIView, etc.) and not within your React components, which makes your code more difficult to reason about. Before you use it, try to solve your problem with `setState` and `shouldComponentUpdate`.

### Composite components and `setNativeProps`
Composite components are not backed by a native view, so you cannot call `setNativeProps` on them.

### Avoiding conflicts with the render function
If you update a property that is also managed by the render function, you might end up with some unpredictable and confusing bugs because anytime the component re-renders and that property changes, whatever value was previously set from `setNativeProps` will be completely ignored and overridden.

### `setNativeProps` & `shouldComponentUpdate`
By intelligently applying `shouldComponentUpdate` you can avoid the unnecessary overhead involved in reconciling unchanged component subtrees, to the point where it may be performant enough to use setState instead of `setNativeProps`.

### Other native methods
The methods described here are available on most of the default components provided by React Native. Note, however, that they are not available on composite components that aren't directly backed by a native view. This will generally include most components that you define in your own app.
* `measure(callback)`

    Determines the location on screen, width, and height of the given view and returns the values via an async `callback`. If successful, the callback will be called with the following arguments:
    
    `{ x, y, width, height, pageX, pageY }`
    
    Note that these measurements are not available until after the rendering has been completed in native. If you need the measurements as soon as possible, consider using the [onLayout prop](http://facebook.github.io/react-native/docs/view.html#onlayout) instead.

* `measureInWindow(callback)`

    Determines the location of the given view in the window and returns the values via an async callback. If the React root view is embedded in another native view, this will give you the absolute coordinates. If successful, the `callback` will be called with the following arguments:
    
    `{ x, y, width, height }`

* `measureLayout(relativeToNativeNode, onSuccess, onFail)`

    Like `measure()`, but measures the view relative an ancestor, specified as `relativeToNativeNode`. This means that the returned `x`, `y` are relative to the origin `x`, `y` of the ancestor view.

    As always, to obtain a native node handle for a component, you can use `ReactNative.findNodeHandle(component)`.

* `focus()`
    Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.

* `blur()`
    Removes focus from an input or view. This is the opposite of `focus()`.

### Useful techniques:

* __[`setNativeProps` with `TouchableOpacity`](http://facebook.github.io/react-native/docs/direct-manipulation.html#setnativeprops-with-touchableopacity)__

* __[`setNativeProps` to clear `TextInput` value](http://facebook.github.io/react-native/docs/direct-manipulation.html#setnativeprops-to-clear-textinput-value)__