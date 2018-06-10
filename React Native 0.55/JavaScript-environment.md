## JavaScript Environment

### JavaScript Runtime
When using React Native, you're going to be running your JavaScript code in two environments:
* In most cases, React Native will use [JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore), the JavaScript engine that powers `Safari`. Note that on `iOS`, `JavaScriptCore` does not use JIT due to the absence of writable executable memory in `iOS` apps.
* When using Chrome debugging, all JavaScript code runs within Chrome itself, communicating with native code via `WebSockets`. Chrome uses [V8](https://code.google.com/p/v8/) as its JavaScript engine.

While both environments are very similar, you may end up hitting some inconsistencies. We're likely going to experiment with other JavaScript engines in the future, so it's best to avoid relying on specifics of any runtime.

### JavaScript Syntax Transformers
Syntax transformers make writing code more enjoyable by allowing you to use new JavaScript syntax without having to wait for support on all interpreters.

React Native ships with the `Babel` JavaScript compiler. Check [Babel documentation](https://babeljs.io/docs/plugins/#transform-plugins) on its supported transformations for more details.

### Polyfills
Many standards functions are also available on all the supported JavaScript runtimes.

Browser:
* `console.{log, warn, error, info, trace, table}`
* `CommonJS require`
* `XMLHttpRequest, fetch`
* `{set, clear}{Timeout, Interval, Immediate}, {request, cancel}AnimationFrame`
* `navigator.geolocation`

ES6
* `Object.assign`
* `String.prototype.{startsWith, endsWith, repeat, includes}`
* `Array.from`
* `Array.prototype.{find, findIndex}`

ES7
* `Array.prototype.{includes}`

ES8
* `Object.{entries, values}`

Specific
* `__DEV__`