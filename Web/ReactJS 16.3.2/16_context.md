## Context
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### When to Use Context
In a typical React application, data is passed top-down (parent to child) via `props`, but this can be cumbersome for certain types of `props` (e.g. locale preference, UI theme) that are required by many components within an application.

Context provides a way to share values like this between components without having to explicitly pass a prop through every level of the tree.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

```javascript
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // Use a Consumer to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}  // Consumer function
    </ThemeContext.Consumer>
  );
}
```

### API
* __`React.createContext`__

  ```javascript
  const {Provider, Consumer} = React.createContext(defaultValue);
  ```

  Creates a `{ Provider, Consumer }` pair. When React renders a context `Consumer`, it will read the current context value from the closest matching `Provider` above it in the tree.

  The `defaultValue` argument is used when you render a `Consumer` without a matching `Provider` above it in the tree. This can be helpful for testing components in isolation without wrapping them.

* __`Provider`__
  ```jsx
  <Provider value={/* some value */}>
  ```
  A React component that allows `Consumers` to subscribe to context changes.

  Accepts a `value` prop to be passed to `Consumers` that are descendants of this `Provider`. One `Provider` can be connected to many `Consumers`. `Providers` can be nested to override values deeper within the tree.

* __`Consumer`__

  ```javascript
  <Consumer>
    {value => /* render something based on the context value */}
  </Consumer>
  ```
  A React component that subscribes to context changes.

  Requires a function as a child. The function receives the current context value and returns a React node. The `value` argument passed to the function will be equal to the `value` prop of the closest `Provider` for this context above in the tree. If there is no `Provider` for this context above, the `value` argument will be equal to the `defaultValue` that was passed to `createContext()`.

  All Consumers are re-rendered whenever the `Provider` value changes. Changes are determined by comparing the new and old values using the same algorithm as `Object.is`. (This can cause some issues when passing objects as `value`: see Caveats section)

### Updating Context from a Nested Component
It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context:
* theme-context.js:
  ```javascript
  // Make sure the shape of the default value passed to
  // createContext matches the shape that the consumers expect!
  export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
  });
  ```

* theme-toggler-button.js
  ```javascript
  import {ThemeContext} from './theme-context';

  function ThemeTogglerButton() {
    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    return (
      <ThemeContext.Consumer>
        {({theme, toggleTheme}) => (
          <button
            onClick={toggleTheme}
            style={{backgroundColor: theme.background}}>
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }

  export default ThemeTogglerButton;
  ```
* app.js
  ```javascript
  import {ThemeContext, themes} from './theme-context';
  import ThemeTogglerButton from './theme-toggler-button';

  class App extends React.Component {
    constructor(props) {
      super(props);

      this.toggleTheme = () => {
        this.setState(state => ({
          theme:
            state.theme === themes.dark
              ? themes.light
              : themes.dark,
        }));
      };

      // State also contains the updater function so it will
      // be passed down into the context provider
      this.state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
      };
    }

    render() {
      // The entire state is passed to the provider
      return (
        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>
      );
    }
  }

  function Content() {
    return (
      <div>
        <ThemeTogglerButton />
      </div>
    );
  }

  ReactDOM.render(<App />, document.root);
  ```

### Consuming Multiple Contexts
To keep context re-rendering fast, React needs to make each context consumer a separate node in the tree.
```javascript
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

### Accessing Context in Lifecycle Methods
Accessing values from context in lifecycle methods is a relatively common use case. Instead of adding context to every lifecycle method, you just need to pass it as a `prop`, and then work with it just like you’d normally work with a `prop`.
```javascript
class Button extends React.Component {
  componentDidMount() {
    // ThemeContext value is this.props.theme
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }

  render() {
    const {theme, children} = this.props;
    return (
      <button className={theme ? 'dark' : 'light'}>
        {children}
      </button>
    );
  }
}

export default props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```

### Consuming Context with a HOC
Some types of contexts are consumed by many components (e.g. theme or localization). It can be tedious to explicitly wrap each dependency with a `<Context.Consumer>` element. A higher-order component can help with this.
```javascript
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => <button className={theme} {...props} />}
    </ThemeContext.Consumer>
  );
}
```
That’s alright for a few components, but what if we wanted to use the theme context in a lot of places?

We could create a higher-order component called `withTheme`:
```javascript
const ThemeContext = React.createContext('light');

// This function takes a component...
export function withTheme(Component) {
  // ...and returns another component...
  return function ThemedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}
```
Now any component that depends on the theme context can easily subscribe to it using the `withTheme` function we’ve created:
```javascript
function Button({theme, ...rest}) {
  return <button className={theme} {...rest} />;
}

const ThemedButton = withTheme(Button);
```

### Forwarding Refs to Context Consumers
One issue with the render prop API is that refs don’t automatically get passed to wrapped elements. To get around this, use `React.forwardRef`:
* fancy-button.js
  ```javascript
  class FancyButton extends React.Component {
    focus() {
      // ...
    }

    // ...
  }

  // Use context to pass the current "theme" to FancyButton.
  // Use forwardRef to pass refs to FancyButton as well.
  export default React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {theme => (
        <FancyButton {...props} theme={theme} ref={ref} />
      )}
    </ThemeContext.Consumer>
  ));
  ```

* app.js
  ```javascript
  import FancyButton from './fancy-button';

  const ref = React.createRef();

  // Our ref will point to the FancyButton component,
  // And not the ThemeContext.Consumer that wraps it.
  // This means we can call FancyButton methods like ref.current.focus()
  <FancyButton ref={ref} onClick={handleClick}>
    Click me!
  </FancyButton>;
  ```

### Caveats
Because context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders. For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for `value`:
```javascript
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```
To get around this, lift the value into the parent’s state:
```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```