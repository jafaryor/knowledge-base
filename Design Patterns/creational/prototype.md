## Prototype Design Pattern

We can think of the `Prototype` pattern as being based on prototypal inheritance where we create objects which act as prototypes for other objects.

Real prototypal inheritance, as defined in the ECMAScript 5 standard, requires the use of `Object.create` (which we've previously looked at briefly). `Object.create` creates an object which has a specified prototype and which optionally contains specified properties (i.e `Object.create(prototype, optionalDescriptorOb jects)`).

```javascript
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
```

Rules of thumb:
* `Prototype` co-opts one instance of a class for use as a breeder of all future instances.
* `Prototypes` are useful when object initialization is expensive, and you anticipate few variations on the initialization parameters. In this context, `Prototype` can avoid expensive "creation from scratch", and support cheap cloning of a pre-initialized prototype.
* `Prototype` is unique among the other creational patterns in that it doesn't require a class – only an object. Object-oriented languages like Self and Omega that do away with classes completely rely on prototypes for creating new objects.