## React.Component
`React.Component` is an abstract base class, so it rarely makes sense to refer to `React.Component` directly. Instead, you will typically subclass it, and define at least a `render()` method.

### The Component Lifecycle
Each component has several “lifecycle methods” that you can override to run code at particular times in the process. Methods prefixed with `will` are called right before something happens, and methods prefixed with `did` are called right after something happens.

![ReactJS LyfeCycle Methods](./images/react-lifecycle.png)

* __Mounting__

    These methods are called when an instance of a component is being created and inserted into the DOM:
    * `constructor(props)`

        You should call `super(props)` before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs.

        Avoid introducing any side-effects or subscriptions in the constructor. For those use cases, use `componentDidMount()` instead.

    * `static getDerivedStateFromProps(nextProps, prevState)`

        is invoked after a component is instantiated as well as when it receives new `props`.

        It should return an object to update state, or `null` to indicate that the new `props` do not require any state updates.

        Note that if a parent component causes your component to re-render, this method will be called even if `props` have not changed. You may want to compare new and previous values if you only want to handle changes.

    * `componentWillMount()`

        Calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `constructor()` instead for initializing state.

        Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

        This is the only lifecycle hook called on server rendering.

    * `render()` (required)

        When called, it should examine `this.props` and `this.state` and return one of the following types:
        * `React elements`. Typically created via JSX. An element can either be a representation of a native DOM component (`<div />`), or a user-defined composite component (`<MyComponent />`).
        * `string` and `number`. These are rendered as text nodes in the DOM.
        * `Portals`. Created with `ReactDOM.createPortal`.
        * `null`. Renders nothing.
        * `Booleans`. Render nothing.

        The `render()` function should be __pure__, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.

        > __`render()` will not be invoked if `shouldComponentUpdate()` returns `false`.__

    * `componentDidMount()`

        If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

        This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

        Calling `setState()` in this method will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state.

* __Updating__

    An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
    * `componentWillReceiveProps(nextProps)`

        If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

        Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

        > It is not recommended to use this lifecycle in the new code. If you need to calculate next state based on a change in props, use the static `getDerivedStateFromProps` lifecycle. If you need to perform a side effect (for example, data fetching or an animation) in response to a change in props, use `componentDidUpdate` lifecycle instead.

    * `static getDerivedStateFromProps()`
    * `shouldComponentUpdate(nextProps, nextState)`

        Use it to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

        This method is not called for the initial render or when `forceUpdate()` is used.

        If `shouldComponentUpdate()` returns `false`, then `componentWillUpdate()`, `render()`, and `componentDidUpdate()` will not be invoked.

        Returning `false` does not prevent child components from re-rendering when their state changes.

        If you determine a specific component is slow after profiling, you may change it to inherit from `React.PureComponent` which implements `shouldComponentUpdate()` with a shallow prop and state comparison. If you are confident you want to write it by hand, you may compare `this.props` with nextProps and `this.state` with `nextState` and return `false` to tell React the update can be skipped.

        We do not recommend doing deep equality checks or using `JSON.stringify()` in `shouldComponentUpdate()`. It is very inefficient and will harm performance.

    * `componentWillUpdate(nextProps, nextState)`

        Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

        Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `componentWillUpdate()` returns.

        If you need to update `state` in response to `props` changes, use `getDerivedStateFromProps()` instead.

        > `componentWillUpdate()` will not be invoked if `shouldComponentUpdate()` returns `false`.

    * `render()`
    * `getSnapshotBeforeUpdate(prevProps, prevState)`

        It enables your component to capture current values (e.g. scroll position) before they are potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

    * `componentDidUpdate(prevProps, prevState, snapshot)`

        is invoked immediately after updating occurs. This method is not called for the initial render.

        Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

        If your component implements the `getSnapshotBeforeUpdate()` lifecycle, the value it returns will be passed as a third `snapshot` parameter to `componentDidUpdate()`. (Otherwise this parameter will be `undefined`.)

        > `componentDidUpdate()` will not be invoked if `shouldComponentUpdate()` returns `false`.

* __Unmounting__

    This method is called when a component is being removed from the DOM:
    * `componentWillUnmount()`

        Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

* __Error Handling__

    This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
    * `componentDidCatch(error, info)`

        Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

        A class component becomes an error boundary if it defines this lifecycle method. Calling `setState()` in it lets you capture an unhandled JavaScript error in the below tree and display a fallback UI. Only use error boundaries for recovering from unexpected exceptions; don’t try to use them for control flow.

        > Error boundaries only catch errors in the components below them in the tree. An error boundary can’t catch an error within itself.

### Other APIs
Each component also provides some other APIs:
* `setState(updater[, callback])`

    enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

    `setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the updater argument below.

    `setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

    The first argument is an updater function with the signature:
    ```javascript
    (prevState, props) => stateChange
    ```

    It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `prevState` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:
    ```javascript
    this.setState((prevState, props) => {
        return {counter: prevState.counter + props.step};
    });
    ```

    Both `prevState` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `prevState`.

    The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

    You may optionally pass an object as the first argument to `setState()` instead of a function:
    ```javascript
    setState(stateChange[, callback])
    ```

    This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:
    ```javascript
    Object.assign(
        previousState,
        {quantity: state.quantity + 1},
        {quantity: state.quantity + 1},
        ...
    )
    ```

    Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the previous state, we recommend using the updater function form, instead:
    ```javascript
    this.setState((prevState) => {
        return {quantity: prevState.quantity + 1};
    });
    ```

* `forceUpdate(callback)`

    By default, when your component’s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

    Calling `forceUpdate()` will cause `render()` to be called on the component, `skipping shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

    Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

### Class Properties
* `defaultProps`
* `displayName`

    The `displayName` string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component.

### Instance Properties
* `props`
* `state`

    The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

    If some value isn’t used for rendering or data flow (for example, a timer ID), you don’t have to put it in the state. Such values can be defined as fields on the component instance.

    Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

> `UNSAFE_*` lifecycle is a legacy methods which will continue to work until version 17.

More:
* [More on HackerNoon](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)

* [More on Medium](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d)

* [More on ReactTips](http://react.tips/how-to-use-react-component-lifecycle-methods/)