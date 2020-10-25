## Software Design Principles
### SOLID
__`SOLID`__ is an acronym for the first five object-oriented design(OOD) principles by Robert C. Martin, popularly known as Uncle Bob.

`S.O.L.I.D` stands for:
* __S__ - _Single-responsiblity principle_

    A class should have one and only one reason to change, meaning that a class should have only one job.

* __O__ - _Open-closed principle_

    Objects or entities should be open for extension, but closed for modification.

* __L__ - _Liskov substitution principle_

    Let `q(x)` be a property provable about objects of `x` of type `T`. Then `q(y)` should be provable for objects `y` of type `S` where `S` is a subtype of `T`.

    Every subclass/derived class should be substitutable for their base/parent class.

* __I__ - _Interface segregation principle_

    A client should never be forced to implement an interface that it doesn't use
    or clients shouldn't be forced to depend on methods they do not use.

* __D__ - _Dependency Inversion Principle_

    Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions.

    Example:
    ```java
        class PasswordReminder {
            private $dbConnection;

            public
            function __construct(MySQLConnection $dbConnection) {
                $this - > dbConnection = $dbConnection;
            }
        }
        /*
            The PasswordReminder class should not care what database your application uses, to fix
            this again we "code to an interface", since high level and low level modules should
            depend on abstraction
        */
        class MySQLConnection implements DBConnectionInterface {
            public
            function connect() {
                return "Database connection";
            }
        }

        class PasswordReminder {
            private $dbConnection;

            public
            function __construct(DBConnectionInterface $dbConnection) {
                $this -> dbConnection = $dbConnection;
            }
        }
    ```

more: https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-liskov-substitution-principle
[more](scotch.io)

### KISS
KISS means “Keep it simple, stupid”. It is probably one of the oldest principles of software design (but we keep forgetting it).

> “The KISS principle states that most systems work best if they are kept simple rather than made complex; therefore simplicity should be a key goal in design and unnecessary complexity should be avoided.”

Software systems must be maintained by human developers with limited capabilities, thus any increase in a system’s complexity also augments the difficulty to maintain it.

### YAGNI
YAGNI means “You Aren’t Gonna Need It”.  It is a principle of Extreme Programming (XP) that states that a programmer should not add functionality until really necessary.

> “Always implement things when you actually need them, never when you just foresee that you need them.” – Ron Jeffries

### DRY
DRY stand for "Don't Repeat Yourself," a basic principle of software development aimed at reducing repetition of information.

To avoid violating the DRY principle, divide your system into pieces. Divide your code and logic into smaller reusable units and use that code by calling it where you want.


### WET
WET (Write Every Time) is a term used to describe when the dry principle is not applied to code. Essentially, WET code causes the need to write code repeatedly due to maintenance and reusability challenges caused by code that doesn’t follow the DRY principle.

WET might be useful in the following cases:
* Performance

    By introducing duplication, you can improve performance. The key here is to control the scope of duplication, like introducing it only to one place where a performance boost is needed.

* Reduce Coupling

    You introduce some duplication to reduce component coupling. For example, you can have a dedicated data access layer for every microservice instead of creating one shared data access layer which makes all microservices couple to it.

* Test readability

    The readability of a test case is more important than possible duplication. Keeping in mind that in most cases duplication is a bad thing, you still can find tests where duplication is warranted in order to express the "test case."

* Auto-generated code

    Code that is automatically generated can have a lot of duplications. Even though this is true, it’s important not to manually change the code. Over time, manually changing generated code will make it difficult, if not impossible, to replace the code automatically.

Code reviews, static code analysis tools, documentation reduce code duplicates.


### Law of Demeter
Law of Demeter says that a method f of a class C should only call the methods of these:
* C
* An object created by f
* An object passed as an argument to f
* An object held in an instance variable of C


### GRASP Principles
The _GRASP_ principles are a set of design patterns that came after the original Gang of Four book that many of you might be familiar with.

_GRASP_ stands for __General Responsibility Assignment Software Patterns__ and is a set of design patterns which aim primarily to answer the question: _`“Who does what?”`_.

* __Information Expert__

    _Assign a responsibility to the class which has the information necessary to fulfill that responsibility._

    Imagine that you have a class called customer and order.

    The customer tries to know all the orders placed by him, a common mistake is to assign this responsibility to the customer class, since the customer who will trigger this method.

    But, this is not the responsibility of the customer, the order class is the one which as all the information about the orders.

