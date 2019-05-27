## CommonJS
CommonJS is a project that aims to define a series of specifications to help in the development of server-side JavaScript applications.

> __Implementation: NodeJS, Browserify (for browser), Webpack (for browser)__

#### Pros:
* Simple: a developer can grasp the concept without looking at the docs.
* Dependency management is integrated: modules require other modules and get loaded in the needed order.
* `require` can be called anywhere: modules can be loaded programmatically.
* Circular dependencies are supported.

#### Cons:
* Synchronous API makes it not suitable for certain uses (client-side).
* One file per module.
* Browsers require a loader library or transpiling.
* No constructor function for modules (Node supports this though).
* Hard to analyze for static code analyzers.

## Asynchronous Module Definition (AMD)
AMD was born out of a group of developers that were displeased with the direction adopted by CommonJS. In fact, AMD was split from CommonJS early in its development.

The main difference between AMD and CommonJS lies in its support for asynchronous module loading.

Asynchronous loading is made possible by using JavaScript's traditional closure idiom: a function is called when the requested modules are finished loading.

> __Implementation: RequireJS__

#### Pros:
* Asynchronous loading (better startup times).
* Circular dependencies are supported.
* Compatibility for require and exports.
* Dependency management fully integrated.
* Modules can be split in multiple files if necessary.
* Constructor functions are supported.
* Plugin support (custom loading steps).

#### Cons:
* Slightly more complex syntactically.
* Loader libraries are required unless transpiled.
* Hard to analyze for static code analyzers.

## ES6 Modules
Fortunately, the ECMA team behind the standardization of JavaScript decided to tackle the issue of modules.

The result is syntactically pleasing and compatible with both synchronous and asynchronous modes of operation.

In truth, ES6 only specifies the syntax for static module loaders. In practice, ES6 implementations are not required to do anything after parsing these directives. Module loaders such as System.js are still required. 

#### Pros:
* Synchronous and asynchronous loading supported.
* Syntactically simple.
* Support for static analysis tools.
* Integrated in the language (eventually supported everywhere, no need for libraries).
* Circular dependencies supported.

#### Cons:
* Still not supported everywhere.

> __Implemention: Babel__

## System.js
A universal module loader that supports CommonJS, AMD and ES2015 modules.

## Browserify vs. Webpack vs. RequireJS
### Webpack
A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders" modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.

Why Webpack:
* Most powerful bundler
* Built-in dev server with livereload
* Can handle all types of assets
* Easy configuration
* Laravel-mix
* Overengineered, Underdeveloped
* Webpack-Encore

### Browserify
Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

> CommonJS module definition compliant

Why Browserify:
* Node style browser code
* Load modules installed by npm
* Works great with gulp.js
* NPM modules in the brower
* Open source
* Node streams

### RequireJS
RequireJS loads plain JavaScript files as well as more defined modules. It is optimized for in-browser use, including in a Web Worker, but it can be used in other JavaScript environments, like Rhino and Node. It implements the Asynchronous Module API. Using a modular script loader like RequireJS will improve the speed and quality of your code.

> AMD module definition compliant.

Why RequireJS:
* Open source
* Modular script loader
* Asynchronous
* Great for AMD
* Fast
* Free
