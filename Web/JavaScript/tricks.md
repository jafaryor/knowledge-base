## JavaScript Tricks
### Filter Unique Values
```javascript
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

> This trick works for arrays containing primitive types: `undefined`, `null`, `boolean`, `string` and `number`.

### Short-Circuit Evaluation
We can use the ‘and’ `&&` and ‘or’ `||` logical operators to evaluate certain expressions in an even more concise way. This is often called _‘short-circuiting’_ or _‘short-circuit evaluation’_.
```javascript
return (foo || []).length;
```

### Convert to Boolean
Besides the regular boolean values `true` and `false` , JavaScript also treats all other values as either _‘truthy’_ or _‘falsy’_.

Unless otherwise defined, all values in JavaScript are _‘truthy’_ with the exception of `0`, `""`, `null`, `undefined`, `NaN` and of course `false` , which are _‘falsy’_.

### Remove Final Digits
```javascript
console.log(1553 / 10   | 0)  // Result: 155
```

### Truncate an Array
```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.slice(0, 4);

console.log(array); // Result: [0, 1, 2, 3]
```

### Get the Last Item(s) in an Array
```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
```

#### [Read More](https://medium.com/@bretcameron/12-javascript-tricks-you-wont-find-in-most-tutorials-a9c9331f169d)
