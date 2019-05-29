/*
    Facades are a structural pattern which can often be seen in JavaScript libraries like
        jQuery where, although an implementation may support methods with a wide range of
        behaviors, only a 'facade' or limited abstraction of these methods is presented
        to the public for use.
    The facade pattern provides a convenient higher-level interface to a larger body of code,
        hiding its true underlying complexity. Think of it as simplifying the API being
        presented to other developers, something which almost always improves usability.
    To build on what we've learned, the facade pattern both simplifies the interface of a
        class and it also decouples the class from the code that utilizes it.
        This gives us the ability to indirectly interact with subsystems in a way that
        can sometimes be less prone to error than accessing the subsystem directly.
        A facade's advantages include ease of use and often a small size-footprint
        in implementing the pattern.
*/

// Example
var addMyEvent = function(el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn);
    } else {
        el['on' + ev] = fn;
    }
};

// jQuery
/*
    Facade pattern provides a simpler abstracted interface to a larger (potentially more complex) body of code.
*/

// The following are facades for jQuery’s $.ajax():
$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);

// These are translated behind the scenes to:
// $.get()
$.ajax({
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.post
$.ajax({
    type: 'POST',
    url: url,
    data: data,
    dataType: dataType
}).done(callback);

// $.getJSON()
$.ajax({
    url: url,
    dataType: 'json',
    data: data
}).done(callback);

// $.getScript()
$.ajax({
    url: url,
    dataType: 'script'
}).done(callback);
