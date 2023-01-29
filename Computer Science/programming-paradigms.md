## Imperative programming vs. Declarative Programming
The imperative paradigm forces programmers to write “how” a program will solve a certain task.

The declarative paradigm forces programmers to write “what” a program need to do.

* Imperative: `C`, `C++`, `Java`

* Declarative: `SQL`, `HTML`

* (Can Be) Mix: `JavaScript`, `C#`, `Python`

___

## Object-oriented Programming
Object-Oriented Programming is a paradigm where you express programs in terms of objects.

Objects are first-class values (you can pass them around, store in variables, etc.)

OOP is a programming paradigm that is based on the concept of 'objects', which can contain both data and behavior. It is designed to make it easier to understand, reuse, and maintain large software systems.

An __object__ is a logical construct that consists of user-defined data and a set of operations for manipulating that data. It can be thought of as a combination of data and behavior (Data + Operations = Object). OOP is a way of organizing and structuring a program around these objects.

### Four principles of OOPS:
1. #### Abstraction

    Refers to an object's ability to present higher-level functionality to the user while hiding implementation details. It involves exposing only the necessary information and hiding the implementation details.

    It allows us to focus on the general properties of an object or concept, rather than being overwhelmed by the specifics.

    There are several ways to implement abstraction, but the most common ones in Java are through interfaces and abstract classes.
    * Abstraction through Classes: This is achieved using the `abstract` keyword with a class. In Java, marking a class as `abstract` means that it cannot be instantiated.
    * Abstraction via Interfaces: Similar to abstract classes, we can use the `interface` keyword to define an interface.

2. #### Encapsulation

    Refers to an ability of a system to hide information in such a way that it cannot be accessed or manipulated directly by other entities.

    Encapsulation helps us to better control our systems. When a class or system has no access boundaries, it is "open for modification," which can lead to unintended side effects. Encapsulation adds boundaries to a system, allowing us to better control how data is accessed and modified. This helps to protect the integrity of the system and prevent unwanted changes.

    We can use access modifiers to achieve encapsulation in our system

    The concept of getters and setters is a common programming technique used to protect the data within an object. This is done by marking attributes of a class as "private" or "protected" and providing public methods, known as getters and setters, to allow controlled access to these attributes. By using this mechanism, an object can maintain control over how its data can be changed.

    > The main difference abstraction and encapsulation is the intent behind them. Abstraction is used to simplify and make the interface more user-friendly, while encapsulation is used to control the access and modification of data within an object.

3. #### Inheritance

    Refers to a mechanism that allows an object to reuse or extend the functionality of another object. It allows a subclass or derived class to inherit the properties and methods of a superclass or base class, allowing the subclass to have access to the functionality of the superclass.

    When designing with inheritance, you can place common code in a superclass and specify that other, more specific classes are subclasses of the superclass. This allows the subclass to inherit the members of the superclass and use them in a similar way to how it uses its own members. This approach makes it easier to reuse and extend code, as you can use the inherited members in the subclass without having to rewrite them.

4. #### Polymorphism

    Refers to a concept in object-oriented programming that refers to the ability of an object to behave differently based on the context of its invocation. In Java, you can create multiple implementations of a method with different arguments, which allows the method to behave differently based on the number and type of arguments provided. This is known as __static polymorphism__, as the decision of which method to invoke is made at compile time, rather than at runtime.

    For example, consider a class called "Shape" that has a method called "area." You could create multiple implementations of this method, each with a different set of arguments, to calculate the area of different shapes. When calling the "area" method on an object of the "Shape" class, the correct implementation would be invoked based on the arguments provided. This allows the same method name to be used in different contexts, making the code more flexible and reusable.

    __Runtime polymorphism__, also known as method overriding, is a form of polymorphism in which the decision of which method to invoke is made at runtime, rather than at compile time. In method overriding, a subclass or derived class can provide its own implementation of a method that is defined in the superclass or base class. When calling the method on an object of the subclass, the subclass's implementation of the method will be invoked, rather than the implementation in the superclass.

    For example, consider a class called "Shape" that has a method called "area" You could create multiple subclasses of "Shape," such as "Circle" and "Rectangle," each with its own implementation of the "area" method. When calling the "area" method on an object of the "Shape" class, the correct implementation would be invoked based on the type of object that it is working with. This allows the same method name to be used in different contexts, making the code more flexible and reusable.

An object is a single instance of a class, which contains data and methods working on that data. So an object consists of three things: 
* Name: This is a variable name that represents the object.
* Member data: The data that describes the object.
* Member methods: Behavior that describes the object.

### [Full OOP Course](https://www.enjoyalgorithms.com/oops-course/)

___

## Functional Programming
Functional programming is a programming paradigm — a style of building the structure and elements of computer programs — that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

> Functional programming is a programming paradigm where you model everything as a result of a function that avoids changing state and mutating data.

JavaScript is the first language to bring Functional Programming to the mainstream.

A program is said to be functional when it uses concepts of functional programming, such as:
* #### First-Class Functions

    Functions are first-class objects. Functions can be stored in variables, objects or arrays, passed as arguments to other functions or returned from functions.

    > A lambda is a function that is used as a value.

