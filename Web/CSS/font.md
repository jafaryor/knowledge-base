## `font-display`
```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  font-display: auto; /* or block, swap, fallback, optional */
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

The `font-display` descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use.

The font display timeline is based on a timer that begins the moment the user agent attempts to use a given downloaded font face. The timeline is divided into the three periods below which dictate the rendering behavior of any elements using the font face.

* _Font block period_

    If the font face is not loaded, any element attempting to use it must render an invisible fallback font face. If the font face successfully loads during this period, it is used normally.

* _Font swap period_

    If the font face is not loaded, any element attempting to use it must render a fallback font face. If the font face successfully loads during this period, it is used normally.

* _Font failure period_

    If the font face is not loaded, the user agent treats it as a failed load causing normal font fallback.

Values:
* `auto` The font display strategy is defined by the user agent.
* `block` Gives the font face a short block period and an infinite swap period.
* `swap` Gives the font face an extremely small block period and an infinite swap period.
* `fallback` Gives the font face an extremely small block period and a short swap period.
* `optional` Gives the font face an extremely small block period and no swap period.