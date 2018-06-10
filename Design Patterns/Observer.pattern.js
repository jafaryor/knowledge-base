/*
    The Observer pattern is more popularly known these days as the Publish/Subscribe pattern.
        It is a design pattern which allows an object (known as a subscriber) to watch another
        object (the publisher), where we provide a means for the subscriber and pub- lisher
        form a listen and broadcast relationship.
    Advantages:
        Arguably, the largest benefit of using Pub/Sub is the ability to break down our
            applications into smaller, more loosely coupled modules,
            which can also improve general manageability.
        It is also a pattern that encourages us to think hard about the relationships
            between different parts of your application, identifying what layers need
            to observe or listen for behavior and which need to push notifications
            regarding behavior occurring to other parts of our apps.
    Disadvantages:
        Consequently, some of the issues with this pattern actually stem from its
            main benefit. By decoupling publishers from subscribers, it can sometimes
            become difficult to obtain guarantees that particular parts of our
            applications are functioning as we may expect.
        Another draw-back of the pattern is that observers are quite ignorant to
            the existence of each other and are blind to the cost of switching
            in subject. Due to the dynamic relationship between subjects and
            observers the update dependency can be difficult to track.
*/

var pubsub = {};
(function(q) {
    var topics = {},
        subUid = -1;

    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    q.publish = function(topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    };

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    q.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    q.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
})(pubsub);

// jQuery
/*
    In earlier versions of the library, access to these custom events was possible using
        jQuery.bind() (subscribe), jQuery.trigger() (publish), and jQuery.unbind()
        (unsubscribe), but in recent versions, this can be done using jQuery.on(),
        jQuery.trigger(), and jQuery.off().
*/

// Equivalent to subscribe(topicName, callback)
$(document).on("topicName", function() {
    //..perform some behaviour
});

// Equivalent to publish(topicName)
$(document).trigger("topicName");

// Equivalent to unsubscribe(topicName)
$(document).off("topicName");


// Pub/Sub wrapper around the jQuery's observer
(function($) {
    var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function() {
        o.off.apply(o, arguments);
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };
}(jQuery));