* #### Pure Functions

    A pure function is a function that returns a value based only on its input. Given a specific input, it always returns the same output.

    Pure functions cause no mutations. It does not use variables from outside its scope.

    It does not modify its input parameters. It doesn’t do anything else other than returning a value.

* #### Closures

    Closure is an inner function that has access to the outer scope, even after the outer scope has closed.

    Closure becomes important when the inner function survives the execution of the outer scope. This happens in the following situations:
    * The inner function is used as a callback for an asynchronous task like a timer, an event, or a network call
    * The parent function returns the inner function or returns an object storing the inner function

* #### Higher-order functions

    A higher order function is a function that takes another function as an input, returns a function, or does both.

* #### Immutability

    An immutable object is an object that, once created, cannot be changed.

    `Object.freeze()` can be used to freeze objects. Properties can’t be added, deleted, or changed. The object becomes immutable.

* #### Decorators

    A function decorator is a higher-order function that takes one function as an argument and returns another function, and the returned function is a variation of the argument function.

    `unary()` is a function decorator that takes a function and returns a function taking one parameter. It’s usually used to fix problems when the function is called with more arguments than necessary.
    ```javascript
    function unary(fn){
      return function(first){
        return fn.call(this, first);
      }
    }
    ```

    debounce.js and lodash.js decorators:
    * `once(fn)`: creates a version of the function that executes only once. It’s useful for an initialization function, where we want to make sure it runs only once, no matter how many times it is called from different places.
    * `throttle(fn, wait)`: creates a version of the function that, when invoked repeatedly, will call the original function once per every `wait` milliseconds. It’s useful for limiting events that occur faster.
    * `debounce(fn, wait)`: creates a version of the function that, when invoked repeatedly, will call the original function after `wait` milliseconds since the last invocation. It’s useful for running a function only after the event has stopped arriving.
    * `memoize(fn)`: Memoizes a given function by saving the computed result. It’s useful for speeding up slow computations. The memoized function should be a pure function.

* #### Referential transparency

    An function is referentially transparent if it can be replaced with its computed value without changing the application’s behavior.

    `pure functions + immutable data = referential transparency`

* #### Partial Application

    Partial application refers to the process of fixing a number of parameters by creating a new function with fewer parameters than the original.

* #### Curring

    Currying is the process of transforming a function with many parameters into a series of functions that each take a single parameter.

* #### Function Composition

    Function composition is applying one function to the result of another: `f(g(x))`.

* #### Recursion

    Recursion is a method of solving a problem where the solution is found by solving smaller instances of the same problem. Recursion implies that the function calls itself.

[Pros ans Cons](https://itnext.io/pros-and-cons-of-functional-programming-32cdf527e1c2)

___

## Reactive Programming
Reactive programming  is an asynchronous programming paradigm concerned with data streams and the propagation of change.

This means that it becomes possible to express (выражать) static (e.g. arrays) or dynamic (e.g. event emitters) data streams with ease via the employed programming language(s).

In simple words, In Rx programming data flows emitted by one component and the underlying structure provided by the Rx libraries will propagate those changes to another component those are registered to receive those data changes.

> __Streams__ are a sequence of values over time.

Rx is made up of three key points: `RX = OBSERVABLE + OBSERVER + SCHEDULERS`
* #### Observable - Component that Emits the Data

    Observable are nothing but the data streams. Observable packs the data that can be passed around from one thread to another thread.

* #### Observers - Components that subscribes to observable to get changes

    Observers consumes the data stream emitted by the observable. Observers subscribe to the observable using `subscribe()` method to receive the data emitted by the observable.


* #### Schedulers

    Remember that Rx is for asynchronous programming and we need a thread management.

    Schedulers are the component in Rx that tells observable and observers, on which thread they should run.

### Pros:
* avoid “callback hell”
* a lot simpler to do `async` / `threaded` work
* a lot of operators that simplify work
* very simple to compose streams of data
* complex threading becomes very easy
* you end up with a more cleaner, readable code base
* easy to implement back-pressure

### Cons:
* More memory intensive to store streams of data most of the times (since it is based on streams over time).
* Steep learning curve.

___

## Functional Reactive Programming
Functional reactive programming (FRP) is a programming paradigm for reactive programming (asynchronous dataflow programming) using the building blocks of functional programming (e.g. map, reduce, filter).

FRP is the combination of functional and reactive paradigms. In other words, it is reacting to data streams using the functional paradigm.

___

## Service-oriented architecture
Service-oriented architecture (SOA) is a style of software design where services are provided to the other components by application components, through a communication protocol over a network. The basic principles of service-oriented architecture are independent of vendors, products and technologies.[1] A service is a discrete unit of functionality that can be accessed remotely and acted upon and updated independently, such as retrieving a credit card statement online.

A service has four properties according to one of many definitions of SOA:
* It logically represents a business activity with a specified outcome.
* It is self-contained.
* It is a black box for its consumers.
* It may consist of other underlying services.

___

## OOP vs Functional Programming
In all programs, there are two primary components: the data (the stuff a program knows) and the behaviors (the stuff a program can do to/with that data).
* _OOP_ says that bringing together data and its associated behavior in a single location (called an “object”) makes it easier to understand how a program works.
* _FP_ says that data and behavior are distinctively different things and should be kept separate for clarity.

#### [Read More](https://www.codenewbie.org/blogs/object-oriented-programming-vs-functional-programming)

___