* __Creator__

    _It tries to determine who is taking the responsibility of creating the objects._

    A common design pattern that applies this principle is called __Factory Pattern__.

* __Low Coupling__

    _Low coupling is an evaluative pattern that dictates how to assign responsibilities to support:_
    * _lower dependency between the classes,_
    * _change in one class having lower impact on other classes,_
    * _higher reuse potential._

    Now low coupling does not mean no coupling. Objects need to know about each other, but as much as possible they should do what they can with the minimum of dependencies.

    > Coupling is a measure of how strongly one element is connected to, has knowledge of, or relies on other elements.

* __High Cohesion (связность)__

    _The more you have a class that has relevant and focused responsibilities, the higher cohesion you will have._

    You try to make the responsibilities of your classes relevant, related as much as you can. You may need to break a class into some classes and distribute the responsibilities, instead of having a single class that does everything.

    > __Cohesion__ refers to what the class (or module) can do. __Low cohesion__ would mean that the class does a great variety of actions - it is broad, unfocused on what it should do. __High cohesion__ means that the class is focused on what it should be doing, i.e. only methods relating to the intention of the class.

* __Controller__

    _The controller pattern assigns the responsibility of dealing with system events to a non-UI class that represents the overall system or a use case scenario._

    If, for example, we have a user interface and also some business related classes.

    We don’t want to have high coupling between them to actually tie them directly together, where the user interface object has to know about the business objects and the vice-versa.

    It’s very common to create a controller class just for the purpose of handling the connection between the user interface and the business related objects.

    The __Model View Controller (MVC)__ is an example of having a controller class.

* __Pure Fabrication__

    _A pure fabrication is a class that does not represent a concept in the problem domain, specially made up to achieve low coupling, high cohesion, and the reuse potential thereof derived._

    What if there’s something that needs to exist in the application that doesn’t announce itself as an obvious class or real-world object?. What if you have behavior that doesn’t naturally fit in existing classes?

    Well, rather than force that behavior into an existing class where it doesn’t belong, which means we are decreasing cohesion, we instead invent, we fabricate a new class.

    That class might not have existed in our conceptual model, but it needs to exist now. And there’s nothing wrong with creating a class that represents pure functionality as long as you know why you’re doing it.

* __Indirection__

    _The indirection pattern supports low coupling and reuse potential between two elements by assigning the responsibility of mediation between them to an intermediate object._

    Give the responsibility of interaction to an intermediate object so that the coupling among different components remain low.

    And what we can do instead is reduce those direct connections by putting an indirection object between them to simplify the amount of connections that each object has to make.

    Adapter, Facade and Observer are specializations of Indirection principle.

* __Polymorphism__

    _Provides guidelines about how to use this OOP language feature (Polymorphism) in your object oriented design._

    Having an object that can take the shape of several different objects. This allows us to trigger the correct behavior.

    If, for example, we have an interface that’s implemented by several classes, you can assign or pass an instance of any of the sub classes to a reference variable that has the interface as it’s type. This will allow you to trigger the right methods, for the implementing class.

    ```javascript
    // Animal class is a generic class where Dog, Duck, & Kangaroo inherits from.
    Dog shepherd   = new Dog("Jack", "gold");
    Duck mallard   = new Duck("Daffy", "green");
    Kangaroo rock  = new Kangaroo("Steve", "red", 1.5);

    Animal animals [] = { shepherd, mallard, rock };
    /* Now, you should notice we called the display() method, without knowing exactly what the type of object, and it did displayed the correct method for each animal object. */
    for(Animal animal: animals) {
        animal.display();
    }
    ```

* __Protected Variations__

    _How to design a system so that changes and variations have the minimum impact on what already exists._

    Identify the parts of the system that are more likely to change, separate them from what stays the same, and then, encapsulate every part that vary in the system.

    Most of the concepts we have been exploring are simply way of doing this, things like encapsulation and data-hiding, making your attributes private.

    Interfaces are another area where we can wrap the unstable parts with an interface, and using polymorphism to create various implementations of this interface.

> Now _SOLID_ and _GRASP_ don’t conflict with each other, they are not competing sets, you might choose to use one or both or neither.

___

#### [Read more about Clean Code](https://hackernoon.com/how-to-write-clean-code-d557d998bb08)
