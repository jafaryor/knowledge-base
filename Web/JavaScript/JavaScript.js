/* eslint-disable */
/* ignore jslint start */
// jshint ignore: start
// Code style is not about personal preference and self-expression. Always use JSLint.

/* 
    Scope has to do with the the visibility of variables. In JavaScript, scope is achieved through the use of functions.
    Context - is object to which the method belongs.
        When a function is called as a method of an object, this is set to the object the method is called on
    Closure - A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain.
        Accessing variables outside of the immediate lexical scope creates a closure.
*/

//=====================================ES3======================================

// ALWAYS PUT { IN THE RIGHT
return {
    ok: false
};
// transforms into
return; {
    ok: false;
}


// Don't use 'with' statement
with(o) {
        foo = koda;
    }
    // it do one the following actions: o.foo = koda; o.foo = o.koda; foo = koda; foo = o.koda;
    // and every time it could change


// Type coercion
0 == ''; // true
0 == '0'; // true
'' == 0; // false
'' == '0'; // false

false == 'false'; // false
false == '0'; // true

false == undefined; // false
false == null; // false
null == undefined; // true

" \t\r\n " == 0; // true
1 == [1]; // true
true == [1]; // true
true == [true]; // false
// Always use '===' instead of '=='


if (a = b) {... }
// turn into
a = b
if (a) {... }


// JS doesn't have block scope, it has function scope.
// If you initialize variable with var it will be hoisted.
// That is the declaration part gets hoisted to the top of scope, initializing with 'undefined'
// The initialization part turns into an ordinary assignment.
// Recomendation: Declare all variables at the top of the function.
// Recomendation: Declare all functions before you call them.
for (var i...) {... } // 'i' is not scoped to the loop, that is why declare it in the beginning of scope


// let respects block scope. That is let variables exists in block


// Global variables. Avoid them. When using global variables, be explicit: UPPER_CASE

// 'new' prefix. Forgotting it causes a constructor to clobber global variables without warning.

// Constructor functions sjould be named with InitialCaps. Nothing else should be named with InitialCaps.


var a = b = 0; // not var a = 0, b = 0;
// it transforms to
b = 0; // this is going to be global variable, because it doesn't declared with keyword 'var'
var a = b;


// ALWAYS put curly braces
if (a) b();
c(); // transforms to if (a) { b(); } c();


// Performane
/*
    Most of the code has a negligible impact on performance.
    Premature optimization is the root of all evil
    Algorithm replacement is vastly more effective than code fiddling
*/


// OBJECTS
// Prototypes are the mechanism by which JavaScript objects inherit features from one another.

// key of object is always turn to string
var myObj = {
    foo: bar,
    name: "value",
    "@#$%*": "toronto" // key is not valid identifier that is whay it is within '"'
}

// Objects inherits from objects
Object.create(prototype); //Prototypal inheritance
// Storing operations always go into the top most object.
// But reading operations can go all the way down the prototype chain.
// Example:
var mother = {
    a: 1;
    b: 2;
}; // mother object automatically inherits from 'Object.prototype'.
var daughter = Object.create(mother); // daughter inherits from mother
daughter.b += 2; // will get the 'b' value from mother but stores it in daughter.
daugher.c = 4; // will store it in daughter

Object.create(null); // Object which inherits nothing

// Number, Boolean, String, Array, Date, RegExp, Function are Objects.


// Numbers
// All this numbers refers to the same object:
// .01024e4, 1.024e3, 10.24E2, 102.4E+1, 1024.e0, 1024.00, 1024, 10240e-1
// There is only one number type in JS, and this is 64-bit binary floating point (in short Double)

// Associated Law ( (a+b)+c === a+(b+c) ) doesn't hold. It may produce false for some values of a,b,c
// Because we deal with approximation. That is: 9007199254740992 === 9007199254740992 + 1
// Also (a + 1) - 1 === a can be false for some 'a' because of approximation

// Decimal fractions are approximate
var a = 0.10,
    b = 0.20,
    c = 0.30;
a + b === c; // false

