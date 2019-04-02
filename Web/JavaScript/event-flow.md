## Event flow
The browser has an event-driven, single-threaded programming model.

### Eventy propagation
_Event Propagation_ is a mechanism that defines how events propagate or travel through the DOM tree to arrives at its target and what happens to it afterward.

The _Event Propagation_ proceeds in 3 phases:
1. __Capturing phase__ – the event goes down to the element.
2. __Target phase__ – the event reached the target element.
3. __Bubbling phase__ – the event bubbles up from the element.

![event-flow](./images/event-flow.png)

Events are targeted to a particular node

Handlers added using `on<event>` - property or using HTML attributes or using `addEventListener(event, handler)` don’t know anything about capturing, they only run on the 2nd and 3rd phases.

To catch an event on the capturing phase, we need to set the handler `capture` option to `true`:
```javascript
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

### Capture option
There are two possible values of the `capture` option:
* If it’s `false` (default), then the handler is set on the bubbling phase.
* If it’s `true`, then the handler is set on the capturing phase.

> Note that while formally there are 3 phases, the 2nd phase (“target phase”) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.

### Event handler
Each handler can access event object properties:
* `event.target` – the deepest element that originated the event.
* `event.currentTarget` (= `this`) – the current element that handles the event (the one that has the handler on it)
* `event.eventPhase` – the current phase (capturing=1, bubbling=3).

> To remove the handler, `removeEventListener` needs the same phase.

### Stop event propgation
`event.stopPropagation()` stops the move upwards, but on the current element all other handlers will run.

If several listeners are attached to the same element for the same event type, they are called in the order in which they were added. If `stopImmediatePropagation()` is invoked during one such call, no remaining listeners will be called.

```javascript
// Prevent bubbling
event.cancelBubble = true;
if (event.stopPropagation) event.stopPropagation();

// Prevent default behaviour
event.returnValue = false;
if (event.preventDefault) event.preventDefault();
return false;
```

### Event Binding vs Event Delegation
_Standard event handling_ is to add event listener directly to DOM element which will be handled.
```javascript
element.addEventListener("eventName",function(e){
    //here event handling code
});
```

_Delegated event handling_ is adding handler on parent element of our target one, and check what target started event. It uses event propagation which means that event is propagated from element most nested on which event was fired to root of DOM tree.
```javascript
parentElement.addEventListener("eventName",function(e){
    if (e.target===element){
        //here event handling code
    }
});
```




