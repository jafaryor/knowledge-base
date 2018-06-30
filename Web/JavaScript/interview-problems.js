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

    obj02.getX = obj01.getX;
    console.log(obj02.getX()); // 2 - as "this" refers to "obj02"

    obj02.getY = obj01.getY;
    console.log(obj02.getY()); // undefined - as "this" refers to global context ("window")
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
    } // four time - 3 undefined

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

// More interview questions: https://github.com/ganqqwerty/123-Essential-JavaScript-Interview-Questions
