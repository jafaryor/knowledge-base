# Browser Event Loop
A popular example of a JavaScript Engine is _Google’s V8_ engine. The V8 engine is used inside _Chrome_ and _Node.js_ for example. The Engine consists of two main components:
* __Memory Heap__ — this is where the memory allocation happens
* __Call Stack__ — this is where your stack frames are as your code executes

So, we have the Engine but there is actually a lot more. We have those things called Web APIs which are provided by browsers, like the `DOM`, `AJAX`, `setTimeout` and much more.

And then, we have the so popular __event loop__ and the __callback queue__.

## Call Stack
JavaScript is a single-threaded programming language, which means it has a single Call Stack. Therefore it can do one thing at a time.

The __Call Stack__ is a data structure which records basically where in the program we are. If we step into a function, we put it on the top of the stack. If we return from a function, we pop off the top of the stack. That’s all the stack can do.

The _V8_ is single threaded which means it has only one _Call Stack_, which means _V8_ can do only one thing at a time.

Each entry in the Call Stack is called a __Stack Frame__.

Every time you call a `setTimeout` function or you do some async operation — it is added to the __Event Table__. This is a data structure which knows that a certain function should be triggered after a certain event. Once that event occurs (timeout, click, mouse move) it sends a notice. Bear in mind that the Event Table does not execute functions and does not add them to the call stack on it’s own. It’s sole purpose is to keep track of events and send them to the Event Queue.

The __Event/Task Queue__ is a data structure similar to the stack — again you add items to the back but can only remove them from the front. It kind of stores the correct order in which the functions should be executed. It receives the function calls from the Event Table, but it needs to somehow send them to the Call Stack? This is where the Event Loop comes in.

__Event Loop__ - is a constantly running process that checks if the call stack is empty. Imagine it like a clock and every time it ticks it looks at the Call Stack and if it is empty it looks into the Event Queue. If there is something in the event queue that is waiting it is moved to the call stack. If not, then nothing happens.

![event-loop](./images/event-loop.png)

You sometimes get that when you make an infinite recursion but sometimes you actually have a big number of recursive calls that you want to make. There’s a simple yet hacky workaround which will allow you to retain your code structure and still make an absurd amount of calls — wrap your recursion calls in `setTimeout`.

#### [Event Loop Visualization](http://latentflip.com/loupe)

A `web worker` or a cross-origin `iframe` has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the `postMessage` method. This method adds a message to the other runtime if the latter listens to message events.

#### [Video about Browser Event Loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=0s&list=WL&index=64)

## Macrotasks and Microtasks
Deep down the task queue, something else is going on. The tasks are broken down further into __microtask__ and __macrotask__.

Exactly one macrotask is processed from the queue (a task queue is a macrotask queue). After this has finished, all the microtasks enqueued in the microtask queue are processed within the same cycle. These microtasks can enqueue other microtasks, which will be run until they are all exhausted. All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

If we’d like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask()`.

Examples of Macro: `setTimeout`, `setInternal`, `setImmediate`, I/O tasks

Examples of Micro: `Promises`, `async`/`await`, `queueMicrotask`

Here’s an example with “counting progress bar”, similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:

```javascript
let i = 0;

function count() {
    // do a piece of the heavy job (*)
    do {
        i++;
        progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
        queueMicrotask(count);
    }
}

count();
```

Example:
```javascript
// example.js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

Result:
```shell
script start
script end
promise1
promise2
setTimeout
```

[Visualization of the above code](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)


#### [Article about Micro Tasks and Macro Tasks](https://blog.bitsrc.io/microtask-and-macrotask-a-hands-on-approach-5d77050e2168)


## Execution Context
Execution context is an abstract concept of an environment where the Javascript code is evaluated and executed. Whenever any code is run in JavaScript, it’s run inside an execution context.

There are three types of execution context in JavaScript.
* __Global Execution Context__ — This is the default or base execution context. The code that is not inside any function is in the global execution context. It performs two things: it creates a global object which is a `window` object (in the case of browsers) and sets the value of `this` to equal to the global object. There can only be one global execution context in a program.
* __Functional Execution Context__ — Every time a function is invoked, a brand new execution context is created for that function. Each function has its own execution context, but it’s created when the function is invoked or called. There can be any number of function execution contexts. Whenever a new execution context is created, it goes through a series of steps in a defined order which I will discuss later in this article.
* __Eval Function Execution Context__ — Code executed inside an `eval` function also gets its own execution context, but as `eval` isn’t usually used by JavaScript developers, so I will not discuss it here.

