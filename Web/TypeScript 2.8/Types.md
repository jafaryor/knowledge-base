## Basic Types

### Boolean
```typescript
let isDone: boolean = false;
```

### Number
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// number literal
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```

### String
```typescript
let name: string = 'Jafar';
let sentence: string = `Hello, my name is ${ name }.`;
```

String literal types allow you to specify the exact value a string must have.
```typescript
// enum-like type
type Easing = "ease-in" | "ease-out" | "ease-in-out";

// You can pass any of the three allowed strings, but any other string will give the error
function Foo(easing: Easing) {
    // ...
}
```
String literal types can be used in the same way to distinguish overloads:
```typescript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```

### Array
```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### Enum
Enums allow us to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both __numeric__ and __string-based__ enums.

By default, __number enums__ begin numbering their members starting at `0`. You can change this by manually setting the value of one of its members.

While __string enums__ don’t have auto-incrementing behavior, string enums have the benefit that they “serialize” well.

Technically enums can be mixed with string and numeric members (__heterogeneous enums__), but it’s not clear why you would ever want to do so.

__Const enums__ can only use constant enum expressions and unlike regular enums they are completely removed during compilation. Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

__Ambient enums__ are used to describe the shape of already existing enum types. One important difference between __ambient__ and __non-ambient__ enums is that, in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. In contrast, an ambient (and non-const) enum member that does not have initializer is always considered computed.

```typescript
// NUMBER ENUM
enum Color {Red, Green, Blue}                   // 0 1 2
enum Color {Red = 1, Green, Blue}               // 1 2 3
enum Color {Red = 1, Green = 2, Blue = 4}       // 1 2 4

let c: Color = Color.Green;
let colorName: string = Color[1];               // Red
let nameOfC = Color[c];                         // Green

// STRING ENUM
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// HETEROGENEOUS ENUMNS
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// enum member types
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}

// Const enum type
const enum Directions { Up, Down, Left, Right }
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// will generate, because no Direction enum will be in runtime
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// Ambient enum
declare enum Enum { A = 1, B, C = 2 }
```

You can combine singleton types, union types, type guards, and type aliases to build an advanced pattern called __discriminated unions__, also known as __tagged unions__ or __algebraic data types__.
```typescript
interface Square {
    kind: "square";         // kind - discriminant or tag
    size: number;
}
interface Rectangle {
    kind: "rectangle";      // kind - discriminant or tag
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";         // kind - discriminant or tag
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```


### Tuple
__Tuple__ types allow you to express an array where the type of a fixed number of elements is known, but need not be the same.

When accessing an element outside the set of known indices, a union type is used instead.
```typescript
let x: [string, number];        // Declare a tuple type
// Initialize it
x = ["hello", 10];              // OK
// Initialize it incorrectly
x = [10, "hello"];              // Error

console.log(x[0].substr(1));    // OK
console.log(x[1].substr(1));    // Error, 'number' does not have 'substr'

x[3] = "world";                 // OK, 'string' can be assigned to 'string | number'
console.log(x[5].toString());   // OK, 'string' and 'number' both have 'toString'
x[6] = true;                    // Error, 'boolean' isn't 'string | number'
```

### Any
You might expect `Object` to play a similar role, as it does in other languages. But variables of type `Object` only allow you to assign any value to them - you can’t call arbitrary methods on them, even ones that actually exist
```typescript
let notSure: any = 4;
notSure.ifItExists();       // okay, ifItExists might exist at runtime
notSure.toFixed();          // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed();       // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

### Null and Undefined
In TypeScript, both `undefined` and `null` actually have their own types named `undefined` and `null` respectively. By default `null` and `undefined` are subtypes of all other types. That means you can assign `null` and `undefined` to something like `number`.

However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to `void` and their respective types ( when you declare a variable, it doesn’t automatically include `null` or `undefined`).
```typescript
let u: undefined = undefined;
let n: null = null;
```
> Note that TypeScript treats `null` and `undefined` differently in order to match JavaScript semantics. `string | null` is a different type than `string | undefined` and `string | undefined | null`.

The syntax is postfix `!`: `identifier!` removes `null` and `undefined` from the type of identifier
```typescript
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

### Void
Declaring variables of type `void` is not useful because you can only assign `undefined` or `null` to them.
```typescript
function warnUser(): void {
    alert("This is my warning message");
}

let unusable: void = undefined | null;
```

### Never
The `never` type represents the type of values that never occur. For instance, `never` is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns; Variables also acquire the type `never` when narrowed by any type guards that can never be true.

The `never` type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, `never` (except `never` itself). Even `any` isn’t assignable to `never`.
```typescript
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```


## Intersection Types
An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

You will mostly see intersection types used for mixins and other concepts that don’t fit in the classic object-oriented mold. (There are a lot of these in JavaScript!) Here’s a simple example that shows how to create a mixin:
```typescript
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

```


## Union Types
A union type describes a value that can be one of several types. We use the vertical bar (`|`) to separate each type, so `number | string | boolean` is the type of a value that can be a `number`, a `string`, or a `boolean`.
```typescript
function padLeft(value: string, padding: string | number) {
    // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```

