## Object API
* `Object.assign(target, ...sources): Object` - copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.

    Properties in the target object will be overwritten by properties in the sources if they have the same key.

    Both `String` and `Symbol` properties are copied.
    ```javascript
    var obj = Object.assign({ a: 1 }, { b: 2 }, { c: 3 });      // { a: 1, b: 2, c: 3 }

    var v1 = 'abc';
    var v2 = true;
    var v3 = 10;
    var v4 = Symbol('foo');

    var obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
    // Primitives will be wrapped, null and undefined will be ignored.
    // Note, only string wrappers can have own enumerable properties.
    console.log(obj); // { "0": "a", "1": "b", "2": "c" }
    ```

* `Object.create(proto, [propertiesObject]): Object` - creates a new object with the specified prototype object and properties.
    * `proto` - the object which should be the prototype of the newly-created object.
    * `propertiesObject` - specify property descriptors to be added to the newly-created object, with the corresponding property names. These properties correspond to the second argument of `Object.defineProperties()`.

    ```javascript
    var o;

    // create an object with null as prototype
    o = Object.create(null);

    o = {};
    // is equivalent to:
    o = Object.create(Object.prototype);

    // Example where we create an object with a couple of
    // sample properties. (Note that the second parameter
    // maps keys to *property descriptors*.)
    o = Object.create(Object.prototype, {
        // foo is a regular 'value property'
        foo: {
            writable: true,
            configurable: true,
            value: 'hello'
        },
        // bar is a getter-and-setter (accessor) property
        bar: {
            configurable: false,
            get: function() { return 10; },
            set: function(value) {
            console.log('Setting `o.bar` to', value);
            }
        }
    });


    // subclass extends superclass
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    ```

* `Object.defineProperty(obj: Object, prop: string, descriptor: Object): Object` __| MUTABLE__ - defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
    * `obj` - the object on which to define the property.
    * `prop` - the name of the property to be defined or modified.
    * `descriptor` - the descriptor for the property being defined or modified.

    Property descriptors present in objects come in two main flavors: __data descriptors__ and __accessor descriptors__. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter pair of functions. A descriptor must be one of these two flavors; it cannot be both.

    Both data and accessor descriptors are objects. They share the following required keys:

    * `configurable = false` - _true_ if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
    * `enumerable = false` - _true_ if and only if this property shows up during enumeration of the properties on the corresponding object.

    A data descriptor also has the following optional keys:

    * `value = undefined` - the value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
    * `writable = false` - _true_ if and only if the value associated with the property may be changed with an assignment operator.

    An accessor descriptor also has the following optional key:

    * `get = undefined` - a function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property.
    * `set = undefined` - a function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being assigned to the property.

    > Bear in mind that these options are not necessarily the descriptor's own properties, and properties inherited from the prototype chain will be considered too. In order to ensure these defaults are preserved you might freeze the `Object.prototype` upfront, specify all options explicitly, or point to `null` as `__proto__` property.

    ```javascript
    var o = {};

    Object.defineProperty(o, 'a', {
        value: 1,
        enumerable: true
    });
    Object.defineProperty(o, 'b', {
        value: 2,
        enumerable: false
    });
    o.d = 4;
    // is equivalent to:
    Object.defineProperty(o, 'd', {
        value: 4,
        writable: true,
        configurable: true,
        enumerable: true
    });

    for (var i in o) {
        console.log(i);     // logs 'a' and 'd' (in undefined order)
    }

    Object.keys(o);         // ['a', 'd']

    o.propertyIsEnumerable('a');    // true


    Object.defineProperty(o, 'c', {
        get() { return 1; },
        configurable: false
    });
    Object.defineProperty(o, 'c', {
        enumerable: true
    }); // throws a TypeError
    ```

* `Object.defineProperties(obj: Object, props: Object): Object` __| MUTABLE__ - defines new or modifies existing properties directly on an object, returning the object.
    * `props` - object whose own enumerable properties constitute descriptors for the properties to be defined or modified. Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors
    ```javascript
    var obj = {};
    Object.defineProperties(obj, {
        'property1': {
            value: true,
            writable: true
        },
        'property2': {
            value: 'Hello',
            writable: false
        }
        // etc. etc.
    });
    ```

