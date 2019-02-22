## `font-display`
The `font-display` descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use.
```css
font-display: auto;
font-display: block;
font-display: swap;
font-display: fallback;
font-display: optional;
```
* `auto` - The font display strategy is defined by the user agent.
* `block` - Gives the font face a short block period and an infinite swap period.
* `swap` - Gives the font face an extremely small block period and an infinite swap period.
* `fallback` - Gives the font face an extremely small block period and a short swap period.
* `optional` - Gives the font face an extremely small block period and no swap period.

## `will-change`
The will-change CSS property hints to browsers how an element is expected to change.

With this property set on an element, the browser will (but not always!) promote it to a compositing layer in advance, so that the animation can start and stop smoothly.

But don’t misuse this property, or else you’ll end up with a tremendous increase in memory consumption!
```css
/* Keyword values */
will-change: auto;
will-change: scroll-position;
will-change: contents;
will-change: transform;        /* Example of <custom-ident> */
will-change: opacity;          /* Example of <custom-ident> */
will-change: left, top;        /* Example of two <animateable-feature> */

/* Global values */
will-change: inherit;
will-change: initial;
will-change: unset;
```