// Number method:
Number.toExponential();
Number.toFixed();
Number.toLocaleString();
Number.toPrecision();
Number.toString(); // For converting number to String. Better use String() global function
Number.valueOf();

// Every number inherits from 'Number.prototype'
// Numbers are first class objects:
// 1) Can be stored in a variable;
// 2) Can be passed as parameter;
// 3) Can be returned from a function;
// 4) Can be stored in an object;

// 'Math' object contains methods and constants for mathematical operations upon numbers.
// Methods:
Math.abs();
Math.acos();
Math.asin();
Math.atan();
Math.atan2();
Math.ceil();
Math.cos();
Math.exp();
Math.floor();
Math.log();
Math.max();
Math.min();
Math.pow();
Math.random();
Math.round();
Math.sin();
Math.sqrt();
Math.tan();
// Constants:
Math.E;
Math.LN10;
Math.LN2;
Math.LOG10E;
Math.LOG2E;
Math.PI;
Math.SQRT1_2;
Math.SQRT2;

// Nan:
// 1) Special number: Not a number;
// 2) Result of undefined or erroneous operations;
// 3) Toxic: any arithmetic operation with Nan as an input will have Nan as a result;
// 4) Nan is not equal to anything, including Nan;
// 5) Nan === Nan -> is false;
// 6) Nan !== Nan -> is true;
// 7) isNan(Nan) -> is true;
// 8) typeof(Nan) -> Number;

Number.MAX_VALUE; // Biggest number JS knows, not an Infinity


// Strings:
// 1) A sequence of 0 or more 16-bit Unicode characters (UCS-2 not UTF-16)
// 2) Are immutable;
// 3) Similar string are equal;

// Convert String into Number
Number("18"); +
"18";
parseInt("18", 10);
parseInt("18em", 10) // -> 18 (It stops at the first non-digit character)
parseInt("08"); // -> 0 (The radix (10) should always be used)
parseInt("08", 10); // -> 8

// String methods:
"string".length() // number of 16-bit characters in the string. Extended chars are counted as 2.
String.charAt();
String.charCodeAt();
String.compareLocale();
String.concat();
String.indexOf();
String.lastIndexOf();
String.localeCompare();
String.match();
String.replace();
String.search();
String.slice();
String.split();
String.substring();
String.toLocaleLowerCase();
String.toLocaleUpperCase();
String.toLowerCase();
String.toUpperCase();
String.toString();
String.trim();
String.valueOf();
// All these methods located in String.prototype object


// Arrays
// 1) Array inherits from Object
// 2) Indexes are converted to string and used as names for retrieving values
// 3) Very efficient for sparse arrays, but not very efficient in most other cases
// 4) One advantage: No need to provide a length or type when creating an array

var arr = []; // new empty array
var myList = [1, 2, 3];
var myList[myList.length] = 4; // The dot notation should not be used with arrays

// Array methods, which stored in Array.prototype:
Array.concat();
Array.every();
Array.filter();
Array.forEach();
Array.indexOf();
Array.join();
Array.lastIndexOf();
Array.map();
Array.pop();
Array.push();
Array.sort();
Array.reduce();
Array.reduceRight();
Array.reverse();
Array.shift();
Array.slice();
Array.some();
Array.splice();
Array.toLocaleString();
Array.toString();
Array.unshift();
Array.isArray();

arr = [4, 8, 15, 16, 23, 42];
arr.sort(); // [15, 16, 23, 4, 42, 8]
// default behaviour of sort: converts numbers into string and then sort them

delete arr[2]; // remove the element but leave a hole in numbering
arr[2]; // -> undefined
arr.splice(2, 1); // removes 2nd element and renumbers all the following elements

// Use object when the names are arbitrary string
// Use array when the names are sequential integers
// Associate Array is the Object!


// IN JS EVERY VALUE IS OBJECTS EXCEPT null AND undefined
// That is null and undefined are values that are not object
// undefined is the default value of variables, parameters, missng members in objects and arrays
// ! USE undefined instead of null;

typeof(array | null); // object

// All values can be said to be boolish
// Falsy values: false, null, undefined, "", 0, NaN

// Loosly typed - Any of these types can be stored in an variable, or passed as
//                  a parameter to any function

// Objects passed by reference!

// The === operator compares object references, not values.



// && - if first operand is truthy
//          then result is the second operator
//          else result is first operand
// Note: The secont operand will only be evaluated if first one was falsy

// || - if first operand is truthy
//          then result is first operand
//          else result is second operand

// !! - produces boolean

// Bitwise operators: &, |, ^, >>, >>>, <<. They convert the operand to a 32-bit
// signed signed integer, and then turn the result back into 64-bit floating point.


// 0 & 0 = 0; 0 & 1 = 0; 1 & 1 = 1;
// 0 | 0 = 0; 0 | 1 = 1; 1 | 1 = 1;
// 0 ^ 0 = 0; 0 ^ 1 = 1; 1 ^ 1 = 0;

// get the ith bit of 00101100
x & (1 << i)
    // set the ith bit of 00101100
x | (1 << i)
    // clear the ith bit
x & (~(1 << i))

// logical rigth shift
11101001 >> 1 = 01110100 // the fisrt bit is signt (+/-) bit
    // arithmetic rigth shift
11101001 >> 1 = 11110100 // the fisrt bit is signt (+/-) bit
    // arithmetic shift keeps the sign bit

// BigO - describes how time scales with respect to some input variables.

loop: for (;;) {
    ...
    if(...) break loop;
    ...
}

for (name in object) {
    if (object.hasOwnProperty(name)) {
        // name - key of current number
        // object[name] - current value
    }
}
// Object.keys - use instead

throw new Error(reason);
throw {
    name: exceptionName,
    message: reason
} // actually you can throw any value

try {
    ...
} catch (ignore) {
    ... // there is only one catch block
}


// Functions
// functions are first class object and inherit from Function.prototype.

/*
    A variable declared anywhere within a function is visible everywhere within the function.
    That is: The declaration part gets hoisted to the top of the function, initializing with undefined.
    The initialization part turns into an ordinary assignment.
*/

/*
    The function statement is a short-hand a var statement with a function value:
        function foo() {}
    expands to:
        var foo = function foo() {};
    which further expands to
        var foo = undefined;
        foo = function foo() {};
    The assignment of the function is also hoisted!
    Because of the second hois, it is illegal to put function in if block.
    But if you put, JS will pull him out of if block and put it in the beginig of outer function.
*/

// With the var statement, {blocks} do not have scope. Only functions do.

function() {
    function() {
        for (var i = 0;...) {
            var i = 0;
            ...for(i = 0;...) {
                for (var i = 0;...) {...
                    ... /* -> turns into -> */ for(i = 0;...) {... }
                }...
                ...
            }
        }
    }
}

/*
    Because of all these wierdness:
    1) Declare all variables at the top of the function
    2) Declare all function before you call them
*/


return; // returns undefined, except constructor's default value is 'this'

// Don't create function in a loop.

/*
    if a function is called with too many arguments, the extra arguments are ignored
    if a function is called with too few arguments, the missing arguments will be undefined.
    There is no implicit type checking on the arguments.
*/

// Inside of every function you have access to: arguments and this.
/* arguments:
    1) contains all of the arguments from invocation.
    2) it is an array-like objects
    3) arguments.length is the number or arguments passed
    4) if we change arguments[0] then the first arguments also changes and so on.
*/
// this - contains a reference to the object f invocation.

// 4 ways to call a function:
functionObject(arguments); // this is set to global object
// this is not very useful. Fixed in ES5/Strict mode
// An inner function does not get access to the outer 'this'

thisObject.methodName(arguments); // 'this' of function is set to thisObject.
thisObject['methodName'](arguments); // thisObject - the obj conataining the function

new FunctionObject(arguments); // new object is created and assigned to 'this'
// if there is no explicit return value, then 'this' will be returned

functionObject.apply(thisObject, [arguments]);
functionObject.call(thisObject, argument...);

// 'this' is always bound at invocation time.


// Closure
// The context of an inner function includes the scope of the outer function.
// An inner function enjoys that context even after the parent functions have returned.
// Function scope work like block scope.

