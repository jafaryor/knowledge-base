/*
    The Iterator is a design pattern in which iterators (objects that allow us to
        traverse through all the elements of a collection) access the elements of
        an aggregate object sequentially without needing to expose its underlying form.
    Iterators encapsulate the internal structure of how that particular iteration occurs.
*/

$.each(["john", "dave", "rick", "julian"], function(index, value) {
    console.log(index + ": " + value);
});

$("li").each(function(index) {
    console.log(index + ": " + $(this).text());
});