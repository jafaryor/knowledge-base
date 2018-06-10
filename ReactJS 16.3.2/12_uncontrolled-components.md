## Uncontrolled Components
In most cases, we recommend using __controlled components__ to implement forms. In a __controlled component__, form data is handled by a React component. The alternative is __uncontrolled components__, where form data is handled by the DOM itself.

To write an __uncontrolled component__, instead of writing an event handler for every state update, you can use a `ref` to get form values from the DOM.
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Since an __uncontrolled component keeps the source of truth in the DOM__, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

### Default Values
In the React rendering lifecycle, the `value` attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a `defaultValue` attribute instead of `value`.
```jsx
<form onSubmit={this.handleSubmit}>
    <label>
    Name:
    <input
        defaultValue="Bob"      // default value
        type="text"
        ref={(input) => this.input = input} />
    </label>
    <input type="submit" value="Submit" />
</form>
```

### `<input type="file">`
In React, an `<input type="file" />` is always an __uncontrolled component__ because its value can only be set by a user, and not programmatically.
```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input
            type="file"
            ref={ input => { this.fileInput = input; } }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```