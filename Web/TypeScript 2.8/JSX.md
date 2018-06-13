## JSX
`JSX` is an embeddable XML-like syntax. It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific. `JSX` came to popularity with the React framework, but has since seen other applications as well. TypeScript supports embedding, type checking, and compiling `JSX` directly into JavaScript.

### Basic usage
In order to use JSX you must do two things.
* Name your files with a `.tsx` extension
* Enable the `jsx` option

TypeScript ships with three JSX modes:
* __preserve__ mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel). Additionally the output will have a `.jsx` file extension.
* __react__ mode will emit React.createElement, does not need to go through a JSX transformation before use, and the output will have a `.js` file extension.
* __react-native__ mode is the equivalent of preserve in that it keeps all JSX, but the output will instead have a `.js` file extension.

These modes only affect the __emit stage__ - type checking is unaffected. 

| Mode | Input | Output | Output File Extension |
|:-|:-:|:-:|:-:|:-:|:-:|
| preserve | `<div />` | `<div />` | `.jsx` |
| react | `<div />` | `React.createElement("div")` | `.js` |
| react-native | `<div />` | `<div />` | `.js` |

### `as` operator
The `as` operator is available in both `.ts` and `.tsx` files, and is identical in behavior to the other type assertion style.

Since TypeScript also uses angle brackets for type assertions, JSX’s syntax introduces certain parsing difficulties. As a result, TypeScript disallows angle bracket type assertions in `.tsx` files.
```typescript
var foo = <foo>bar;         // Disallowed in JSX
var foo = bar as foo;       // Allowed in JSX
```

### Type Checking
In order to understand type checking with JSX, you must first understand the difference between intrinsic elements and value-based elements. Given a JSX expression `<expr />`, `expr` may either refer to something intrinsic to the environment (e.g. a `div` or `span` in a DOM environment) or to a custom component that you’ve created. This is important for two reasons:

For React, intrinsic elements are emitted as strings (`React.createElement("div")`), whereas a component you’ve created is not (`React.createElement(MyComponent)`).
* The types of the attributes being passed in the JSX element should be looked up differently. Intrinsic element attributes should be known intrinsically whereas components will likely want to specify their own set of attributes.
* TypeScript uses the same convention that React does for distinguishing between these. An intrinsic element always begins with a lowercase letter, and a value-based element always begins with an uppercase letter.

__Intrinsic elements__ are looked up on the special interface `JSX.IntrinsicElements`. By default, if this interface is not specified, then anything goes and intrinsic elements will not be type checked. However, if this interface is present, then the name of the intrinsic element is looked up as a property on the JSX.IntrinsicElements interface.
```typescript
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

<foo />; // ok
<bar />; // error

declare namespace JSX {
   interface IntrinsicElements {
       [elemName: string]: any;
   }
}

<bar />; // ok
```

__Value based elements__ are simply looked up by identifiers that are in scope.
```typescript
import MyComponent from "./myComponent";

<MyComponent />;        // ok
<SomeOtherComponent />; // error
```

There are two ways to define a __value-based element__:
* __Stateless Functional Component (SFC)__ - function where its first argument is a `props` object. We enforce that its return type must be assignable to `JSX.Element`
    ```typescript
    declare function AnotherComponent(prop: {name: string});
    function ComponentFoo(prop: FooProp) {
        return <AnotherComponent name=prop.name />;
    }
    ```
* __Class Component__
    ```typescript
    class MyComponent {
        render() {}
    }
    function MyFactoryFunction() {
        return { render: () => {} }
    }

    <MyComponent />;            // ok
    <MyFactoryFunction />;      // ok

    class NotAValidComponent {}
    function NotAValidFactoryFunction() {
        return {};
    }

    <NotAValidComponent />; // error
    <NotAValidFactoryFunction />; // error
    ```

