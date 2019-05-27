## Inheritance
### Classic inheritance
Class Inheritance: A class is like a blueprint — a description of the object to be created.

Classes inherit from classes and create subclass relationships: hierarchical class taxonomies.

Instances are typically instantiated via constructor functions with the `new` keyword. Class inheritance may or may not use the `class` keyword from ES6.

JavaScript’s class inheritance uses the prototype chain to wire the child `Constructor.prototype` to the parent `Constructor.prototype` for delegation. Usually, the `super()` constructor is also called.

#### Pros:
It’s easy to understand the basic concept of objects and easy to interpret the meaning of method calls.

#### Cons:
* __The tight coupling problem__ (class inheritance is the tightest coupling available in oo design), which leads to the next one…
* __The fragile base class problem__
* __Inflexible hierarchy problem__ (eventually, all evolving hierarchies are wrong for new uses)
* __The duplication by necessity problem__ (due to inflexible hierarchies, new use cases are often shoe-horned in by duplicating, rather than adapting existing code)
* __The Gorilla/banana problem__ (What you wanted was a banana, but what you got was a gorilla holding the banana, and the entire jungle)

    If you use `Banana` class, it is transitively necessary to also depend on `Monkey` and `Jungle` classes.

> Multi-level class hierarchies are an anti-pattern. 

#### Solution: Object composition
It means that code reuse should be achieved by assembling smaller units of functionality into new objects instead of inheriting from classes and creating object taxonomies.


### Prototypal inhertance
Prototypal Inheritance: A prototype is a working object instance. Objects inherit directly from other objects.

Prototypal inheritance is simple. In prototypal languages you only have objects. No classes.

Instances are typically instantiated via factory functions, object literals, or `Object.create()`.

The problem with JavaScript is that since any function can be used as a constructor we need to distinguish a normal function call from a constructor function call; and this is achieved using the `new` keyword.

### VS
| Classical Inheritance | Prototypal Inheritance |
| --- | --- |
| Classes are immutable. You can't modify or add new methods to them at runtime. | Prototypes are flexible. They may be either mutable or immutable. |
| Classes may or may not support multiple inheritance. | Objects can inherit from multiple prototypes. |
| It's verbose and complicated. You have abstract classes, final classes, interfaces, etc. | It's simple. You only have objects and extending objects is the only operation required. |

>In JavaScript, prototypal inheritance is simpler &
more flexible than class inheritance.

___

                                        Inheritance
                                            |
                            +-----------------------------+
                            |                             |
                            v                             v
                        Prototypal                     Classical
                            |
            +------------------------------+
            |                              |
            v                              v
    Prototypal Pattern             Constructor Pattern

___

#### [Read More](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
