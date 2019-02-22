## Rendering Performance
### 60fps and Device Refresh Rates
User interacting with a website.
Most devices today refresh their screens 60 times a second. If there’s an animation or transition running, or the user is scrolling the pages, the browser needs to match the device’s refresh rate and put up 1 new picture, or frame, for each of those screen refreshes.

Each of those frames has a budget of just over 16ms (1 second / 60 = 16.66ms). In reality, however, the browser has housekeeping work to do, so all of your work needs to be completed inside __10ms__. When you fail to meet this budget the frame rate drops, and the content judders on screen. This is often referred to as __jank__, and it negatively impacts the user's experience.

### The pixel pipeline
![frame-full](../images/frame-full.jpg)

Where:
* __JavaScript__.
* __Style calculations__. This is the process of figuring out which CSS rules apply to which elements based on matching selectors. From there, once rules are known, they are applied and the final styles for each element are calculated.
* __Layout__. Once the browser knows which rules apply to an element it can begin to calculate how much space it takes up and where it is on screen. The web’s layout model means that one element can affect others.
* __Paint__. Painting is the process of filling in pixels. It involves drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers.
* __Compositing__. Since the parts of the page were drawn into potentially multiple layers they need to be drawn to the screen in the correct order so that the page renders correctly. This is especially important for elements that overlap another, since a mistake could result in one element appearing over the top of another incorrectly.

There are three ways the pipeline normally plays out for a given frame when you make a visual change, either with JavaScript, CSS, or Web Animations.
* __JS / CSS > Style > Layout > Paint > Composite__

    If you change a “layout” property, so that’s one that changes an element’s geometry, like its width, height, or its position with left or top, the browser will have to check all the other elements and “reflow” the page. Any affected areas will need to be repainted, and the final painted elements will need to be composited back together.

* __JS / CSS > Style > Paint > Composite__

    If you changed a “paint only” property, like a background image, text color, or shadows, in other words one that does not affect the layout of the page, then the browser skips layout, but it will still do paint.

* __JS / CSS > Style > Composite__

    The cheapest and most desirable for high pressure points in an app's lifecycle, like animations or scrolling.

### Optimize JS Execution
* __Use `requestAnimationFrame` for visual changes instead of `setTimeout` and `setInteerval`__
* __Reduce complexity or use Web Workers__

    > Web Workers do not have DOM access

* __Avoid micro-optimizing your JavaScript__

