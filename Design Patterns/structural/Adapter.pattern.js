/*
    The Adapter pattern translates an interface for an object or class into an interface
        compatible with a specific system.
    One example of an adapter we may have used is the jQuery jQuery.fn.css() method.
        It helps normalize the interfaces to show how styles can be applied across a
        number of browsers, making in trivial for us to use a simple syntax that is
        adapted to use what the browser actually supports behind the scenes:
*/

// Cross browser opacity:
// opacity: 0.9;  Chrome 4+, FF2+, Saf3.1+, Opera 9+, IE9, iOS 3.2+, Android 2.1+ 
// filter: alpha(opacity=90);  IE6-IE8 

// Setting opacity
$(".container").css({ opacity: .5 });

// Getting opacity
var currentOpacity = $(".container").css('opacity');