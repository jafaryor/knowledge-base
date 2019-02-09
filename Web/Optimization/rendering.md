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

