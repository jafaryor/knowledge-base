## Composition vs Inheritance
We recommend using composition instead of inheritance to reuse code between components.

### Containment
Some components don’t know their children ahead of time.

We recommend that such components use the special `children` prop to pass children elements directly into their output. This lets other components pass arbitrary children to them by nesting the JSX:
```javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
        // this will be passed as props.children to the component
        <h1 className="Dialog-title">Welcome</h1>
    </FancyBorder>
  );
}
```

Anything inside the `<FancyBorder>` JSX tag gets passed into the `FancyBorder` component as a `children` prop. Since `FancyBorder` renders `{props.children}` inside a `<div>`, the passed elements appear in the final output.

### Inheritance
We use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.

`props` and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way.