## Forms
HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally keep some __internal state__.

### Controlled Components
In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input.

We can combine the two by making the React state be the _single source of truth_. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a __controlled component__.
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Since the `value` attribute is set on our form element, the displayed value will always be `this.state.value`, making the React state the source of truth. Since `handleChange` runs on every keystroke to update the React state, the displayed value will update as the user types.

### `<textarea>`
In HTML, a `<textarea>` element defines its text by its children:
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

In React, a `<textarea>` uses a value attribute instead. This way, a form using a `<textarea>` can be written very similarly to a form that uses a single-line input:
```html
<textarea value={this.state.value} onChange={this.handleChange} />
```

### `<select>`
In HTML, `<select>` creates a drop-down list.
```html
<select>
  <option selected value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
</select>
```

React, instead of using this `selected` attribute, uses a `value` attribute on the root `select` tag.
```html
// ...
this.state = {value: 'coconut'};
// ...
<select value={this.state.value} onChange={this.handleChange}>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
</select>
```

> __`<input type="text">`__ accept a value attribute that you can use to implement a controlled component.

You can pass an array into the `value` attribute, allowing you to select multiple options in a `select` tag:
```html
<select multiple={true} value={['B', 'C']}>
```

### `<input type="file">`
In HTML, an `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the File API.

Because its value is __read-only__, it is an uncontrolled component in React.

### Handling Multiple Inputs
When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`
```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

> __Uncontrolled Components__ are alternatives to controlled components.