/**
 * The this keyword in JavaScript refers to the object that the function is a method of.
 * The value of this depends on how the function is called.
 */

// Task #1
(function() {
    var car = function() {
        // public method. Usage: instance_of_car.beep();
        this.beep = function() {
            console.log('beep-01');
        };
    };

    // static method. Usage: car.beep();
    car.beep = function() {
        console.log('beep-02');
    };

    // parent method. Usage: instance_of_car.beep();
    // This method will be called only if beep() is not defined in child class.
    car.prototype.beep = function() {
        console.log('beep-03');
    };

    // inheritance. Similar to previous expression
    car.prototype = {
        beep: function() {
            console.log('beep-04');
        }
    };

    // create new instance of car
    var Ford = new car();

    Ford.beep(); // beep-01

    // replace the beep method
    Ford.beep = (function() {
        console.log('beep-05');
    })();

    Ford.beep(); // beep-05
})();

// Task #2
(function() {
    var Increment = function() {
        var i = 0;
        // toString() is executed every time in console.log
        Inc.prototype.toString = function() {
            i++;
            return i;
        };
    };

    var inc = new Increment();
    console.log(inc); // 1
    console.log(inc); // 2
    console.log(inc + inc); // 7
})();

// Task #3
(function() {
    var obj01 = {
        x: 1,
        y: 10,
        getX: function() {
            return this.x;
        },
        getY: () => {
            return this.y;
        }
    };

    var obj02 = {
        x: 2,
        y: 20
    };

    var getXFunction = obj01.getX;

    obj02.getX = obj01.getX;
    console.log(obj02.getX()); // 2 - as "this" refers to "obj02"

    obj02.getY = obj01.getY;
    console.log(obj02.getY()); // undefined - as "this" refers to global context ("window")

    console.log(getXFunction()); // undefined - as "this" refers to global context ("window")
})();

// Task #5
(function() {
    var obj = {
        do: function() {
            console.log(this); // obj onject

            setTimeout(function() {
                console.log(this); // [object Window]
                /*
                We’ve created new scope which is not invoked from our event handler,
                so it defaults to the window Object as expected. 
                */
            }, 1000);
        }
    };

    obj.do();
})();

// Task #4
(function() {
    const arr = [10, 20, 30];

    for (var i = 0; i < arr.length; i++) {
        setTimeout(function() {
            console.log(i, arr[i]);
        }, 3000);
    } // four time - 3 undefined, because by the time the callbacks are run, i is equal to 3. arr[3] === undefined.

    for (var i = 0; i < arr.length; i++) {
        // pass in the variable i so that each function
        // has access to the correct index - IIFE
        setTimeout(
            (function(i_local) {
                return function() {
                    console.log('The index of this number is: ' + i_local);
                };
            })(i),
            3000
        );
    } // 10 20 30

    for (let i = 0; i < arr.length; i++) {
        // using the ES6 let syntax, it creates a new binding
        // every single time the function is called
        // read more here: http://exploringjs.com/es6/ch_variables.html#sec_let-const-loop-heads
        setTimeout(function() {
            console.log('The index of this number is: ' + i);
        }, 3000);
    } // 10 20 30
})();

// Task #5
(function() {
    (function() {
        var a = (b = 3);
        /*
        equivalent to:
            b = 3;
            var a = b;
        b ends up being a global variable (since it is not preceded by the var keyword)
        */
    })();

    console.log(typeof a !== 'undefined'); // false
    console.log(typeof b !== 'undefined'); // true

    /*
    In strict mode (i.e., with use strict), the statement var a = b = 3;
    will generate a runtime error of ReferenceError: b is not defined.
    */
})();

// Task #6
(function() {
    function foo2() {
        return;
        {
            bar: 'hello';
        }
    }

    foo2(); // undefined
})();

// Task #7
(function() {
    // Polyfill for Number.isInteger() method:
    function isInteger(x) {
        return Math.round(x) === x;
    }
})();