// Optimization with scope (example):
var names = [...]; // global variable - bac practice
var getName = function(i) {
        return names[i];
    }
    //              ||
    //              \/
var getName = function(i) {
        var names = [...]; // we define array every time we call the function - expensive operation
        return names[i];
    }
    //              ||
    //              \/
var getName = (function() {
    var names = [...]; // defines only once
    return function(i) { // closure
        return names[i];
    }
}());

getName = undefined; // the closure gets garbage collected


// A Module Pattern
var module = (function() {
    var privateVariable;

    function privateMethod() {

    }

    return {
        publicVariable: 10,
        publicMethod: function() {

        }
    }
}());


// Functional inheritance consumes a lot of memory,
// because every object have it own copy of fields.


function Hoozit(id) { // constructor function
    this.id = id;
}
Hoozit.prototype = new Gizmo(); // inheritance from Gizmo
Hoozit.prototype.test = function(id) { // add public method to Hoozit
    return this.id === id;
}

var myInstance = new Hoozit(1), // create an instance of Hoozit
    myTest = myInstance.test;

myTest(1); // won't work because 'myTest' has another context (another 'this')
// If we realized this inheritance as functional inheritance, then 'myTest' would work
// because there was no 'this'.


// always put <script></script> tag in the end of <body>.
// Because it hold the download of other web files.
// Reduce the number of script files as much as possible. Because of HTTP protocol.

document.write('some HTML'); // allows JS to produce HTML text
// Not recomended to use, because JS puts html while rendering HTML.
// Before onload: Inserts HTML text into the document.
// After onload: Uses HTML text to replace the current document.


// Events
// The browser has an event-driven, single-threaded programming model
// Events are targeted to a particular node
// Events cause the invocation of event handler functions

node.addEventListener('type', function() {}, phase);
// there sre 2 phases: bubbling and Capturing
// phase - A Boolean value that specifies whether the event should be executed
//         in the capturing or in the bubbling phase

// Prevent bubbling
event.cancelBubble = true;
if (event.stopPropagation) event.stopPropagation();

// Prevent default behaviour
event.returnValue = false;
if (event.preventDefault) event.preventDefault();
return false;


// What costs big performance:
// 1. Touching a node
// 2. Styling
// 3. Reflow
// 4. Repaint

// In most apps JS has a small performance cost.

//===================================ES5========================================

// ES5
// ES5 doesn't support by IE<9

// New SYNTAX:
// 1. Added trailing commas (not recommended to use).
//      Implemented because in IE [1,].length was = 2.
// 2.No reserved word restrictions on property names.
//      Because of this problem JSON requires " around property names.
// 3. Getters and Setters.
function makeTemperature(temperature) {
    get fahrenheit() {
        return temperature * 9 / 5 + 32;
    }
    set fahrenheit(value) {
        temperature = (value - 32) * 5 / 9;
    }
}
// 4. Multiline string literals
var long_line = "This is a \
                        long line";
// 5. Infinity, NaN, undefined are read-only (constant) variables.
//      Before they were global variables. It means you could change them.
// 6. parseInt() is fixed. But still recomended to use radix.
parseInt('08') === 8; // true
// 7. /regext/ now produces new regular expression objects every time.
//      Like we call function every time. Before it evaluates once and stores a state.
// 8. Replacing Object and Array functions doesn't change the behaviour of {} and [].
//      Before you could replace Object() and Array() with yours. This is security violation.
// 9. JSON integration. We have JSON.parse() and JSON.stringify() functions.

// New METHODS:
Function.prototype.bind(context);
String.prototype.trim();
Array.prototype.every(callback); // runs until callback return true.
Array.prototype.filter(callback); // creates new array which satisfies the callback condition.
Array.prototype.forEach(callback);
Array.prototype.indexOf();
Array.prototype.lastIndexOf();
Array.prototype.map(callback); // transforms array by calling callback for each item.
Array.prototype.reduce(callback, initialValue); // reduce the array into single value
Array.prototype.reduceRight(callback, initialValue) // reduce from end of array.
Array.prototype.some(callback); // like every but runs until callback return false.
Date.now() // current date.
Date.prototype.toISOString(); // 'year'-'month'-'date'T'hours':'minutes'Z'seconds'. 
new Date(isoString) && Date.parse(isoString); // will try ISO fromat first.
Array.isArray(arr);
Object.keys(obj); // returns an array of all owned properties (not inherited) of an obj.
for (name in obj) {... } // was before.
Object.create(obj, props); // prototypal inheritance.
// returns new object which inherits from obj and defined props within proptotype.

