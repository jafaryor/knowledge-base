## Components and Props
Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

### Functional and Class Components
The simplest way to define a component is to write a JavaScript function:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
This function is a valid React component because it accepts a single __“props”__ (which stands for properties) object argument with data and returns a React element.

You can also use an ES6 class to define a component:
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> Note: Always start component names with a capital letter. React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML `div` tag, but `<Welcome />` represents a component and requires `Welcome` to be in scope.

### Props are Read-Only
Whether you declare a component as a function or a class, it must never modify its own props.
```javascript
function sum(a, b) {
  return a + b;
}
```
Such functions are called __“pure”__ because they do not attempt to change their inputs, and always return the same result for the same inputs.

> __All React components must act like pure functions with respect to their `props`.__

### Conditional Rendering:
```javascript
class LoginControl extends React.Component {
    // ...

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        const button = isLoggedIn ? (
            <LogoutButton onClick={this.handleLogoutClick} />
        ) : (
            <LoginButton onClick={this.handleLoginClick} />
        );

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}
```
or:
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

### Preventing Component from Rendering
In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return `null` instead of its render output.
```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null; // hide itself
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

> Returning `null` from a component’s render method does not affect the firing of the component’s lifecycle methods.