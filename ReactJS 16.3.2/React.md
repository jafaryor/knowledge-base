### Components
React components let you split the UI into independent, reusable pieces, and think about each piece in isolation. React components can be defined by subclassing `React.Component` or `React.PureComponent`.
* `React.Component`
* `React.PureComponent`

    `React.PureComponent` is similar to `React.Component`. The difference between them is that `React.Component` doesn’t implement `shouldComponentUpdate()`, but `React.PureComponent` implements it with a shallow prop and state comparison.

    `React.PureComponent`’s `shouldComponentUpdate()` only __shallowly compares__ the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use `forceUpdate()` when you know deep data structures have changed. Or, consider using immutable objects to facilitate fast comparisons of nested data.

    Furthermore, `React.PureComponent`’s `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.

If you don’t use ES6 classes, you may use the `create-react-class` module instead.

### Creating React Elements
We recommend using JSX to describe what your UI should look like. Each JSX element is just syntactic sugar for calling React.createElement(). You will not typically invoke the following methods directly if you are using JSX.
* `createElement(type, [props], [...children])`

    Create and return a new React element of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a React component type (a class or a function), or a React `fragment` type.

    Code written with JSX will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX.

* `createFactory(type)`

    Return a function that produces React elements of a given `type`. Like `React.createElement()`, the type argument can be either a tag name string (such as `'div'` or `'span'`), a React component type (a class or a function), or a React `fragment` type.

    > This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

### Transforming Elements
React provides several APIs for manipulating elements:
* `cloneElement(element, [props], [...children])`

    Clone and return a new React element using `element` as the starting point. The resulting element will have the original element’s props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

    `React.cloneElement()` is almost equivalent to:
    ```jsx
    <element.type {...element.props} {...props}>{children}</element.type>
    ```

    However, it also __preserves__ `refs`. This means that if you get a child with a `ref` on it, you won’t accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

* `isValidElement(object)`

    Verifies the `object` is a React element. Returns `true` or `false`.

* `React.Children`

    Provides utilities for dealing with the `this.props.children` opaque data structure:
    * `React.Children.map`

        Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is a keyed fragment or array it will be traversed: the function will never be passed the container objects.
        ```javascript
        React.Children.map(children, function[(thisArg)])
        ```
        If children is `null` or `undefined`, returns `null` or `undefined` rather than an array.
    
    * `React.Children.forEach`
        ```javascript
        React.Children.forEach(children, function[(thisArg)])
        ```

    * `React.Children.count`
        ```javascript
        React.Children.count(children)
        ```

    * `React.Children.only`

        Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error.
        ```javascript
        React.Children.only(children)        
        ```

        > `React.Children.only()` does not accept the return value of `React.Children.map()` because it is an array rather than a React element.
        
    * `React.Children.toArray`

        Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your `render` methods, especially if you want to reorder or slice `this.props.children` before passing it down.
        ```javascript
        React.Children.toArray(children)
        ```

        `React.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element’s key is scoped to the input array containing it.

### Fragments
React also provides a component for rendering multiple elements without a wrapper.
* `React.Fragment`

### Refs
* `React.createRef`
* `React.forwardRef`