### Reduce the Scope and Complexity of Style Calculations
Changing the DOM, through adding and removing elements, changing attributes, classes, or through animation, will all cause the browser to recalculate element styles and, in many cases, layout (or reflow) the page, or parts of it. This process is called computed style calculation.
* Reduce the complexity of your selectors; use a class-centric methodology like [BEM](https://ru.bem.info/).
* Reduce the number of elements on which style calculation must be calculated. Reduce the scope by apply style calculation to an element with less children.

### Avoid Large, Complex Layouts and Layout Thrashing
Layout is almost always scoped to the entire document. If you have a lot of elements, it’s going to take a long time to figure out the locations and dimensions of them all.

> Check out [CSS triggers](https://csstriggers.com/).

__Use flexbox over older layout models__. The layout cost when using floats is much bigger than flexbox layout. So always use flexbox if possible.

__Avoid forced synchronous layouts__. Use `requestAnimationFrame` to schedule our function to run at the start of the frame.

__Avoid layout thrashing__.

### Simplify Paint Complexity and Reduce Paint Areas
* Changing any property apart from transforms or opacity always triggers paint.

* Paint is often the most expensive part of the pixel pipeline; avoid it where you can.

* Reduce paint areas

    If you have a fixed header at the top of the page, and something being painted at the bottom the screen, the entire screen may end up being repainted.

    > Note: On High DPI screens elements that are fixed position are automatically promoted to their own compositor layer. This is not the case on low DPI devices because the promotion changes text rendering from subpixel to grayscale, and layer promotion needs to be done manually.

* Simplify paint complexity

    When it comes to painting, some things are more expensive than others. For example, anything that involves a blur (like a shadow, for example) is going to take longer to paint than -- say -- drawing a red box.

### Stick to Compositor-Only Properties and Manage Layer Count
Reduce paint areas through layer promotion and orchestration of animations.

The benefit of this approach is that elements that are regularly repainted, or are moving on screen with transforms, can be handled without affecting other elements. This is the same as with art packages like Sketch, GIMP, or Photoshop, where individual layers can be handled and composited on top of each other to create the final image.

It gives the best-performing version of the pixel pipeline, avoiding both layout and paint, and only requires compositing changes. In order to achieve this you will need to stick to changing properties that can be handled by the compositor alone. Today there are only two properties for which that is true - `transforms` and `opacity`.

Promote elements that you plan to animate. The best way to create a new layer is to use the [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) CSS property
```css
.moving-element {
    will-change: transform;
}
```

For browsers that don’t support will-change, use `transform`:
```css
.moving-element {
    transform: translateZ(0);
}
```

A browser will promote an element to a compositing layer for many reasons, just a few of which are:
* 3D transforms: `translate3d`, `translateZ` and so on;
* `<video>`, `<canvas>` and `<iframe>` elements;
* animation of `transform` and `opacity` via `Element.animate()`;
* animation of `transform` and `opacity` via СSS transitions and animations;
* `position: fixed`;
* `will-change`;
* `filter`;

> Care must be taken not to create too many layers, however, as each layer requires both memory and management. In fact, on devices with limited memory the impact on performance can far outweigh any benefit of creating a layer. Every layer’s textures needs to be uploaded to the GPU, so there are further constraints in terms of bandwidth between CPU and GPU, and memory available for textures on the GPU.

### Animate `transform` and `opacity` properties only
The `transform` and `opacity` properties are guaranteed to neither affect nor be affected by the normal flow or DOM environment (that is, they won’t cause a reflow or repaint, so their animation can be completely offloaded to the GPU). Basically, this means you can effectively animate movement, scaling, rotation, opacity and affine transforms only.

### Reduce size of composite layer
The trick is pretty simple: Reduce the physical size of the composite layer with the `width` and `height` properties, and then upscale its texture with `transform: scale(…)`.

Of course, this trick reduces memory consumption significantly for very simple, solid-colored layers only.

> __Animation of `transform` and `opacity` via CSS transitions or animations automatically creates a compositing layer and works on the GPU.__

### CSS animation vs JS animation
CSS-based animation has a very important feature: It works entirely on the GPU. Because you declare how an animation should start and finish, the browser can prepare all of the required instructions ahead of the animation’s start and send them to the GPU.

In the case of imperative JavaScript, all that the browser knows for sure is the state of the current frame. For a smooth animation, we’d have to calculate the new frame in the main browser thread and send it to the GPU at least 60 times per second.

Besides the fact that these calculations and sending of data are much slower that CSS animation, they also depend on the workload of the main thread. It menas the JS animation may lag if the main thread is loaded.

So, try to use CSS-based animation as much as possible, especially for loading and progress indicators. Not only is it much faster, but it won’t get blocked by heavy JavaScript calculations.

[Read More about Composite Layers](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)

### Debounce Your Input Handlers
* __Avoid long-running input handlers; they can block scrolling__

* __Do not make style changes in input handlers.__

* __Debounce your handlers; store event values and deal with style changes in the next requestAnimationFrame callback.__

    Input handlers, like those for scroll and touch, are scheduled to run just before any `requestAnimationFrame` callbacks.

    If you make a visual change inside one of those handlers, then at the start of the `requestAnimationFrame`, there will be style changes pending. If you then read visual properties at the start of the `requestAnimationFrame` callback, you will trigger a forced synchronous layout!

    The solution to both of the problems above is the same: you should always debounce visual changes to the next `requestAnimationFrame` callback:
    ```javascript
    function onScroll (evt) {

    // Store the scroll value for laterz.
    lastScrollY = window.scrollY;

    // Prevent multiple rAF callbacks.
    if (scheduledAnimationFrame)
        return;

    scheduledAnimationFrame = true;
    requestAnimationFrame(readAndUpdatePage);
    }

    window.addEventListener('scroll', onScroll);
    ```

__[Web Performance Optimization Techniques](https://perf.rocks/articles/)__
