## Portals
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
```javascript
render() {
// Use a portal to render the children into the element
    return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        this.props.children,
        // A DOM element
        this.el,
    );
}
```

A typical use case for portals is when a parent component has an `overflow: hidden` or `z-index` style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.

[Example](https://codepen.io/gaearon/pen/yzMaBd?editors=1010)

### Event Bubbling Through Portals
Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the _React tree_ regardless of position in the _DOM tree_.

This includes event bubbling. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree.

Catching an event bubbling up from a portal in a parent component allows the development of more flexible abstractions that are not inherently reliant on portals.