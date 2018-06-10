## Lists and Keys
### Rendering Multiple Components
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

Usually you would render lists inside a component.
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```

> Note that we have `key` propperty for each `<li>` element.

### Keys
A __key__ is a special string attribute you need to include when creating lists of elements.

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys.

When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:
```javascript
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

> We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

If you use `index` as `key`, you going to have problem when adding or removing lement from the array. Because `key` for each array element will be different each time.

When all of them are met, you may safely use the `index` as a `key`:
* the list and items are static–they are not computed and do not change;
* the items in the list have no ids;
* the list is never reordered or filtered.

Using `Math.random()` is even worse than using the index for keys.
`Math.random()` generates a pseudorandom number between `0` and `1`. But it will be different for a given element every time the component mounts which causes a huge performance overhead.

Keys only make sense in the context of the surrounding array.

__A good rule of thumb is that elements inside the `map()` call need keys.__

__Keys used within arrays should be unique among their siblings.__ However they don’t need to be globally unique. We can use the same keys when we produce two different arrays

### Embedding map() in JSX
JSX allows embedding any expressions in curly braces so we could inline the `map()` result:
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```