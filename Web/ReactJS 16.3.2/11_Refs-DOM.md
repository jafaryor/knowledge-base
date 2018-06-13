## Refs and the DOM
`Refs` provide a way to access DOM nodes or React elements created in the render method.

There are a few good use cases for `refs`:
* Managing focus, text selection, or media playback.
* Triggering imperative animations.
* Integrating with third-party DOM libraries.

Avoid using `refs` for anything that can be done declaratively.

### Creating `Refs`
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef} />;
  }
}
```

The value of the `ref` differs depending on the type of the node:
* When the `ref` attribute is used on an HTML element, the `ref` created in the constructor with `React.createRef()` receives the underlying DOM element as its `current` property.

    React will assign the `current` property with the DOM element when the _component mounts_, and assign it back to null when it _unmounts_. ref updates happen before `componentDidMount` or `componentDidUpdate` lifecycle hooks.

* When the `ref` attribute is used on a custom class component, the `ref` object receives the mounted instance of the component as its `current`.
* __You may not use the `ref` attribute on functional components__ because they don’t have instances.

    You should convert the component to a class if you need a `ref` to it, just like you do when you need lifecycle methods or state.

    You can, however, use the `ref` attribute inside a functional component as long as you refer to a DOM element or a class component.

Examples:
* ### Adding a `Ref` to a DOM Element
    ```javascript
    class CustomTextInput extends React.Component {
        constructor(props) {
            super(props);
            // create a ref to store the textInput DOM element
            this.textInput = React.createRef();
            this.focusTextInput = this.focusTextInput.bind(this);
        }

        focusTextInput() {
            // Explicitly focus the text input using the raw DOM API
            // Note: we're accessing "current" to get the DOM node
            this.textInput.current.focus();
        }

        render() {
            // tell React that we want to associate the <input> ref
            // with the `textInput` that we created in the constructor
            return (
            <div>
                <input
                type="text"
                ref={this.textInput} />

                <input
                type="button"
                value="Focus the text input"
                onClick={this.focusTextInput}
                />
            </div>
            );
        }
    }
    ```

* ### Adding a `Ref` to a Class Component

    We wanted to wrap the `CustomTextInput` above to simulate it being clicked immediately after mounting, we use a `ref` to get access to the custom input and call its focusTextInput method manually:
    ```javascript
    class AutoFocusTextInput extends React.Component {
        constructor(props) {
            super(props);
            this.textInput = React.createRef();
        }

        componentDidMount() {
            this.textInput.current.focusTextInput();
        }

        render() {
            return (
            <CustomTextInput ref={this.textInput} />
            );
        }
    }
    ```
    > Note that this only works if `CustomTextInput` is declared as a __class__.

### Exposing DOM `Refs` to Parent Components
In rare cases, you might want to have access to a child’s DOM node from a parent component. This is generally not recommended because it breaks component encapsulation, but it can occasionally be useful for triggering focus or measuring the size or position of a child DOM node.

While you could add a `ref` to the child component, this is not an ideal solution, as you would only get a component instance rather than a DOM node. Additionally, this wouldn’t work with functional components.

Solutions:
* If you use `React 16.3` or higher, we recommend to use __ref forwarding__ for these cases. __`Ref` forwarding lets components opt into exposing any child component’s `ref` as their own__.

* If you use React 16.2 or lower, or if you need more flexibility than provided by `ref` forwarding, you can use this alternative approach and explicitly pass a `ref` as a differently named prop. This works both for classes and for functional components.
    ```javascript
    function CustomTextInput(props) {
        return (
            <div>
            <input ref={props.inputRef} />
            </div>
        );
    }

    class Parent extends React.Component {
        constructor(props) {
            super(props);
            this.inputElement = React.createRef();
        }
        render() {
            return (
            <CustomTextInput inputRef={this.inputElement} />
            );
        }
    }
    ```
    In the example above, `Parent` passes its class property `this.inputElement` as an `inputRef` prop to the `CustomTextInput`, and the `CustomTextInput` passes the same `ref` as a special `ref` attribute to the `<input>`. As a result, `this.inputElement.current` in `Parent` will be set to the DOM node corresponding to the `<input>` element in the `CustomTextInput`.

* If you have absolutely no control over the child component implementation, your last option is to use `findDOMNode()`, but it is discouraged.

### Callback `Refs`
React also supports another way to set refs called __callback refs__, which gives more fine-grain control over when refs are set and unset.

Instead of passing a `ref` attribute created by `createRef()`, you pass a _function_. The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.

```javascript
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      // Callback Refs
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React will call the __`ref` callback__ with the DOM element when the component mounts, and call it with `null` when it unmounts. `ref` callbacks are invoked before `componentDidMount` or `componentDidUpdate` lifecycle hooks.

You can pass callback refs between components like you can with object refs that were created with `React.createRef()`.
```javascript
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

In the example above, `Parent` passes its ref callback as an `inputRef` prop to the `CustomTextInput`, and the `CustomTextInput` passes the same function as a special `ref` attribute to the `<input>`. As a result, `this.inputElement` in `Parent` will be set to the DOM node corresponding to the `<input> `element in the `CustomTextInput`.

> This is kind of passing `ref` to parent component.

### Caveats with callback `refs`
If the `ref` callback is defined as an __inline function__, it will get called __twice__ during updates, first with `null` and then again with the DOM element.

This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the `ref` callback as a bound method on the class, but note that it shouldn’t matter in most cases.