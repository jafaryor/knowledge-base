## Template Method
Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

The Template Method pattern provides an outline of a series of steps for an algorithm. Objects that implement these steps retain the original structure of the algorithm but have the option to redefine or adjust certain steps. This pattern is designed to offer extensibility to the client developer.

```javascript
var datastore = {
    process: function() {
        this.connect();
        this.select();
        this.disconnect();
        return true;
    }
};
 
function run() {
    var mySql = inherit(datastore);
 
    // implement template steps
 
    mySql.connect = function() {
        log.add("MySQL: connect step");
    };
 
    mySql.select = function() {
        log.add("MySQL: select step");
    };
 
    mySql.disconnect = function() {
        log.add("MySQL: disconnect step");
    };
 
    mySql.process();
 
    log.show();
}
```
