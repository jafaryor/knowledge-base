/*
    Factory Pattern suggests defining an interface for creating an object where you
        allow the subclasses to decide which class to instantiate. This pattern
        handles the problem by defining a completely separate method for the
        creation of objects and which sub-classes are able to override so they
        can specify the ‘type’ of factory product that will be created.
    The Factory pattern can be especially useful when applied to the following situations:
        * When your object's setup requires a high level of complexity
        * When you need to generate different instances depending on the environment
        * When you're working with many small objects that share the same properties
        * When composing classes with instances of other classes that need only satisfy
            an API contract (aka, duck typing) to work. This is useful for decoupling.
    It's generally a good practice to not use the factory pattern in every situation
        as it can easily add an unnecessarily additional aspect of complexity to
        your code. It can also make some tests more difficult to run.
*/

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