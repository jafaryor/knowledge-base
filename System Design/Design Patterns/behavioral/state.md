## State
Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

The State pattern provides state-specific logic to a limited set of objects in which each object represents a particular state. This is best explained with an example.

```javascript
var TrafficLight = function () {
    var count = 0;
    var currentState = new Red(this);
 
    this.change = function (state) {
        // limits number of changes
        if (count++ >= 10) return;
        currentState = state;
        currentState.go();
    };
 
    this.start = function () {
        currentState.go();
    };
}
 
var Red = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Red --> for 1 minute");
        light.change(new Green(light));
    }
};
 
var Yellow = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Yellow --> for 10 seconds");
        light.change(new Red(light));
    }
};
 
var Green = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Green --> for 1 minute");
        light.change(new Yellow(light));
    }
};

function run() {
    var light = new TrafficLight();
    light.start();
}
```
