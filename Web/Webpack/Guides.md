# Asset Management

Prior to webpack, front-end developers would use tools like grunt and gulp to process these assets and move them from their /src folder into their /dist or /build directory. The same idea was used for JavaScript modules, but tools like webpack will dynamically bundle all dependencies (creating what's known as a dependency graph).

In order to import a a certain type of file, you should use appropriate lodaers for them. For example for css files you can use css-loader and style-loader.

# Output Management

### Setting up HtmlWebpackPlugin

HtmlWebpackPlugin by default will generate its own index.html file, even though we already have one in the dist/ folder. This means that it will replace our index.html file with a newly generated one, which autamitcly includes all the bundles.

### Cleaning up the /dist folder

Our /dist folder has become quite cluttered. Webpack will generate the files and put them in the /dist folder for you, but it doesn't keep track of which files are actually in use by your project.

In general it's good practice to clean the /dist folder before each build, so that only used files will be generated. Let's take care of that.

# Development

> This guide extends on code examples found in the Output Management guide.

### Using source maps

When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location. In order to make it easier to track down errors and warnings, JavaScript offers source maps, which maps your compiled code back to your original source code. If an error originates from b.js, the source map will tell you exactly that.

### Using Watch Mode

You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually.

### Using webpack-dev-server

The webpack-dev-server provides you with a simple web server and the ability to use live reloading.

### Using webpack-dev-middleware

webpack-dev-middleware is a wrapper that will emit files processed by webpack to a server. This is used in webpack-dev-server internally, however it's available as a separate package to allow more custom setups if desired.

### Adjusting Your Text Editor

When using automatic compilation of your code, you could run into issues when saving your files. Some editors have a "safe write" feature that can potentially interfere with recompilation.

In __WebStorm__ - uncheck Use __"safe write"__ in __Preferences > Appearance & Behavior > System Settings__.

### Hot Module Replacement

It allows all kinds of modules to be updated at runtime without the need for a full refresh.

There are many other loaders and examples out in the community to make HMR interact smoothly with a variety of frameworks and libraries...
* React Hot Loader: Tweak react components in real time.
* Redux HMR: No loader or plugin necessary! A simple change to your main store file is all that's required.
* Angular HMR: No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.

# Tree Shaking

Tree shaking is a term commonly used in the JavaScript context for dead-code elimination. It relies on the static structure of ES2015 module syntax, i.e. __import__ and __export__.

Note that webpack doesn't perform tree-shaking by itself. It relies on third party tools like UglifyJS to perform actual dead code elimination.

# Production

In development, we want strong source mapping and a localhost server with live reloading or hot module replacement. In production, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing separate webpack configurations for each environment.

While we will separate the production and development specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called webpack-merge. With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

### Minification

Note that while the __UglifyJSPlugin__ is a great place to start for minification, there are other options out there. Here are a few more popular ones:
* BabelMinifyWebpackPlugin
* ClosureCompilerPlugin

### Source Mapping

We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests. That said, you should choose one with a fairly quick build speed that's recommended for production use (see devtool). For this guide, we'll use the source-map option in production as opposed to the inline-source-map we used in development:

```javascript
module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
})
```

> Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.

### Specify the Environment

Many libraries will key off the __process.env.NODE_ENV__ variable to determine what should be included in the library. For example, when not in production some libraries may add additional logging and testing to make debugging easier. However, with __process.env.NODE_ENV === 'production'__ they might drop or add significant portions of code to optimize how things run for your actual users. We can use webpack's built in __DefinePlugin__ to define this variable for all our dependencies:

Technically, __NODE_ENV__ is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, __process.env.NODE_ENV__ is not set to "production" within the build script webpack.config.js. Thus, conditionals like __process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'__ within webpack configurations do not work as expected.

```javascript
// in your code
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
```

### Split CSS

As mentioned in Asset Management at the end of the Loading CSS section, it is typically best practice to split your CSS out to a separate file using the ExtractTextPlugin

### CLI Alternatives

Some of what has been described above is also achievable via the command line. For example, the --optimize-minimize flag will include the UglifyJSPlugin behind the scenes. The --define process.env.NODE_ENV="'production'" will do the same for the DefinePlugin instance described above. And, webpack -p will automatically invoke both those flags and thus the plugins to be included.

# Code Splitting

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:
* Entry Points: Manually split code using __entry__ configuration.
* Prevent Duplication: Use the __CommonsChunkPlugin__ to dedupe and split chunks.
* Dynamic Imports: Split code via inline function calls within modules.

### Entry Points

As mentioned there are some pitfalls to this approach:
* If there are any duplicated modules between entry chunks they will be included in both bundles.
* It isn't as flexible and can't be used to dynamically split code with the core application logic.

The first of these two points is definitely an issue for our example, as lodash is also imported within __./src/index.js__ and will thus be duplicated in both bundles. Let's remove this duplication by using the CommonsChunkPlugin.

### Prevent Duplication

The CommonsChunkPlugin allows us to extract common dependencies into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the lodash dependency from the previous example.

Here are some other useful plugins and loaders provided by the community for splitting code:
* __ExtractTextPlugin__: Useful for splitting CSS out from the main application.
* __bundle-loader__: Used to split code and lazy load the resulting bundles.
* __promise-loader__: Similar to the bundle-loader but uses promises.

### Explicit vendor chunk

Used to split vendor modules from core application code.

```javascript
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"
    // (Give the chunk a different name)

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  })
]
```

### Dynamic Imports

Two similar techniques are supported by webpack when it comes to dynamic code splitting. The first and more preferable approach is use to the import() syntax that conforms to the ECMAScript proposal for dynamic imports. The legacy, webpack-specific approach is to use require.ensure

### Bundle Analysis

Once you start splitting your code, it can be useful to analyze the output to check where modules have ended up. There are some other community-supported options out there as well:
* __webpack-chart__: Interactive pie chart for webpack stats.
* __webpack-visualizer__: Visualize and analyze your bundles to see which modules are taking up space and which might be duplicates.
* __webpack-bundle-analyzer__: A plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap.

### Lazy Loading

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.

Let's take the example from Code Splitting and tweak it a bit to demonstrate this concept even more. The code there does cause a separate chunk, lodash.bundle.js, to be generated and technically "lazy-loads" it as soon as the script is run. The trouble is that no user interaction is required to load the bundle -- meaning that every time the page is loaded, the request will fire. This doesn't help us too much and will impact performance negatively.

Let's try something different. We'll add an interaction to log some text to the console when the user clicks a button. However, we'll wait to load that code (print.js) until the interaction occurs for the first time.

# Caching

Once the contents of /dist have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called caching. This allows sites to load faster with less unnecessary network traffic, however it can also cause headaches when you need new code to be picked up.

### Output Filenames

A simple way to ensure the browser picks up changed files is by using __output.filename__ substitutions. The __[hash]__ substitution can be used to include a build-specific hash in the filename, however it's even better to use the __[chunkhash]__ substitution which includes a chunk-specific hash in the filename.

It's also good practice to extract third-party libraries, such as lodash or react, to a separate vendor chunk as they are less likely to change than our local source code. This step will allow clients to request even less from the server to stay up to date.

# Shimming

The webpack compiler can understand modules written as ES2015 modules, CommonJS or AMD. However, some third party libraries may expect global dependencies (e.g. $ for jQuery). The libraries might also create globals which need to be exported. These "broken modules" are one instance where shimming comes into play.

Another instance where shimming can be useful is when you want to polyfill browser functionality to support more users. In this case, you may only want to deliver those polyfills to the browsers that need patching (i.e. load them on demand).

### Shimming Globals

The __ProvidePlugin__ makes a package available as a variable in every module compiled through webpack. If webpack sees that variable used, it will include the given package in the final bundle.

### Granular Shimming

Some legacy modules rely on this being the window object. This becomes a problem when the module is executed in a CommonJS context where this is equal to module.exports. In this case you can override this using the __imports-loader__.

### Global Exports

Let's say a library creates a global variable that it expects its consumers to use. In this case, we can use exports-loader, to export that global variable as a normal module export. For instance, in order to export file as file and helpers.parse as parse

```javascript
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

### Loading Polyfills

Almost everything we've discussed thus far has been in relation to handling legacy packages. Let's move on to our second topic: polyfills.
There's a lot of ways to load polyfills. For example, to include the __babel-polyfill__ and import it so as to include it in our main bundle.

Now while this is one approach, including polyfills in the main bundle is not recommended because this penalizes modern browsers users by making them download a bigger file with unneeded scripts.

Let's move our import to a new file and add the whatwg-fetch polyfill

```javascript
// src/polyfills.js
import 'babel-polyfill';
import 'whatwg-fetch';
```

### Further Optimizations

You can inmport in __polyfills.js__ only the polyfills that is needed by importing them exlicitly.

```javascript
// src/polyfills.js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';
```

### Other Utilities

There are a few other tools that can help when dealing with legacy modules.

The script-loader evaluates code in the global context, similar to inclusion via a script tag. In this mode, every normal library should work. require, module, etc. are undefined.

> When using the script-loader, the module is added as a string to the bundle. It is not minimized by webpack, so use a minimized version. There is also no devtool support for libraries added by this loader.

When there is no AMD/CommonJS version of the module and you want to include the dist, you can flag this module in noParse. This will cause webpack to include the module without parsing it or resolving require() and import statements. This practice is also used to improve the build performance.

> Any feature requiring the AST, like the ProvidePlugin, will not work.

Lastly, there are some modules that support different module styles like AMD, CommonJS and legacy. In most of these cases, they first check for define and then use some quirky code to export properties. In these cases, it could help to force the CommonJS path by setting define=>false via the imports-loader.

# TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Webpack needs special configuration for typescript.

# Progressive Web Application

Progressive Web Applications (or __PWAs__) are web apps that deliver an experience similar to native applications. There are many things that can contribute to that. Of these, the most significant is the ability for an app to be able to function when offline. This is achieved through the use of a web technology called Service Workers.

### We Don't Work Offline Now

So far, we've been viewing the output by going directly to the local file system. Typically though, a real user accesses a web app over a network; their browser talking to a server which will serve up the required assets (e.g. .html, .js, and .css files).

If you stop the server and refresh, the webpack application is no longer available. This is what we aim to change. Once we reach the end of this module we should be able to stop the server, hit refresh and still see our application.

### Adding Workbox

Let's add the Workbox webpack plugin. 

### Registering Our Service Worker

Let's allow our Service Worker to come out and play by registering it. We'll do that by adding the registration code below:

```javascript
    import _ from 'lodash';
    import printMe from './print.js';

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
```

Now to test it. Stop your server and refresh your page. If your browser supports Service Workers then you should still be looking at your application.

# Environment Variables

To disambiguate in your webpack.config.js between development and production builds, you may use environment variables.

The webpack command line environment option, __--env__ allows you to pass in as many environment variables as you like. Environment variables will be made accessible in your webpack.config.js. For example, __--env.production__ or __--env.NODE_ENV=local__

    webpack --env.NODE_ENV=local --env.production --progress

There is, however a change that you will have to make to your webpack config. Typically, in your webpack config module.exports points to the configuration object. To use the env variable, you must convert module.exports to a function:

```javascript
module.exports = env => {
    // Use env.<YOUR VARIABLE> here:
    console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
    console.log('Production: ', env.production) // true

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

# Build Performance

* Stay Up to Date
* Apply loaders to the minimal number of modules necessary.
* Each additional loader/plugin has a bootup time. Try to use as few different tools as possible.
* Minimize the number of items in resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles as they increase the number of filesystem calls.
* Set resolve.symlinks: false if you don't use symlinks (e.g. npm link or yarn link).
* Set resolve.cacheWithContext: false if you use custom resolving plugins, that are not context specific.
* Use the __DllPlugin__ to move code that is changed less often into a separate compilation.
* Use fewer/smaller libraries.
* Use the CommonsChunksPlugin in Multi-Page Applications.
* Use the CommonsChunksPlugin in async mode in Multi-Page Applications.
* Remove unused code.
* Only compile the part of the code you are currently developing on.
* The __thread-loader__ can be used to offload expensive loaders to a worker pool.
* Enable persistent caching with the __cache-loader__. Clear cache directory on "postinstall" in package.json.

#### Develoment
* Use webpack's watch mode. 
* The following utilities improve performance by compiling and serving assets in memory rather than writing to disk:
    * webpack-dev-server
    * webpack-hot-middleware
    * webpack-dev-middleware
* Be aware of the performance differences of the different devtool settings.
* Avoid Production Specific Tooling:
    * UglifyJsPlugin
    * ExtractTextPlugin
    * [hash]/[chunkhash]
    * AggressiveSplittingPlugin
    * AggressiveMergingPlugin
    * ModuleConcatenationPlugin
* Minimal Entry Chunk

#### Production
* When using multiple compilations the following tools can help:
    * __parallel-webpack__: It allows to do compilation in a worker pool.
    * __cache-loader__: The cache can be shared between multiple compilations.
* Source maps are really expensive. Do you really need them?

# Dependency Management

A context is created if your request contains expressions, so the exact module is not known on compile time.

```javascript
require("./template/" + name + ".ejs");
```

You can create your own context with the __require.context()__ function.
It allows you to pass in a directory to search, a flag indicating whether subdirectories should be searched too, and a regular expression to match files against. Webpack parses for __require.context()__ in the code while building.

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//);

require.context("./test", false, /\.test\.js$/);
// a context with files from the test directory that can be required with a request endings with `.test.js`.

require.context("../", true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

> The arguments passed to require.context must be literals!

A context module exports a (require) function that takes one argument: the request.

The exported function has 3 properties: resolve, keys, id.
* __resolve__ is a function and returns the module id of the parsed request.
* __keys__ is a function that returns an array of all possible requests that the context module can handle.

This can be useful if you want to require all files in a directory or matching a pattern, Example:

```javascript
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// At build-time cache will be populated with all required modules.
```

# Public Path
The __publicPath__ configuration option allows you to specify the base path for all the assets within your application.

There are a few use cases in real applications where this feature becomes especially neat. Essentially, every file emitted to your output.path directory will be referenced from the output.publicPath location. This includes child chunks (created via code splitting) and any other assets (e.g. images, fonts, etc.) that are a part of your dependency graph.

Another possible use case is to set the publicPath on the fly. webpack exposes a global variable called __\_\_webpack_public_path____ that allows you to do that. So, in your application's entry point, you can simply do this:

```javascript
__webpack_public_path__ = process.env.ASSET_PATH;
```

> Be aware that if you use ES6 module imports in your entry file the __\_\_webpack_public_path____ assignment will be done after the imports. In such cases, you'll have to move the public path assignment to its own dedicated module and then import it on top of your entry.js:

```javascript
// entry.js
import './public-path';
import './app';

```

# Integration

### Grunt
For those using Grunt, we recommend the grunt-webpack package.

### Gulp
Gulp is also a fairly straightforward integration with the help of the __webpack-stream__ package (a.k.a. __gulp-webpack__). In this case, it is unnecessary to install webpack separately as it is a direct dependency of __webpack-stream__.
Just __require('webpack-stream')__ instead of webpack and optionally pass it an configuration:
```javascript
var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      // Any configuration options...
    }))
    .pipe(gulp.dest('dist/'));
});
```

### Karma
The karma-webpack package allows you to use webpack to pre-process files in Karma. It also makes use of webpack-dev-middleware and allows passing configurations for both.
```javascript
module.exports = function(config) {
  config.set({
    files: [
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false }
    ],
    preprocessors: {
      'test/*_test.js': [ 'webpack' ],
      'test/**/*_test.js': [ 'webpack' ]
    },
    webpack: {
      // Any custom webpack configuration...
    },
    webpackMiddleware: {
      // Any custom webpack-dev-middleware configuration...
    }
  });
};
```

# Code

```html
<html>
    <head>
        <title>Output Management</title>
        <script src="./print.bundle.js"></script>
    </head>
    <body>
        <script src="./app.bundle.js"></script>
    </body>
</html>
```

```javascript
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        polyfills: './src/polyfills.js',
        vendor: [
            'lodash'
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // clean dist folder
        new HtmlWebpackPlugin({ // generates new index.html file
            title: 'Output Management'
        }),
        // for hot module replacement
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // for dead-code elimination
        new UglifyJSPlugin(),
        // defining global variable
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        }),
        new webpack.ProvidePlugin({
            _: 'lodash' // making lodash available for all modules
        }),
        // for PWAs
        new WorkboxPlugin({
            // these options encourage the ServiceWorkers to get in there fast 
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    devtool: 'inline-source-map', // source-map
    devServer: { // webpack-dev-server
        contentBase: './dist',
        /*
            This tells webpack-dev-server to serve the files from
            the dist directory on localhost:8080.
        */
        hot: true // enable hot module replacement
    },
    module: {
        rules: [
            { // CSS-Loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, { // Granular Shimming
                test: require.resolve('index.js'),
                use: 'imports-loader?this=>window'
            }, { // Global Exports
                test: require.resolve('globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
        ]
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/' // files's path should be relative to '/'
    }
};
```