If we have a value that has a union type, we can only access members that are common to all types in the union.
```typescript
let pet = getSmallPet();

// Each of these property accesses will cause an error
if (pet.swim) {
    pet.swim();
} else if (pet.fly) {
    pet.fly();
}

// To get the same code working, we’ll need to use a type assertion
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}
```

## Mapped types
A common task is to take an existing type and make each of its properties optional or readonly. Solution:
```typescript
// makes all props of T readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

// makes all props of T optional
type Partial<T> = {
    [P in keyof T]?: T[P];
}


// generating new type from union memebers
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
// generates:
type Flags = {
    option1: boolean;
    option2: boolean;
}


type Record<K extends string, T> = {
    [P in K]: T;
}
type ThreeStringProps = Record<'prop1' | 'prop2', string>
// generates:
type ThreeStringProps = {
    prop1: string,
    prop2: string
}
```


## Type Guards
A __type guard__ is some expression that performs a runtime check that guarantees the type in some scope. To define a type guard, we simply need to define a function whose return type is a __type predicate__:
```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    // pet is Fish - is a type predicate
    return (<Fish>pet).swim !== undefined;
}
```
A __predicate__ takes the form `parameterName` is `Type`, where `parameterName` must be the name of a parameter from the current function signature.
```typescript
let pet = getSmallPet();

// Both calls to 'swim' and 'fly' are now okay.
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```
Notice that TypeScript not only knows that `pet` is a `Fish` in the `if` branch; it also knows that in the `else` branch, you don’t have a `Fish`, so you must have a `Bird`.

## Type Aliases
Type aliases create a new name for a type. Aliasing doesn’t actually create a new type - it creates a new name to refer to that type.
```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}

// type aliases can also be generic
type Container<T> = { value: T };

// We can also have a type alias refer to itself in a property
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

// it’s not possible for a type alias to appear anywhere else on the right side of the declaration
type Yikes = Array<Yikes>; // error
```


## Type Assertion
__Type assertions__ are a way to tell the compiler _“trust me, I know what I’m doing.”_ A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data. It has no runtime impact, and is used purely by the compiler.

Type assertions have two forms:
```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

The two samples are equivalent. Using one over the other is mostly a choice of preference; however, when using TypeScript with JSX, only `as`-style assertions are allowed.

Typescript compiler doesn’t allow spreads of type parameters from generic functions. That feature is expected in future versions of the language.

## Destructuring
```typescript
let { a, b }: { a: string, b: number } = o;

function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}

function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```

> Typescript compiler doesn’t allow __spreads__ of type parameters from generic functions. That feature is expected in future versions of the language.

## Type Inference
When a type inference is made from several expressions, the types of those expressions are used to calculate a _“best common type”_.

When no best common type is found, the resulting inference is the union array type, `(Rhino | Elephant | Snake)[]`.

Ideally, we may want `zoo` to be inferred as an `Animal[]`, but because there is no object that is strictly of type `Animal` in the array, we make no inference about the array element type. To correct this, instead explicitly provide the type when no one type is a super type of all other candidates
```typescript
let x = 3;                      // number
let x = [0, 1, null];           // (number|null)[]

// no inference that is why, the type is (Rhino | Elephant | Snake)[]
let zoo = [new Rhino(), new Elephant(), new Snake()];

// best common type has a set of four candidates: Animal, Rhino, Elephant,
// and Snake. Of these, Animal can be chosen by the best common type algorithm.
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}
```

## Type Compatibility
In TypeScript, there are two kinds of compatibility: __subtype__ and __assignment__.

Type compatibility in TypeScript is based on __structural subtyping__. __Structural typing__ is a way of relating types based solely on their members. This is in contrast with __nominal typing__.

In short structural type system is that `x` is compatible with `y` if `y` has at least the same members as `x`.
```typescript
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
p = new Person();           // OK, because of structural typing

interface Named {
    name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: "Alice", location: "Seattle" };
x = y;
```
In __nominally-typed__ languages like `C#` or `Java`, the equivalent code would be an error because the `Person` class does not explicitly describe itself as being an implementor of the `Named` interface.

### Comparing functions
To check if `x` is assignable to `y`, we first look at the parameter list. Each parameter in `x` must have a corresponding parameter in `y` with a compatible type.

The type system enforces that the source function’s return type be a subtype of the target type’s return type.

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK
x = y; // Error


let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});
x = y; // OK
y = x; // Error because x() lacks a location property
```
> __Note that the names of the parameters are not considered, only their types.__

When a function has overloads, each overload in the source type must be matched by a compatible signature on the target type. This ensures that the target function can be called in all the same situations as the source function.

### Enums
Enums are compatible with numbers, and numbers are compatible with enums. Enum values from different enum types are considered incompatible.
```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;       //error
```

### Classes
Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.
```typescript
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
}

class Size {
    feet: number;
    constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  //OK
s = a;  //OK
```

> __Private and protected members in a class affect their compatibility.__

### Generics
```typescript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x
```
In the above, `x` and `y` are compatible because their structures do not use the type argument in a differentiating way. 
```typescript
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // error, x and y are not compatible
```
Now it throws error, because we have added interface member