// Polyfiling - set of stuff which rewrites some low level stuff by means of language itself.

// There are two kinds of properties:
// 1. Data properties --- ordinary properties.
// 2. Accessors properties --- getters and setters.

// Objects composed of properties. Each property has attributes.
/* If it is data property -> it has 4 attributes:
        value -> value of property. (Any value)
        writable -> is writable. (Boolean)
        enumerable -> could be went trhough using for loop. (Boolean)
        configurable -> can be deleted or change to accessor property. (Boolean)
    If it is sccessors property -> also 4 attributes:
        get -> (Function)
        set -> (Function)
        enumerable -> (Boolean)
        configurable -> (Boolean)
    NOTE: If you put false innstead of true in any ot attributes, it can't be changed anymore.
*/

var myObj = { foo: bar };
//          ||
//          \/
var myObj = Object.create(Object.proptotype);
Object.defineProperty(myObj, 'foo', {
    value: bar,
    writable: true,
    enumerable: true,
    configurable: true
});


// Meta Object API:
Object.defineProperty(object, key, descriptor);
Object.defineProperties(object, object_of_descriptors);
Object.getOwnPropertyDescriptor(object, key); // return an object,
//      which describes the attributes of the property

// Best not to use them:
Object.getOwnPropertyNames(object); // returns an array of all properties
//  (enumerable or not) found directly upon a given object.
Object.getPrototypeOf(object); // method returns the prototype
//  (i.e. the value of the internal [[Prototype]] property) of the specified object.
Object.setPrototypeOf(obj, prototype); // method sets the prototype
//  (i.e., the internal [[Prototype]] property) of a specified object to another object or null.
//    Secure frameworks may ban their use, because
//    they use them and in the end just delete them.

function replace_prototype(object, prototype) {
    var result = Object.create(prototype);
    Object
        .getOwnPropertyNames(object)
        .forEach(function(key) {
            Object.defineProperty(result, key,
                Object.getOwnPropertyDescriptor(object, key))
        });
    return result;
} // completely copies source object and replace its proptotype object

Object.preventExtensions(object); // method prevents new properties from ever being added to an object
Object.seel(object); // seals an object, preventing new properties
//  from being added to it and marking all existing properties as non-configurable
Object.freeze(object); // prevents new properties from being added to it;
//  prevents existing properties from being removed; and prevents existing properties,
//  or their enumerability, configurability, or writability, from being changed.

Object.isExtensible(object);
Object.isSealed(object);
Object.isFrozen(object);

Object.assign(target, ...sources); // method is used to copy the values of all enumerable own properties
//  from one or more source objects to a target object. It will return the target object.

Object.create(proto[, propertiesObject]);
//  method creates a new object with the specified prototype object and properties.

Object.defineProperties(obj, props); // method defines new or modifies existing
//  properties directly on an object, returning the object.

Object.entries();
//  method returns an array of a given object's own enumerable property [key, value]
//  pairs, in the same order as that provided by a for...in loop
//  (the difference being that a for-in loop enumerates properties in the prototype chain as well).

Object.is(value1, value2); // method determines whether two values are the same value.

Object.prototype.hasOwnProperty(prop); // method returns a boolean indicating
//  whether the object has the specified property as own (not inherited) property.

Object.prototype.isPrototypeOf(object); // method checks if an object exists
//  in another object's prototype chain.

Object.prototype.propertyIsEnumerable(prop); // method returns a Boolean indicating
//  whether the specified property is enumerable.