* `Object.entries()` - returns an array of a given object's own enumerable property `[key, value]` pairs, in the same order as that provided by a `for...in` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
    ```javascript
    const obj = { foo: 'bar', baz: 42 };
    console.log(Object.entries(obj));   // [ ['foo', 'bar'], ['baz', 42] ]

    const map = new Map(Object.entries(obj));
    console.log(map);                   // Map { foo: "bar", baz: 42 }
    ```

* `Object.freeze(obj: Object): Object` __| MUTABLE__ - freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed, it also prevents the prototype from being changed.  The method returns the passed object.

    > __Note:__ values that are objects can still be modified, unless they are also frozen. As an object, an array can be frozen whereafter its elements cannot be altered.

    ```javascript
    var o = Object.freeze(obj);

    o === obj; // true
    Object.isFrozen(obj); // === true

    // Now any changes will fail
    obj.foo = 'quux';                   // silently does nothing
    obj.quaxxor = 'the friendly duck';  // silently doesn't add the property

    // In strict mode such attempts will throw TypeErrors
    function fail(){
        'use strict';
        obj.foo = 'sparky';             // throws a TypeError
        delete obj.foo;                 // throws a TypeError
        delete obj.quaxxor;             // returns true since attribute 'quaxxor' was never added
        obj.sparky = 'arf';             // throws a TypeError
    }()
    ```

* `Object.getOwnPropertyDescriptor(obj: Object, prop: string): Object` - returns a property descriptor for an own property of a given object.
    ```javascript
    let o = { bar: 42 };
    d = Object.getOwnPropertyDescriptor(o, 'bar');
    // d is {
    //   configurable: true,
    //   enumerable: true,
    //   value: 42,
    //   writable: true
    // }
    ```

* `Object.getOwnPropertyDescriptors(obj: Object): Object` - returns all own property descriptors of a given object.

* `Object.getOwnPropertyNames(obj: Object): string[]` - returns an array of all properties (including non-enumerable properties except for those which use Symbol) found directly upon a given object.
    ```javascript
    // Array-like object
    var obj = { 0: 'a', 1: 'b', 2: 'c' };
    console.log(Object.getOwnPropertyNames(obj).sort());    // logs ["0", "1", "2"]
    ```

* `Object.getOwnPropertySymbols(obj: Object): Symbol[]` - returns an array of all symbol properties found directly upon a given object.
    ```javascript
    var o = {
        foo: 42,
        [ Symbol( "bar" ) ]: "hello world",
        baz: true
    };

    Object.getOwnPropertySymbols( o );	// [ Symbol(bar) ]
    ```

* `Object.getPrototypeOf(obj: Object): Object` - returns the prototype (i.e. the value of the internal `[[Prototype]]` property) of the specified object.
    ```javascript
    var proto = {};
    var obj = Object.create(proto);
    Object.getPrototypeOf(obj) === proto;       // true
    ```
* `Object.is(value01: any, value02: any): boolean` - determines whether two values are the same value.
    Two values are the same if one of the following holds:
    * both `undefined`
    * both `null`
    * both `true` or both `false`
    * both strings of the same length with the same characters in the same order
    * both the same object
    * both numbers and
        * both `+0`
        * both `-0`
        * both `NaN`
        * or both non-zero and both not `NaN` and both have the same value

    > This is also not the same as being equal according to the `===` operator. The `===` operator (and the `==` operator as well) treats the number values `-0` and `+0` as equal and treats `Number.NaN` as not equal to `NaN`.

* `Object.isExtensible(obj: Object): boolean` - determines if an object is extensible (whether it can have new properties added to it).

    > __Note:__ An object can be marked as non-extensible using `Object.preventExtensions()`, `Object.seal()`, or `Object.freeze()`.