### Attribute type checking
* __Stateless Functional Component__'s attribute type is the type of the property on `JSX.IntrinsicElements`
    ```typescript
    declare namespace JSX {
        interface IntrinsicElements {
            foo: { bar?: boolean }
        }
    }

    // element attributes type for 'foo' is '{bar?: boolean}'
    <foo bar />;
    ```
* __Class Component__'s attribute type is determined by the type of a property on the element instance type. Which property to use is determined by `JSX.ElementAttributesProperty`. It should be declared with a single property. The name of that property is then used.
    ```typescript
    declare namespace JSX {
        interface ElementAttributesProperty {
            props; // specify the property name to use
        }

        interface IntrinsicElements {
            foo: { requiredProp: string; optionalProp?: number }
        }
    }

    class MyComponent {
        // specify the property on the element instance type
        props: {
            foo?: string;
        }
    }

    // element attributes type for 'MyComponent' is '{foo?: string}'
    <MyComponent foo="bar" />

    <foo requiredProp="bar" />;                     // ok
    <foo requiredProp="bar" optionalProp={0} />;    // ok
    <foo />;                                        // error, requiredProp is missing
    <foo requiredProp={0} />;                       // error, requiredProp should be a string
    <foo requiredProp="bar" unknownProp />;         // error, unknownProp does not exist
    <foo requiredProp="bar" some-unknown-prop />;   // ok, because 'some-unknown-prop' is not a valid identifier

    // spread operator also works:
    var props = { requiredProp: "bar" };
    <foo {...props} />; // ok

    var badProps = {};
    <foo {...badProps} />; // error
    ```

    > If an attribute name is not a valid JS identifier (like a `data-*` attribute), it is not considered to be an error if it is not found in the element attributes type.

### Children Type Checking
Similar to how we use `JSX.ElementAttributesProperty` to determine the name of props, we use `JSX.ElementChildrenAttribute` to determine the name of children. `JSX.ElementChildrenAttribute` should be declared with a single property.
```typescript
declare namespace JSX {
  interface ElementChildrenAttribute {
    children: {};  // specify children name to use
  }
}
```

> Without explicitly specify type of children, we will use default type from React typings.

```html
<div>
  <h1>Hello</h1>
</div>;

<div>
  <h1>Hello</h1>
  World
</div>;

const CustomComp = (props) => <div>props.children</div>
<CustomComp>
  <div>Hello World</div>
  {"This is just a JS expression..." + 1000}
</CustomComp>
```
You can specify type of children like any other attribute. This will overwritten default type from _React typings_.
```html
interface PropsType {
  children: JSX.Element
  name: string
}

class Component extends React.Component<PropsType, {}> {
  render() {
    return (
      <h2>
        this.props.children
      </h2>
    )
  }
}

// OK
<Component>
  <h1>Hello World</h1>
</Component>

// Error: children is of type JSX.Element not array of JSX.Element
<Component>
  <h1>Hello World</h1>
  <h2>Hello World</h2>
</Component>

// Error: children is of type JSX.Element not array of JSX.Element or string.
<Component>
  <h1>Hello</h1>
  World
</Component>
```

### JSX result type
By default the result of a JSX expression is typed as `any`. You can customize the type by specifying the `JSX.Element` interface. However, it is not possible to retrieve type information about the element, attributes or children of the JSX from this interface. It is a black box.

### Embedding Expressions
JSX allows you to embed expressions between tags by surrounding the expressions with curly braces (`{ }`).
```html
var a = <div>
  {["foo", "bar"].map(i => <span>{i / 2}</span>)}
</div>
```
The output, when using the __preserve__ option, looks like:
```html
var a = <div>
  {["foo", "bar"].map(function (i) { return <span>{i / 2}</span>; })}
</div>
```

### React integration
To use JSX with React you should use the [React typings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react). These typings define the JSX namespace appropriately for use with React.
```typescript
/// <reference path="react.d.ts" />

interface Props {
  foo: string;
}

class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>
  }
}

<MyComponent foo="bar" />; // ok
<MyComponent foo={0} />; // error
```