/*
    The Composite pattern describes a group of objects that can be treated in the
        same way a single instance of an object may be.
    This allows us to treat both individual objects and compositions in a uniform manner,
        meaning that the same behavior will be applied regardless of whether we’re
        working with one item or a thousand.
    This is demonstrated by the code sample using the jQuery selector below. Here,
        it’s possible to add an active class to both selections for a single element
        (e.g., an element with a unique ID) or a group of elements with the same
        tag name or class, without additional effort:
*/

addClass: function(value) {
    var classNames, i, l, elem,
        setClass, c, cl;

    if (jQuery.isFunction(value)) {
        return this.each(function(j) {
            jQuery(this).addClass(value.call(this, j, this.className));
        });
    }

    if (value && typeof value === "string") {
        classNames = value.split(rspace);

        for (i = 0, l = this.length; i < l; i++) {
            elem = this[i];

            if (elem.nodeType === 1) {
                if (!elem.className && classNames.length === 1) {
                    elem.className = value;

                } else {
                    setClass = " " + elem.className + " ";
                    for (c = 0, cl = classNames.length; c < cl; c++) {
                        if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                            setClass += classNames[c] + " ";
                        }
                    }
                    elem.className = jQuery.trim(setClass);
                }
            }
        }
    }

    return this;
}

// Single elements
$("#singleItem").addClass("active");
$("#container").addClass("active");

// Collections of elements
$("div").addClass("active");
$(".item").addClass("active");
$("input").addClass("active");