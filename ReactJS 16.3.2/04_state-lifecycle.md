## State and Lifecycle
__State__ is similar to `props`, but it is private and fully controlled by the component.

### Converting a Function to a Class
You can convert a functional component to a class in five steps:
* Create an ES6 class, with the same name, that extends `React.Component`.
* Add a single empty method to it called `render()`.
* Move the body of the function into the `render()` method.
* Replace props with this.props in the `render()` body.
* Delete the remaining empty function declaration.

This lets us use additional features such as local state and lifecycle hooks.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### Lifecycle Methods to a Class
In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### Using State Correctly
* __Do Not Modify State Directly__
    ```javascript
    // Wrong, his will not re-render a component
    this.state.comment = 'Hello';

    // Correct
    this.setState({comment: 'Hello'});
    ```
    The only place where you can assign this.state is the constructor.

* __State Updates May Be Asynchronous__

    React may batch multiple `setState()` calls into a single update for performance.

    Because this.props and this.state may be updated _asynchronously_, you should not rely on their values for calculating the next state.
    ```javascript
    // Wrong
    this.setState({
        counter: this.state.counter + this.props.increment,
    });
    ```
    To fix it, use a second form of `setState()` that accepts a function rather than an object.
    ```javascript
    // Correct
    this.setState((prevState, props) => ({
        counter: prevState.counter + props.increment
    }));
    ```

* __State Updates are Merged__

    When you call `setState()`, React merges the object you provide into the current state.
    ```javascript
    // like this under the hood
    this.state = Object.assign(this.state, newState);
    ```

### The Data Flows Down
Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class. This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:
```javascript
<FormattedDate date={this.state.date} />
```

This is commonly called a __top-down__ or __unidirectional__ data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components _“below”_ them in the tree.