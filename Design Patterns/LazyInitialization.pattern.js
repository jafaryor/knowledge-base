/*
    Lazy Initializationis a design pattern which allows us to delay expensive processes
        (e.g. the creation of objects) until the first instance they are needed.
        An example of this is the .ready() function in jQuery that only executes
        a function once the DOM is ready.
    jQuery.fn.ready() is powered by jQuery.bindReady(), seen below:
*/

bindReady: function() {
    if (readyList) {
        return;
    }

    readyList = jQuery.Callbacks("once memory");

    // Catch cases where $(document).ready() is called after the
    // browser event has already occurred.
    if (document.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        return setTimeout(jQuery.ready, 1);
    }

    // Mozilla, Opera and webkit support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", jQuery.ready, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", jQuery.ready);

        // If IE and not a frame
        // continually check to see if the document is ready
        var toplevel = false;

        try {
            toplevel = window.frameElement == null;
        } catch (e) {}

        if (document.documentElement.doScroll && toplevel) {
            doScrollCheck();
        }
    }
}