## Fragments
A common pattern in React is for a component to return multiple elements. `Fragments` let you group a list of children __without adding extra nodes__ to the DOM.
```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

### Short Syntax
There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags:
```javascript
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```
> Many tools don’t support it yet so you might want to explicitly write `<React.Fragment>` until the tooling catches up.

### Keyed Fragments
Fragments declared with the explicit `<React.Fragment>` syntax may have keys. A use case for this is mapping a collection to an array of fragments — for example, to create a description list:
```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
`key` is the only attribute that can be passed to `Fragment`. In the future, we may add support for additional attributes, such as event handlers.