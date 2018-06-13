/*
    CommonJS was designed for an environment where latency of accessing external
        scripts is negligible, such as on a server running node.js.
    The CommonJS module proposal specifies a simple API for declaring modules
        that work outside of the browser (such as on the server). Unlike AMD,
        it attempts to cover a broader set of concerns such as IO, filesystem,
        promises, and more.
    CommonJS modules basically contain two primary parts: a free variable named
        exports, which contains the objects a module wishes to make available
        to other modules, and a require function that modules can use to
        import the exports of other modules
    It is implemented in server-side by NodeJS and
        even implemented in browser-side by curl.JS

    AMD vs. CommonJS:
    * AMD adopts a browser-first approach to development, opting for asynchronous
        behavior and simplified backward compatibility, but it doesn’t have any
        concept of file I/O. It supports objects, functions, constructors, strings,
        JSON and many other types of modules, running natively in the browser.
    * CommonJS on the other hand takes a server-first approach, assuming synchronous
        behavior, no global baggage, and attempts to cater for the future
        (on the server). What we mean by this is that because CommonJS supports
        unwrapped modules, it can feel a little more close to the ES.next/Harmony
        specifications, freeing us of the define() wrapper that AMD enforces.
        CommonJS modules however only support objects as modules.
*/

// defining module
define(function(require) {
    var lib = require("package/lib");

    // some behaviour for our module
    function foo() {
        lib.log("hello world!");
    }

    // export (expose) foo for other modules
    return {
        foobar: foo
    };
});

// package/lib is a dependency we require
var lib = require("package/lib");

// behaviour for our module
function foo() {
    lib.log("hello world!");
}

// export (expose) foo to other modules
exports.foo = foo;