# Concepts

Webpack is a static module bundler for modern JavaScript applications. When webpack processes your
application, it recursively builds a dependency graph that includes every module your application
needs, then packages all of those modules into one or more bundles.

When webpack processes your application, it starts from a list of modules defined on the command
line or in its config file. Starting from these entry points, webpack recursively builds a
dependency graph that includes every module your application needs, then packages all of those
modules into a small number of bundles.

Webpack is a module bundler like Browserify or Brunch. It is not a task runner like Make, Grunt, or Gulp. Task runners handle automation of common development tasks such as linting, building, or testing your project. Compared to bundlers, task runners have a higher level focus. You can still benefit from their higher level tooling while leaving the problem of bundling to webpack.

Bundlers help you get your JavaScript and stylesheets ready for deployment, transforming them into a format that's suitable for the browser. For example, JavaScript can be minified or split into chunks and lazy-loaded to improve performance. Bundling is one of the most important challenges in web development, and solving it well can remove a lot of pain from the process.

The good news is that, while there is some overlap, task runners and bundlers can play well together if approached in the right way. 

## Core concepts:
* ### ENTRY

    Entry Point -  indicates which module webpack should use to begin building out its internal
    dependency graph.
    Configuration ways:
    * Single Entry (Shorthand) Syntax __[ entry: string|Array<string> ]__
        
        Passing an array of file paths to the entry property creates what is known as a
        "multi-main entry". This is useful when you would like to inject multiple dependent
        files together and graph their dependencies into one "chunk".
    * Object Syntax __[ entry: {[entryChunkName: string]: string|Array<string>} ]__

        The object syntax is more verbose. However, this is the most scalable way of defining
        entry/entries in your application.
    
    Scenarios:
    * Separate App and Vendor Entries
        This setup allows you to leverage CommonsChunkPlugin and extract any vendor references from your app bundle into your vendor bundle, replacing them with
        \_\_webpack_require__() calls.
    * Multi Page Application
        Creates bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increase.

        __!Note:__ As a rule of thumb: for each HTML document use exactly one entry point.

* ### OUTPUT

    Output - property tells webpack where to emit the bundles it creates and how to name these files.

    In cases when the eventual publicPath of output files isn't known at compile time, it can
    be left blank and set dynamically at runtime in the entry point file.
    ```javascript
        \_\_webpack_public_path__ = myRuntimePublicPath
    ```
    
* ### LOADERS

    Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them.

    At a high level, loaders have two purposes in your webpack config. They work to:
    1. Identify which file or files should be transformed by a certain loader
        (with the "test" property).
    2. Transform those files so that they can be added to your dependency graph
        (and eventually your bundle). ("use" property)

    It's possible to specify loaders in an import statement, or any equivalent "importing" method. Separate loaders from the resource with __"!"__. Each part is resolved relative to the current directory. import Styles from 'style-loader!css-loader?modules!./styles.css';
    It's possible to overwrite any loaders in the configuration by prefixing the entire rule with !. Options can be passed with a query parameter, e.g. __?key=value&foo=bar__, or a JSON object,
        e.g. __?{"key":"value","foo":"bar"}__.
    
    Loader Features:
    * Loaders can be chained. They are applied in a pipeline to the resource. A chain of loaders are executed in reverse order. The first loader in a chain of loaders returns a value to the next. At the end loader, webpack expects JavaScript to be returned.
    * Loaders can be synchronous or asynchronous.
    * Loaders run in Node.js and can do everything that’s possible there.
    * Loaders accept query parameters. This can be used to pass configuration to the loader.
    * Loaders can also be configured with an options object.
    * Normal modules can export a loader in addition to the normal main via package.json with the loader field.
    * Plugins can give loaders more features.
    * Loaders can emit additional arbitrary files.
    Loaders allow more power in the JavaScript ecosystem through preprocessing functions (loaders). Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and more.
    
