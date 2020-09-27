## Logging
__Logs__ - the events that reflect the various aspect of your application, it is the easiest mode of troubleshooting and diagnosing your application.

Logging levels:
* __DEBUG__ - fine-grained informational events that are most useful to debug an app.
* __INFO__ - information messages that highlight the progress of the app at coarse-grained level.
* __WARN__ - potentially harmful situation.
* __ERROR__ - error events that might still allow the app to continue running.
* __FATAL__ - very severe error events that will presumably lead the app to abort.

Essential exception and error handlers:
```javascript
/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript
 * exception bubbles all the way back to the event loop.
 * By default, Node.js handles such exceptions by printing the
 * stack trace to stderr and exiting with code 1.
 */
process.on('uncaughtException', (error, origin) => {
  console.error(`Caught exception: ${error}. \n Exception origin: ${origin}.`);
});

/**
 * The 'unhandledRejection' event is emitted whenever a Promise
 * is rejected and no error handler is attached to the promise
 * within a turn of the event loop.
 * The 'unhandledRejection' event is useful for detecting and
 * keeping track of promises that were rejected whose rejections
 * have not yet been handled.
 */
process.on('unhandledRejection', (reason, promise) => {
  console.warn(`Unhandled Rejection at: ${promise}, reason: ${reason}.`);
});
```


### Logging Libraries:
* [Debug](https://github.com/visionmedia/debug#readme) - a tiny JS debugging utility modelled after Node.js core debugging technique. Works in both Node.js and web browser.

* [Bunyan](https://github.com/trentm/node-bunyan#readme) - a simple and fast JSON logging library for Nde.js services and CLI tool for nicely viewing the logs.

* [Winston](https://github.com/winstonjs/winston#readme) - a multi-transport and most advanced async logging library for Node.js.

* [Morgan](https://github.com/expressjs/morgan#readme) - a great logging tool as a middleware for ExpressJS that allows easily log requests, errors and more to console.


## Debugging
__Debugging__ - the process of finding and resolving defects or problems within a computer program that prevent correct operation of computer software or a system.

Use [Commander.js](https://github.com/tj/commander.js#readme) to parse command-line arguments.

To enable debug output for built-in Nodejs modules, add the following comment as the very first line of your script (`index.js`):
```javascript
// $NODE_DEBUG=http node index.js

const {request} = require('http');
...
```


## Debugging in VSCode
* [Debugging with Visual Studio Code](https://medium.com/@slamflipstrom/debugging-with-visual-studio-code-857904a8a590)
* [Debug Your Node.js App with Debug Auto Attach](https://medium.com/the-node-js-collection/debug-your-node-js-app-in-60-seconds-9ee942a453f0)
* [Debug by Attaching to Node.js process](https://medium.com/@abdularis/debugging-nodejs-application-using-chrome-and-vs-code-c4515a073f86)
* [Debugging Node.js via VS code with Inspect-brk (multiple process/clusters)](https://medium.com/@saransh98/debugging-node-js-via-vs-code-with-inspect-brk-multiple-process-clusters-b7282d63bec7)
* [NestJS: VSCode debugger setup](https://www.dantuck.com/article/nestjs-debug/)

---

#### [Logging: Best Practices for Node.JS Applications](https://blog.bitsrc.io/logging-best-practices-for-node-js-applications-8a0a5969b94c)

#### [Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)

#### [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
