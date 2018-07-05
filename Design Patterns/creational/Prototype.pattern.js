/*
    We can think of the prototype pattern as being based on prototypal inheritance
        where we create objects which act as prototypes for other objects.
    Real prototypal inheritance, as defined in the ECMAScript 5 stan- dard,
        requires the use of Object.create (which we've previously looked at briefly).
        Object.create creates an object which has a specified prototype and which
        optionally contains specified properties
        (i.e Object.create(prototype, optionalDescriptorOb jects)).
*/

// No need for capitalization as it's not a constructor
var someCar = {
    drive: function() {},
    name: 'Mazda 3'
};

var car = Object.create(vehicle, {
    'id': {
        value: MY_GLOBAL.nextId(),
        enumerable: true // writable:false, configurable:false by default
    },
    'model': {
        value: 'Ford',
        enumerable: true
    }
});

var anotherCar = Object.create(someCar);