## Software Design Principles
### `S.O.L.I.D`

__`S.O.L.I.D`__ is an acronym for the first five object-oriented design(OOD) principles by Robert C. Martin, popularly known as Uncle Bob.

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

### Law of Demeter
Law of Demeter says that a method f of a class C should only call the methods of these:
* C
* An object created by f
* An object passed as an argument to f
* An object held in an instance variable of C

### Clean Code
#### Definition:
* Clean code is simple.

    Perhaps not simple in algorithmic or system-level complexity, but certainly simple in implementation. Overly clever tricks, hacks, and sleights of programmatic hand are only fun for the author and diminish the code’s long-term value. The same goes for long-winded code that takes forever to get to the point.

* Clean code is readable.

    If the naming conventions, spacing, structure, and flow used in a program are not designed with the reader in mind, then that reader will almost certainly fail to understand the original author’s intent. Conventions about how to write readable code may seem dogmatic or lacking in expressiveness, but they help to make code communal rather than arcane.

* Clean code is considerate (внимательный).

    Code that does not do its best to inform future readers is code that does not respect their time. Clean code should be written with the assumption that future consumers are intelligent, thoughtful professionals (like you), and it should go out of its way to help them.

* Clean code is tested.

    No one writes perfect, bug-free code on the first try. Even if it were possible to do so, there is no guarantee that perfect code won’t break later. Writing clean code means writing tested code. That way, future users can be confident they’re interacting with something that works. Moreover, when making changes, they will have a ready-made test suite to confirm that nothing broke.

* Clean code is practiced.

    Writing clean code requires good muscle memory, just like playing an instrument, kicking a ball, or frying an egg. The best way to learn to write clean code — and, more importantly, retain the skill — is to do it all the time. When you’re at home working on a personal project, do it with clean code — even when no one else will ever see it.

* Clean code is relentlessly (беспрестанно) refactored.

    Clean code should be in a constant state of refactoring. With a good test suite to back up your code, you can refactor it as much as you like and never worry about breakage.

* Clean code is SOLID.

#### How to achieve:
* DRY
* SOLID
* Follow design patterns and its associated terms
* Follow __law of demeter__ to enable less coupling and more cohesion.
* Follow the TDD, and keep your test code as clean as production code.
* A _Function_ should do one thing only and do it really well.

    Certain tips for writing effective functions:
    * Avoid passing boolean into a function, this is a hint that func has an `if` statement within which causes it to do more than one thing.
    * Functions should either do something or answer something, but not both. This ensures a function does not have hidden side effects. e.g a func named `isPresent()` should only return a bool and not do any other operations
    * Prefer Exceptions to Returning Error Codes and extract error handling `try catch` into their own function.
    * Avoid output arguments. Function if it has to, should change state of its owning object
    * Code should always be separated with blank line to club logical blocks together. Think of different lines of code as thoughts and then always think of organizing similar thoughts together
    * Each function should read like a newspaper, every functions implementation following its call and having less vertical density
    * Don’t return null

* Object and data structures:
    * Variables should be private so that we can change their type or implementation when required. There is no need to add getters/setter to each variable to expose them as public.
    * Hiding implementation is not just a matter of putting a layer of functions between the variables. Hiding implementation is about abstractions! We do not want to expose details of data but rather express data as abstract terms

* Exception handling:
    * Try and extract `try catch` blocks into separate well named functions. Having them mixed with other code just confuses the structure of the program. This is inline with “Function should do one thing”, Well error handling is one thing.
    * Prefer returning Exceptions instead of Error Codes.
    * Each exception that you throw should provide enough context to determine the source and location of an error.

* Comments
    * The only truly good comment is the comment you found a way not to write.
    * Don’t Use a Comment When You Can Use a well named Function or a Variable
    * Any comment which forces you to look into another module for meaning has failed miserably in communicating and is not worth it at all.
    * Don’t comment bad code, Rewrite it.

* Boundaries
    
    Always wrap third party code/API to minimize your dependency on it and allow the freedom to move to a different one in future without changing the consuming code.

* Code organization and Design
    * Nearly all code is read left to right and top to bottom. Each line represents an expression or a clause, and each group of lines represents a _complete thought_. Those thoughts should be separated from each other with blank lines
    * Local variables should be declared as close to their usage as possible.
    * Instance variables should be declared at top of the class since in a well defined class they would be used by multiple functions
    * If one function calls another, they should be vertically close, and the caller should be above the callee, if at all possible. This gives the program a natural flow.
    * Try to follow the _“The Principle of Least Surprise”_ any function or class should implement the behaviors that another programmer could reasonably expect.
    * It is NOT necessary to do a _Big Design Up Front (BDUF)_. In fact, BDUF is even harmful because it inhibits adapting to change, due to the psychological resistance to discarding prior effort and because of the way architecture choices influence subsequent thinking about the design.

* Tests

    Clean tests should follow F.I.R.S.T principles


## GRASP Principles
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

[Read More](https://en.wikipedia.org/wiki/GRASP_(object-oriented_design))

### ACID
ACID (_Atomicity_, Con_sistency, _Isolation_, _Durability_) is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc.

Where:
* Atomicity.

    Transactions are often composed of multiple statements.

    Atomicity guarantees that each transaction is treated as a single "unit", which either succeeds completely, or fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails and the database is left unchanged.

    An atomic system must guarantee atomicity in each and every situation, including power failures, errors and crashes.

* Consistency.

    A transaction either creates a new and valid state of data, or, if any failure occurs, returns all data to its state before the transaction was started.

* Isolation.

    A transaction in process and not yet committed must remain isolated from any other transaction.

    Transactions are often executed concurrently (e.g., reading and writing to multiple tables at the same time). Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. Implmeents via DB locks.

* Durability.

    Committed data is saved by the system such that, even in the event of a failure and system restart, the data is available in its correct state.

    This usually means that completed transactions (or their effects) are recorded in non-volatile memory.

___

[Read more about Clean Code](https://hackernoon.com/how-to-write-clean-code-d557d998bb08)
