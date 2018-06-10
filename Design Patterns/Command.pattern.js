/*
    Command pattern is behavior design pattern in which an object is used to
        represent and encapsulate all the information needed to call a method
        at a later time. This information includes the method name, object
        that owns the method and values for the method parameters.
    The main idea behind the command pattern is that it provides you a means to
        separate the responsibilities of issuing commands from anything executing
        commands, delegating this responsibility to different objects instead.
    They consistently include an execution operation (such as run() or execute()).
        All Command objects with the same interface can easily be swapped as
        needed and this is considered one of the larger benefits of the pattern.
    For example, imagine if the core API behind the CarManager changed.
        This would re- quire all objects directly accessing these methods
        within our application to also be modified.
*/

(function() {
    var CarManager = {
        // request information
        requestInfo: function(model, id) {
            return 'The information for ' + model + ' with ID ' + id + ' is foobar';
        },
        // purchase the car
        buyVehicle: function(model, id) {
            return 'You have successfully purchased Item ' +
                id + ', a ' + model;
        },
        // arrange a viewing
        arrangeViewing: function(model, id) {
            return 'You have successfully booked a viewing of ' +
                model + ' ( ' + id + ' ) ';
        }
    };

    // this is implementation of command pattern
    CarManager.execute = function(name) {
        return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments, 1));
    };
})();

// use
CarManager.execute("buyVehicle", "Ford Escort", "453543");