### Execution Stack
Execution stack, also known as “calling stack” in other programming languages, is a stack with a LIFO (Last in, First out) structure, which is used to store all the execution context created during the code execution.

When the JavaScript engine first encounters your script, it creates a global execution context and pushes it to the current execution stack. Whenever the engine finds a function invocation, it creates a new execution context for that function and pushes it to the top of the stack.

The engine executes the function whose execution context is at the top of the stack. When this function completes, its execution stack is popped off from the stack, and the control reaches to the context below it in the current stack.

### Execution Context Creation
The execution context is created in two phases:
1. __Creation Phase__

    Following things happen during the creation phase:
    1. __LexicalEnvironment__ component is created.

        A __lexical environment__ is a structure that holds identifier-variable mapping. (here identifier refers to the name of variables/functions, and the variable is the reference to actual object [including function object and array object] or primitive value).

        Each Lexical Environment has three components:
        * Environment Record
        * Reference to the outer environment,
        * This binding.

        > For the function code, the environment record also contains an `arguments` object that contains the mapping between indexes and arguments passed to the function.

    2. __VariableEnvironment__ component is created.

        It’s also a Lexical Environment whose `EnvironmentRecord` holds bindings created by `VariableStatements` within this execution context.

        In ES6, one difference between `LexicalEnvironment` component and the `VariableEnvironment` component is that the former is used to store function declaration and variable (`let` and `const`) bindings, while the latter is used to store the variable (`var`) bindings only.

2. __Execution Phase__

    In this phase assignments to all those variables are done and the code is finally executed.

### Example
```javascript
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
    var g = 20;
    return e * f * g;
}
c = multiply(20, 30);
```

Creation Phase:
```javascript
GlobalExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Object",
        // Identifier bindings go here
        a: < uninitialized >,
        b: < uninitialized >,
        multiply: < func >
        }
        outer: <null>,
        ThisBinding: <Global Object>
    },
    VariableEnvironment: {
        EnvironmentRecord: {
        Type: "Object",
        // Identifier bindings go here
        c: undefined,
        }
        outer: <null>,
        ThisBinding: <Global Object>
    }
}
```

Execution Phase:
```javascript
LexicalEnvironment: {
    EnvironmentRecord: {
        Type: "Object",
        // Identifier bindings go here
        a: 20,
        b: 30,
        multiply: < func >
        }
        outer: <null>,
        ThisBinding: <Global Object>
    },
    VariableEnvironment: {
        EnvironmentRecord: {
        Type: "Object",
        // Identifier bindings go here
        c: undefined,
        }
        outer: <null>,
        ThisBinding: <Global Object>
    }
}
```

`multiply(20, 30)` Creatin Phase:
```javascript
FunctionExectionContext = {
LexicalEnvironment: {
    EnvironmentRecord: {
        Type: "Declarative",
        // Identifier bindings go here
        Arguments: {0: 20, 1: 30, length: 2},
        },
        outer: <GlobalLexicalEnvironment>,
        ThisBinding: <Global Object or undefined>,
    },
    VariableEnvironment: {
        EnvironmentRecord: {
        Type: "Declarative",
        // Identifier bindings go here
        g: undefined
        },
        outer: <GlobalLexicalEnvironment>,
        ThisBinding: <Global Object or undefined>
    }
}
```

`multiply(20, 30)` Execution Phase:
```javascript
FunctionExectionContext = {
LexicalEnvironment: {
    EnvironmentRecord: {
        Type: "Declarative",
        // Identifier bindings go here
        Arguments: {0: 20, 1: 30, length: 2},
        },
        outer: <GlobalLexicalEnvironment>,
        ThisBinding: <Global Object or undefined>,
    },
    VariableEnvironment: {
        EnvironmentRecord: {
        Type: "Declarative",
        // Identifier bindings go here
        g: 20
        },
        outer: <GlobalLexicalEnvironment>,
        ThisBinding: <Global Object or undefined>
    }
}
```

#### [Deep Dive in V8](https://blog.appsignal.com/2020/07/01/a-deep-dive-into-v8.html?utm_source=javascript-weekly-sponsored&utm_medium=email&utm_campaign=deep-dive-v8&utm_content=sponsored-link)