* `Object.isFrozen(obj: Object): boolean` - determines if an object is frozen.
    ```javascript
    // A new object is extensible, so it is not frozen.
    Object.isFrozen({}); // === false

    // An empty object which is not extensible
    // is vacuously frozen.
    var vacuouslyFrozen = Object.preventExtensions({});
    Object.isFrozen(vacuouslyFrozen); // === true

    // A new object with one property is also extensible,
    // ergo not frozen.
    var oneProp = { p: 42 };
    Object.isFrozen(oneProp); // === false

    // Preventing extensions to the object still doesn't 
    // make it frozen, because the property is still 
    // configurable (and writable).
    Object.preventExtensions(oneProp);
    Object.isFrozen(oneProp); // === false

    // ...but then deleting that property makes the object
    // vacuously frozen.
    delete oneProp.p;
    Object.isFrozen(oneProp); // === true

    // A non-extensible object with a non-writable
    // but still configurable property is not frozen.
    var nonWritable = { e: 'plep' };
    Object.preventExtensions(nonWritable);
    Object.defineProperty(nonWritable, 'e', {
    writable: false
    }); // make non-writable
    Object.isFrozen(nonWritable); // === false

    // Changing that property to non-configurable
    // then makes the object frozen.
    Object.defineProperty(nonWritable, 'e', {
    configurable: false
    }); // make non-configurable
    Object.isFrozen(nonWritable); // === true

    // A non-extensible object with a non-configurable
    // but still writable property also isn't frozen.
    var nonConfigurable = { release: 'the kraken!' };
    Object.preventExtensions(nonConfigurable);
    Object.defineProperty(nonConfigurable, 'release', {
    configurable: false
    });
    Object.isFrozen(nonConfigurable); // === false

    // Changing that property to non-writable
    // then makes the object frozen.
    Object.defineProperty(nonConfigurable, 'release', {
    writable: false
    });
    Object.isFrozen(nonConfigurable); // === true

    // A non-extensible object with a configurable
    // accessor property isn't frozen.
    var accessor = { get food() { return 'yum'; } };
    Object.preventExtensions(accessor);
    Object.isFrozen(accessor); // === false

    // ...but make that property non-configurable
    // and it becomes frozen.
    Object.defineProperty(accessor, 'food', {
    configurable: false
    });
    Object.isFrozen(accessor); // === true

    // But the easiest way for an object to be frozen
    // is if Object.freeze has been called on it.
    var frozen = { 1: 81 };
    Object.isFrozen(frozen); // === false
    Object.freeze(frozen);
    Object.isFrozen(frozen); // === true

    // By definition, a frozen object is non-extensible.
    Object.isExtensible(frozen); // === false

    // Also by definition, a frozen object is sealed.
    Object.isSealed(frozen); // === true
    ```

* `Object.isSealed(obj: Object): boolean` - determines if an object is sealed.
    ```javascript
    // Objects aren't sealed by default.
    var empty = {};
    Object.isSealed(empty); // === false

    // If you make an empty object non-extensible,
    // it is vacuously sealed.
    Object.preventExtensions(empty);
    Object.isSealed(empty); // === true

    // The same is not true of a non-empty object,
    // unless its properties are all non-configurable.
    var hasProp = { fee: 'fie foe fum' };
    Object.preventExtensions(hasProp);
    Object.isSealed(hasProp); // === false

    // But make them all non-configurable
    // and the object becomes sealed.
    Object.defineProperty(hasProp, 'fee', {
    configurable: false
    });
    Object.isSealed(hasProp); // === true

    // The easiest way to seal an object, of course,
    // is Object.seal.
    var sealed = {};
    Object.seal(sealed);
    Object.isSealed(sealed); // === true

    // A sealed object is, by definition, non-extensible.
    Object.isExtensible(sealed); // === false

    // A sealed object might be frozen,
    // but it doesn't have to be.
    Object.isFrozen(sealed); // === true 
    // (all properties also non-writable)

    var s2 = Object.seal({ p: 3 });
    Object.isFrozen(s2); // === false 
    // ('p' is still writable)

    var s3 = Object.seal({ get p() { return 0; } });
    Object.isFrozen(s3); // === true
    // (only configurability matters for accessor properties)
    ```

