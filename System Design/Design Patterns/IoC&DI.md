## Inversion of Control
Inversion of Control is a design principle, which inverts the control flow. The control over custom-written program is transferred to a generic framework. It’s most often used in the context of object-oriented programming.

By contrast with traditional programming, in which our custom code makes calls to a library, IoC enables a framework to take control of the flow of a program and make calls to our custom code. To enable this, frameworks use abstractions with additional behavior built in.

> Inversion of control is used to increase modularity of the program and make it extensible, and has applications in object-oriented programming and other programming paradigms.

If we want to add our own behavior, we need to extend the classes of the framework or plugin our own classes.

The advantages of this architecture are:
* decoupling the execution of a task from its implementation
* making it easier to switch between different implementations
* greater modularity of a program
* greater ease in testing a program by isolating a component or mocking its dependencies and allowing components to communicate through contracts

Inversion of Control can be achieved through various mechanisms such as: __Strategy design pattern__, __Service Locator pattern__, __Factory pattern__, and __Dependency Injection__ (DI).

## Dependency Injection
Dependency injection is a pattern through which to implement IoC.

The act of connecting objects with other objects, or “injecting” objects into other objects, is done by an assembler rather than by the objects themselves.

## Dependency Injection vs Service Locator
Dependency Injection (DI) seems to use a constructor or setter to "inject" it's dependencies.

Service Locator Design Pattern seems to use a "container", which wires up its dependencies and gives foo it's bar.
