## React Without JSX
JSX is not a requirement for using React. Using React without JSX is especially convenient when you don’t want to set up compilation in your build environment.

Each JSX element is just __syntactic sugar__ for calling `React.createElement(component, props, ...children)`. So, anything you can do with JSX can also be done with just plain JavaScript.
```javascript
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```
can be compiled to this code that does not use JSX:
```javascript
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

Alternatively, you can refer to community projects such as [react-hyperscript](https://github.com/mlmorg/react-hyperscript) and [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) which offer a terser syntax.