* ### PLUGINS

    While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks. Plugins range from bundle optimization and minification all the way to defining environment-like variables.

    In order to use a plugin, you need to require() it and add it to the plugins array. Most plugins are customizable through options. Since you can use a plugin multiple times in a config for different purposes, you need to create an instance of it by calling it
    with the new operator.

    A webpack plugin is a JavaScript object that has an apply property. This apply property is called by the webpack compiler, giving access to the entire compilation lifecycle.

* ### MODULES

    In contrast to Node.js modules, webpack modules can express their dependencies in a
    variety of ways. A few examples are:
    * An ES2015 __import__ statement
    * A CommonJS __require()__ statement
    * An AMD __define__ and __require__ statement
    * An __@import__ statement inside of a css/sass/less file.
    * An image url in a stylesheet __(url(...))__ or html __(<img src\=...>)__ file.
    * If the path has a file extension, then the file is bundled straightaway.
    * Otherwise, the file extension is resolved using the resolve.extensions option, which tells the resolver which extensions (eg - .js, .jsx) are acceptable for resolution.

* ### TARGET

    Because JavaScript can be written for both server and browser, webpack offers multiple
    deployment targets that you can set in your webpack configuration.

* ### THE MANIFEST

    In a typical application or site built with webpack, there are three main types of code:
    * The source code you, and maybe your team, have written.
    * Any third-party library or "vendor" code your source is dependent on.
    * A webpack runtime and manifest that conducts the interaction of all modules.

    __Runtime:__

        The runtime, along with the manifest data, is basically all the code webpack needs to connect your modularized application while it's running in the browser. It contains the loading and resolving logic needed to connect your modules as they interact. This includes connecting modules that have already been loaded into the browser as well as logic to lazy-load the ones that haven't.

    __Manifest:__

        As the compiler enters, resolves, and maps out your application, it keeps detailed notes on all your modules. This collection of data is called the "Manifest" and it's what the runtime will use to resolve and load modules once they've been bundled and
        shipped to the browser. No matter which module syntax you have chosen, those import or require statements have now become __webpack_require__ methods that point to module identifiers. Using the data in the manifest, the runtime will be able to
        find out where to retrieve the modules behind the identifiers.

    By using content hashes within your bundle file names, you can indicate to the browser
    when the contents of a file has changed thus invalidating the cache. Once you start doing
    this though, you'll immediately notice some funny behavior. Certain hashes change even
    when their contents apparently does not. This is caused by the injection of the runtime
    and manifest which changes every build.

* ### HOT MODULE REPLACEMENT (HMR)

    exchanges, adds, or removes modules while an application is running, without a full reload.
    
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './path/to/my/entry/file.js', // syngle entry shorthand syntax
    /*
        entry: { // syngle entry syntax
            main: './path/to/my/entry/file.js'
        }

        // Separate App and Vendor Entries Scenario
        // tells webpack to create dependency graphs starting at both app.js and vendors.js
        // These graphs are completely separate and independent of each other
        entry: { // object syntax
            app: './src/app.js',
            vendors: './src/vendors.js'
        }

        // Multi Page Application
        // We are telling webpack that we would like 3 separate dependency graphs
        entry: {
            pageOne: './src/pageOne/index.js',
            pageTwo: './src/pageTwo/index.js',
            pageThree: './src/pageThree/index.js'
        }
    */
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    /*
        If your configuration creates more than a single "chunk", you should use substitutions to
        ensure that each file has a unique name.
        entry: {
            app: './src/app.js',
            search: './src/search.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist'
        } // writes to disk: ./dist/app.js, ./dist/search.js
    */
    module: {
        rules: [
            /*
                "Hey webpack compiler, when you come across a path that resolves to a '.txt'
                file inside of a require()/import statement, use the raw-loader to transform
                it before you add it to the bundle."
            */
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.css$/,
                use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ] // multiple loaders applied
            }
        ]
    },
    plugins: [
        // declaring webpack plugin instances
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    target: 'web' // other options:
        // async-node, electron-main, electron-renderer, node, node-webkit, webworker
};

module.exports = config;
```