## `window.requestAnimationFrame()`
Method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
```javascript
window.requestAnimationFrame(callback);
```
### Parameters:
* __callback__

    A parameter specifying a function to call when it's time to update your animation for the next repaint. The callback has one single argument, a `DOMHighResTimeStamp`, which indicates the current time (the time returned from `performance.now()`) for when `requestAnimationFrame()` starts to fire callbacks.

* __Return value__

    A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to `window.cancelAnimationFrame()` to cancel the refresh callback request.

`requestAnimationFrame` has other nice properties too:
* Animations in background tabs get paused, conserving system resources and battery life.
* If the system can't handle rendering at the screen's refresh rate, it can throttle animations and produce the callback less frequently (say, 30 times a second on a 60Hz screen). While this drops framerate in half, it keeps the animation consistent -- and as stated above, our eyes are much more attuned to variance than framerate. A steady 30Hz looks better than 60Hz that misses a few frames a second.

Since we want a new frame ready on every screen refresh, there's only the time in between refreshes to do all the work to create a new frame. On a 60Hz display, that means we've got about 16ms to run all JavaScript, perform layout, paint, and whatever else the browser has to do to get the frame out. This means if the JavaScript inside your `requestAnimationFrame` callback takes longer than 16ms to run, you don't have any hope of producing a frame in time for v-sync!

```javascript
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})();

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || oCancelRequestAnimationFrame
    || msCancelRequestAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back
```

> What's better than lightweight JS in your event and rAF callbacks? No JS. On Chrome for Android in particular (and other browsers are working on similar features), CSS animations have the very desirable property that the browser can often run them even if JavaScript is running.

[More about animation](https://www.html5rocks.com/en/tutorials/speed/rendering/)

[How to debug animation](https://youtu.be/hZJacl2VkKo)