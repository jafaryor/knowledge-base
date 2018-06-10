# Loaders

webpack enables use of __loaders__ to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js.

Loaders are activated by using __loadername!__ prefixes in __require()__ statements, or are automatically applied via regex from your webpack configuration – see configuration.

## Files
* __raw-loader__ - Loads raw content of a file (utf-8)
* __val-loader__ - Executes code as module and consider exports as JS code
* __url-loader__ - Works like the file loader, but can return a data URL if the file is smaller than a limit
* __file-loader__ - Emits the file into the output folder and returns the (relative) URL
## JSON
* __json-loader__ - Loads a JSON file (included by default)
* __json5-loader__ - Loads and transpiles a JSON 5 file
* __cson-loader__ - Loads and transpiles a CSON file
## Transpiling
* __script-loader__ - Executes a JavaScript file once in global context (like in script tag), requires are not parsed
* __babel-loader__ - Loads ES2015+ code and transpiles to ES5 using Babel
* __buble-loader__ - Loads ES2015+ code and transpiles to ES5 using Bublé
* __traceur-loader__ - Loads ES2015+ code and transpiles to ES5 using Traceur
* __ts-loader__ or __awesome-typescript-loader__ - Loads TypeScript 2.0+ like JavaScript
* __coffee-loader__ - Loads CoffeeScript like JavaScript
## Templating
* __html-loader__ - Exports HTML as string, require references to static resources
* __pug-loader__ - Loads Pug templates and returns a function
* __jade-loader__ - Loads Jade templates and returns a function
* __markdown-loader__ - Compiles Markdown to HTML
* __react-markdown-loader__ - Compiles Markdown to a React Component using the markdown-parse parser
* __posthtml-loader__ - Loads and transforms a HTML file using PostHTML
* __handlebars-loader__ - Compiles Handlebars to HTML
* __markup-inline-loader__ - Inline SVG/MathML files to HTML. It’s useful when applying icon font or applying CSS animation to SVG.
## Styling
* __style-loader__ -  Add exports of a module as style to DOM
* __css-loader__ - Loads CSS file with resolved imports and returns CSS code
* __less-loader__ - Loads and compiles a LESS file
* __sass-loader__ - Loads and compiles a SASS/SCSS file
* __postcss-loader__ - Loads and transforms a CSS/SSS file using PostCSS
* __stylus-loader__ - Loads and compiles a Stylus file
## Linting && Testing
* __mocha-loader__ - Tests with mocha (Browser/NodeJS)
* __eslint-loader__ - PreLoader for linting code using ESLint
* __jshint-loader__ - PreLoader for linting code using JSHint
* __jscs-loader__ - PreLoader for code style checking using JSCS
* __coverjs-loader__ - PreLoader to determine the testing coverage using CoverJS
## Frameworks
* __vue-loader__ - Loads and compiles Vue Components
* __polymer-loader__ - Process HTML & CSS with preprocessor of choice and require() Web Components like first-class modules
* __angular2-template-loader__ - Loads and compiles Angular Components



