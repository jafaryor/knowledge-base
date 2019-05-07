## JavaScript
Common problems:
| Problem	| Example	| Solution |
| --- | --- | --- |
| Expensive input handlers affecting response or animation. | Touch, parallax scrolling.	| Let the browser handle touch and scrolls, or bind the listener as late as possible (see [Expensive Input Handlers in Paul Lewis' runtime performance checklist](http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/)). |
| Badly-timed JavaScript affecting response, animation, load. | User scrolls right after page load, `setTimeout` / `setInterval`. |	Optimize JavaScript execution: use `requestAnimationFrame`, spread DOM manipulation over frames, use Web Workers. |
| Long-running JavaScript affecting response.	| The `DOMContentLoaded` event stalls as it's swamped with JS work. |	Move pure computational work to Web Workers. If you need DOM access, use `requestAnimationFrame` (see also Optimize JavaScript Execution). |
| Garbage-y scripts affecting response or animation. | Garbage collection can happen anywhere.	| Write less garbage-y scripts (see [Garbage Collection in Animation in Paul Lewis' runtime performance checklist](https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution)). |

### Techniques for Javascript Performance Optimization
The compilers built into V8 is so-called method JITs, meaning the unit of compilation is always a method, aka a function in JavaScript speak.

Make sure to split large functions into smaller building blocks. This is generally good advice for maintainability, but also helps the JIT to properly optimize everything that’s relevant to your application. Smaller functions also generally play well together with the inlining machinery inside the JIT, and often reduce the cost of compilation and optimization.

Try to avoid mixing field values of different types, i.e. don’t mix numbers, strings, objects, other primitives, unless that’s what you intended to do. Specifically don’t pre-initialize number fields to `null` or `undefined`, but choose sensible default numbers (use `NaN` if in doubt)

#### [JavaScript Performance Pitfalls in V8](https://ponyfoo.com/articles/javascript-performance-pitfalls-v8)

## Style
To reduce the impact of __Recalculate Style__ events:
* Use the CSS Triggers to learn which CSS properties trigger layout, paint, and composite. These properties have the worst impact on rendering performance.
* Switch to properties that have less impact. See Stick to compositor-only properties and manage layer count for more guidance.

Common problems:
| Problem	| Example	| Solution |
| --- | --- | --- |
| Expensive style calculations affecting response or animation. | Any CSS property that changes an element's geometry, like its width, height, or position; the browser has to check all other elements and redo the layout. |	[Avoid CSS that triggers layouts](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing). |
| Complex selectors affecting response or animation. | Nested selectors force the browser to know everything about all the other elements, including parents and children.	| [Reference an element in your CSS with just a class](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations). |

## Layout
Layout (or reflow in Firefox) is the process by which the browser calculates the positions and sizes of all the elements on a page.

"Layout thrashing" is a repetition of forced synchronous layout conditions. This occurs when JavaScript writes and reads from the DOM repeatedly, which forces the browser to recalculate the layout over and over.

Related Guides:
* [Avoid Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [Diagnose Forced Synchronous Layouts](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

Common problems:
| Problem	| Example	| Solution |
| --- | --- | --- |
| Forced synchronous layout affecting response or animation. | Forcing the browser to perform layout earlier in the pixel pipeline, resulting in repeating steps in the rendering process. | Batch your style reads first, then do any writes (see also [Avoid large, complex layouts and layout thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)). |
| Layout thrashing affecting response or animation. | A loop that puts the browser into a read-write-read-write cycle, forcing the browser to recalculate layout over and over again. | Automatically batch read-write operations using [FastDom](https://github.com/wilsonpage/fastdom) library. |

## Paint and composite
Paint is the process of filling in pixels. It is often the most costly part of the rendering process. If you've noticed that your page is janky in any way, it's likely that you have paint problems.

Compositing is where the painted parts of the page are put together for displaying on screen. For the most part, if you stick to compositor-only properties and avoid paint altogether, you should see a major improvement in performance

Common problems:
| Problem	| Example	| Solution |
| --- | --- | --- |
| Paint storms affecting response or animation. | Big paint areas or expensive paints affecting response or animation. | Avoid paint, promote elements that are moving to their own layer, use transforms and opacity (see Simplify paint complexity and reduce paint areas). |
| Layer explosions affecting animations. | Overpromotion of too many elements with translateZ(0) greatly affects animation performance. | Promote to layers sparingly, and only when you know it offers tangible improvements (see Stick to composite-only properties and manage layer count). |
