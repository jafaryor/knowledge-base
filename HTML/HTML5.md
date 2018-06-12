`DOM`:
* Document - means page
* Object - pieces, components of the document
* Model - what do we call these individual pieces and how do we describe relationship between them

## window.requestAnimationFrame()
Method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
```javascript
window.requestAnimationFrame(callback);
```
Parameters:
    
__callback__

    A parameter specifying a function to call when it's time to update your animation for the next repaint. The callback has one single argument, a DOMHighResTimeStamp, which indicates the current time (the time returned from performance.now() ) for when requestAnimationFrame() starts to fire callbacks.

__Return value__

    A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.