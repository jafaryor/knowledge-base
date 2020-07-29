## `Q` and `Bluebird`
Before JS native promises were implemented in NodeJS, prehistoric people were using libraries such as `Q` and `Bluebird`.

`Q` (v1.5.0) uses `process.nextTick` queue to schedule callbacks for resolved/rejected promises.

On the other hands, `Bluebird` (v3.5.0) uses `setImmediate` by default to schedule promise callbacks in recent NodeJS versions

```javascript
const Q = require('q');
const BlueBird = require('bluebird');

Promise.resolve().then(() => console.log('native promise resolved'));
BlueBird.resolve().then(() => console.log('bluebird promise resolved'));
setImmediate(() => console.log('set immediate'));
Q.resolve().then(() => console.log('q promise resolved'));
process.nextTick(() => console.log('next tick'));
setTimeout(() => console.log('set timeout'), 0);
```

In the above example, `BlueBird.resolve().then` callback has the same semantics as the following `setImmediate` call. Therefore, bluebird’s callback is scheduled in the same immediates queue before the `setImmediate` callback. Since Q uses `process.nextTick` to schedule its resolve/reject callbacks, `Q.resolve().then` is scheduled in the nextTick queue before the succeeding `process.nextTick` callback. We can conclude our deductions by seeing the actual output of the above program, as follows:

```shell
q promise resolved
next tick
native promise resolved
set timeout
bluebird promise resolved
set immediate
```

> This behavior is identical for promise `reject` handlers as well.
