## Generics
```typescript
// Generic Function
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

// Generic Interface
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// Generic Class
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```
Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.


You may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have. Instead of working with any and all types, we’d like to constrain this function to work with any and all types that for exmaple have the `.length` property. To do so, we’ll create an interface that describes our constraint.
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no error
    return arg;
}

// Because the generic function is now constrained, it will no longer work over any and all types
loggingIdentity(3);  // Error, number doesn't have a .length property
```


You can declare a type parameter that is constrained by another type parameter. For example, here we’d like to get a property from an object given its name. We’d like to ensure that we’re not accidentally grabbing a property that does not exist on the `obj`, so we’ll place a constraint between the two types:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


let person: Person = {
    name: 'Jarid',
    age: 35
};
let personProps: keyof Person; // 'name' | 'age'
```


When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. 
```typescript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```