Object.prototype.valueOf(); // method returns the primitive value of the specified object.
//  JavaScript calls the valueOf method to convert an object to a primitive value.
//  You rarely need to invoke the valueOf method yourself; JavaScript automatically
//  invokes it when encountering an object where a primitive value is expected.


// Strict Mode
'use strict'; // can be put inside of file or funcion.
// Function form is recomended because of concatenation of files to bundle.
// adds number of reserved words:
implements, interface,
let, package, private, protected, public, static, yield;
/* Strict mode implies the following:
    1) No more implied global variables within function.
        (if you forget to declare variable in function it won't be global, you will get error instead)
    2) 'this' is not bound to the global object by function form.
        (if you call a method as a function this will get bound to undefined)
    3) 'apply' and 'call' do not default to the global object.
    4) No 'with' statement.
    5) If you try to assign something to non-writable property => trow exception.
        But it fails silently in non-strict mode.
    6) Deleting non-configurable properties also throw exception.
    8) 'eval' and 'arguments' are reserved.
    9) 'arguments' no longer linked to parameters.
    10) No more arguments.caller and arguments.callee.
    11) No more octal literals.
    12) Duplicate names in an object literals or function parameters are a syntax error.
    13) Forgotting to use the 'new' prefix will throw an exception,
        not silently clobber the global object.
    14) Makes debugging easier. Code errors that would otherwise have been ignored or
        would have failed silently will now generate errors or throw exceptions, alerting
        you sooner to problems in your code and directing you more quickly to their source.
    15) Eliminates this coercion. Without strict mode, a reference to a this value of
        "null" or "undefined" is automatically coerced to the global.
    16) Disallows duplicate parameter values. Strict mode throws an error when it detects
        a duplicate named argument for a function.

        Note: It used to be (in ECMAScript 5) that strict mode would disallow duplicate property names in object.
    17) Makes eval() safer. There are some differences in the way eval() behaves in
        strict mode and in non-strict mode. Most significantly, in strict mode, variables and
        functions declared inside of an eval() statement are not created in the containing scope
        (they are created in the containing scope in non-strict mode, which can also be a
        common source of problems).
*/
// There is no methods for determining if strict mode is on, but it is easy to make your own.
function inStricMode() {
    return (function() {
        return !this;
    }());
}

function strictModeImplemented() {
    return (function() {
        'use strict';
        return !this;
    }());
}


// FUNCTION CHALLENGES:
// 1 ---------------------------------------------------------------------------
function foo(o) {
    o = null;
}
var x = [];
foo(x);
console.log(x); // []
// 2 ---------------------------------------------------------------------------
function add(a) {
    return function(b) {
        return a + b;
    }
}
add(2)(5); // 7
// 3 ---------------------------------------------------------------------------
function lift(operation) {
    return operation;
}
console.log(lift(add)(2)(6)); // 8
// 4 ---------------------------------------------------------------------------
function limit(operation, counter) {
    return function(a, b) {
        if (counter > 0) {
            counter--;
            return operation(a)(b);
        }
    };
}
var addLtd = limit(add, 1);
console.log(addLtd(3, 2)); // 5
console.log(addLtd(2, 5)); // undefined
// 5 ---------------------------------------------------------------------------
function from(counter) {
    return function() {
        return counter++;
    }
}
var index = from(0);
console.log(index()); // 0
console.log(index()); // 1
// 6 ---------------------------------------------------------------------------
function to(start, end) {
    return function() {
        var i = start();
        if (end > i) {
            return i;
        }
    }
}
index = to(from(1), 3);
console.log(index()); // 1
console.log(index()); // 2
console.log(index()); // undefined
// 7 ---------------------------------------------------------------------------
function element(array, genFunction) {
    if (genFunction !== undefined) {
        genFunction = to(from(0), array.length);
    }
    return function() {
        var i = genFunction();
        if (i !== undefined) {
            return array[i];
        }
    }
}
var ele = element([1, 2, 3, 4, 5, ], to(from(1), 3));
ele = element([2, 3, 5, 7, 8]);
// 8 ---------------------------------------------------------------------------
function fibonachi(a, b) {
    return function() {
        var next = a;
        a = b;
        b += next;
        return next;
    };
}
// 9 ---------------------------------------------------------------------------
function counter(value) {
    return {
        up: function() {
            value++;
            return value;
        },
        down: function() {
            value--;
            return value;
        }
    }
}
index = counter(10);
counter.up(); // 11
counter.down(); // 10
// 10 --------------------------------------------------------------------------
function exp(value) {
    return (Array.isArray(value) ?
        value[0](
            exp(value[1]),
            exp(value[2])
        ) :
        value;
    );
}
var sae = [add, 5, 11];
exp(sae); // 16
exp(23); // 23
var nae = [
    Math.sqrt, [
        add, [square, 3],
        [square, 4]
    ]
];
// 11 Attack: how to reference array directly ----------------------------------
function vector() {
    var array = [];
    return {
        get: function get(i) {
            return array[i];
        },
        store: function store(i, value) {
            array[i] = value;
        },
        append: function append(value) {
            array.push(value);
        }
    }
}

