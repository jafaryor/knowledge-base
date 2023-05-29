/*
    Decorator - a structural design pattern that promotes code reuse and is a flexible
        alternative to subclassing. This pattern is also useful for modifying existing
        systems where you may wish to add additional features to objects without the
        need to change the underlying code that uses them.
    The decorator pattern isn't heavily tied to how objects are created but
        instead focuses on the problem of extending their functionality.
    Traditionally, the decorator is defined as a design pattern that allows behavior
        to be added to an existing object dynamically.
    In traditional OOP, a class B is able to extend another class A.
        Here we consider A a superclass and B a subclass of A.
    Decorators are used when it's necessary to delegate responsibilities to an object
        where it doesn't make sense to subclass it. A common reason for this is that
        the number of features required demand for a very large quantity of subclasses.
        Can you imagine having to define hundreds or thousands of subclasses for a project?
        It would likely become unmanageable fairly quickly.
    To give you a visual example of where this is an issue, imagine needing to define new
        kinds of Superhero: SuperheroThatCanFly, SuperheroThatCanRunQuickly and Super- heroWithXRayVision.
        Now, what if superhero had more than one of these properties?. We'd need to define a subclass
        called SuperheroThatCanFlyAndRunQuickly , SuperheroThatCanFlyRun- QuicklyAndHasXRayVision
        etc - effectively, one for each possible combination. As you can see, this isn't very
        manageable when you factor in different abilities.
    Cons:
        There are however drawbacks that you should be aware of when implementing the pattern.
        If poorly managed, it can significantly complicate your application's architecture
        as it introduces many small, but similar objects into your namespace.
*/

// EXAMPLE 1:
function vehicle(vehicleType) {
    // properties and defaults
    this.vehicleType = vehicleType || 'car';
    this.model = 'default';
    this.license = '00000-000';
}

// Lets create a new instance of vehicle, to be decorated*/
var truck = new vehicle('truck');
// New functionality we're decorating vehicle with
truck.setModel = function(modelName) {
    this.model = modelName;
}
truck.setColor = function(color) {
    this.color = color;
}


// EXAMPLE 2:
// What we're going to decorate
function MacBook() {
    this.cost = function() { return 997; };
    this.screenSize = function() { return 13.3; };
}
// Decorator 1
function Memory(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    }
}
// Decorator 2
function Engraving(macbook) {
    var v = macbook.cost();
    macbook.cost = function() {
        return v + 200;
    };
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);


// EXAMPLE 3:
Object.assign();
$.extend();
angular.extend();