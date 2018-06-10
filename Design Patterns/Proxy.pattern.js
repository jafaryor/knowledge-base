/*
    There are times when it is necessary for us to control the access and context
        behind an object, and this is where the Proxy pattern can be useful.
    It can help us control when an expensive object should be instantiated,
        provide advanced ways to reference the object, or modify the object
        to function a particular way in specific contexts.
    In jQuery core, a jQuery.proxy() method exists that accepts as input a
        function and returns a new one that will always have a specific context.
        This ensures that the value of this within a function is the value we expect.
    There is a slight difference between bind and proxy, which can matter a lot if
        you are using jQuery. Function.prototype.bind always returns a new function
        pointer. jQuery.proxy only returns a new function if a proxy of the same
        args has not already been created.
*/

// Native bind() vs $.proxy()
$(elm).on('click', doStuff.bind(thing)); //adds event handler
$(elm).off('click', doStuff.bind(thing)); //does not remove event handler as
// 2nd call of doStuff.bind(thing) always returns a new/different function

$(elm).on('click', $.proxy(doStuff, thing)); //adds handler
$(elm).off('click', $.proxy(doStuff, thing)); //DOES remove handler, as a second
// call to $.proxy(doStuff, thing) is smart enough to know about similar use-cases

// Bind a function to a context, optionally partially applying any
// arguments.
proxy: function(fn, context) {
    if (typeof context === "string") {
        var tmp = fn[context];
        context = fn;
        fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!jQuery.isFunction(fn)) {
        return undefined;
    }

    // Simulated bind
    var args = slice.call(arguments, 2),
        proxy = function() {
            return fn.apply(context, args.concat(slice.call(arguments)));
        };

    // Set the guid of unique handler to the same of original handler, 
    // so it can be removed
    proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
    return proxy;
}

// Usage:
$("button").on("click", function() {
    setTimeout($.proxy(function() {
        // "this" now refers to our element as we wanted
        $(this).addClass("active");
    }, this), 500);

    // the last "this" we're passing tells $.proxy() that our DOM element
    // is the value we want "this" to refer to.
});