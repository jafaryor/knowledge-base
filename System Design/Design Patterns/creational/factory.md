## Factory Method Design Pattern

* Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
* Defining a "virtual" constructor.

`Factory Pattern` suggests defining an interface for creating an object where you allow the subclasses to decide which class to instantiate. This pattern handles the problem by defining a completely separate method for the creation of objects and which sub-classes are able to override so they can specify the ‘type’ of factory product that will be created.

The `Factory` pattern can be especially useful when applied to the following situations:
* When your object's setup requires a high level of complexity
* When you need to generate different instances depending on the environment
* When you're working with many small objects that share the same properties
* When composing classes with instances of other classes that need only satisfy an API contract (aka, duck typing) to work. This is useful for decoupling.

It's generally a good practice to not use the `Factory pattern` in every situation as it can easily add an unnecessarily additional aspect of complexity to your code. It can also make some tests more difficult to run.

```javascript
function Factory() {
    this.createEmployee = function(type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        employee.say = function() {
            log.add(this.type + ": rate " + this.hourly + "/hour");
        }

        return employee;
    }
}
```

Rules of thumb:
* `Abstract Factory` classes are often implemented with `Factory Method`s, but they can be implemented using `Prototype`.
* `Factory Method`s are usually called within `Template Methods`.
* `Factory Method`: creation through inheritance. `Prototype`: creation through delegation.
* Often, designs start out using `Factory Method` (less complicated, more customizable, subclasses proliferate) and evolve toward `Abstract Factory`, `Prototype`, or `Builder` (more flexible, more complex) as the designer discovers where more flexibility is needed.
* `Prototype` doesn't require subclassing, but it does require an Initialize operation. `Factory Method` requires subclassing, but doesn't require Initialize.
* The advantage of a `Factory Method` is that it can return the same instance multiple times, or can return a subclass rather than an object of that exact type.
* Some `Factory Method` advocates recommend that as a matter of language design (or failing that, as a matter of style) absolutely all constructors should be private or protected. It's no one else's business whether a class manufactures a new object or recycles an old one.
* The `new` operator considered harmful. There is a difference between requesting an object and creating one. The `new` operator always creates an object, and fails to encapsulate object creation. A `Factory Method` enforces that encapsulation, and allows an object to be requested without inextricable coupling to the act of creation.