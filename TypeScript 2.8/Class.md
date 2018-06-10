## Clases
In the class when we refer to one of the members of the class we prepend `this.`. This denotes that it’s a member access.
```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

### Inheritance
```typescript
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {      // inheritance
    bark() {
        console.log('Woof! Woof!');
    }
}
```

### `public`, `private`, `protected` modifiers
* In TypeScript, each member of class is `public` by default.
* When a member is marked `private`, it cannot be accessed from outside of its containing class.
* The `protected` modifier acts much like the `private` modifier with the exception that members declared protected can also be accessed within deriving classes.
* All above were instance members of the class, those that show up on the object when it’s instantiated. We can also create `static` members of a class, those that are visible on the class itself rather than on the instances. Each instance accesses this value through prepending the name of the class.

A constructor may also be marked `protected`. This means that the class cannot be instantiated outside of its containing class, but can be extended.
```typescript
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person {
    readonly department: string;    // read only property

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // Error: The 'Person' constructor is protected
```

### Accessors
Accessors with a `get` and no `set` are automatically inferred to be readonly
```typescript
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
```

### Abstract Classes
Abstract classes are base classes from which other classes may be derived. They may not be instantiated directly. Unlike an interface, an abstract class may contain implementation details for its members. The `abstract` keyword is used to define __abstract classes__ as well as __abstract methods__ within an abstract class.
```typescript
abstract class Animal {
    abstract makeSound(): void;     // must be implemented in derived classes
    move(): void {
        console.log("roaming the earth...");
    }
}
```
Methods within an abstract class that are marked as abstract do not contain an implementation and must be implemented in derived classes. Abstract methods share a similar syntax to interface methods. Both define the signature of a method without including a method body.

> __Abstract methods may optionally include access modifiers (setter/getter).__


