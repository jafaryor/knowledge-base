# The Runtime Performance Checklist
1. ## Large invalidations of layout and styles

    Changing classes on elements and changing element styles directly through JavaScript, CSS transitions or CSS animations cause the browser to invalidate part or all of its rendering tree.

    What really matters here is how much of the document tree you invalidate. In the worst case you might invalidate the entire document tree.

    #### Fix:
    * Avoid style changes where you can.
    * If you do need to make changes apply them as close to the target elements as possible.
    * [Layout Boundaries](http://wilsonpage.co.uk/introducing-layout-boundaries/).

    ### Layout Boundaries

    With a few small CSS tweaks we are able to enforce layout boundaries in our document. This means that if any layout forcing changes are made inside the scope of a layout boundary element, only a 'partial reflow' is required, and this is a lot cheaper!

    To be a layout boundary, the element must:
    * Be an SVG root (`<svg>`).
    * Be a text or search `<input>` field.

    or:
    * Not be display `inline` or `inline-block`
    * Not have a percentage `height` value.
    * Not have an implicit or `auto` height value.
    * Not have an implicit or `auto` width value.
    * Have an explicit `overflow` value (`scroll`, `auto` or `hidden`).
    * Not be a descendant of a `<table>` element.

    [Boundarizr](https://github.com/paullewis/Boundarizr/) tool can be used to highlight which elements in your app are acting as 'layout boundaries'.

    > By constraining the size of the parent element and making sure descendent elements cannot flow out of the boundaries by setting `overflow: hidden;`, layout engine optimise by making the assumption that nodes outside the layout boundary do not have to be checked.


2. ## Layout Thrashing

    Once the browser has gone to the hard work of calculating the geometry of the page’s elements, one of the worst things you can do is invalidate those calculations. But it’s possible to go one step further and invalidate several times inside a single frame. You do this by putting the browser into a read-write-read-write cycle, where you continually read styles and then change element styles.

    #### Fix:
    * Use [FastDOM](https://github.com/wilsonpage/fastdom) library.


3. ## Animating Layout Properties

    In general terms we need to think of the browser’s rendering pipeline like a waterfall. Well more like a cliff, actually, and ideally speaking you want to start as low down as possible to avoid a painful catastrophe.

    By way of a quick summary, the work that the browser has to fit into a single frame’s life cycle is:
    1. JavaScript
    2. Style calculations
    3. Layout
    4. Paint Setup & Paint
    5. Composite

    If you animate a visual aspect of an element such as backgrounds, text color or shadows, you’ll take the hit for paint and composite, but if you animate transforms or opacity you will only see composites. Hopefully you can see that you want to limit animations to anything can be done entirely in the composite part of the pipeline; they are typically GPU-assisted and therefore awesome.

    #### [Read More](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)


4. ## Paint Storms

    Paint Storm are where the browser has to paint a large part (or all) of the viewport in every frame. That’s a miserable idea because paints are expensive.

    To understand this a little more there are three things to know:
    * Changing visual properties of an element (background, text color, border radius, shadows) will trigger a paint.
    * Elements are grouped into layers which means you may end up painting several elements by just changing one.
    * The browser throws a dirty area around visually changed elements. This is a union operation, which means that if you have a changed element in the top left and another in the bottom right of your screen, the area to be painted will be the whole screen (top left to bottom right)!

    > One of the best ways to find _Paint Storms_ is the _Show Paint Rectangles_ tool in DevTools.

    The most common cause here are fixed position elements like — say — a header that sticks as you scroll. In that case the browser unions the header (because it needs to be repainted during the scroll) and the newly appearing content

    The way around this is to promote the elements that need to be repainted to their own composited layer. This isolates them from other elements, so if they need to be repainted nothing else will be affected. Blink-based browsers use several criteria to determine if an element deserves its own layer in the compositor, all of which are [listed over on the Chromium site](http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome). The most common of these is to apply a `-webkit-transform: translateZ(0)` style to the element, a 3D transform, which is one criterion in the list.

    #### Fix:
    * Avoid animating any property that will trigger a paint if you can.
    * Ensure any element that is being regularly repainted has been isolated from other elements. You can use any promotion criterion, but most people use `translateZ(0)` or `backface-visibility: hidden`.

    > Remove the GIF animation from DOM, even if they are hidden as Browser repaints it in every frame. Instead do: `display: none` or `visibility: hidden`.

5. ## Expensive Paints

    How do you know if painting is cheap?
    1. _DevTools Timeline_. When you see a big green block for Paint you can see immediately how long you spent painting.
    2. _Show Paint Rectangles_ in DevTools.

    For bonus points you should also [make sure to hide your animated GIFs](http://www.html5rocks.com/en/tutorials/speed/animated-gifs/).


6. ## Garbage Collection in Animations

    It used to be the case that if you hit garbage collection (GC) in your app it would be game over for responsiveness. In the most general terms, GC stops all other activity on the main thread while it clears up allocated memory that is no longer accessible.

    That said you can still cause sizable GC pauses in your app and, because they’re unpredictable (from a developer point of view at least), you can find yourself GC’d right in the middle of an animation or interaction.

    In general the key to avoiding long and expensive GC pauses is to avoid object creation, and ideally to reuse objects inside your loops and animation callbacks. The fewer objects you create, the less that the garbage collector has to pick up.

    [Addy Osmani on Writing Fast, Memory-Efficient Code](http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/)
    [Static Memory JavaScript with Object Pools](http://www.html5rocks.com/en/tutorials/speed/static-mem-pools/)


* ## Expensive Input Handlers

    In most modern browsers there is a separate thread called the compositor that deals with scrolling and input. It also deals with layer creation and communicates with the GPU to move those layers around the screen. When you scroll on a touch device the fast path is that the compositor receives the input event and can simply instruct the GPU to move layers around without the need for paint or any other work.

    If you attach a touchstart listener then the compositor now has to wait for the main thread to execute the callback in the JavaScript VM before proceeding. This is because you could call `preventDefault()` and so touch scroll should be prevented.

    But it’s possible that the main thread is already busy doing other work (style calculations, layout, other JavaScript) and it might not execute the touchstart callback immediately. Meanwhile the compositor thread can’t proceed with scrolling the page:

    #### Fix:
    * Let the browser handle scrolls and touch if you can.
    * If you can’t do that then bind the listener as late as possible. That is, if you don’t need a listener to be attached to an element don’t have it there.
    * Bind the listener as close to the element as you can, ideally on the target element itself.
    *


* ## Debouncing events

    Many events (scolling ...) that we’re interested in will get fired multiple times inside a single frame.

    What you should do instead is to simply store the values you are interested in, then schedule a `requestAnimationFrame` callback to deal with things at the most convenient time for the browser.
