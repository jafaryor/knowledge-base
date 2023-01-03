/*
    Mediator is a behavioral design pattern that allows us to expose a unified interface
        through which the different parts of a system may communicate.
    If it appears a system may have too many direct relationships between modules (colleagues),
        it may be time to have a central point of control that modules communicate through
        instead. The Mediator promotes loose coupling by ensuring that instead of modules
        referring to each other explicitly, their interaction is handled through this central point.

    Advantage:
        * Broadcasted events can be handled by any number of modules at once.
        * It also can be used for a number of other purposes such as permissions
            management, given a Mediator can control what messages in a system
            can be subscribed to and which can be broadcast. Because communication is centralized.

    Disadvantage:
        * It can introduce a single point of failure.
        * Placing a Mediator between modules can also cause a performance hit as
            they are always communicating indirectly.
    
    That said, it's useful to remind ourselves that decoupled systems have a number of other
        benefits - if our modules communicated with each other directly, changes to modules
        (e.g another module throwing an exception) could easily have a domino effect on the
        rest of your application. This problem is less of a concern with decoupled systems.
    
    At the end of the day, tight coupling causes all kinds of headaches and this is just another
        alternative solution, but one which can work very well if implemented correctly.
*/

var mediator = (function() {
    // Storage for our topics/events
    var channels = {};

    // Subscribe to an event, supply a callback to be executed // when that event is broadcast
    var subscribe = function(channel, fn) {
        if (!channels[channel]) channels[channel] = [];
        channels[channel].push({ context: this, callback: fn });
        return this;
    };

    // Publish/broadcast an event to the rest of the application
    var publish = function(channel) {
        if (!channels[channel]) return false;

        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = channels[channel].length; i < l; i++) {
            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        publish: publish,
        subscribe: subscribe,
        installTo: function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})();
