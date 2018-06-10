## Interfaces

One of TypeScript’s core principles is that type-checking focuses on the shape that values have. This is sometimes called _“duck typing”_ or _“structural subtyping”_. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.
```typescript
function Foo(labelledObj: { label: string }) {
    // ...
}

// can be rewritten to:
interface inputValue {
    readonly label: string;         // unmodifiable property
    color?: string;                 // optional property
    height: number;
    [propName: string]: any;        // means the interface can have any number of other properties
}

function Foo(input: inputValue): outputValue {
    // ...
}
```

TypeScript comes with a `ReadonlyArray<T>` type that is the same as `Array<T>` with all mutating methods removed, so you can make sure you don’t change your arrays after creation:
```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12;              // error!
ro.push(5);              // error!
ro.length = 100;         // error!

a = ro;                  // error!
a = ro as number[];      // but this doesn't throw error
```

### Function Types
```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    // valid if you skip type of any argument and even the return type
}
mySearch = function(src: string, sub: string): boolean {
    // different argument names are valid
}
mySearch = function(src, sub) {
    // also valid if you skip type of arguments
}
```

### Indexable Types
Indexable types have an _index signature_ that describes the types we can use to index into the object, along with the corresponding return types when indexing.
```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

Above, we have a `StringArray` interface that has an index signature. This index signature states that when a `StringArray` is indexed with a `number`, it will return a `string`.

There are two types of supported index signatures: `string` and `number`. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.
```typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```
While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type.
```typescript
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}
```
> __In short the return type all properties of indexed types should be the same or subtype of indexed property.__

Finally, you can make index signatures __readonly__ in order to prevent assignment to their indices:
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory";     // error!
```

### Class Types
Interfaces describe the __public__ side of the class, rather than both the __public__ and __private__ side.
```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

When working with classes and interfaces, it helps to keep in mind that a class has two types: the type of the __static side__ and the type of the __instance side__.

You may notice that if you create an interface with a construct signature and try to create a class that implements this interface you get an error. This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.
```typescript
interface ClockConstructor {
    new (hour: number, minute: number);     // defines consrtucor structure
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }   // Error!
}

function createClock(ctor: ClockConstructor) {
    // that OK to check contructor format in this way
}
```

### Extending Interfaces
Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another, which gives you more flexibility in how you separate your interfaces into reusable components.
```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### Hybrid Types
Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object that works as a combination of some of the types described above.
```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### Interfaces Extending Classes
```typescript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}
```