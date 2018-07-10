## Runtime concepts
JavaScript has a single __Call Stack__ (as JS is single-threaded language) in which it keeps track of what function we’re currently executing and what function is to be executed after that.

Every time you call a setTimeout function or you do some async operation — it is added to the __Event Table__. This is a data structure which knows that a certain function should be triggered after a certain event. Once that event occurs (timeout, click, mouse move) it sends a notice. Bear in mind that the Event Table does not execute functions and does not add them to the call stack on it’s own. It’s sole purpose is to keep track of events and send them to the Event Queue.

The __Event Queue__ is a data structure similar to the stack — again you add items to the back but can only remove them from the front. It kind of stores the correct order in which the functions should be executed. It receives the function calls from the Event Table, but it needs to somehow send them to the Call Stack? This is where the Event Loop comes in.

__Event Loop__ - is a constantly running process that checks if the call stack is empty. Imagine it like a clock and every time it ticks it looks at the Call Stack and if it is empty it looks into the Event Queue. If there is something in the event queue that is waiting it is moved to the call stack. If not, then nothing happens.

You sometimes get that when you make an infinite recursion but sometimes you actually have a big number of recursive calls that you want to make. There’s a simple yet hacky workaround which will allow you to retain your code structure and still make an absurd amount of calls — wrap your recursion calls in `setTimeout`.

A `web worker` or a cross-origin `iframe` has its own stack, heap, and message queue. Two distinct runtimes can only communicate through sending messages via the postMessage method. This method adds a message to the other runtime if the latter listens to message events.

__[Video about JS Runtime](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=0s&list=WL&index=64)__

Examples of Macro: `setTimeout`, `setInternal`, `setImmediate`, I/O tasks

Examples of Micro: `Promises`, `process.nextTick` (NodeJS)

__[About Micro Tasks and Macro Tasks](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)__
