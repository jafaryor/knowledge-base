// CONSTRUCTOR PATTERN
/*
    Constructors are used to create specific types of objects.
    As we saw earlier, JavaScript doesn't support the concept of classes
        but it does support special constructor functions.
    By simply prefixing a call to a constructor function with the keyword
        'new', you can tell JavaScript you would like function to behave like
        a constructor and instantiate a new object with the members defined
        by that function. Inside a constructor, the keyword 'this' references
        the new object that's being created. 
*/
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
    this.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles';
    };
}
var civic = new Car('Honda Civic', 2009, 20000);
/*
    Functions in JavaScript have a property called a prototype. When you call a JavaScript
    constructor to create an object, all the properties of the constructor's prototype are then
    made available to the new object. In this fashion, multiple Car objects can be created
    which access the same prototype. 
*/
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}
// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function() {
    return this.model + ' has done ' + this.miles + ' miles';
};
var civic = new Car('Honda Civic', 2009, 20000);