var vec = vector(),
    that;
vec.store('push', function() {
    that = this;
});
vec.append(); // invoke pushed function
console.log(that); // logs the array

// FIX:
function vector() {
    var array = [];
    return {
        get: function get(i) {
            return array[+i]; // +i
        },
        store: function store(i, value) {
            array[+i] = value; // +i
        },
        append: function append(value) {
            array[array.length] = value; // get rid of push
        }
    }
}
// Vulnerability was in array's indexing system and context binding
array['my'] = 18; // associative array
array.my; // 18 - very strange behaviour. Array behaves as object
// 12 --------------------------------------------------------------------------
function pubsub() {
    var subscribers = [];
    return {
        subscribe: function(subscriber) {
            subscribers.push(subscriber);
        },
        publish: function(publication) {
            var i;
            length = subscribers.length;
            for (i = 0, i < length; i++) {
                subscribers[i](publication);
            }
        }
    }
}

var ps = pubsub();
ps.subscribe(function(data) {
    this.length = 0; // set length of subscribers array to 0
    // this is subscribers array itself because functions store in array.
    // and the considered a method of array.
    // FIX: use forEach and run subscribers inside of callback.
});
ps.publish('hello!');
ps.subscribe(); // simplest attack because when publishing, undefined() runs.
// FIX: put invocation of subscribers inside of try catch block.

ps.publish = undefined; // just delete the publish method.
// Freeze the returned object.

ps.subscribe(limit(function() { // we put limit to not paralize the system
    ps.publish('Out of order');
}, 1)); // FIX: put subscribers invocation inside setTimeout() to schedule invocation.
// Note: setTimeout return a number by which we can cancel it.
// If attacker gues that he can stop the invocation.

// Taking in account all above attacks. Lets fix our function.
function pubsub() {
    var subscribers = [];
    return Object.freeze({
        subscribe: function(subscriber) {
            subscribers.push(subscriber);
        },
        publish: function(publication) {
            subscribers.forEach(function(s) {
                setTimeout(function() {
                    s(publication); // try catch is no more needed,
                    // because if callback fails it gonna skiped and move to another.
                }, 0);
            });
        }
    });
}
// 13 --------------------------------------------------------------------------
// 14 --------------------------------------------------------------------------


// Security
// XSS - Cross Site Scripting.
// Cross Origin Policy
// Same Origin Policy

// Good code is easier to reason about.
// Strict conformance to good style rule.
// Always pass JS through JSLint.

// Never trust a machine that is not under your absolute control.
// Never trust the browser.
// The browser is a loaded gun pointed at your head. Templates pull the trigger.


// THREADING

// Pros:
// 1. No rethinking is necessary. (Take any code and put it in thread, it will work)
// 2. Blocking programms are ok.
// 3. Execution continues as long as any thread is not blocked.

// Cons:
// 1. Stack memory per thread.
// 2. If two threads use the same memory, a race may occure.

// We will never have threads in JS. Example:
myArray[myArray.length] = 'a'; // first thread
myArray[myArray.length] = 'b'; // second thread
// possible outcomes:
['a', 'b'];
['b', 'a'];
['a'];
['b'];

