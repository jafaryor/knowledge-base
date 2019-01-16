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

