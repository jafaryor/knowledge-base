# ECMAScript 6

## Shims/Polyfills
Not all new ES6 features need a transpiler. Polyfills (aka shims) are a pattern for defining equivalent behavior from a newer environment into an older environment, when possible. Syntax cannot be polyfilled, but APIs often can be.

For example, `Object.is(..)` is a new utility for checking strict equality of two values but without the nuanced exceptions that `===` has for `NaN` and `-0` values.

```javascript
if (!Object.is) {
	Object.is = function(v1, v2) {
		// test for `-0`
		if (v1 === 0 && v2 === 0) {
			return 1 / v1 === 1 / v2;
		}
		// test for `NaN`
		if (v1 !== v1) {
			return v2 !== v2;
		}
		// everything else
		return v1 === v2;
	};
}
```

Here is great [Collection of ES6 shims](https://github.com/paulmillr/es6-shim/)

## Syntax

### `let` & `const`
Fundamental unit of variable scoping in JavaScript has always been the function.

Instead of using `var`, which always declares variables attached to the enclosing function (or global, if top level) scope, use `let`.

When a variable is declared using `let`, it uses what some call __lexical-scoping__ or __block-scoping__. Unlike variables declared with `var` whose scopes leak out to their containing function, block-scoped variables are not visible outside of their nearest containing block or for-loop.

> Always put the let declaration(s) at the very top of that block.

> Unlike `var`, double variable declarations with `let` are not as forgiving.

`const` are like `let` declarations but, as their name implies, their value cannot be changed once they are bound. In other words, they have the same scoping rules as `let`, but you can’t re-assign to them.

```javascript
{
	console.log( a );	// undefined
    console.log( b );	// ReferenceError!
    
    // `a` is not declared
	if (typeof a === "undefined") {
		console.log( "cool" );
	}

	// `b` is declared, but in its TDZ
	if (typeof b === "undefined") {	// ReferenceError!
		// ..
	}

	var a;
    let b;
	let b;	// error: can't re-declare 'x' in the same scope

    const obj = { a: true };

    obj.b = 'newProp'; 		// ok
    obj = { c: false };		// Error!
}
```

> __Warning__: This ReferenceError from accessing too-early let-declared references is technically called a __Temporal Dead Zone__ (__TDZ__) error - this happens because `let` doesn't get hoisted.

> __Warning__: Assigning an object or array as a constant means that value will not be able to be garbage collected until that constant's lexical scope goes away, as the reference to the value can never be unset.

### Variable capturing quirks
`setTimeout` will run a function after some number of milliseconds, but only after the `for` loop has stopped executing; By the time the `for` loop has stopped executing, the value of `i` is `10`. So each time the given function gets called, it will print out `10`!
```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
} // 5 5 5 5 5
```
A common work around is to use an __IIFE__ - an __Immediately Invoked Function Expression__ - to capture `i` at each iteration:
```javascript
for (var i = 0; i < 5; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
} // 0 1 2 3 4
```
`let` declarations have drastically different behavior when declared as part of a loop. Rather than just introducing a new environment to the loop itself, these declarations sort of create a new scope _per iteration_.
```javascript
for (let i = 0; i < 5 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}  // 0 1 2 3 4
```

### Block-scoped Functions
Starting with ES6, function declarations that occur inside of blocks are now specified to be scoped to that block.

```javascript
{
	foo();	// works!

	function foo() {
		// ..
	}
}

foo();		// ReferenceError
```
The `foo()` function is declared inside the `{ .. }` block, and as of ES6 is block-scoped there. So it's not available outside that block. But also note that it is "_hoisted_" within the block, as opposed to let declarations, which suffer the TDZ error trap mentioned earlier.

```javascript
if (something) {
	function foo() {
		console.log( "1" );
	}
}
else {
	function foo() {
		console.log( "2" );
	}
}

foo();		// ReferenceError
```
In pre-ES6 environments, `foo()` would print "2" regardless of the value of `something`, because both function declarations were hoisted out of the blocks, and the second one always wins.


### Spread Operator
The spread operator is the opposite of destructuring. It allows you to spread an array into another array, or an object into another object.

Spread operator can be applied to any entity which has `[Symbol.iterator]`.

```javascript
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];	// [0, 1, 2, 3, 4, 5]

// You can also spread objects:
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };

// food property in defaults overwrites food: "rich":
let search = { ...defaults, food: "rich" };
// { food: "rich", price: "$$", ambiance: "noisy" }
```

Object spread also has a couple of other surprising limits. First, it only includes an objects’ __own, enumerable properties__. Basically, that means you lose methods when you spread instances of an object:
```javascript
class C {
  p = 12;
  m() {
  }
}

let c = new C();
let clone = { ...c };
clone.p;	// ok
clone.m();	// error!
```

### Rest Operator
The `...args` in the `foo(..)` function declaration is called "__rest parameters__," because you're collecting the rest of the parameters.
```javascript
function foo(x,y,z) {
	console.log( x, y, z );
}

foo( ...[1,2,3] );	// 1 2 3

function foo(x, y, ...z) {
	console.log( x, y, z );
}

foo( 1, 2, 3, 4, 5 );	// 1 2 [3,4,5]

function foo(...args) {
	console.log(args);
}

foo( 1, 2, 3, 4, 5);	// [1,2,3,4,5]
```

### Default Parameter Values
```javascript
function foo(x = 1, y = 2) {
	console.log( x + y );
}

foo();			// 3
foo( 5, null );		// 5  <-- null coerces to `0`
```
Function default values can be more than just simple values like _31_; they can be any valid expression, even a function call:
```javascript
function foo(x = y + 3, z = bar( x )) {
	console.log( x, z );
}
```


### Destructuring
Like array destructuring, you can have assignment without declaration:
```javascript
({ a, b } = { a: "baz", b: 101 });
```
> __Notice__ that we had to surround this statement with parentheses. JavaScript normally parses a `{` as the start of block.

You can create a variable for the remaining items in an object using the syntax `...`:
```javascript
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

Default values let you specify a default value in case a property is undefined:
```javascript
let { a, b = 1001 } = wholeObject;
```

Destructuring also works in function declarations.
```javascript
function f({ a, b } = { a: "", b: 0 }): void {
    // ...
}
f(); // ok, default to { a: "", b: 0 }


function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```

Examples:
```javascript
function foo() {
	return [1,2,3];
}

function bar() {
	return {
		x: 4,
		y: 5,
		z: 6
	};
}

// You can also give different names to properties
var { x: bam, y: baz, z: bap } = bar();
console.log( bam, baz, bap );		// 4 5 6

// You can use the same name as object keys
var { x, y, z } = bar();
console.log( x, y, z );			// 4 5 6

// Array destructurization
var a, b, c, x, y, z;
[a,b,c] = foo();
console.log( a, b, c );			// 1 2 3
( { x, y, z } = bar() );		//!NOTE
console.log( x, y, z );			// 4 5 6

// Can use the general assignments to create object mappings/transformations
var o = {};
[o.a, o.b, o.c] = foo();
( { x: o.x, y: o.y, z: o.z } = bar() );
console.log( o.a, o.b, o.c );		// 1 2 3
console.log( o.x, o.y, o.z );		// 4 5 6

// computed property
var which = "x",
	o = {};
( { [which]: o[which] } = bar() );
console.log( o.x );			// 4

// mapping from object to array
var o1 = { a: 1, b: 2, c: 3 },
	a2 = [];
( { a: a2[0], b: a2[1], c: a2[2] } = o1 );
console.log( a2 );			// [1,2,3]

// mapping from array to object
var a1 = [ 1, 2, 3 ],
	o2 = {};
[ o2.a, o2.b, o2.c ] = a1;
console.log( o2.a, o2.b, o2.c );	// 1 2 3

// Missing some fields or array elements
var [,b] = foo();
var { x, z } = bar();
console.log( b, x, z );				// 2 4 6

var a = [2,3,4];
var [ b, ...c ] = a;
console.log( b, c );				// 2 [3,4]

// Default Value Assignment
var [ a = 3, b = 6, c = 9, d = 12 ] = foo();
var { x = 5, y = 10, z = 15, w = 20 } = bar();
console.log( a, b, c, d );			// 1 2 3 12
console.log( x, y, z, w );			// 4 5 6 20

// Nested Destructuring
var a1 = [ 1, [2, 3, 4], 5 ];
var o1 = { x: { y: { z: 6 } } };
var [ a, [ b, c, d ], e ] = a1;
var { x: { y: { z: w } } } = o1;
console.log( a, b, c, d, e );			// 1 2 3 4 5
console.log( w );				// 6

// Destructuring Parameters
function foo2( { x, y } ) {
	console.log( x, y );
}
foo2( { y: 1, x: 2 } );				// 2 1

function bar2( [ x, y ] ) {
	console.log( x, y );
}
bar2( [ 1, 2 ] );				// 1 2

// Destructuring Defaults + Parameter Defaults
function f6({ x = 10 } = {}, { y } = { y: 10 }) {
	console.log( x, y );
}
f6();						// 10 10

// Advanced
var o = { a:1, b:2, c:3 },
	p = [4,5,6],
	a, b, c, x, y, z;
( {a} = {b,c} = o );
[x,y] = [z] = p;
console.log( a, b, c );			// 1 2 3
console.log( x, y, z );			// 4 5 4
```
> __Note__: For the object destructuring form specifically, when leaving off a var/let/const declarator, we had to surround the whole assignment expression in `'( )'`, because otherwise the `'{ .. }'` on the lefthand side as the first element in the statement is taken to be a block statement instead of an object.

The `[which]:` part is the computed property, which results in `x` -- the property to destructure from the object in question as the source of the assignment. The `o[which]` part is just a normal object key reference, which equates to `o.x` as the target of the assignment.

You can even solve the traditional "swap two variables" task without a temporary variable:
```javascript
var x = 10, y = 20;
[ y, x ] = [ x, y ];

console.log( x, y );				// 20 10
```


### Object Literal Extensions
```javascript
let x = 10,
	obj = {
		x, // concise form of 'x: x'
		y(), // concise of 'x: function() {...}'
		something: function something(x,y) {
			// call something recirsively
		} // this method down't have correct concise form due to recursion
	}
```

### ES5 Getter/Setter
```javascript
var o = {
	__id: 10,
	get id() { return this.__id++; },
	set id(v) { this.__id = v; }
}

o.id;			// 10
o.id;			// 11
o.id = 20;
o.id;			// 20
o.__id;			// 21
o.__id;			// 21 -- still!
```

### Computed Property Names
Any valid expression can appear inside the `[ .. ]` that sits in the property name position of the object literal definition.
```javascript
var prefix = "user_";
var obj = {
	[ prefix + "foo" ]: function(..){ .. },
	["f" + "oo"]() { .. }	// computed concise method
	*["b" + "ar"]() { .. }	// computed concise generator
};
```

### Setting `[[Prototype]]`
Sometimes it will be helpful to assign the `[[Prototype]]` of an object at the same time you're declaring its object literal. The following has been a nonstandard extension in many JS engines for a while, but is standardized as of ES6:
```javascript
var o1 = {...};

var o2 = {
	...
	__proto__: o1,
};
```
__o2__ is declared with a normal object literal, but it's also `[[Prototype]]`-linked to o1. It is better to use `Object.setPrototypeOf( o2, o1 )`

### Object `super`
```javascript
var o1 = {
	foo() {
		console.log( "o1:foo" );
	}
};

var o2 = {
	foo() {
		super.foo();
		console.log( "o2:foo" );
	}
};

Object.setPrototypeOf( o2, o1 );

o2.foo();		// o1:foo
			// o2:foo
```

### Template Literals
These string literals allow basic string interpolation expressions to be embedded, which are then automatically parsed and evaluated.
```javascript
var name = "Kyle";
var greeting = `Hello ${name}!`;
var text =
`Now is the time for all good men
to come to the aid of their
country!`;

console.log( greeting );			// "Hello Kyle!"
console.log( typeof greeting );			// "string"
```
> One really nice benefit of interpolated string literals is they are allowed to split across multiple lines

An interpolated string literal is kind of like an IIFE, and it turns out thinking about it like that explains the scoping behavior as well.
```javascript
function foo(str) {
	var name = "foo";
	console.log( str );
}

function bar() {
	var name = "bar";
	foo( `Hello from ${name}!` );
}

var name = "global";

bar();				// "Hello from bar!" - not "blobal"
```
At the moment the __\`..\`__ string literal is expressed, inside the `bar()` function, the scope available to it finds `bar()`'s name variable with value `"bar"`. Neither the global `name` nor `foo(..)`'s name matter. In other words, an interpolated string literal is just lexically scoped where it appears, not dynamically scoped in any way.

### Tagged Template Literals
It's essentially a special kind of function call that doesn't need the `( .. )`. The __tag__ -- the `foo` part before the __\`..\`__ string literal -- is a function value that should be called. Actually, it can be any expression that results in a function, even a function call that returns another function, like:
```javascript
function foo(strings, ...values) {
	console.log( strings );
	console.log( values );
}

var desc = "awesome";

foo`Everything is ${desc}!`;
// [ "Everything is ", "!"]
// [ "awesome" ]
```
The first argument -- we called it strings -- is an array of all the plain strings (the stuff between any interpolated expressions). We get two values in the strings array: `"Everything is "` and `"!"`.
We then gather up all subsequent arguments into an array called `values` using the ... gather/rest operator.

### Raw Strings
There's an additional bit of data included: the raw unprocessed versions of all the strings. You can access those raw string values using the `.raw` property, like this:
```javascript
function showraw(strings, ...values) {
	console.log( strings );
	console.log( strings.raw );
}

showraw`Hello\nWorld`;
// [ "Hello
// World" ]
// [ "Hello\nWorld" ]
```
The raw version of the value preserves the raw escaped `\n` sequence, while the processed version considers it a single newline character.

ES6 comes with a built-in function that can be used as a string literal tag: `String.raw(..)`. It simply passes through the raw versions of the `strings` values:
```javascript
console.log( `Hello\nWorld` );
// Hello
// World

console.log( String.raw`Hello\nWorld` );
// Hello\nWorld

String.raw`Hello\nWorld`.length;
// 12
```

### Arrow Functions
The arrow function definition consists of a parameter list (of zero or more parameters, and surrounding `( .. )` if there's not exactly one parameter), followed by the `=>` marker, followed by a function body.

The body only needs to be enclosed by `{ .. }` if there's more than one expression, or if the body consists of a non-expression statement. If there's only one expression, and you omit the surrounding `{ .. }`, there's an implied `return` in front of the expression.

> __Note__: All the capabilities of normal function parameters are available to arrow functions, including default values, destructuring, rest parameters, and so on.

```javascript
let dollabillsyall = (strings, ...values) =>
	strings.reduce( (s,v,idx) => {
		if (idx > 0) {
			if (typeof values[idx-1] == "number") {
				// look, also using interpolated
				// string literals!
				s += `$${values[idx-1].toFixed( 2 )}`;
			}
			else {
				s += values[idx-1];
			}
		}

		return s + v;
	}, "" );

let amt1 = 11.99, amt2 = amt1 * 1.08,name = "Kyle";

var text = dollabillsyall
`Thanks for your purchase, ${name}! Your
product cost was ${amt1}, which with tax
comes out to ${amt2}.`

console.log( text );
// Thanks for your purchase, Kyle! Your
// product cost was $11.99, which with tax
// comes out to $12.95.
```
Arrow functions doen't have their own `this`. `this` inside of arrow fuction points to enclosing function.

> When we decalre a function, the enclosing object becomes `this` for the function. If we declare function without enclosing object, then `this` going to point to global object like `window`.

In addition to lexical `this`, arrow functions also have lexical `arguments` -- they don't have their own `arguments` array but instead inherit from their parent -- as well as lexical `super` and `new.target`.

### `for..of` Loops
Joining the `for` and `for..in` loops from the JavaScript we're all familiar with, ES6 adds a `for..of` loop, which loops over the set of values produced by an iterator.

`for..in` is used to loop through properties of an object. As you can see, `for..in` loops over the __keys/indexes__ in the array, while `for..of` loops over the __values__.
```javascript
var a = ["a","b","c","d","e"];

for (var idx in a) {
	console.log( idx );
}
// 0 1 2 3 4 - because array in an object {1: "a", 2: "b" ...}

for (var val of a) {
	console.log( val );
}
// "a" "b" "c" "d" "e"

for (var c of "hello") {
	console.log( c );
}
// "h" "e" "l" "l" "o"

var o = {};
for (o.a of [1,2,3]) {
	console.log( o.a );
}
// 1 2 3
for ({x: o.a} of [ {x: 1}, {x: 2}, {x: 3} ]) {
  console.log( o.a );
}
// 1 2 3
```
Standard built-in values in JavaScript that are by default iterables (or provide them) include:
* Arrays
* Strings
* Generators
* Collections / TypedArrays

### Symbols
`symbol` is a new primitive type. The main point of a symbol is to create a string-like value that can't collide with any other value.
* The internal value of a symbol itself -- referred to as its `name` -- is hidden from the code and cannot be obtained. You can think of this symbol value as an automatically generated, unique (within your application) string value.
* You cannot and should not use `new` with `Symbol(..)`. It's not a constructor, nor are you producing an object.
* The parameter passed to `Symbol(..)` is optional. If passed, it should be a string that gives a friendly description for the symbol's purpose.
* The description, if provided, is solely used for the stringification representation of the symbol
* The `typeof` output is a new value (`"symbol"`) that is the primary way to identify a symbol.
```javascript
var sym = Symbol( "some optional description" );
sym.toString();		// "Symbol(some optional description)"
typeof sym;		// "symbol"
```

Similar to how primitive string values are not instances of `String`, symbols are also not instances of `Symbol`. If, for some reason, you want to construct a boxed wrapper object form of a symbol value, you can do the following:
```javascript
sym instanceof Symbol;		// false

var symObj = Object( sym );
symObj instanceof Symbol;	// true

symObj.valueOf() === sym;	// true
```

Examples:
```javascript
// listener
const EVT_LOGIN = Symbol( "event.login" );
evthub.listen( EVT_LOGIN, function(data){
	// ..
} );

// Singleton Pattern
const INSTANCE = Symbol( "instance" );

function HappyFace() {
	if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

	function smile() { .. }

	return HappyFace[INSTANCE] = {
		smile: smile
	};
}

var me = HappyFace(),
	you = HappyFace();

me === you;			// true
```

To aid in organizing code with access to these symbols, you can create symbol values with the __global symbol registry__. For example:
```javascript
const EVT_LOGIN = Symbol.for( "event.login" );

console.log( EVT_LOGIN );	// Symbol(event.login)
```
`Symbol.for(..)` looks in the global symbol registry to see if a symbol is already stored with the provided description text, and returns it if so. If not, it creates one to return. In other words, the global symbol registry treats symbol values, by description text, as singletons themselves.

But that also means that any part of your application can retrieve the symbol from the registry using Symbol.for(..), as long as the matching description name is used.

### Symbols as Object Properties

If a symbol is used as a property/key of an object, it's stored in a special way so that the property will not show up in a normal enumeration of the object's properties:
```javascript
var o = {
	foo: 42,
	[ Symbol( "bar" ) ]: "hello world",
	baz: true
};

Object.getOwnPropertyNames( o );	// [ "foo","baz" ]

// To retrieve an object's symbol properties
Object.getOwnPropertySymbols( o );	// [ Symbol(bar) ]
```

### Built-In Symbols
ES6 comes with a number of predefined built-in symbols that expose various meta behaviors on JavaScript object values. However, these symbols are not registered in the global symbol registry, as one might expect.

* `Symbol.hasInstance`
	
	A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.

* `Symbol.isConcatSpreadable`
	
	A Boolean value indicating that an object should be flattened to its array elements by Array.prototype.concat.

* `Symbol.iterator`
	
	A method that returns the default iterator for an object. Called by the semantics of the for-of statement.

* `Symbol.match`

	A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.

* `Symbol.replace`
	
	A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.

* `Symbol.search`
	
	A regular expression method that returns the index within a string that matches the regular expression. Called by the String.prototype.search method.

* `Symbol.species`
	
	A function valued property that is the constructor function that is used to create derived objects.

* `Symbol.split`
	
	A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.

* `Symbol.toPrimitive`
	
	A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.

* `Symbol.toStringTag`
	
	A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.

* `Symbol.unscopables`
	
	An Object whose own property names are property names that are excluded from the ‘with’ environment bindings of the associated objects.

Instead, they're stored as properties on the `Symbol` function object. For example, in the "`for..of`" section earlier in this chapter, we introduced the `Symbol.iterator` value:
```javascript
var a = [1,2,3];

a[Symbol.iterator];			// native function
```

The specification uses the `@@` prefix notation to refer to the built-in symbols, the most common ones being: `@@iterator`, `@@toStringTag`, `@@toPrimitive`.

### Number Literal Extensions
ES5 continued to permit the browser-extended octal form (including such inconsistencies), except that in strict mode, the octal literal (`052`) form is disallowed.
Here are the new ES6 number literal forms:
```javascript
var dec = 42,
	oct = 0o52,		// not 052
	hex = 0x2a,		// or `0X2a`
	bin = 0b101010;		// or `0B101010`
```
In fact, you can represent a number this way in any base from __2__ to __36__.
```javascript
var a = 42;

a.toString();			// "42" -- also `a.toString( 10 )`
a.toString( 8 );		// "52"
a.toString( 16 );		// "2a"
a.toString( 2 );		// "101010"
```

### Unicode
The Unicode characters that range from `0x0000` to `0xFFFF` contain all the standard printed characters (in various languages) that you're likely to have seen or interacted with. This group of characters is called the __Basic Multilingual Plane (BMP)__.

Prior to ES6, JavaScript strings could specify Unicode characters using Unicode escaping, such as:
```javascript
var snowman = "\u2603";
console.log( snowman );			// "☃"
```

However, the `\uXXXX` Unicode escaping only supports four hexadecimal characters, so you can only represent the BMP set of characters in this way. To represent an astral character using Unicode escaping prior to ES6, you need to use a surrogate pair -- basically two specially calculated Unicode-escaped characters side by side, which JS interprets together as a single astral character:
```javascript
var gclef = "\uD834\uDD1E";
console.log( gclef );			// "𝄞"
```

As of ES6, we now have a new form for Unicode escaping (in strings and regular expressions), called Unicode code point escaping:
```javascript
var gclef = "\u{1D11E}";
console.log( gclef );			// "𝄞"
```

### Unicode-Aware String Operations
But, how do we accurately calculate the length of such a string? In this scenario, the following trick will work:
```javascript
var snowman = "☃";
snowman.length;					// 1

var gclef = "𝄞";
gclef.length;					// 2

// trick
[...gclef].length;				// 1
Array.from( gclef ).length;			// 1
```
Recall from the "`for..of` Loops" section earlier in this chapter that ES6 strings have built-in iterators. This iterator happens to be Unicode-aware, meaning it will automatically output an astral symbol as a single value. We take advantage of that using the `...` spread operator in an array literal, which creates an array of the string's symbols. Then we just inspect the length of that resultant array. ES6's `Array.from(..)` does basically the same thing as `[...XYZ]`.

Consider these two string outputs:
```javascript
var s1 = "\xE9",
	s2 = "e\u0301";

console.log( s1 );				// "é"
console.log( s2 );				// "é"

// the trick doesn't work
[...s1].length;					// 1
[...s2].length;					// 2

s1.normalize().length;				// 1
s2.normalize().length;				// 1

s1 === s2;					// false
s1 === s2.normalize();				// true
```

Essentially, `normalize(..)` takes a sequence like `"e\u0301"` and normalizes it to `"\xE9"`.

Unfortunately, normalization isn't fully perfect here, either. If you have multiple combining marks modifying a single character, you may not get the length count you'd expect, because there may not be a single defined normalized character that represents the combination of all the marks. For example:
```javascript
var s1 = "e\u0301\u0330";

console.log( s1 );				// "ḛ́"

s1.normalize().length;				// 2
```

The further you go down this rabbit hole, the more you realize that it's difficult to get one precise definition for "length." What we see visually rendered as a single character -- more precisely called a __grapheme__ -- doesn't always strictly relate to a single "character" in the program processing sense.

### Character Positioning
Similar to length complications, what does it actually mean to ask, "what is the character at position 2?" The naive pre-ES6 answer comes from `charAt(..)`, which will not respect the atomicity of an astral character, nor will it take into account combining marks.

So, is ES6 giving us a Unicode-aware version of `charAt(..)`? Unfortunately, no. At the time of this writing, there's a proposal for such a utility that's under consideration for post-ES6.
```javascript
var s1 = "abc\u0301d",
	s2 = "ab\u0107d",
	s3 = "ab\u{1d49e}d";

console.log( s1 );			// "abćd"
console.log( s2 );			// "abćd"
console.log( s3 );			// "ab𝒞d"

s1.charAt( 2 );				// "c"
s2.charAt( 2 );				// "ć"
s3.charAt( 2 );				// "" <-- unprintable surrogate
s3.charAt( 3 );				// "" <-- unprintable surrogate

// The HACK
[...s1.normalize()][2];			// "ć"
[...s2.normalize()][2];			// "ć"
[...s3.normalize()][2];			// "𝒞"
```

> __Warning__: Reminder of an earlier warning: constructing and exhausting an iterator each time you want to get at a single character is... not very ideal, performance wise.

ES6 gives us `codePointAt(..)` and `String.fromCodePoint(..)`:
```javascript
s1.normalize().codePointAt( 2 ).toString( 16 );		// "107"
s2.normalize().codePointAt( 2 ).toString( 16 );		// "107"
s3.normalize().codePointAt( 2 ).toString( 16 );		// "1d49e"

String.fromCodePoint( 0x107 );				// "ć"
String.fromCodePoint( 0x1d49e );			// "𝒞"

// Solution
String.fromCodePoint( s1.normalize().codePointAt( 2 ) ); // "ć"
String.fromCodePoint( s2.normalize().codePointAt( 2 ) ); // "ć"
String.fromCodePoint( s3.normalize().codePointAt( 2 ) ); // "𝒞"
```
> There's quite a few other string methods we haven't addressed here, including `toUpperCase()`, `toLowerCase()`, `substring(..)`, `indexOf(..)`, `slice(..)`, and a dozen others. None of these have been changed or augmented for full Unicode awareness, so you should be very careful -- probably just avoid them! -- when working with strings containing astral symbols.

There are also several string methods that use regular expressions for their behavior, like `replace(..)` and `match(..)`. Thankfully, ES6 brings Unicode awareness to regular expressions.

### Unicode Identifier Names
Unicode can also be used in identifier names:
```javascript
// Prior to ES6
var \u03A9 = 42;		// same as: var Ω = 42;

// As of ES6
var \u{2B400} = 42;		// same as: var 𫐀 = 42;
```

### Regular Expressions
JavaScript strings are typically interpreted as sequences of 16-bit characters, which correspond to the characters in the Basic Multilingual Plane (BMP). But there are many UTF-16 characters that fall outside this range, and so strings may have these multibyte characters in them.

Prior to ES6, regular expressions could only match based on BMP characters, which means that those extended characters were treated as two separate characters for matching purposes

So, as of ES6, the `u` flag tells a regular expression to process a string with the interpretation of Unicode (UTF-16) characters, such that such an extended character will be matched as a single entity.

> __Warning__: Despite the name implication, "UTF-16" doesn't strictly mean 16 bits. Modern Unicode uses 21 bits, and standards like UTF-8 and UTF-16 refer roughly to how many bits are used in the representation of a character.

If this character appears in a regular expression pattern (like /𝄞/), the standard BMP interpretation would be that it's two separate characters (0xD834 and 0xDD1E) to match with. But the new ES6 Unicode-aware mode means that /𝄞/u (or the escaped Unicode form /\u{1D11E}/u) will match "𝄞" in a string as a single matched character.

Another flag mode added to ES6 regular expressions is `y`, which is often called "sticky mode." _Sticky_ essentially means the regular expression has a virtual anchor at its beginning that keeps it rooted to matching at only the position indicated by the regular expression's `lastIndex` property.

```javascript
var re2 = /foo/y,		// <-- notice the `y` sticky flag
	str = "++foo++";

re2.lastIndex;			// 0
re2.test( str );		// false -- "foo" not found at `0`
re2.lastIndex;			// 0

re2.lastIndex = 2;
re2.test( str );		// true
re2.lastIndex;			// 5 -- updated to after previous match

re2.test( str );		// false
re2.lastIndex;			// 0 -- reset after previous match failure


var re = /f../y,
	str = "foo       far       fad";

str.match( re );		// ["foo"]

re.lastIndex = 10;
str.match( re );		// ["far"]

re.lastIndex = 20;
str.match( re );		// ["fad"]
```

And so our new observations about sticky mode:
* `test(..)` uses `lastIndex` as the exact and only position in `str` to look to make a match. There is no moving ahead to look for the match -- it's either there at the `lastIndex` position or not.
* If a match is made, `test(..)` updates `lastIndex` to point to the character immediately following the match. If a match fails, `test(..)` resets `lastIndex` back to `0`.

Normal non-sticky patterns that aren't otherwise `^`-rooted to the start-of-input are free to move ahead in the input string looking for a match. But sticky mode restricts the pattern to matching just at the position of `lastIndex`.

Some readers may be aware that you can emulate something like this lastIndex-relative matching with the `g` global match flag and the `exec(..)` method.
```javascript
var re = /o+./g,		// <-- look, `g`!
	str = "foot book more";

re.exec( str );			// ["oot"]
re.lastIndex;			// 4

re.exec( str );			// ["ook"]
re.lastIndex;			// 9

re.exec( str );			// ["or"]
re.lastIndex;			// 13

re.exec( str );			// null -- no more matches!
re.lastIndex;			// 0 -- starts over now!
```


As of ES6, you can now get these values directly, with the new `flags` property:
```javascript
var re = /foo/ig;
re.flags;			// "gi"

var re1 = /foo*/y;
re1.source;			// "foo*"
re1.flags;			// "y"

var re2 = new RegExp( re1 );
re2.source;			// "foo*"
re2.flags;			// "y"

var re3 = new RegExp( re1, "ig" );
re3.source;			// "foo*"
re3.flags;			// "gi"
```

## Organization

### Iterators
An iterator is a structured pattern for pulling information from a source in one-at-a-time fashion. `Iterator` interface as having the following requirement:
```javascript
Iterator [required]
	next() {method}: retrieves next IteratorResult
```

There are two optional members that some iterators are extended with:
```javascript
Iterator [optional]
	return() {method}: stops iterator and returns IteratorResult
	throw() {method}: signals error and returns IteratorResult
```

The `IteratorResult` interface is specified as:
```javascript
IteratorResult
	value {property}: current iteration value or final return value
		(optional if `undefined`)
	done {property}: boolean, indicates completion status
```

There's also an `Iterable` interface, which describes objects that must be able to produce iterators:
```javascript
Iterable
	@@iterator() {method}: produces an Iterator
```

The `IteratorResult` interface specifies that the return value from any iterator operation will be an object of the form:
```javascript
{ value: .. , done: true / false }
```

Example:
```javascript
var arr = [1,2];

var it = arr[Symbol.iterator]();

it.next();		// { value: 1, done: false }
it.next();		// { value: 2, done: false }

it.next();		// { value: undefined, done: true }
```

All new ES6 collections are not only iterables themselves, but they also provide API method(s) to generate an iterator.

__next()__

By general convention, including all the built-in iterators, calling `next(..)` on an iterator that's already been exhausted is not an error, but will simply continue to return the result `{ value: undefined, done: true }`.

The optional methods on the iterator interface -- `return(..)` and `throw(..)` -- are not implemented on most of the built-in iterators. However, they definitely do mean something in the context of generator.

__return()__

`return(..)` is defined as sending a signal to an iterator that the consuming code is complete and will not be pulling any more values from it. This signal can be used to notify the producer (the iterator responding to `next(..)` calls) to perform any cleanup it may need to do, such as releasing/closing network, database, or file handle resources.

If an iterator has a `return(..)` present and any condition occurs that can automatically be interpreted as abnormal or early termination of consuming the iterator, `return(..)` will automatically be called. You can call `return(..)` manually as well.

`return(..)` will return an `IteratorResult` object just like `next(..)` does. In general, the optional value you send to `return(..)` would be sent back as `value` in this `IteratorResult`, though there are nuanced cases where that might not be true.

__throw()__

`throw(..)` is used to signal an exception/error to an iterator, which possibly may be used differently by the iterator than the completion signal implied by `return(..)`. It does not necessarily imply a complete stop of the iterator as `return(..)` generally does.

For example, with generator iterators, `throw(..)` actually injects a thrown exception into the generator's paused execution context, which can be caught with a `try..catch`. An uncaught `throw(..)` exception would end up abnormally aborting the generator's iterator.

> __Note:__ By general convention, an iterator should not produce any more results after having called `return(..)` or `throw(..)`.

__Iterator Loop__

If an iterator is also an iterable, it can be used directly with the `for..of` loop. You make an iterator an iterable by giving it a `Symbol.iterator` method that simply returns the iterator itself:
```javascript
var it = {
	// make the `it` iterator an iterable
	[Symbol.iterator]() { return this; },

	next() { .. },
	..
};

it[Symbol.iterator]() === it;		// true

for (var v of it) {
	console.log( v );
}
// or
for (var v, res; (res = it.next()) && !res.done; ) {
	v = res.value;
	console.log( v );
}
```

__Custom Iterators__
```javascript
var Fib = {
	[Symbol.iterator]() {
		var n1 = 1, n2 = 1;

		return {
			// make the iterator an iterable
			[Symbol.iterator]() { return this; },

			next() {
				var current = n2;
				n2 = n1;
				n1 = n1 + current;
				return { value: current, done: false };
			},

			return(v) {
				console.log("Fibonacci sequence abandoned.");

				return { value: v, done: true };
			}
		};
	}
};

for (var v of Fib) {
	console.log( v );

	if (v > 50) break;
}
// 1 1 2 3 5 8 13 21 34 55
// Fibonacci sequence abandoned.
```

The `...` spread operator fully exhausts an iterator:
```javascript
if (!Number.prototype[Symbol.iterator]) {
	Object.defineProperty(
		Number.prototype,
		Symbol.iterator,
		{
			writable: true,
			configurable: true,
			enumerable: false,
			value: function iterator(){
				var i, inc, done = false, top = +this;

				// iterate positively or negatively?
				inc = 1 * (top < 0 ? -1 : 1);

				return {
					// make the iterator itself an iterable!
					[Symbol.iterator](){ return this; },

					next() {
						if (!done) {
							// initial iteration always 0
							if (i == null) {
								i = 0;
							}
							// iterating positively
							else if (top >= 0) {
								i = Math.min(top,i + inc);
							}
							// iterating negatively
							else {
								i = Math.max(top,i + inc);
							}

							// done after this iteration?
							if (i == top) done = true;

							return { value: i, done: false };
						}
						else {
							return { done: true };
						}
					}
				};
			}
		}
	);
}

for (var i of 3) {
	console.log( i );
}
// 0 1 2 3

[...-3];				// [0,-1,-2,-3]
```

### Generators
A generator is a function that can pause itself in mid-execution, and can be resumed either right away or at a later time.

__yield__

`yield()` pauses the generator.
```javascript
function *foo() {
	var x = yield 10;
	console.log( x );
}
```
This generator will first `yield` out the value `10` when pausing itself. When you resume the generator -- using the `it.next(..)` we referred to earlier -- whatever value (if any) you resume with will replace/complete the whole `yield 10` expression, meaning that value will be assigned to the `x` variable.

A `yield ..` expression can appear anywhere a normal expression can. `yield ..` can basically appear anywhere a = 3 can validly appear.

```javascript
var a, b;
var arr = [ yield 1, yield 2, yield 3 ];

a = 3;				// valid
b = 2 + a = 3;			// invalid
b = 2 + (a = 3);		// valid

yield 3;			// valid
a = 2 + yield 3;		// invalid
a = 2 + (yield 3);		// valid

yield 2 + 3;			// same as `yield (2 + 3)`
(yield 2) + 3;			// `yield 2` first, then `+ 3`
```

> __Note:__ If you think about it, it makes a sort of conceptual sense that a `yield ..` expression would behave similar to an assignment expression. When a paused `yield` expression is resumed, it's completed/replaced by the resumption value in a way that's not terribly dissimilar from being "assigned" that value.

> The takeaway: if you need `yield ..` to appear in a position where an assignment like `a = 3` would not itself be allowed, it needs to be wrapped in a `( )`.

Because of the low precedence of the `yield` keyword, almost any expression after a `yield ..` will be computed first before being sent with yield. Only the `...` spread operator and the `,` comma operator have lower precedence, meaning they'd bind after the `yield` has been evaluated.

Just like `=` assignment, `yield` is also "right-associative," which means that multiple yield expressions in succession are treated as having been `( .. )` grouped from right to left. So, `yield yield yield 3` is treated as `yield (yield (yield 3))`. A "left-associative" interpretation like `((yield) yield) yield 3` would make no sense.

__yield *__
In the same way that the `*` makes a `function` declaration into `function *` generator declaration, a `*` makes yield into `yield *`, which is a very different mechanism, called __yield delegation__.

`yield * ..` requires an iterable; it then invokes that iterable's iterator, and delegates its own host generator's control to that iterator until it's exhausted.

Built-in iterators generally don't have return values, as we covered at the end of the "Iterator Loop" section earlier in this chapter. But if you define your own custom iterator (or generator), you can design it to `return` a value, which `yield *..` would capture.

```javascript
function *foo() {
	yield 1;
	yield 2;
	yield 3;
	return 4;
}

function *bar() {
	var x = yield *foo();
	console.log( "x:", x );
}

for (var v of bar()) {
	console.log( v );
}
// 1 2 3
// x: 4

function *foo(x) {
	if (x < 3) {
		x = yield *foo( x + 1 );
	}
	return x * 2;
}

foo( 1 ); // 3*2=6 => 6*2=12 => 12*2=24
```

__Iterator Control__

`next(value)` makes the `yield ..` which answers to `next`, return that value inside of generator.

```javascript
function *foo() {
	var x = yield 1;
	var y = yield 2;
	var z = yield 3;
	console.log( x, y, z );
}

var it = foo();

// start up the generator
it.next();				// { value: 1, done: false }

// answer first question
it.next( "foo" );		// { value: 2, done: false }

// answer second question
it.next( "bar" );		// { value: 3, done: false }

// answer third question
it.next( "baz" );		// "foo" "bar" "baz"
				// { value: undefined, done: true }
```

__Early Completion__

`return(..)` and `throw(..)` have the effect of aborting a paused generator immediately.

> Generator produces a whole new iterator each time it's called.

> In addition to `return(..)` being callable manually, it's also called automatically at the end of iteration by any of the ES6 constructs that consume iterators, such as the `for..of` loop and the `...` spread operator.

The purpose for this capability is so the generator can be notified if the controlling code is no longer going to iterate over it anymore, so that it can perhaps do any cleanup tasks (freeing up resources, resetting status, etc.). Identical to a normal function cleanup pattern, the main way to accomplish this is to use a `finally` clause:
```javascript
function *foo() {
	try {
		yield 1;
		yield 2;
		yield 3;
	}
	finally {
		console.log( "cleanup!" );
	}
}

for (var v of foo()) {
	console.log( v );
}
// 1 2 3
// cleanup!

var it = foo();

it.next();				// { value: 1, done: false }
it.return( 42 );			// cleanup!
					// { value: 42, done: true }

it.next();				// { value: undefined, done: true }
```

> __Warning:__ Do not put a `yield` statement inside the `finally` clause! It's valid and legal, but it's a really terrible idea. It acts in a sense as deferring the completion of the `return(..)` call you made, as any `yield ..` expressions in the `finally` clause are respected to pause and send messages; you don't immediately get a completed generator as expected.

__Early Abort__

`throw(..)` produces the same sort of early completion that aborts the generator's run at its current pause point.

> Just like `return(x)` is essentially injecting a `return x` into the generator at its current pause point, calling `throw(x)` is essentially like injecting a `throw x` at the pause point.

```javascript
function *foo() {
	yield 1;
	yield 2;
	yield 3;
}

var it = foo();

it.next();			// { value: 1, done: false }

try {
	it.throw( "Oops!" );
}
catch (err) {
	console.log( err );	// Exception: Oops!
}

it.next();			// { value: undefined, done: true }
```

Because `throw(..)` basically injects a `throw ..` in replacement of the `yield 1` line of the generator, and nothing handles this exception, it immediately propagates back out to the calling code, which handles it with a `try..catch`.

Of course, though not shown in the previous snippet, if a `try..finally` clause was waiting inside the generator when you call `throw(..)`, the `finally` clause would be given a chance to complete before the exception is propagated back to the calling code.

```javascript
function *foo() {
	try {
		yield 1;
	}
	catch (err) {
		console.log( err );
	}

	yield 2;

	throw "Hello!";
}

var it = foo();

it.next();				// { value: 1, done: false }

try {
	it.throw( "Hi!" );		// Hi!
					// { value: 2, done: false }
	it.next();

	console.log( "never gets here" );
}
catch (err) {
	console.log( err );		// Hello!
}
```

Unlike `return(..)`, the iterator's `throw(..)` method is never called automatically.

## Modules

* ES6 uses file-based modules, meaning one module per file.
* The API of an ES6 module is static. That is, you define statically what all the top-level exports are on your module's public API, and those cannot be amended later.
* ES6 modules are singletons. That is, there's only one instance of the module, which maintains its state.
* The properties and methods you expose on a module's public API are not just normal assignments of values or references. They are actual bindings (almost like pointers) to the identifiers in your inner module definition.
* Importing a module is the same thing as statically requesting it to load (if it hasn't already).

__`export` API Members__

Anything you don't label with `export` stays private inside the scope of the module.

> __Note:__ Modules do still have access to `window` and all the "globals" that hang off it, just not as lexical top-level scope. However, you really should stay away from the globals in your modules if at all possible.

```javascript
export function foo() {
	// ..
}

export var awesome = 42;

var bar = [1,2,3];

export {
	bar,
	bar as arr
};
```

Within your module, if you change the value of a variable you already exported a binding to, even if it's already been imported (see the next section), the imported binding will resolve to the current (updated) value.

Though you can clearly use `export` multiple times inside a module's definition, ES6 definitely prefers the approach that a module has a single export, which is known as a __default export__. There can only be one `default` per module definition.

```javascript
var awesome = 42;

export default awesome;
// or
export { foo as default };

// later
awesome = 100;
```

> __Note:__ I used the name `foo` for the function that `default` labels. That `foo` name, however, is ignored for the purposes of export -- `default` is actually the exported name. When you import this default binding, you can give it whatever name you want, as you'll see in the next section.

 You can have a single default export as well as other named exports; they are _not mutually exclusive_.

```javascript
function foo() { .. }
function bar() { .. }
function baz() { .. }

export { foo as default, bar, baz, .. };
```

> __Warning:__ Two-way bindings are not allowed. If you import a `foo` from a module, and try to change the value of your imported `foo` variable, an error will be thrown!

You can also re-export another module's exports, such as:
```javascript
export { foo, bar } from "baz";
export { foo as FOO, bar as BAR } from "baz";
export * from "baz";
```

__`import` API Members__
```javascript
import { bar, baz } from "foo";
import { foo as theFooFunc } from "foo";

// importing default export
import foo from "foo";
// or:
import { default as foo } from "foo";

// importing default along with named exports
import FOOFN, { bar, baz as BAZ } from "foo";

// importing entire API to a single module namespace binding
import * as foo from "foo";

/*
Doesn't actually import any of the module's bindings into your scope.
It loads (if not already loaded), compiles (if not already compiled),
and evaluates (if not already run) the "foo" module.
*/
import "foo";
```

> __Warning:__ The `{ .. }` syntax here may look like an object literal, or even an object destructuring syntax. However, its form is special just for modules, so be careful not to confuse it with other `{ .. }` patterns elsewhere.

If the module you're importing with `* as ..` has a default export, it is named `default` in the namespace specified. You can additionally name the default import outside of the namespace binding, as a top-level identifier.

```javascript
export default function foo() { .. }
export function bar() { .. }
export function baz() { .. }


import foofn, * as hello from "world";

foofn();
hello.default();
hello.bar();
hello.baz();
```

> __Warning:__ All imported bindings are immutable and/or read-only. Changing imorted module will cause error.

> `import` declarations are "hoisted".

__Circular Module Dependency__
The static loading semantics of the `import` statement mean that a `"foo"` and `"bar"` that mutually depend on each other via `import` will ensure that both are loaded, parsed, and compiled before either of them runs. So their circular dependency is statically resolved and this works as you'd expect.

__Module Loading__
You will be able to load a module into the browser via an HTML tag, similar to how current script programs are loaded. At the time of this writing, it's not fully clear if this tag will be `<script type="module">` or `<module>`.

One use for interacting directly with the module loader is if a non-module needs to load a module. The `Reflect.Loader.import(..)` utility imports the entire module onto the named parameter, just like the `import * as foo ..`.

```javascript
// normal script loaded in browser via `<script>`,
// `import` is illegal here

Reflect.Loader.import( "foo" ) // returns a promise for `"foo"`
.then( function(foo){
	foo.bar();
} );
```

> For performance reasons, you'll want to avoid dynamic loading

The `Reflect.Loader.import(..)` call may support a second argument for specifying various options to customize the import/load task. For example, you could load something that's not already an ES6-compliant module format (e.g., CoffeeScript, TypeScript, CommonJS, AMD). Your translation step could then convert it to an ES6-compliant module for the engine to then process.

```javascript
Reflect.Loader.import( "foo", { address: "/path/to/foo.js" } )
.then( function(foo){
	// ..
} )
```

## Classes
> `class` is not hoisted.
```javascript
class Foo {
	constructor(a,b) {
		this.x = a;
		this.y = b;
	}

	gimmeXY() {
		return this.x * this.y;
	}
}
// transformes to
function Foo(a,b) {
	this.x = a;
	this.y = b;
}

Foo.prototype.gimmeXY = function() {
	return this.x * this.y;
}
```
__Caution!__ Though `class Foo` seems much like `function Foo()`, there are important differences:
* A `Foo(..)` call of `class Foo` must be made with `new`, as the pre-ES6 option of `Foo.call( obj )` will not work.
* While `function Foo` is "hoisted", `class Foo` is not; the `extends ..` clause specifies an expression that cannot be "hoisted." So, you must declare a `class` before you can instantiate it.
* `class Foo` in the top global scope creates a lexical `Foo` identifier in that scope, but unlike `function Foo` does not create a global object property of that name.

The established `instanceof` operator still works with ES6 classes, because `class` just creates a constructor function of the same name. However, ES6 introduces a way to customize how `instanceof` works, using `Symbol.hasInstance`.

__Tip:__ In addition to the declaration form, a `class` can also be an expression, as in: `var x = class Y { .. }`. This is primarily useful for passing a class definition (technically, the constructor itself) as a function argument or assigning it to an object property.

```javascript
class Bar extends Foo {
	constructor(a,b,c) {
		super( a, b );
		this.z = c;
	}

	gimmeXYZ() {
		return super.gimmeXY() * this.z;
	}
}

// `Bar` "extends" `Foo` transforms to:
// Bar.prototype = Object.create( Foo.prototype );

var b = new Bar( 5, 15, 25 );

b.x;					// 5
b.y;					// 15
b.z;					// 25
b.gimmeXYZ();				// 1875
```
`Bar extends Foo` means to link the `[[Prototype]]` of `Bar.prototype` to `Foo.prototype`. So, `super` in a method like `gimmeXYZ()` specifically means `Foo.prototype`, whereas `super` means `Foo` when used in the `Bar` constructor.

`super(..)` means roughly to call `new Foo(..)`, but isn't actually a usable reference to `Foo` itself. You can reference to superclass' method like `super.someParentMethod`.

Also, `super` looks like it might be driven by a function's context just like `this`-- that is, that they'd both be dynamically bound. However, `super` is not dynamic like `this` is. When a constructor or method makes a `super` reference inside it at declaration time (in the `class` body), that `super` is statically bound to that specific class hierarchy, and cannot be overridden.

Constructors are not required for classes or subclasses; a default constructor is substituted in both cases if omitted. However, the default substituted constructor is different for a direct class versus an extended class.

Default subclass constructor:
```javascript
constructor(...args) {
	super(...args);
}
```

> In a constructor of a subclass, you cannot access `this` until `super(..)` has been called. It boils down to the fact that the parent constructor is actually the one creating/initializing your instance's `this`.

__`extend` ing Natives__
```javascript
class MyCoolArray extends Array {
	first() { return this[0]; }
	last() { return this[this.length - 1]; }
}

var a = new MyCoolArray( 1, 2, 3 );

a.length;					// 3
a;						// [1,2,3]

a.first();					// 1
a.last();					// 3
```

`new.target` is a new "magical" value available in all functions, though in normal functions it will always be `undefined`. In any constructor, `new.target` always points at the constructor that `new` actually directly invoked, even if the constructor is in a parent class and was delegated to by a `super(..)` call from a child constructor.
```javascript
class Foo {
	constructor() {
		console.log( "Foo: ", new.target.name );
	}
}

class Bar extends Foo {
	constructor() {
		super();
		console.log( "Bar: ", new.target.name );
	}
	baz() {
		console.log( "baz: ", new.target );
	}
}

var a = new Foo();
// Foo: Foo

var b = new Bar();
// Foo: Bar   <-- respects the `new` call-site
// Bar: Bar

b.baz();
// baz: undefined
```

> If `new.target` is `undefined`, you know the function was not called with `new`. You can then force a `new` invocation if that's necessary.

`static` methods are added directly to that class's function object, not to the function object's `prototype` object.

`Symbol.species` allows a child class to signal to a parent class what constructor should be used
```javascript
class MyCoolArray extends Array {
	// force `species` to be parent constructor
	static get [Symbol.species]() { return Array; }
}

var a = new MyCoolArray( 1, 2, 3 ),
	b = a.map( function(v){ return v * 2; } );

b instanceof MyCoolArray;		// false
b instanceof Array;			// true
```

## Promises
A Promise can only have one of two possible resolution outcomes: __fulfilled__ or __rejected__, with an optional single value. If a Promise is fulfilled, the final value is called a _fulfillment_. If it's rejected, the final value is called a _reason_.

Promises offer a significant improvement over callbacks-only async, namely that they provide order, predictability, and trustability.

The `Promise(..)` constructor takes a single function `(pr(..))`, which is called immediately and receives two control functions as arguments, usually named `resolve(..)` and `reject(..)`. They are used as:
* If you call `reject(..)`, the promise is rejected, and if any value is passed to `reject(..)`, it is set as the reason for rejection.
* If you call `resolve(..)` with no value, or any non-promise value, the promise is fulfilled.
* If you call `resolve(..)` and pass another promise, this promise simply adopts the state -- whether immediate or eventual -- of the passed promise (either fulfillment or rejection).

Promises have a `then(..)` method that accepts one or two callback functions. The first function (if present) is treated as the handler to call if the promise is fulfilled successfully. The second function (if present) is treated as the handler to call if the promise is rejected explicitly, or if any error/exception is caught during resolution.

If one of the arguments is omitted or otherwise not a valid function -- typically you'll use `null` instead.

> The shorthand for calling `then(null,handleRejection)` is `catch(handleRejection)`.

Both `then(..)` and `catch(..)` automatically construct and return another promise instance, which is wired to receive the resolution from whatever the return value is from the original promise's fulfillment or rejection handler (whichever is actually called)

```javascript
var promise = new Promise( function pr(resolve,reject){
	// ..
} );

promise.then(
	function fulfilled(contents){
		return contents.toUpperCase();
	},
	function rejected(reason){
		return "DEFAULT VALUE";
	}
)
.then( function fulfilled(data){
	// handle data from original promise's
	// handlers
} );
```

> An exception in the first `fulfilled(..)` will not result in the first `rejected(..)` being called, as that handler only responds to the resolution of the first original promise. Instead, the second promise, which the second `then(..)` is called against, receives that rejection.

__`Promise` API__

* `Promise.resolve(..)` creates a promise resolved to the value passed in.
* `Promise.reject(..)` creates an immediately rejected promise.

	> While `resolve(..)` and `Promise.resolve(..)` can accept a promise and adopt its state/resolution, `reject(..)` and `Promise.reject(..)` do not differentiate what value they receive. So, if you reject with a promise or thenable, the promise/thenable itself will be set as the rejection reason, not its underlying value.
* `Promise.all([ .. ])` accepts an array of one or more values (e.g., immediate values, promises, thenables). It returns a promise back that will be fulfilled if all the values fulfill, or reject immediately once the first of any of them rejects.
* `Promise.race([ .. ])` waits only for either the first fulfillment or rejection, while `Promise.all([ .. ])` waits for all fulfillments (or the first rejection).

	> Warning: While `Promise.all([])` will fulfill right away (with no values), `Promise.race([])` will hang forever. This is a strange inconsistency, and speaks to the suggestion that you should never use these methods with empty arrays.

### Generators + Promises
The important pattern to recognize: a generator can yield a promise, and that promise can then be wired to resume the generator with its fulfillment value.

Essentially, anywhere that you have more than two asynchronous steps of flow control logic in your program, you can and should use a promise-yielding generator driven by a run utility to express the flow control in a synchronous fashion.

```javascript
function async(makeGenerator) {
	return function() {
		var generator = makeGenerator.apply(this, arguments);

		function handle(result) {
			if (result.done) return result.value;

			return result.value.then(
				function (res) {
					return handle(generator.next(res));
				},
				function (err) {
					return handle(generator.throw(res));
				}
			);
		}

		return handle(generator.next());
	};
}

async( function *main(){
    var result1 = yield request( "http://some.url.1" );
    var data = JSON.parse( result1 );

    var result2 = yield request( "http://some.url.2?id=" + data.id );
    var resp = JSON.parse( result2 );
    console.log( "The value you asked for: " + resp.value );
} );
```

The whole point of using generators for asynchrony in the way we've described is to create simple, sequential, sync-looking code, and to hide as much of the details of asynchrony away from that code as possible.

> `async/awat` has already substituted this pattern. 

## Collections
### TypedArrays
Typed arrays are really more about providing structured access to binary data using array-like semantics. The "_type_" in the name refers to a "_view_" layered on type of the bucket of bits, which is essentially a mapping of whether the bits should be viewed as an array of 8-bit signed integers, 16-bit signed integers, and so on.

But on top of this array buffer, you can then layer a "_view_," which comes in the form of a typed array.

```javascript
var buf = new ArrayBuffer( 32 );
buf.byteLength;						// 32

var arr = new Uint16Array( buf );
arr.length;						// 16

var buf = new ArrayBuffer( 2 );
var view8 = new Uint8Array( buf );
var view16 = new Uint16Array( buf );

view16[0] = 3085;					// 110000001101
view8[0];						// 13 - 00001101
view8[1];						// 12 - 00001100

view8[0].toString( 16 );				// "d"
view8[1].toString( 16 );				// "c"

// swap (as if endian!)
var tmp = view8[0];
view8[0] = view8[1];
view8[1] = tmp;

view16[0];						// 3340
```

`buf` is now a binary buffer that is 32-bytes long (256-bits), that's pre-initialized to all `0`s.

`arr` is a typed array of 16-bit unsigned integers mapped over the 256-bit `buf` buffer, meaning you get 16 elements.

> __Tip__: Several web platform features use or return array buffers, such as `FileReader#readAsArrayBuffer(..)`, `XMLHttpRequest#send(..)`, and `ImageData` (canvas data).

__Endian__ means if the low-order byte of a multi-byte number (such as the 16-bit unsigned ints we created in the earlier snippet) is on the right or the left of the number's bytes.

For example, let's imagine the base-10 number `3085`, which takes 16-bits to represent. If you have just one 16-bit number container, it'd be represented in binary as `0000110000001101` regardless of endianness. But if `3085` was represented with two 8-bit numbers, the endianness would significantly affect its storage in memory:
* `0000110000001101` (big endian)
* `0000110100001100` (little endian)

From MDN, here's a quick way to test the endianness of your JavaScript:
```javascript
var littleEndian = (function() {
	var buffer = new ArrayBuffer( 2 );
	new DataView( buffer ).setInt16( 0, 256, true );
	return new Int16Array( buffer )[0] === 256;
})();
```
`littleEndian` will be `true` or `false`; for most browsers, it should return true.

> __Warning__: Do not confuse endianness of underlying binary storage in array buffers with how a given number is represented when exposed in a JS program. For example, `(3085).toString(2)` returns `"110000001101"`, which with an assumed leading four `"0"`s appears to be the big-endian representation. In fact, this representation is based on a single 16-bit view, not a view of two 8-bit bytes.

TypedArray Constructors:
* \[constructor]`(length)`: Creates a new view over a new buffer of `length` bytes
* \[constructor]`(typedArr)`: Creates a new view and buffer, and copies the contents from the `typedArr` view
* \[constructor]`(obj)`: Creates a new view and buffer, and iterates over the array-like or object `obj` to copy its contents

The following typed array constructors are available as of ES6:
* `Int8Array` (8-bit signed integers), Uint8Array (8-bit unsigned integers)
	* `Uint8ClampedArray` (8-bit unsigned integers, each value clamped on setting to the 0-255 range)
* `Int16Array` (16-bit signed integers), `Uint16Array` (16-bit unsigned integers)
* `Int32Array` (32-bit signed integers), `Uint32Array` (32-bit unsigned integers)
* `Float32Array` (32-bit floating point, IEEE-754)
* `Float64Array` (64-bit floating point, IEEE-754)

Instances of typed array constructors are almost the same as regular native arrays. Some differences include having a fixed length and the values all being of the same "type." However, they share most of the same prototype methods.
```javascript
var a = new Int32Array( 3 );
a[0] = 10;
a[1] = 20;
a[2] = 30;

a.map( function(v){
	console.log( v );
} );
// 10 20 30

a.join( "-" );				// "10-20-30"
```

> __Warning__: You can't use certain Array.prototype methods with TypedArrays that don't make sense, such as the mutators (`splice(..)`, `push(..)`, etc.) and `concat(..)`.

Be aware that the elements in TypedArrays really are constrained to the declared bit sizes. If you have a `Uint8Array` and try to assign something larger than an 8-bit value into one of its elements, the value wraps around so as to stay within the bit length. To get around such a limitation, you can use the `TypedArray#from(..)` function
```javascript
var a = new Uint8Array( 3 );
a[0] = 10;
a[1] = 20;
a[2] = 30;

var b = a.map( function(v){
	return v * v;
} );

b;				// [100, 144, 132] - incorrect!

var b = Uint16Array.from( a, function(v){
	return v * v;
} );

b;				// [100, 400, 900] - correct!
```

TypedArrays have a `sort(..)` method much like regular arrays, but this one defaults to numeric sort comparisons instead of coercing values to strings for lexicographic comparison.
```javascript
var a = [ 10, 1, 2, ];
a.sort();						// [1,10,2]

var b = new Uint8Array( [ 10, 1, 2 ] );
b.sort();						// [1,2,10]
```
It also takes an optional compare function argument just like `Array#sort(..)`, which works in exactly the same way.

### Maps
The major drawback with objects-as-maps is the inability to use a non-string value as the key. Just use `Map()`. The `Map(..)` constructor can also receive an iterable.

To get the list of values from a map, use `values(..)`, which returns an iterator. `keys()` returns an iterator over the keys in the map.

Also you can iterate over a map's entries using `entries()` (or the default map iterator).

To determine if a map has a given key, use `has(..)`.

```javascript
var m = new Map(),
    var m2 = new Map( m.entries() ), 			// copy of m
    var m3 = new Map( m ),				// copy of m
    var m4 = new Map([ [ x, "foo" ], [ y, "bar" ] ]),
    n = {};

var x = { id: 1 },
    y = { id: 2 };

// as two objects x and y both stringify to "[object Object]"
n.set( x, "foo" );
n.set( y, "bar" );
n.get( x );						// "bar"
n.get( y );						// "bar"

m.set( x, "foo" );
m.set( y, "bar" );
m.get( x );						// "foo"
m.get( y );						// "bar"

var vals = [ ...m.entries() ];
vals[0][0] === x;					// true
vals[0][1];						// "foo"
vals[1][0] === y;					// true
vals[1][1];						// "bar"

m.has( x );						// true
m.keys();						// [x, y]
m.values();						// ["foo", "bar"]
m.delete( x );						// delete the x field
m.clear();						// clear the map
m.size;							// 0
```

> __Warning__: If you use an object as a map key and that object is later discarded (all references unset) in attempt to have garbage collection (GC) reclaim its memory, the map itself will still retain its entry. You will need to remove the entry from the map for it to be GC-eligible. WeakMaps is a better option for object keys and GC.

### WeakMap
WeakMaps take (only) objects as keys. Those objects are held weakly, which means if the object itself is GC'd, the entry in the WeakMap is also removed.

The API for `WeakMap` is similar to `Map`. But, WeakMaps do not have a `size` property or `clear()` method, nor do they expose any iterators over their keys, values, or entries. So even if you unset the `x` reference, which will remove its entry from `m` upon GC, there is no way to tell. You'll just have to take JavaScript's word for it!

It's important to note that a WeakMap only holds its keys weakly, not its values.

```javascript
var m = new WeakMap();
var x = { id: 1 },
    y = { id: 2 },
    z = { id: 3 },
    w = { id: 4 };

m.set( x, y );
x = null;				// { id: 1 } is GC-eligible
y = null;				// { id: 2 } is GC-eligible
					// only because { id: 1 } is GC-ed
m.set( z, w );
w = null;				// { id: 4 } is not GC-eligible
					// because z is not yet GC-ed
```

> __Warning__: `WeakMap` takes (only) objects as keys.

### Set
A set is a collection of unique values (duplicates are ignored).

The `Set(..)` constructor receives an iterable. However, unlike how `Map(..)` which expects entries list (array of key/value arrays), `Set(..)` expects a values list (array of values).

A set doesn't need a `get(..)` because you don't retrieve a value from a set.

The `keys()` and `values()` iterators both yield a list of the unique values in the set. The `entries()` iterator yields a list of entry arrays, where both items of the array are the unique set value. The default iterator for a set is its `values()` iterator.

```javascript
var x = { id: 1 },
    y = { id: 2 };

var s = new Set();
    s1 = new Set( [x,y] )
    s2 = new Set( [1,2,3,4,"1",2,4,"5"] );


s.add( x ).add( y ).add( x );

s.has( x );				// true
s.size;					// 2
s.delete( y );
s.size;					// 1
s.clear();
s.size;					// 0

var keys = [ ...s.keys() ],
	vals = [ ...s.values() ],
	entries = [ ...s.entries() ];

keys[0] === x;
keys[1] === y;

vals[0] === x;
vals[1] === y;

entries[0][0] === x;
entries[0][1] === x;
entries[1][0] === y;
entries[1][1] === y;

var uniques = [ ...s ];			// [1,2,3,4,"1","5"]
```

> __Note__: Set uniqueness does not allow coercion, so `1` and `"1"` are considered distinct values.

### WeakSet
Whereas a `WeakMap` holds its keys weakly (but its values strongly), a `WeakSet` holds its values weakly (there aren't really keys).

```javascript
var s = new WeakSet();
var x = { id: 1 },
    y = { id: 2 };

s.add( x );
s.add( y );

x = null;					// `x` is GC-eligible
y = null;					// `y` is GC-eligible
```

> __Warning__: `WeakSet` values must be objects, not primitive values as is allowed with sets.

## Meta Programming
Meta programming is programming where the operation targets the behavior of the program itself. In other words, it's programming the programming of your program.

### Function Names
Functions have a property called `name`.
```javascript
var abc = function() {
	// ..
};

abc.name;					// "abc"

(function(){ .. });				// name:
(function*(){ .. });				// name:
window.foo = function(){ .. };			// name:

class Awesome {
	constructor() { .. }			// name: Awesome
	funny() { .. }				// name: funny
}

var c = class Awesome { .. };			// name: Awesome

var o = {
	foo() { .. },				// name: foo
	*bar() { .. },				// name: bar
	baz: () => { .. },			// name: baz
	bam: function(){ .. },			// name: bam
	get qux() { .. },			// name: get qux
	set fuz() { .. },			// name: set fuz
	["b" + "iz"]:
		function(){ .. },		// name: biz
	[Symbol( "buz" )]:
		function(){ .. }		// name: [buz]
};

var x = o.foo.bind( o );			// name: bound foo
(function(){ .. }).bind( o );			// name: bound

export default function() { .. }		// name: default

var y = new Function();				// name: anonymous
var GeneratorFunction =
	function*(){}.__proto__.constructor;
var z = new GeneratorFunction();		// name: anonymous
```

> The `name` property is not writable by default, but it is configurable, meaning you can use `Object.defineProperty(..)` to manually change it if so desired.

### Meta Properties
When `new.target` is used inside a constructor call (a function/method invoked with `new`), `new` becomes a virtual context, so that `new.target` can refer to the target constructor that `new` invoked.

For example, you may want to have different behavior in a constructor depending on if it's directly invoked or invoked via a child class:
```javascript
class Parent {
	constructor() {
		if (new.target === Parent) {
			console.log( "Parent instantiated" );
		}
		else {
			console.log( "A child instantiated" );
		}
	}
}

class Child extends Parent {}

var a = new Parent();			// Parent instantiated

var b = new Child();			// A child instantiated
```

### Well Known Symbols
__`Symbol.iterator`__
`Symbol.iterator` represents the special location (property) on any object where the language mechanisms automatically look to find a method that will construct an iterator instance for consuming that object's values.
```javascript
var arr = [4,5,6,7,8,9];

for (var v of arr) {
	console.log( v );
} // 4 5 6 7 8 9

// define iterator that only produces values from odd indexes
arr[Symbol.iterator] = function*() {
	var idx = 1;
	do {
		yield this[idx];
	} while ((idx += 2) < this.length);
};

for (var v of arr) {
	console.log( v );
} // 5 7 9
```


__`Symbol.toStringTag` and `Symbol.hasInstance`__

As of ES6, you can control the behavior of `toString()` and `instanceof`:
```javascript
function Foo(greeting) {
	this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = "Foo";

Object.defineProperty( Foo, Symbol.hasInstance, {
	value: function(inst) {
		return inst.greeting == "hello";
	}
} );

var a = new Foo( "hello" ),
	b = new Foo( "world" );

b[Symbol.toStringTag] = "cool";

a.toString();				// [object Foo]
String( b );				// [object cool]

a instanceof Foo;			// true
b instanceof Foo;			// false
```

The `@@toStringTag` symbol on the prototype (or instance itself) specifies a string value to use in the `[object ___]` stringification.

The `@@hasInstance` symbol is a method on the constructor function which receives the instance object value and lets you decide by returning `true` or `false` if the value should be considered an instance or not.

> __Note__: To set `@@hasInstance` on a function, you must use `Object.defineProperty(..)`, as the default one on `Function.prototype` is writable: `false`.

__`Symbol.species`__

`@@species` symbol controls which constructor is used by built-in methods of a class that needs to spawn new instances.

The most common example is when subclassing `Array` and wanting to define which constructor (`Array(..)` or your subclass) inherited methods like `slice(..)` should use.
```javascript
class Cool {
	// defer `@@species` to derived constructor
	static get [Symbol.species]() { return this; }

	again() {
		return new this.constructor[Symbol.species]();
	}
}

class Fun extends Cool {}

class Awesome extends Cool {
	// force `@@species` to be parent constructor
	static get [Symbol.species]() { return Cool; }
}

var a = new Fun(),
	b = new Awesome(),
	c = a.again(),
	d = b.again();

c instanceof Fun;			// true
d instanceof Awesome;			// false
d instanceof Cool;			// true
```
The `Symbol.species` returns `return this` by default.

__`Symbol.toPrimitive`__

`@@ToPrimitive` is used when an object must be coerced to a primitive value for some operation (such as `==` comparison or `+` addition). Prior to ES6, there was no way to control this behavior.
```javascript
var arr = [1,2,3,4,5];

arr + 10;			// 1,2,3,4,510

arr[Symbol.toPrimitive] = function(hint) {
	if (hint == "default" || hint == "number") {
		// sum all numbers
		return this.reduce( function(acc,curr){
			return acc + curr;
		}, 0 );
	}
};

arr + 10;			// 25
```
The `Symbol.toPrimitive` method will be provided with a hint of `"string"`, `"number"`, or `"default"` (which should be interpreted as "number"). The additive `+` operation has no hint (`"default"` is passed). A multiplicative `*` operation would hint `"number"` and a `String(arr)` would hint `"string"`.

> __Warning:__ The `==` operator will invoke the `ToPrimitive` operation with no hint -- the `@@toPrimitive` method, if any is called with hint `"default"` -- on an object if the other value being compared is not an object. However, if both comparison values are objects, the behavior of `==` is identical to `===`, which is that the references themselves are directly compared. In this case, `@@toPrimitive` is not invoked at all.

__Regular Expression Symbols:__
* `@@match`: The `Symbol.match` value of a regular expression is the method used to match all or part of a string value with the given regular expression. It's used by `String.prototype.match(..)` if you pass it a regular expression for the pattern matching.
* `@@replace`: The `Symbol.replace` value of a regular expression is the method used by `String.prototype.replace(..)` to replace within a string one or all occurrences of character sequences that match the given regular expression pattern.
* `@@search`: The `Symbol.search` value of a regular expression is the method used by `String.prototype.search(..)` to search for a sub-string within another string as matched by the given regular expression.
* `@@split`: The `Symbol.split` value of a regular expression is the method used by `String.prototype.split(..)` to split a string into sub-strings at the location(s) of the delimiter as matched by the given regular expression.

__`Symbol.isConcatSpreadable`__
The `@@isConcatSpreadable` symbol can be defined as a boolean property (`Symbol.isConcatSpreadable`) on any object (like an array or other iterable) to indicate if it should be spread out if passed to an array `concat(..)`.
```javascript
var a = [1,2,3],
    b = [4,5,6];

b[Symbol.isConcatSpreadable] = false;

[].concat( a, b );		// [1,2,3,[4,5,6]]
```

__`Symbol.unscopables`__

The `@@unscopables` symbol can be defined as an object property (`Symbol.unscopables`) on any object to indicate which properties can and cannot be exposed as lexical variables in a `with` statement.
```javascript
var o = { a:1, b:2, c:3 },
    a = 10, b = 20, c = 30;

o[Symbol.unscopables] = {
	a: false,
	b: true,
	c: false
};

with (o) {
	console.log( a, b, c );		// 1 20 3
}
```
A `true` in the `@@unscopables` object indicates the property should be _unscopable_, and thus filtered out from the lexical scope variables. `false` means it's OK to be included in the lexical scope variables.

> __Warning:__ The `with` statement is disallowed entirely in `strict` mode, and as such should be considered deprecated from the language. Don't use it.

### Proxies
A proxy is a special kind of object you create that "wraps" -- or sits in front of -- another normal object. You can register special handlers (aka traps) on the proxy object which are called when various operations are performed against the proxy. These handlers have the opportunity to perform extra logic in addition to forwarding the operations on to the original target/wrapped object.
```javascript
var obj = { a: 1 },
	handlers = {
		get(target,key,context) {
			// note: target === obj,
			// context === pobj
			console.log( "accessing: ", key );
			return Reflect.get(
				target, key, context
			);
		}
	},
	pobj = new Proxy( obj, handlers );

obj.a;				// 1

pobj.a;				// accessing: a
				// 1
```
We declare a `get(..)` handler as a named method on the handler object (second argument to `Proxy(..)`), which receives a reference to the target object (`obj`), the key property name (`"a"`), and the `self`/receiver/proxy (`pobj`). After the `console.log(..)` tracing statement, we "forward" the operation onto `obj` via `Reflect.get(..)`.

List of handlers you can define on a proxy for a target object/function, and how/when they are triggered:
* `get(..)`: via __[[Get]]__, a property is accessed on the proxy (_Reflect.get(..)_, `.` property operator, or `[ .. ]` property operator)
* `set(..)`: via __[[Set]]__, a property value is set on the proxy (_Reflect.set(..)_, the `=` assignment operator, or destructuring assignment if it targets an object property)
* `deleteProperty(..)`: via __[[Delete]]__, a property is deleted from the proxy (_Reflect.deleteProperty(..)_ or `delete`)
* `apply(..)` (if target is a function): via __[[Call]]__, the proxy is invoked as a normal function/method (_Reflect.apply(..)_, `call(..)`, `apply(..)`, or the `(..)` call operator)
* `construct(..)` (if target is a constructor function): via __[[Construct]]__, the proxy is invoked as a constructor function (_Reflect.construct(..)_ or `new`)
* `getOwnPropertyDescriptor(..)`: via __[[GetOwnProperty]]__, a property descriptor is retrieved from the proxy (`Object.getOwnPropertyDescriptor(..)` or _Reflect.getOwnPropertyDescriptor(..)_)
* `defineProperty(..)`: via __[[DefineOwnProperty]]__, a property descriptor is set on the proxy (`Object.defineProperty(..)` or _Reflect.defineProperty(..)_)
* `getPrototypeOf(..)`: via __[[GetPrototypeOf]]__, the [[Prototype]] of the proxy is retrieved (`Object.getPrototypeOf(..)`, _Reflect.getPrototypeOf(..)_, `__proto__`, `Object#isPrototypeOf(..)`, or `instanceof`)
* `setPrototypeOf(..)`: via __[[SetPrototypeOf]]__, the [[Prototype]] of the proxy is set (`Object.setPrototypeOf(..)`, _Reflect.setPrototypeOf(..)_, or `__proto__`)
* `preventExtensions(..)`: via __[[PreventExtensions]]__, the proxy is made non-extensible (`Object.preventExtensions(..)` or _Reflect.preventExtensions(..)_)
* `isExtensible(..)`: via __[[IsExtensible]]__, the extensibility of the proxy is probed (`Object.isExtensible(..)` or _Reflect.isExtensible(..)_)
* `ownKeys(..)`: via __[[OwnPropertyKeys]]__, the set of owned properties and/or owned symbol properties of the proxy is retrieved (`Object.keys(..)`, `Object.getOwnPropertyNames(..)`, `Object.getOwnSymbolProperties(..)`, _Reflect.ownKeys(..)_, or `JSON.stringify(..)`)
* `enumerate(..)`: via __[[Enumerate]]__, an iterator is requested for the proxy's enumerable owned and "inherited" properties (_Reflect.enumerate(..)_ or `for..in`)
* `has(..)`: via __[[HasProperty]]__, the proxy is probed to see if it has an owned or "inherited" property (_Reflect.has(..)_, `Object#hasOwnProperty(..)`, or `"prop" in obj`)

> In addition to the notations in the preceding list about actions that will trigger the various traps, some traps are triggered indirectly by the default actions of another trap.

However, there are some operations which are not (yet, at least) available to intercept. For example, none of these operations are trapped and forwarded from `pobj` proxy to `obj` target:
```javascript
var obj = { a:1, b:2 },
    handlers = { .. },
    pobj = new Proxy( obj, handlers );

typeof obj;
String( obj );
obj + "";
obj == pobj;
obj === pobj
```

A regular proxy always traps for the target object, and cannot be modified after creation -- as long as a reference is kept to the proxy, proxying remains possible. However, there may be cases where you want to create a proxy that can be disabled when you want to stop allowing it to proxy. The solution is to create a revocable proxy:
```javascript
var obj = { a: 1 },
	handlers = {
		get(target,key,context) {
			// note: target === obj,
			// context === pobj
			console.log( "accessing: ", key );
			return target[key];
		}
	},
	{ proxy: pobj, revoke: prevoke } =
		Proxy.revocable( obj, handlers );

pobj.a;			// accessing: a
			// 1
// later:
prevoke();

pobj.a;			// TypeError
```
The return value of `Proxy.revocable(..)` is not the proxy itself as with `new Proxy(..)`. Instead, it's an object with two properties: _proxy_ and _revoke_ -- we used object destructuring to assign these properties to `pobj` and `prevoke()` variables, respectively.

> Once a revocable proxy is revoked, any attempts to access it (trigger any of its traps) will throw a `TypeError`.

An example of using a revocable proxy might be handing out a proxy to another party in your application that manages data in your model, instead of giving them a reference to the real model object itself. If your model object changes or is replaced, you want to invalidate the proxy you handed out so the other party knows (via the errors!) to request an updated reference to the model.

Usage:
* __Proxy First, Proxy Last__

	You might proxy the objects because you want to pass the object somewhere that can't be fully "trusted," and so you need to enforce special rules around its access rather than passing the object itself.
	```javascript
	var messages = [],
		handlers = {
			get(target,key) {
				// string value?
				if (typeof target[key] == "string") {
					// filter out punctuation
					return target[key]
						.replace( /[^\w]/g, "" );
				}

				// pass everything else through
				return target[key];
			},
			set(target,key,val) {
				// only set unique strings, lowercased
				if (typeof val == "string") {
					val = val.toLowerCase();
					if (target.indexOf( val ) == -1) {
						target.push(val);
					}
				}
				return true;
			}
		},
		messages_proxy =
			new Proxy( messages, handlers );

	// elsewhere:
	messages_proxy.push(
		"heLLo...", 42, "wOrlD!!", "WoRld!!"
	);

	messages_proxy.forEach( function(val){
		console.log(val);
	} );				// hello world

	messages.forEach( function(val){
		console.log(val);
	} );				// hello... world!!
	```
	I call this __proxy first design__, as we interact first (primarily, entirely) with the proxy.

	Alternatively, we can completely invert this pattern, where the target interacts with the proxy instead of the proxy interacting with the target. Thus, code really only interacts with the main object. The easiest way to accomplish this fallback is to have the proxy object in the `[[Prototype]]` chain of the main object.

	```javascript
	var handlers = {
		get(target,key,context) {
				return function() {
					context.speak(key + "!");
				};
			}
		},
		catchall = new Proxy( {}, handlers ),
		greeter = {
			speak(who = "someone") {
				console.log( "hello", who );
			}
		};

	// setup `greeter` to fall back to `catchall`
	Object.setPrototypeOf( greeter, catchall );

	greeter.speak();			// hello someone
	greeter.speak( "world" );		// hello world

	greeter.everyone();			// hello everyone!
	```

	We interact directly with `greeter` instead of `catchall`. When we call `speak(..)`, it's found on `greeter` and used directly. But when we try to access a method like `everyone()`, that function doesn't exist on `greeter`.

	I call this pattern __proxy last__, as the proxy is used only as a last resort.

* __"No Such Property/Method"__

	A common complaint about JS is that objects aren't by default very defensive in the situation where you try to access or set a property that doesn't already exist. You may wish to predefine all the properties/methods for an object, and have an error thrown if a nonexistent property name is subsequently used.

	We can accomplish this with a proxy, either in proxy first or proxy last design.
	```javascript
	var obj = {
			a: 1,
			foo() {
				console.log( "a:", this.a );
			}
		},
		handlers = {
			get(target,key,context) {
				if (Reflect.has( target, key )) {
					return Reflect.get(
						target, key, context
					);
				}
				else {
					throw "No such property/method!";
				}
			},
			set(target,key,val,context) {
				if (Reflect.has( target, key )) {
					return Reflect.set(
						target, key, val, context
					);
				}
				else {
					throw "No such property/method!";
				}
			}
		},
		pobj = new Proxy( obj, handlers );

	pobj.a = 3;
	pobj.foo();			// a: 3

	pobj.b = 4;			// Error: No such property/method!
	pobj.bar();			// Error: No such property/method!
	```

	Now, let's consider inverting with proxy last design:
	```javascript
	var handlers = {
			get() {
				throw "No such property/method!";
			},
			set() {
				throw "No such property/method!";
			}
		},
		pobj = new Proxy( {}, handlers ),
		obj = {
			a: 1,
			foo() {
				console.log( "a:", this.a );
			}
		};

	// setup `obj` to fall back to `pobj`
	Object.setPrototypeOf( obj, pobj );

	obj.a = 3;
	obj.foo();			// a: 3

	obj.b = 4;			// Error: No such property/method!
	obj.bar();			// Error: No such property/method!
	```

	The _proxy last_ design here is a fair bit simpler with respect to how the handlers are defined.

* __Proxy Hacking the [[Prototype]] Chain__

	The `[[Get]]` operation is the primary channel by which the `[[Prototype]]` mechanism is invoked. When a property is not found on the immediate object, `[[Get]]` automatically hands off the operation to the `[[Prototype]]` object.

	That means you can use the `get(..)` trap of a proxy to emulate or extend the notion of this `[[Prototype]]` mechanism.

	The first hack we'll consider is creating two objects which are circularly linked via `[[Prototype]]` (or, at least it appears that way!). You cannot actually create a real circular `[[Prototype]]` chain, as the engine will throw an error. But a proxy can fake it!

	```javascript
	var handlers = {
			get(target,key,context) {
				if (Reflect.has( target, key )) {
					return Reflect.get(
						target, key, context
					);
				}
				// fake circular `[[Prototype]]`
				else {
					return Reflect.get(
						target[
							Symbol.for( "[[Prototype]]" )
						],
						key,
						context
					);
				}
			}
		},
		obj1 = new Proxy(
			{
				name: "obj-1",
				foo() {
					console.log( "foo:", this.name );
				}
			},
			handlers
		),
		obj2 = Object.assign(
			Object.create( obj1 ),
			{
				name: "obj-2",
				bar() {
					console.log( "bar:", this.name );
					this.foo();
				}
			}
		);

	// fake circular `[[Prototype]]` link
	obj1[ Symbol.for( "[[Prototype]]" ) ] = obj2;

	obj1.bar();
	// bar: obj-1 <-- through proxy faking [[Prototype]]
	// foo: obj-1 <-- `this` context still preserved

	obj2.foo();
	// foo: obj-2 <-- through [[Prototype]]
	```

	Instead of a circular `[[Prototype]]`, what about multiple `[[Prototype]]` linkages (aka "multiple inheritance")?
	```javascript
	var obj1 = {
			name: "obj-1",
			foo() {
				console.log( "obj1.foo:", this.name );
			},
		},
		obj2 = {
			name: "obj-2",
			foo() {
				console.log( "obj2.foo:", this.name );
			},
			bar() {
				console.log( "obj2.bar:", this.name );
			}
		},
		handlers = {
			get(target,key,context) {
				if (Reflect.has( target, key )) {
					return Reflect.get(
						target, key, context
					);
				}
				// fake multiple `[[Prototype]]`
				else {
					for (var P of target[
						Symbol.for( "[[Prototype]]" )
					]) {
						if (Reflect.has( P, key )) {
							return Reflect.get(
								P, key, context
							);
						}
					}
				}
			}
		},
		obj3 = new Proxy(
			{
				name: "obj-3",
				baz() {
					this.foo();
					this.bar();
				}
			},
			handlers
		);

	// fake multiple `[[Prototype]]` links
	obj3[ Symbol.for( "[[Prototype]]" ) ] = [
		obj1, obj2
	];

	obj3.baz();
	// obj1.foo: obj-3
	// obj2.bar: obj-3
	```

### `Reflect` API
The `Reflect` object is a plain object (like Math), not a function/constructor like the other built-in natives. It holds static functions which correspond to various meta programming tasks that you can control. These functions correspond one-to-one with the handler methods (traps) that Proxies can define.

An object's keys can be accessed/inspected using these utilities:
* `Reflect.ownKeys(..)`: Returns the list of all owned keys (not "inherited"), as returned by both `Object.getOwnPropertyNames(..)` and `Object.getOwnPropertySymbols(..)`.
* `Reflect.enumerate(..)`: Returns an iterator that produces the set of all non-symbol keys (owned and "inherited") that are enumerable (see the this & Object Prototypes title of this series). Essentially, this set of keys is the same as those processed by a `for..in` loop.
* `Reflect.has(..)`: Essentially the same as the in operator for checking if a property is on an object or its `[[Prototype]]` chain.

Function calls and constructor invocations can be performed manually, separate of the normal syntax (e.g., `(..)` and `new`) using these utilities:
* `Reflect.apply(methodName, context, [...args])`
* `Reflect.construct(functionName, [..args])`: For example, `Reflect.construct(foo,[42,"bar"])` essentially calls `new foo(42,"bar")`.

Object property access, setting, and deletion can be performed manually using these utilities:
* `Reflect.get(..)`
* `Reflect.set(..)`
* `Reflect.deleteProperty(..)`

`Reflect.*` in general behave the same as their `Object.*` counterparts. However, one difference is that the `Object.*` counterparts attempt to coerce their first argument (the target object) to an object if it's not already one. The `Reflect.*` methods simply throw an error in that case.

### Property Ordering
Prior to ES6, the order used to list an object's keys/properties was implementation dependent and undefined by the specification. Generally, most engines have enumerated them in creation order, though developers have been strongly encouraged not to ever rely on this ordering.

As of ES6, the order for listing owned properties is now defined by the `[[OwnPropertyKeys]]` algorithm, which produces all owned properties (strings or symbols), regardless of enumerability. This ordering is only guaranteed for `Reflect.ownKeys(..)` (and by extension, `Object.getOwnPropertyNames(..)` and `Object.getOwnPropertySymbols(..)`).

The ordering is:
* First, enumerate any owned properties that are integer indexes, in ascending numeric order.
* Next, enumerate the rest of the owned string property names in creation order.
* Finally, enumerate owned symbol properties in creation order.

```javascript
var o = {};

o[Symbol("c")] = "yay";
o[2] = true;
o[1] = true;
o.b = "awesome";
o.a = "cool";

Reflect.ownKeys( o );			// [1,2,"b","a",Symbol(c)]
Object.getOwnPropertyNames( o );	// [1,2,"b","a"]
Object.getOwnPropertySymbols( o );	// [Symbol(c)]
```

`Reflect.enumerate(..)`, `Object.keys(..)`, `for..in`, and `JSON.stringify(..)` will match with the same implementation-dependent ordering, though they technically get there in different ways.
```javascript
var o = { a: 1, b: 2 };
var p = Object.create( o );
p.c = 3;
p.d = 4;

for (var prop of Reflect.enumerate( p )) {
	console.log( prop );		// c d a b
}

for (var prop in p) {
	console.log( prop );		// c d a b
}

JSON.stringify( p );			// {"c":3,"d":4}

Object.keys( p );			// ["c","d"]
```
the `[[Enumerate]]` algorithm produces only enumerable properties, from the target object as well as its `[[Prototype]]` chain. It is used by both `Reflect.enumerate(..)` and `for..in`. _The observable ordering is implementation dependent and not controlled by the specification._

By contrast, `Object.keys(..)` invokes the `[[OwnPropertyKeys]]` algorithm to get a list of all owned keys. However, it filters out non-enumerable properties and then reorders the list to match legacy implementation-dependent behavior, specifically with `JSON.stringify(..)` and `for..in`.

> As of ES6, `Reflect.ownKeys(..)`, `Object.getOwnPropertyNames(..)`, and `Object.getOwnPropertySymbols(..)` all have predictable and reliable ordering guaranteed by the specification. So it's safe to build code that relies on this ordering.

> `Reflect.enumerate(..)`, `Object.keys(..)`, and `for..in` (as well as `JSON.stringify(..)` by extension) continue to share an observable ordering with each other, as they always have. But that ordering will not necessarily be the same as that of `Reflect.ownKeys(..)`.