// Mutual exclusion
// 1. Only one thread can be excuting on a critical section at a time.
// 2. All other threads wanting to execute the critical section are blocked.
// 3. If threads don't interact, then the program runs at full speed.
// 4. If the y do interact, then races will occur unless mutual exclusion is employed.

// Alternative to THREADS are Asynchronous Functions
// Async function - returns immediately. Success or failure will be determined somehow in the future.
/* We like to use async functions in TURN SYSTEMS.
    TURN - started by external event, such as the delivery of a message, completion
        of an asynchronous request, a user action, or the ticking of the clock.
    A callback function associated with the event is called. It runs to completion.
        When it returns, the turn ends.
    No need for threads. No races. No deadlocks.
*/
/* The LAW of TURN:
    1. Never blocks.
    2. Never waits.
    3. Finish fast.
*/
/*
Pros:
    1. Completely free of races and deadlocks.
    2. Only one stack.
    3. Very low overhead.
    4. Resilent. If a turn fails, the program can still go on.
Cons:
    1. Programs must never block.
    2. Turns must finish quickly.
    3. Programms are inside out.
*/

// Everything in Node.js is (or can be) non-blocking.
// Except some synchronous functions, require.


// Example with elipsis operator (ES6)
function curry(func, ...first) {
    return function(...second) {

    }
}
// is analogue for (ES5)
function curry(func) {
    var slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function() {
        return func.apply(null, args.concat(slice.call(arguments, 0)));
    }
}

// If we had nested object. Freez() would freez the outer one.
// Numbers, Strings, Booleans are already frozeen.

(name) => { id: name }; // Fails because of ambiguity. it returns undefined

/* ADsafe.org recommedns:
    1. stop use this. Because when you call the method as a function ->
        this gets bound to global object, which gives away the farm.
    2. Stop using null. Use undefined instead.
    3. Stop using falsiness. Use clear conditions in if-statement.
 
Recommendation:
    1. Use array.forEach instead of for-statement.
    2. Use Object.keys(myObject).forEach instead of for-in. Because for-in get into prototype.
    3. Use repeat() function instead of while loop. Where
*/

function repeat(func) {
    if (func() !== undefined) {
        return repeat(func);
    }
}


function foo(arg1, arg2) {}
foo.length === 2 // amount of arguments defined in function definition.

// JS types: Boolean, Number, String, Object, undefined, null, Symbol (ES6)


// Reflect
/*
    Reflect is a built-in object that provides methods for interceptable JavaScript operations.
    The methods are the same as those of proxy handlers. Reflect is not a function object,
    so it's not constructible.
    Description
        Unlike most global objects, Reflect is not a constructor. You can not use it with a new
        operator or invoke the Reflect object as a function. All properties and methods of Reflect
        are static (just like the Math object).
*/

// Each of the following options will create a new empty object:
var newObject = {}; // or
var newObject = Object.create(null); // or
var newObject = new Object();

// ====================================================================================================

// There are then four ways in which keys and values can then be assigned to an object:
// ECMAScript 3 compatible approaches
// 1. Dot syntax
newObject.someKey = 'Hello World'; // Write properties
var key = newObject.someKey; // Access properties
// 2. Square bracket syntax
newObject['someKey'] = 'Hello World'; // Write properties
var key = newObject['someKey']; // Access properties

// ECMAScript 5 only compatible approaches
// For more information see: http://kangax.github.com/es5-compat-table/
// 3. Object.defineProperty
Object.defineProperty(newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});
// If the above feels a little difficult to read, a short-hand could
// be written as follows:
var defineProp = function ( obj, key, value ){
    config.value = value;
    Object.defineProperty(obj, key, config);
}
// Create a new empty object
var man = Object.create(null);
// Populate the object with properties
defineProp( man, 'car', 'Delorean' );
defineProp( man, 'dob', '1981' );
defineProp( man, 'beard', false );
// 4. Object.defineProperties
Object.defineProperties(newObject, {
    "someKey": {
        value: "Hello World",
        writable: true
    },
    "anotherKey": {
        value: "Foo bar",
        writable: false
    }
});