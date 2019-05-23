## Layer Creation
`-webkit-transform: translateZ(0);` or its good friend `-webkit-transform: translate3d(0,0,0);` is called the __null transform hack__.
The `translate3d` hack, then, does two things:
* It switches on the hardware compositing mode in Chrome, assuming it’s supported for the platform you’re on and isn’t on already.
* It creates a new layer with its own backing surface in Chrome.

> Hardware compositing is generally a good thing because it means the GPU will assist Chrome in putting together the page.

What else gets its own layer? Chrome’s heuristics here have evolved over time and continue to, but currently any of the following trigger layer creation:
* 3D or perspective `transform` CSS properties
* `<video>` elements using accelerated video decoding
* `<canvas>` elements with a 3D (WebGL) context or accelerated 2D context
* Composited plugins (i.e. `Flash`)
* Elements with CSS animation for their `opacity` or using an animated `transform`
* Elements with accelerated CSS `filters`
* Element has a descendant that has a compositing layer (in other words if the element has a child element that’s in its own layer)
* Element has a sibling with a lower z-index which has a compositing layer (in other words the it’s rendered on top of a composited layer)

Each backing surface is essentially a texture that needs to be uploaded to, and composited by, the GPU. Compositing is the process where each of the individual textures uploaded to the GPU is drawn out in turn, and results in one final picture: your page. A major benefit of this is on subsequent frames, where if all you do is move layers around or change their opacity, the GPU can handle all the work directly, leaving the CPU side of things free to do something else.

> Where things get really messy is on _mobile devices_, because they have comparatively limited VRAM

So how does Chrome turn the DOM into a screen image? Conceptually, it:
* Takes the DOM and splits it up into layers
* Paints each of these layers independently into software bitmaps
* Uploads them to the GPU as textures
* Composites the various layers together into the final screen image

That all needs to happen the first time Chrome produces a frame of a web page. But then it can take some shortcuts for future frames:
* If certain CSS properties change, it isn’t necessary to repaint anything. Chrome can just recomposite the existing layers that are already sitting on the GPU as textures, but with different compositing properties (e.g. in different positions, with different opacities, etc).
* If part of a layer gets invalidated, it gets repainted and re-uploaded. If its content remains the same but its composited attributes change (e.g. it gets translated or its opacity changes), Chrome can leave it on the GPU and recomposite to make a new frame.

> Composite Layers take up memory in system RAM and on the GPU (particularly limited on mobile devices) and having lots of them can introduce other overhead.

Many layers can also actually increase time spent rasterizing if they layers are large and overlap a lot where they didn’t previously, leading to what’s sometimes referred to as “overdraw”.

#### [Example](https://www.html5rocks.com/en/tutorials/speed/parallax/)

#### [Read More](https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/)
