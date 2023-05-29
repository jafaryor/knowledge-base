## Strategy Pattern
Strategy Design Pattern is a type of behavioral design patterns that encapsulates a "family" of algorithms and selects one from the pool for use during runtime.

The key idea is to create objects which represent various strategies. Define a family of algorithms, encapsulate each one, and make them
interchangeable. Strategy lets the algorithm vary independently from clients that use it.

The objects participating in this pattern are:
* __Context__ -- In sample code: _Shipping_
    * maintains a reference to the current Strategy object
    * supports interface to allow clients to request Strategy calculations
    * allows clients to change Strategy
* __Strategy__ -- In sample code: _UPS, USPS, Fedex_
    * implements the algorithm using the Strategy interface

#### When To Use:
* The problem which resolve Strategy Pattern is when you need use several algorithms which have different variations. In that moment, you need create a concrete class to implement your algorithm (which can consists in a or some functions).
* Another interesting moment in which you detect that need this pattern is when there are conditional statements around a several algorithm which are related between them.
* Finally you must to use this pattern when most of your classes have related behaviours.

#### Advantages:
The Strategy Pattern have several advantages which can be summary in the
following points:
* It’s easy switching between different algorithms (strategies) in runtime because you’re using polymorphism using the interfaces.
* Clean code because you avoid conditional-infested code (not complex).
* More clean code because you separate the concerns into classes (a class to each strategy).
