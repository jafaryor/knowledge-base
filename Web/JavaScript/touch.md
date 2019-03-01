## Touch in Web
In Chrome (version 55 and later), Internet Explorer & Edge, PointerEvents are the recommended approach for implementing custom gestures.

In other browsers TouchEvents and MouseEvents are the correct approach.

The great feature of PointerEvents is that it merges multiple types of input, including mouse, touch and pen events, into one set of callbacks. The events to listen for are pointerdown, pointermove, pointerup and pointercancel.

The equivalents in other browsers are touchstart, touchmove, touchend and touchcancel for touch events and if you wanted to implement the same gesture for mouse input you'd need to implement mousedown, mousemove, and mouseup.

> On most mobile browsers hover and/or focus states will apply to an element after it's been tapped.

| Events | |
| --- | --- |
| `touchstart`, `mousedown`, `pointerdown` | This is called when a finger first touches an element or when the user clicks down on the mouse. |
| `touchmove`, `mousemove`, `pointermove` | This is called when the user moves their finger across the screen or drags with the mouse. |
| `touchend`, `mouseup`, `pointerup` | This is called when the user lifts their finger off of the screen or releases the mouse. |
| `touchcancel` `pointercancel` | This is called when the browser cancels the touch gestures. For example, a user touch a web app and then change tabs. |

Each touch event includes three list attributes:
<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Touch Event Attributes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code><span>touches</span></code></td>
      <td data-th="Description">
        List of all current touches on the screen, regardless of elements
        being touched.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code><span>targetTouches</span></code></td>
      <td data-th="Description">
        List of touches that started on the element that is the target of
        the current event. For example, if you bind to a <code><span>&lt;button&gt;</span></code>,
        you'll only get touches currently on that button. If you bind to the
        document, you'll get all touches currently on the document.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code><span>changedTouches</span></code></td>
      <td data-th="Description">
        List of touches which changed resulting in the event being fired:
        <ul>
          <li>
            For the <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>
            event-- list of the touch points that just became active with the
            current event.
          </li>
          <li>
            For the <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>
            event-- list of the touch points that have moved since the last
            event.
          </li>
          <li>
            For the <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            and <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
            events-- list of the touch points that have just been removed
            from the surface.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

How to set touch and mouse event listeners:
```javascript
// Check if pointer events are supported.
if (window.PointerEvent) {
    // Add Pointer Event Listener
    swipeFrontElement.addEventListener('pointerdown', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('pointermove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('pointerup', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('pointercancel', this.handleGestureEnd, true);
} else {
    // Add Touch Listener
    swipeFrontElement.addEventListener('touchstart', this.handleGestureStart, true);
    swipeFrontElement.addEventListener('touchmove', this.handleGestureMove, true);
    swipeFrontElement.addEventListener('touchend', this.handleGestureEnd, true);
    swipeFrontElement.addEventListener('touchcancel', this.handleGestureEnd, true);

    // Add Mouse Listener
    swipeFrontElement.addEventListener('mousedown', this.handleGestureStart, true);
}
```

> Because of the design of the API, `PointerEvents` only need a single `pointerdown` event to handle both mouse and touch events.

The CSS property [`touch-action`](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#auto) allows you to control the default touch behavior of an element. In our examples, use `touch-action: none` to prevent the browser from doing anything with a users' touch, allowing us to intercept all of the touch events.

### [Read more about how to implement custome gestures](https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#implement_custom_gestures)