* `Object.keys(obj: Object): string[]` - returns an array of a given object's own enumerable properties, in the same order as that provided by a `for...in` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
    ```javascript
    // array like object with random key ordering
    var anObj = { 100: 'a', 2: 'b', 7: 'c' };
    console.log(Object.keys(anObj));    // console: ['2', '7', '100']
    ```

* `Object.preventExtensions(obj: Object): Object` __| MUTABLE__ - prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).

    > `Object.preventExtensions()` only prevents addition of own properties. Properties can still be added to the object prototype.

* `hasOwnProperty(prop: string|Symbol): boolean` - returns a boolean indicating whether the object has the specified property as own (not inherited) property.

* `isPrototypeOf(object: Object): boolean` - checks if an object exists in another object's prototype chain.

* `propertyIsEnumerable(prop: string): boolean` - returns a Boolean indicating whether the specified property is enumerable.

* `toLocaleString(): string` - returns a string representing the object. This method is meant to be overridden by derived objects for locale-specific purposes. `Object`'s `toLocaleString` returns the result of calling `toString()`.

* `toString(): string` - returns a string representing the object.
    ```javascript
    var toString = Object.prototype.toString;

    toString.call(new Date);    // [object Date]
    toString.call(new String);  // [object String]
    toString.call(Math);        // [object Math]
    toString.call(undefined);   // [object Undefined]
    toString.call(null);        // [object Null]
    ```

* `valueOf(): any` - returns the primitive value of the specified object.

    JavaScript calls the `valueOf` method to convert an object to a primitive value. You rarely need to invoke the `valueOf` method yourself; JavaScript automatically invokes it when encountering an object where a primitive value is expected.

    You can use `valueOf` within your own code to convert a built-in object into a primitive value. When you create a custom object, you can override `Object.prototype.valueOf()` to call a custom method instead of the default `Object` method.

    > __Note:__ Objects in string contexts convert via the `toString()` method, which is different from `String` objects converting to string primitives using `valueOf`. All objects have a string conversion, if only "`[object type]`". But many objects do not convert to number, boolean, or function.

* `Object.seal(obj: Object): Object` __| MUTABLE__ - seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.

    By default, objects are extensible (new properties can be added to them). Sealing an object is like freezing the object __but it does not prevent the values of data properties from being changed__.

    > The prototype chain remains untouched. However, the `__proto__`  property is sealed as well.

* `Object.setPrototypeOf(obj: Object, prototype: Object): Object` __| MUTABLE__ - sets the prototype (i.e., the internal `[[Prototype]]` property) of a specified object to another object or `null`.

    Throws a __TypeError__ exception if the object whose `[[Prototype]]` is to be modified is non-extensible according to `Object.isExtensible()`. Does nothing if the prototype parameter isn't an object or `null` (i.e., number, string, boolean, or `undefined`). Otherwise, this method changes the `[[Prototype]]` of `obj` to the new value.

    > __Warning:__ Changing the `[[Prototype]]` of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in every browser and JavaScript engine. The effects on performance of altering inheritance are subtle and far-flung, and are not limited to simply the time spent in `Object.setPrototypeOf(...)` statement, but may extend to any code that has access to any object whose `[[Prototype]]` has been altered. If you care about performance you should avoid setting the `[[Prototype]]` of an object. Instead, create a new object with the desired `[[Prototype]]` using `Object.create()`.

* `Object.values(obj: Object): any[]` - returns an array of a given object's own enumerable property values, in the same order as that provided by a `for...in` loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
    ```javascript
    // array like object with random key ordering
    // when we use numeric keys, the value returned in a numerical order according to the keys
    var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
    console.log(Object.values(an_obj)); // ['b', 'c', 'a']
    ```

### Note
In ES5, if the argument to this method is not an object (a primitive), then it will cause a __TypeError__. In ES2015, a non-object argument will be treated as if it was a non-extensible ordinary object