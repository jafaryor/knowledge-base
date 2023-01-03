## Builder Design Pattern
Separate the construction of a complex object from its representation so that the same construction process can create different representations.

Parse a complex representation, create one of several targets.

When working with the DOM, we often want to construct new elements dynamically
    
Process that can increase complexity depending on the final markup,
attributes, and properties we wish our constructed elements to contain.

Builders allow us to construct complex objects by only specifying the type and content of the object, shielding us from the process of creating or representing the object explicitly.

```javascript
$('<div class= "foo">bar</div>');

$('<p id="test">foo <em>bar</em></p>').appendTo("body");

var newParagraph = $("<p />").text("Hello world");

$("<input />")
    .attr({ "type": "text", "id": "sample" })
    .appendTo("#container");
```

Rules of thumb:
* Sometimes Creational patterns are complementary: `Builder` can use one of the other patterns to implement which components get built. `Abstract Factory`, `Builder`, and `Prototype` can use `Singleton` in their implementations.
* `Builder` focuses on constructing a complex object step by step. `Abstract Factory` emphasizes a family of product objects (either simple or complex). `Builder` returns the product as a final step, but as far as the `Abstract Factory` is concerned, the product gets returned immediately.
* `Builder` often builds a Composite.
* Often, designs start out using `Factory Method` (less complicated, more customizable, subclasses proliferate) and evolve toward `Abstract Factory`, `Prototype`, or `Buil`der` (more flexible, more complex) as the designer discovers where more flexibility is needed.