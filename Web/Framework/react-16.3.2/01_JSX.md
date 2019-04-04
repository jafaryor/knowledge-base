## JSX
JSX produces React “elements”. JSX just provides syntactic sugar for the `React.createElement(component, props, ...children)` function.

### Why JSX?
* React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.
* Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called _“components”_ that contain both. 
* React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

### Embedding Expressions in JSX
You can embed any JavaScript expression in JSX by wrapping it in curly braces.
```javascript
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

### JSX is an Expression Too
After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects. This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions.

### Specifying Attributes with JSX
You may use quotes to specify string literals as attributes:
```javascript
const element = <div tabIndex="0"></div>;
```
You may also use curly braces to embed a JavaScript expression in an attribute:
```javascript
const element = <img src={user.avatarUrl}></img>;
```

> Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

### Warning:
Since JSX is closer to JavaScript than to HTML, React DOM uses __camelCase__ property naming convention instead of HTML attribute names.

For example, `class` becomes `className` in JSX, and `tabindex` becomes `tabIndex`.

### Specifying Children with JSX
If a tag is empty, you may close it immediately with />, like XML:
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <img src={user.avatarUrl} />
  </div>
);
```

### JSX Prevents Injection Attacks
It is safe to embed user input in JSX. By default, React DOM __escapes__ any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent __XSS__ (cross-site-scripting) attacks.
```javascript
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

### JSX Represents Objects
Babel compiles JSX down to `React.createElement(component, props, ...children)` calls.
```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// compiles into:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:
```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

> These objects are called __React elements__. You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

### `React` Must Be in Scope
Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

For example, both of the imports are necessary in this code, even though React and CustomButton are not directly referenced from JavaScript:
```javascript
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

> If you don’t use a JavaScript bundler and loaded React from a `<script>` tag, it is already in scope as the `React` global.

### User-Defined Components Must Be Capitalized
When an element type starts with a lowercase letter, it refers to a built-in component like `<div>` or `<span>` and results in a string `'div'` or `'span'` passed to `React.createElement('div')`. Types that start with a capital letter like `<Foo />` compile to `React.createElement(Foo)` and correspond to a component defined or imported in your JavaScript file.

If you do have a component that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.

## Props in JSX
You can pass any JavaScript expression as a prop, by surrounding it with `{}`.
```jsx
<MyComponent foo={1 + 2 + 3 + 4} />
```
`if` statements and `for `loops are not expressions in JavaScript, so they can’t be used in JSX directly.

### String Literals
You can pass a string literal as a prop.
```jsx
<MyComponent message="hello world" />
// equivalent to:
<MyComponent message={'hello world'} />
```

When you pass a string literal, its value is HTML-unescaped.
```jsx
<MyComponent message="&lt;3" />
// equivalent to:
<MyComponent message={'<3'} />
```

### Props Default to `true`
If you pass no value for a prop, it defaults to `true`.
```jsx
<MyTextBox autocomplete />
// equivalent to:
<MyTextBox autocomplete={true} />
```

### Spread Attributes
If you already have props as an object, and you want to pass it in JSX, you can use `...` as a _spread operator_ to pass the whole props object.
```javascript
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

## Children in JSX
In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: `props.children`. There are several different ways to pass children:

### String Literals
JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space.
```jsx
<div>This is valid HTML &amp; JSX at the same time.</div>
```

`false`, `null`, `undefined`, and `true` are valid children. They simply don’t render. These JSX expressions will all render to the same thing:
```jsx
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```

This can be useful to conditionally render React elements. This JSX only renders a `<Header />` if showHeader is `true`:
```jsx
<div>
  {showHeader && <Header />}
  <Content />
</div>
```