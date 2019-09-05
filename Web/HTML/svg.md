## The Best Way to Embed SVG on HTML
### Why use SVG at all?
* Small file sizes that compress well
* Scales to any size without losing clarity (except very tiny)
* Looks great on retina displays
* Design control like interactivity and filters

### Cnsiderations
* Alt and title attribute availability

    When we embed an image onto HTML, it's always good to have alt and title attributes, for better accessibility. An alt attribute allows a user to view the image description, even when it fails to render on a device, in addition to providing context for search engines. A title attribute allows hovering over the image to obtain more information.

* Browser caching
* GZip Compression

    Unlike PNG and JPEG formats (practically, already compressed), SVG images are very well suited for compression. According to the [World Wide Web Consortium](https://www.w3.org/TR/SVG11/minimize.html), SVG offers anything between 75% - 85% compression ratio, reducing a 16KB file to only 4KB, resulting in considerable bandwidth and speed savings.

* Interactivity

    Because of security reasons, some SVG embedding methods will block access to external resources including CSS, fonts and javascript. Especially when we have multiple images, ideally our embedding method should be able to refer to a single CSS, font or javascript file (to save resources) and be able to manipulate our embedded SVG.

* Search engine indexing

    Google has publicly stated that it will index and crawl SVG files. Therefore, it makes sense for better SEO (Search Engine Optimization), that the embedding method we adopt would allow search engines to list our images on image search.

### `<img>`
The simplest way.

| Browser support | The `<img>` tag is now supported across all major browsers that support SVG (IE9+). |
| - | - |
| Alt and title attributes | Both available. |
| Browser caching | Available. |
| GZip compression | Available. |
| Interactivity | None. If interactivity is required, use `<object>` tag. |
| Search engine indexing | Available. |

If you use an `<img>` tag with web fonts, the fonts will fail to render and resort to using only system fonts. This is mainly because images with `<img>` tags are not allowed to refer to external resources including CSS, fonts and scripts, for [security reasons](https://blog.guya.net/2014/02/17/svg-for-fun-and-phishing/).

You can manually embed fonts into your SVG to resolve this, but most times, will result in large SVG size.

### `<object>`
If you require interactivity, this is your best option:

| Browser support | The `<object>` tag is supported across all major browsers that support SVG (IE9+). |
| - | - |
| Alt and title attributes | None. |
| Browser caching | Available. |
| GZip Compression | Available. |
| Interactivity	| Available. |
| Search engine indexing | None. Workaround - though fallback. |

```html
<object type="image/svg+xml" data="image.svg">
    <!-- Your fall back here -->
    <img src="image.svg" />
</object>
```

The only problem is double loading, that is the browser will load the image on the `<object>` tag, and another image on the `<img>` tag, even though only one of them is required, while the other is hidden.

### Inline SVG
Because inline SVG is embedded into HTML, there is no necessity for another network request to obtain the SVG file, and therefore inline SVG will load the fastest.

| Browser support | Supported across all major browsers that support SVG (IE9+). |
| - | - |
| Alt and title attributes | None. |
| Browser caching | None. |
| GZip compression | None. |
| Interactivity | Available. |
| Search engine indexing | None. |

Since the SVG is essentially the DOM, you can easily use external CSS, fonts and scripts. Multiple SVG can be inlined that refers to a single CSS or font files, therefore saving bandwidth and resources.

In addition, you get the ability to select, highlight and copy text in your SVG.

### `<embed>`
It is not part of HTML specifications but widely supported on all browsers mainly used to implement Flash plugins.

```html
<embed type="image/svg+xml" src="image.svg" />
```

### `<iframe>`
Do NOT use an `<iframe>` where you can use an `<object>` tag instead. Iframes are difficult to maintain, does not get indexed by search engines and bad for SEO (Search Engine Optimization).

```html
<iframe src="image.svg"></iframe>
```

### CSS `background-image`
This is equivalent to using the `<img>` tag.

```css
{
  background-image: url(image.svg);
}
```

### Data URL
Another way to use SVG's is to convert them into Data URL's using __Base 64__ encoding/decoding algorithm. But data URI's do not have to be base64. In fact in the case of SVG, it's probably better NOT to use base64. Primarily because the native format of SVG is much more repetitive than base64 ends up, it gzips better.

```html
<img src="data:image/svg+xml;base64,[data]">
```

```css
{
  background: url("data:image/svg+xml;base64,[data]");
}
```

```html
<object type="image/svg+xml" data="data:image/svg+xml;base64,[data]">
  fallback
</object>
```

Supported formats:
```html
<!-- base64 -->
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL...

<!-- UTF-8, not encoded -->
data:image/svg+xml;charset=UTF-8,<svg ...> ... </svg>

<!-- UTF-8, optimized encoding for compatibility -->
data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://...'

<!-- Fully URL encoded ASCII -->
data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//...
```

___

#### [Read More](https://vecta.io/blog/best-way-to-embed-svg)
