## Object Pool Design Pattern

Object pooling can offer a significant performance boost; it is most effective in situations where the cost of initializing a class instance is high, the rate of instantiation of a class is high, and the number of instantiations in use at any one time is low.

The `Object Pool` lets others "check out" objects from its pool, when those objects are no longer needed by their processes, they are returned to the pool in order to be reused.

However, we don't want a process to have to wait for a particular object to be released, so the `Object Pool` also instantiates new objects as they are required, but must also implement a facility to clean up unused objects periodically.

The general idea for the Connection Pool pattern is that if instances of a class can be reused, you avoid creating instances of the class by reusing them.

Rules of thumb:
* `The Factory Method` pattern can be used to encapsulate the creation logic for objects. However, it does not manage them after their creation, the `Object Pool` pattern keeps track of the objects it creates.
* `Object Pools` are usually implemented as `Singletons`.