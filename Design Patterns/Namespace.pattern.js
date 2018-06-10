/*
    Namespacing is a technique employed to avoid col- lisions with other objects or variables in the global namespace.
*/

// ================================================================================================

// AUTOMATING NESTED NAMESPACING
// top-level namespace being assigned an object literal
var myApp = myApp || {};
// a convenience function for parsing string namespaces and
// automatically generating nested namespaces
function extend(ns, ns_string) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        // create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}
// sample usage:
// extend myApp with a deeply nested namespace
var mod = extend(myApp, 'myApp.modules.module2');
// the correct object with nested depths is output console.log(mod);
// minor test to check the instance of mod can also
// be used outside of the myApp namesapce as a clone
// that includes the extensions
console.log(mod == myApp.modules.module2); //true
// further demonstration of easier nested namespace
// assignment using extend
extend(myApp, 'moduleA.moduleB.moduleC.moduleD');
extend(myApp, 'longer.version.looks.like.this');
console.log(myApp);

// ================================================================================================

// DEPENDENCY DECLARATION PATTERN
/*
    Working with a local variable here is almost always faster than working with a
        top-level global (e.g.myApp). It's also both more convenient and more
        performant than accessing nested properties/sub-namespaces on every
        subsequent line and can improve read- ability in more complex applications.
    Stoyan recommends declaring localized namespaces required by a function or
        module at the top of your function scope (using the single-variable pattern)
        and calls this a dependancy declaration pattern. One of the benefits this
        offers is a decrease in locating dependencies and resolving them, should
        you have an extendable architecture that dynamically loads modules
        into your namespace when required.
*/

// ================================================================================================

// DEEP OBJECT EXTENSION
/*
    An alternative approach to automatic namespacing is deep object extension ($.extend).
        Namespaces defined using object literal notation may be easily extended
        (or merged) with other objects.
*/

// extend.js
// written by andrew dupont, optimized by addy osmani
function extend(destination, source) {
    var toString = Object.prototype.toString,
        objTest = toString.call({});

    for (var property in source) {
        if (source[property] && objTest == toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }

    return destination;
};

var myNS = myNS || {};
// 1. extend namespace with a 'utils' object
extend(myNS, {
    utils: {}
});
// 2. extend with multiple depths (namespace.hello.world.wave)
extend(myNS, {
    hello: {
        world: {
            wave: {}
        }
    }
});

// ================================================================================================

// SINGLE GLOBAL VARIABLES PATTERN
var myApplication = (function() {
    function foo() {
        // ...
    }
    return {
        // ...
    }
})();


// PREFIX NAMESPACING PATTERN
/*
    Idea is you select a unique prefix namespace you wish to use
        (in this example, "myApplication_") and then define any methods,
        variables or other objects after the prefix as follows:
*/
var myApplication_propertyA = {};
var myApplication_propertyB = {};

function myApplication_myMethod() { /*..*/ }
/*
    This is effective from the perspective of trying to lower the chances of a
        particular variable existing in the global scope, but remember that a uniquely
        named object can have the same effect. This aside, the biggest issue with the
        pattern is that it can result in a large number of global objects once your
        application starts to grow. There is also quite a heavy reliance on your
        prefix not being used by any other developers in the global namespace,
        so be careful if opting to use this.
*/


// OBJECT LITERAL NOTATION PATTERN
/*
    Object literals have the advantage of not polluting the global namespace but
        assist in organizing code and parameters logically. They're beneficial
        if you wish to create easily- readable structures that can be expanded
        to support deep nesting. 
*/
var myApplication = {
    getInfo: function() { /**/ },
    // we can also populate object literal to support
    // further object namespaces containing anything really: models : {},
    views: {
        pages: {}
    },
    collections: {}
};

// The following options *do* check for variable/namespace existence.
// If already defined, we use that instance, otherwise we assign a new
// object literal to myApplication. //
// Option 1:
var myApplication = myApplication || {};

// Option 2:
if (!MyApplication) MyApplication = {};

// Option 3:
var myApplication = myApplication = myApplication || {}

// Option 4:
myApplication || (myApplication = {});

// Option 5:
var myApplication = myApplication === undefined ? {} : myApplication;
/*
    The benefit of object literals is that they offer us a very elegant key/value
        syntax to work with; one where we're able to easily encapsulate any distinct
        logic or functionality for our application in a way that clearly separates
        it from others and provides a solid foun- dation for extending your code.
    A possible downside however is that object literals have the potential
        to grow into long syntactic constructs.
    In addition to namespacing, it's often of benefit to decouple the default
        configuration for your application into a single area that can be easily
        modified without the need to search through your entire codebase just to
        alter them - object literals work great for this purpose.
*/


// NESTED NAMESPACING PATTERN
/*
    It's another common pattern used that offers a lower risk of collision due to
        the fact that even if a namespace already exists, it's unlikely the same
        nested children do.
*/
var myApp = myApp || {};
// perform a similar existence check when defining nested // children
myApp.routers = myApp.routers || {};
myApp.model = myApp.model || {};
myApp.model.special = myApp.model.special || {};
// nested namespaces can be as complex as required:
// myApp.utilities.charting.html5.plotGraph(/*..*/);
// myApp.modules.financePlanner.getSummary();
// myApp.services.social.facebook.realtimeStream.getLatest();

// IIFE-s
/*
    Whilst readable, this example could be significantly expanded on to address
        common development concerns such as defined levels of privacy
        (public/private functions and variables) as well as convenient
        namespace extension.
*/
var namespace = namespace || {};
// here a namespace object is passed as a function // parameter, where we assign public methods and // properties to it
var myNamespace = (function() {
    var myPrivateVar = 0;
    var myPrivateMethod = function(someText) {
        console.log(someText);
    };

    return {
        myPublicVar: "foo",
        myPublicFunction: function(bar) {
            myPrivateVar++;
            myPrivateMethod(bar);
        }
    };
})();

(function(o) {
    o.foo = "foo";
    o.bar = function() {
        return "bar";
    };
})(namespace);

// NAMESPACE INJECTION PATTERN
/*
    Namespace injection is another variation on the IIFE where we 'inject'
        the methods and properties for a specific namespace from within a
        function wrapper using this as a namespace proxy.
    The benefit this pattern offers is easy application of functional behaviour
        to multiple objects or namespaces and can come in useful when applying
        a set of base methods to be built on later (e.g. getters and setters).
    The disadvantages of this pattern are that there may be easier or more optimal
        approaches to achieving this goal (e.g. deep object extension / merging).
*/
var myApp = myApp || {};
myApp.utils = {};
(function() {
    var val = 5;
    this.getValue = function() {
        return val;
    };
    this.setValue = function(newVal) {
            val = newVal;
        }
        // also introduce a new sub-namespace
    this.tools = {};
}).apply(myApp.utils);
// inject new behaviour into the tools namespace // which we defined via the utilities module
(function() {
    this.diagnose = function() {
        return 'diagnosis';
    }
}).apply(myApp.utils.tools);
// note, this same approach to extension could be applied
// to a regular IIFE, by just passing in the context as
// an argument and modifying the context rather than just
// 'this'

// testing
console.log(myApp);
//the now populated namespace console.log(myApp.utils.getValue());
// test get myApp.utils.setValue(25);
// test set console.log(myApp.utils.getValue()); console.log(myApp.utils.tools.diagnose());