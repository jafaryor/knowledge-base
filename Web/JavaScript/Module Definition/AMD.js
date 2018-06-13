/*
    Asynchronous module definition is designed for the browser from the start.
        It allows your frontend application to load the starting point of your
        app, which in turn loads it’s dependencies on the fly.
    The overall goal for the Asynchronous Module Definition (AMD) format is to
        provide a solution for modular JavaScript that developers can use today.
    The AMD module format itself is a proposal for defining modules in which
        both the module and dependencies can be asynchronously loaded. It has
        a number of distinct advantages, including being both asynchronous and
        highly flexible by nature, which removes the tight coupling one might
        commonly find between code and module identity. Many developers enjoy
        using it, and one could consider it a reliable stepping stone toward
        the module system proposed for ES Harmony (ES6).
    AMD began as a draft specification for a module format on the CommonJS list.
    The first two concepts worth noting about AMD are the idea of a 'define' method
        for facilitating module definition and a 'require' method for handling
        dependency loading.
    Why AMD is a better choice for writing modular JavaScript:
    * Provides a clear proposal for how to approach defining flexible modules.
    * Significantly cleaner than the present global namespace and <script> tag
        solutions many of us rely on. There’s a clean way to declare standalone
        modules and dependencies they may have.
    * Module definitions are encapsulated, helping us to avoid pollution
        of the global namespace.
    * Arguably works better than some alternative solutions
        (e.g., CommonJS, which we’ll be looking at shortly). It doesn’t have issues
        with cross-domain, local, or debugging and doesn’t rely on server-side tools
        to be used. Most AMD loaders support loading modules in the browser without
        a build process.
    * Provides a “transport” approach for including multiple modules in a single file.
        Other approaches like CommonJS have yet to agree on a transport format.
    * It’s possible to lazy load scripts if this is needed.
    Cons of AMD:
    * Third-party libs need to be AMD compatible which can be complicated with some scripts.
    * Extra code for function wrappers and loader shim.
*/

define(
    module_id, // optional
    [dependencies], // optional
    definition_function // function for instantiating the module or object
);

// EXAMPLE:
// A module_id (myModule) is used here for demonstration purposes only
define("myModule",

    ["foo", "bar"],

    // module definition function
    // dependencies (foo and bar) are mapped to function parameters
    function(foo, bar) {
        // return a value that defines the module export
        // (i.e the functionality we want to expose for consumption)

        // create your module here
        var myModule = {
            doStuff: function() {
                console.log("Yay! Stuff");
            }
        };

        return myModule;
    });

// An alternative version could be..
define("myModule",

    ["math", "graph"],

    function(math, graph) {

        // Note that this is a slightly different pattern
        // With AMD, it's possible to define modules in a few
        // different ways due to it's flexibility with
        // certain aspects of the syntax
        return {
            plot: function(x, y) {
                return graph.drawPie(math.randomGrid(x, y));
            }
        };
    });



/*
    'require', on the other hand, is typically used to load code in a top-level JavaScript
        file or within a module, should we wish to dynamically fetch dependencies.
    'requere' - is async operation unlike 'require' from CommonJS.
*/
// Consider "foo" and "bar" are two external modules
// In this example, the "exports" from the two modules 
// loaded are passed as function arguments to the 
// callback (foo and bar) so that they can similarly be accessed

require(["foo", "bar"], function(foo, bar) {
    // rest of your code here
    foo.doSomething();
});



// The following is an example of a dynamically-loaded dependency
define(function(require) {
    var isReady = false,
        foobar;

    // note the inline require within our module definition
    require(["foo", "bar"], function(foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });

    // we can still return a module
    return {
        isReady: isReady,
        foobar: foobar
    };
});



// With AMD, it's possible to load in assets of almost any kind
// including text-files and HTML. This enables us to have template
// dependencies which can be used to skin components either on
// page-load or dynamically.

define(["./templates", "text!./template.md", "css!./template.css"],

    function(templates, template) {
        console.log(templates);
        // do something with our templates here
    }

);