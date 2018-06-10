## Function API
`Function` constructor creates a new Function object. Calling the constructor directly can create functions dynamically, but suffers from security and performance issues similar to `eval`.

Every JavaScript function is actually a `Function` object.

```javascript
new Function ([arg1], [arg2], ..., [argN], functionBody: string)
```

* `function.arguments` property refers to an an array-like object corresponding to the arguments passed to a function. Use the simple variable `arguments` instead. This property is forbidden in strict model due to taill call optimization.

    In the case of recursion, i.e. if function f appears several times on the call stack, the value of f.arguments represents the arguments corresponding to the most recent invocation of the function.

    The value of the arguments property is normally `null` if there is no outstanding invocation of the function in progress.

* `function.caller` property returns the function that invoked the specified function. This property is forbidden in strict model due to tail call optimization.

    If the function `f` was invoked by the top level code, the value of `f.caller` is `null`, otherwise it's the function that called `f`.

    > Note that in case of recursion, you can't reconstruct the call stack using this property.

* `length` property indicates the number of arguments expected by the function. This number excludes the _rest parameter_ and only includes parameters before the first one with a default value. By contrast, `arguments.length` is local to a function and provides the number of arguments actually passed to the function.

* `name` property indicates the function's name as specified when it was created, or "__anonymous__" for functions created anonymously.

* `apply(thisArg: Object, [argsArray: any[]]): any` method calls a function with a given this value, and arguments provided as an array (or an array-like object). Returns the result of calling the function with the specified this value and arguments.

* `call(thisArg: Object, arg1, arg2, ...): any` method calls a function with a given this value and arguments provided individually.

    > __Note:__ While the syntax of this function is almost identical to that of `apply()`, the fundamental difference is that `call()` accepts an __argument list__, while `apply()` accepts a __single array of arguments__.

* `bind(thisArg: Object, [arg1], [arg2], ...)` method creates a new function that, when called, has its `this` keyword set `thisArg`, with a given sequence of arguments preceding any provided when the new function is called. Returns a copy of the given function with the specified `this` value and initial arguments.
    ```javascript
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                    return fToBind.apply(this instanceof fNOP
                            ? this
                            : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype; 
            }
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    ```