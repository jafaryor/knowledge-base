## Functions
In JavaScript, every function parameter is optional, and users may leave them off as they see fit.
```typescript
// x - deafult parameters
// y - otional parameter
function add(x: number = 0, y?: number): number {
    return x + (y || 0);
}

let myAdd = function(x: number, y: number): number { return x + y; };

let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```

> __Optional parameters must come after all required parameters.__

> __Default-initialized parameters don’t need to occur after required parameters.__

If a default-initialized parameter comes before a required parameter, users need to explicitly pass `undefined` to get the default initialized value.

__Rest parameters__ are treated as a boundless number of optional parameters. When passing arguments for a rest parameter, you can use as many as you want; you can even pass none. The compiler will build an array of the arguments passed in with the name given after the ellipsis (`...`), allowing you to use it in your function.

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
```

> __Arrow-function don't have own context (`this`), they inherit it from outer scope.__

### Overloads
You can overload a function dur to work with different kind of arguments.

```javascript
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```
Note that the function `pickCard(x): any` piece is not part of the overload list, so it only has two overloads: one that takes an object and one that takes a number. Calling `pickCard` with any other parameter types would cause an error.