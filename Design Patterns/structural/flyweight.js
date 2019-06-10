/*
    The Flyweight pattern is considered a useful classical solution for code
        that's repetitive, slow and inefficient - for example: situations
        where we might create a large number of similar objects.
    Flyweights are an approach to taking several similar objects and placing
        that shared information into a single external object or structure.
        The general idea is that (in theory) this reduces the resources
        required to run an overall application. 
    The flyweight is also a structural pattern, meaning that it aims to assist
        with both the structure of your objects and the relationships between them.
    There are two ways in which the Flyweight pattern can be applied.
        * The first is on the data-layer, where we deal with the concept of large
        quantities of similar objects stored in memory.
        * The second is on the DOM-layer where the flyweight can be used as a
        central event-manager to avoid attaching event handlers to every child
        element in a parent container you wish to have some similar behavior.
    
    In data-layer:
        We can now separate our data into intrinsic and extrinsic states as follows:
        data relevant to the book object (title, author etc) is intrinsic whilst
        the checkout data (checkout- Member, dueReturnDate etc) is considered extrinsic.
    In DOM-layer: Centralized event handling:
        Instead of binding the click to multiple elements, we can easily attach a flyweight
        to the top of our container which can listen for events coming from below.
    Using the Flyweight for Performance Gains:
        ...
*/
