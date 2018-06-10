/*
    When working with the DOM, we often want to construct new elements dynamicallya
        process that can increase in complexity depending on the final markup,
        attributes, and properties we wish our constructed elements to contain.
    Builders allow us to construct complex objects by only specifying the type and
        content of the object, shielding us from the process of creating or
        representing the object explicitly.
*/

$('<div class= "foo">bar</div>');

$('<p id="test">foo <em>bar</em></p>').appendTo("body");

var newParagraph = $("<p />").text("Hello world");

$("<input />")
    .attr({ "type": "text", "id": "sample" })
    .appendTo("#container");