// Task #8 - Polyfills
(function() {
    Function.prototype.bind = function() {
        var fn = this,
            args = Array.prototype.slice.call(arguments),
            object = args.shift();

        return function() {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
})();

// Task #9
(function() {
    function isPalindrome(str) {
        // we don't consider non-word characters (",", ".", ":", ";" ...), so we just remove them
        str = str.replace(/\W/g, '').toLowerCase();

        return (
            str ==
            str
                .split('')
                .reverse()
                .join('')
        );
    }
})();

// Task #10
(function() {
    console.log(1 + '2' + '2'); // "122"
    console.log(1 + +'2' + '2'); // "32"
    console.log(1 + -'1' + '2'); // "02"
    console.log(+'1' + '1' + '2'); // "112"
    console.log('A' - 'B' + '2'); // "NaN2"
    console.log('A' - 'B' + 2); // NaN
})();

// Task #11
(function() {
    console.log(0 || 1); // 1
    console.log(1 || 2); // 1
    console.log(0 && 1); // 0
    console.log(1 && 2); // 2
    // 0 == false, (1 <= x <= +Infinity) == true
})();

// Task #12
(function() {
    var list = readHugeList();

    var nextListItem = function() {
        var item = list.pop();

        if (item) {
            // nextListItem(); // will cause stack overflow for lasrge list
            setTimeout(nextListItem, 0); // stack overflow is eliminated because the event loop handles the recursion
            /*
                When nextListItem runs, if item is not null, the timeout function (nextListItem)
                is pushed to the event queue and the function exits, thereby leaving the call stack clear. 
            */
        }
    };
})();

// Task #13
(function() {
    var a = {},
        b = { key: 'b' },
        c = { key: 'c' };

    a[b] = 123;
    a[c] = 456;

    console.log(a[b]); // 456
    /*
        The reason for this is as follows: When setting an object property, JavaScript will implicitly
        stringify the parameter value. In this case, since b and c are both objects, they will both be
        converted to "[object Object]". As a result, a[b] anda[c] are both equivalent to a["[object Object]"]
        and can be used interchangeably. Therefore, setting or referencing a[c] is precisely the same as
        setting or referencing a[b].
    */
})();

// Task #14
// ===============================================================
var length = 10; // also available as: this.length, window.length, length
function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};

obj.method(fn, 1);
// 10 - because fn() belongs to global scope (window)
// 2 - because fn() becomes part of arguments object, which has prop length === 2
// ===============================================================

// Taks #15
(function() {
    (function() {
        try {
            throw new Error();
        } catch (x) {
            var x = 1,
                y = 2;
            console.log(x); // 1
        }

        console.log(x); // undefined - However var is hoisted, the error’s identifier (x) is only visible inside the catch block
        console.log(y); // 2 - as var was hoisted
    })();
})();

// Task #16
(function() {
    var x = 21;
    var girl = function() {
        ++x; // equivalent to "++undefined"
        console.log(x); // local x is hiosted, but not initialized. So "undefined" was logged
        var x = 20;
        console.log(x); // 20
    };

    girl();
})();

// Task #17
(function() {
    console.log(typeof typeof 1); // -> typeof "number" -> "string"
})();

// Task #18
(function() {
    (function() {
        foo(); // will call foo function which is below

        foo = function() {
            // redefine global foo function
            console.log(1);
        };
    })();

    // will
    function foo() {
        console.log(2);
    }

    foo(); // 2, 1
})();

// Task #19
(function() {
    var obj = {
        a: 1
    };

    (function(obj) {
        // we will create a new object, but doesn't modify the current one
        obj = {
            a: 2
        };
    })(obj);

    console.log(obj.a); // 1
})();

// Task #20
(function() {
    var x = 1; // it will throw error if let is used

    function x() {}

    console.log(x); // 1

    /* because it transform into
    var x;
    function x() {}
    x = 1;
    console.log(x);
    */
})();

// More interview questions: https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions
