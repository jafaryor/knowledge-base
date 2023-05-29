## Abstract Factory
The purpose of the `Abstract Factory` is to provide an interface for creating families of related objects, without specifying concrete classes.

`Abstract Factory` patterns work around a super-factory which creates other factories. This factory is also called as factory of factories. This type of design pattern comes under creational pattern as this pattern provides one of the best ways to create an object.

In `Abstract Factory` pattern an interface is responsible for creating a factory of related objects without explicitly specifying their classes. Each generated factory can give the objects as per the `Factory` pattern.

Rules of thumb
* Sometimes creational patterns are competitors: there are cases when either `Prototype` or `Abstract Factory` could be used profitably. At other times they are complementary: `Abstract Factory` might store a set of `Prototype`s from which to clone and return product objects, `Builder` can use one of the other patterns to implement which components get built. `Abstract Factory`, `Builder`, and `Prototype` can use `Singleton` in their implementation.
* `Abstract Factory`, `Builder`, and `Prototype` define a factory object that's responsible for knowing and creating the class of product objects, and make it a parameter of the system. `Abstract Factory` has the factory object producing objects of several classes. `Builder` has the factory object building a complex product incrementally using a correspondingly complex protocol. `Prototype` has the factory object (aka prototype) building a product by copying a prototype object.
* `Abstract Factory` classes are often implemented with `Factory Methods`, but they can also be implemented using `Prototype`.
* `Abstract Factory` can be used as an alternative to Facade to hide platform-specific classes.
* `Builder` focuses on constructing a complex object step by step. `Abstract Factory` emphasizes a family of product objects (either simple or complex). `Builder` returns the product as a final step, but the  `Abstract Factory`, the product gets returned immediately.
* Often, designs start out using `Factory Method` (less complicated, more customizable, subclasses proliferate) and evolve toward `Abstract Factory`, `Prototype`, or `Builder` (more flexible, more complex) as the designer discovers where more flexibility is needed.