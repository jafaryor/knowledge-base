## Layout Thrashing
`Layout Thrashing` occurs when JavaScript violently writes, then reads, from the DOM, multiple times causing document reflows.

```javascript
// Read
var h1 = element1.clientHeight;

// Write (invalidates layout)
element1.style.height = (h1 * 2) + 'px';

// Read (triggers layout)
var h2 = element2.clientHeight;

// Write (invalidates layout)
element2.style.height = (h2 * 2) + 'px';

// Read (triggers layout)
var h3 = element3.clientHeight;

// Write (invalidates layout)
element3.style.height = (h3 * 2) + 'px';
```

If we ask for a geometric value back from the DOM before the current operation (or frame) is complete, we __force the browser to perform layout early__, this is known as __`forced synchonous layout`__, and it kills performance!

`window.requestAnimationFrame` schedules a function to be executed at the next frame, similar to `setTimeout(fn, 0)`. This is super useful because we can use it to schedule all our DOM writes to run together in the next frame, leaving all `DOM` reads to run in the current synchronous turn.

```javascript
// Read
var h1 = element1.clientHeight;

// Write
requestAnimationFrame(function() {
  element1.style.height = (h1 * 2) + 'px';
});

// Read
var h2 = element2.clientHeight;

// Write
requestAnimationFrame(function() {
  element2.style.height = (h2 * 2) + 'px';
});
```

[Read More](http://wilsonpage.co.uk/preventing-layout-thrashing/)