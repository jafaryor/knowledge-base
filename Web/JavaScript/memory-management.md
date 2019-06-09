## Memory Management
This is the simplest garbage collection algorithm. An object is considered “garbage collectible” if there are zero references pointing to it.

### Cycles are creating problems
There is a limitation when it comes to cycles. In the following example, two objects are created and reference one another, thus creating a cycle.
```javascript
function f() {
    var o1 = {};
    var o2 = {};
    o1.p = o2; // o1 references o2
    o2.p = o1; // o2 references o1. This creates a cycle.
}

f();
```
They will go out of scope after the function call, so they are effectively useless and could be freed. However, the reference-counting algorithm considers that since each of the two objects is referenced at least once, neither can be garbage-collected.

### Mark-and-sweep algorithm
In order to decide whether an object is needed, this algorithm determines whether the object is reachable.

The Mark-and-sweep algorithm goes through these 3 steps:
* Roots: In general, roots are global variables which get referenced in the code. In JavaScript for example, a global variable that can act as a root is the “window” object. The identical object in Node.js is called “global”. A complete list of all roots gets built by the garbage collector.
* The algorithm then inspects all roots and their children and marks them as active (meaning, they are not garbage). Anything that a root cannot reach will be marked as garbage.
* Finally, the garbage collector frees all memory pieces that are not marked as active and returns that memory to the OS.

![mark-and-sweep](../images/mark-and-sweep.gif)

___

## Memory Leak
Memory leaks are pieces of memory that the application have used in the past but is not needed any longer but has not yet been return back to the OS or the pool of free memory.

The four types of common JavaScript leaks:
* __Global variables__.
    ```javascript
    function foo(arg) {
        bar = "some text";
    }

    // is equivivalent of

    function foo(arg) {
        window.bar = "some text";
    }
    ```

    You can also accidentally create a global variable using `this`:
    ```javascript
    function foo() {
        this.var1 = "potential accidental global";
    }
    // Foo called on its own, this points to the global object (window)
    // rather than being undefined.
    foo();
    ```

    > You can avoid all this by adding `‘use strict’;` at the beginning of your JavaScript file

    Use global variables to store data if you must but when you do, make sure to assign it as `null` or reassign it once you are done with it.

* __Timers or callbacks that are forgotten__

    Don't forget to remove `setInterval()` and `target.addEventListener()`.

* __Closures__

    Any object inside the timer will hold a reference in order to run that piece of code somewhere in the future without any problems.

    ```javascript
    var myObj = {
        callMeMaybe: function () {
            var myRef = this;

            var val = setTimeout(function () { 
                console.log('Time is running out!'); 
                myRef.callMeMaybe();
            }, 1000);
        }
    };

    myObj.callMeMaybe();
    ```

    The timer will still fire. `myObj` won’t be garbage collected as the closure passed to `setTimeout` has to be kept alive in order to be executed. In turn, it holds references to `myObj` as it captures `myRef`.

* __Out of DOM references__

    ```javascript
    var elements = {
        button: document.getElementById('button'),
        image: document.getElementById('image')
    };
    function doStuff() {
        elements.image.src = 'http://example.com/image_name.png';
    }
    function removeImage() {
        // The image is a direct child of the body element.
        document.body.removeChild(document.getElementById('image'));
        // At this point, we still have a reference to #button in the
        //global elements object. In other words, the button element is
        //still in memory and cannot be collected by the GC.
    }
    ```


### Garbage Collectors
Although Garbage Collectors are convenient they come with their own set of trade-offs. GC is nondeterminism. In other words, GCs are unpredictable. It is not usually possible to be certain when a collection will be performed. This means that in some cases more memory than is actually required by the program is being used. In other cases, short-pauses may be noticeable in particularly sensitive applications.


### How to Optmize
* #### BENCHMARKING

    Benchmarking is simply comparing two timestamps.

* #### PROFILING

    Tip: Ideally, you want to ensure that your profiling isn’t being affected by extensions or applications you’ve installed

* #### THREE SNAPSHOTS TECHNIQUE

    You record a number of actions in your application, force a garbage collection, check if the number of DOM nodes doesn’t return to your expected baseline and then analyze three heap snapshots to determine if you have a leak.

* #### Performance monitor

    Use it to track momery allcation in real time.


___

#### [Read More](https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/)
