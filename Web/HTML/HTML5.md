## HTML5 Semantic Elements
A semantic element clearly describes its meaning to both the browser and the developer.

> ![html-semantic-elements](./images/html-semantic-elements.png)

* `<article>`

    Specifies independent, self-contained content. An article should make sense on its own, and it should be possible to read it independently from the rest of the web site.

    Example for a newspaper: The sport `<article>` in the sport section, may have a technical section in each `<article>`.

* `<aside>`

    Defines content aside from the page content.

* `<details>`

    Defines additional details that the user can view or hide.
    ```html
    <details>
        <summary>Copyright 1999-2018.</summary>
        <p> - by Refsnes Data. All Rights Reserved.</p>
        <p>All content and graphics on this web site are the property of the company Refsnes Data.</p>
    </details>
    ```

* `<figcaption>`

    Defines a caption for a `<figure>` element.

* `<figure>`

    Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc.

    An image and a caption can be grouped together in a `<figure>`.
    ```html
    <figure>
        <img src="pic_trulli.jpg" alt="Trulli">
        <figcaption>Fig1. - Trulli, Puglia, Italy.</figcaption>
    </figure>
    ```

* `<footer>`
* `<header>`
* `<main>`

    Specifies the main content of a document.

* `<mark>`

    Defines marked/highlighted text.

* `<nav>`

    Defines a set of navigation links.

* `<section>`

    Defines a section in a document. A _section_ is a thematic grouping of content, typically with a heading.
    ```html
    <section>
        <h1>WWF</h1>
        <p>The World Wide Fund for Nature (WWF) is....</p>
    </section>
    ```

* `<summary>`

    Defines a visible heading for a `<details>` element.

* `<address>`

    Defined contact information.
    ```html
    <address>
        Please contact <a href='mailto:troymcclure@example.com'>Troy
        McClure</a> for questions about this article.
    </address>
    ```

* `<time>`

    Defines a date/time.
    ```html
    <time datetime='2017-1-3 15:00-0800'>January 3rd</time>
    ```

    > ![time-element](./images/time-element.png)

### [Cool Resource about HTML and CSS](https://internetingishard.com/html-and-css/)

___

## `<script></script>`
The HTML `<script>` element is used to embed or reference executable code; this is typically used to embed or refer to JavaScript code.

![legend](./images/legend.svg)

The HTML file will be parsed until the script file is hit, at that point parsing will stop and a request will be made to fetch the file (if it’s external). The script will then be executed before parsing is resumed.

![script](./images/script.svg)

### Attributes:
* `async` - a Boolean attribute indicating that the browser should, if possible, execute the script asynchronously.

    The browser downloads the script asynchronously while it continues to parse the HTML document. When the script finishes downloading, parsing is blocked while the script executes.

    Dynamically inserted scripts (using `document.createElement`) execute asynchronously by default, so to turn on synchronous execution (i.e. scripts execute in the order they were inserted) set `async=false`.

    ![script-async](./images/script-async.svg)

    > This attribute must not be used if the src attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.

* `defer` - the Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `DOMContentLoaded`.

    Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.

    ![script-defer](./images/script-defer.svg)

    > This attribute must not be used if the src attribute is absent (i.e. for inline scripts), in this case it would have no effect.

    To achieve a similar effect for dynamically inserted scripts use `async=false` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.

* `crossorigin` - some HTML elements which provide support for CORS, such as `<img>`, `<video>` or `<script>`, have a `crossorigin` attribute (crossOrigin property), which lets you configure the CORS requests for the element's fetched data. These attributes are enumerated, and have the following possible values:

    * `anonymous`	- 	CORS requests for this element will not have the credentials flag set.
    * `use-credentials` - CORS requests for this element will have the credentials flag set; this means the request will provide credentials via cookies, client-side SSL certificates or HTTP authentication.

    By default (that is, when the attribute is not specified), CORS is not used at all.

* `integrity` - contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation.

    Subresource Integrity (`SRI`) is a security feature that enables browsers to verify that files they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched file must match.

* `nomodule` - the Boolean attribute is set to indicate that the script should not be executed in browsers that support `ES2015` modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.

* `nonce` - a cryptographic nonce (number used once) to whitelist inline scripts in a script-src _Content-Security-Policy_.

    Example:
    ```html
    <script nonce="2726c7f26c">
        var inline = 1;
    </script>
    ```

* `src` - attribute specifies the URI of an external script
* `text` - the attribute which sets the text content of the element.
* `type` - the attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:

    * __omitted__ or a __JavaScript MIME type (`text/javascript`)__: For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type.
    * `module`:  For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes.
    * __any other value__ - The embedded content is treated as a data block which won't be processed by the browser.

> __Scripts without `async` or `defer` attributes, as well as inline scripts, are fetched and executed immediately, before the browser continues to parse the page.__

___

## `<style></style>`
The HTML `<style>` element contains style information for a document.

### Attributes:
* `type = text/css` - defines the styling language as a MIME type.
* `media` - This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to all if the attribute is missing.
* `nonce` - A cryptographic nonce (number used once) to whitelist inline styles in a style-src Content-Security-Policy.
* `title` - specifies alternative style sheet sets.

    Specifying alternative style sheets in a web page provides a way for users to see multiple versions of a page, based on their needs or preferences.

    Firefox lets the user select the stylesheet using the View > Page Style submenu. Internet Explorer also supports this feature (beginning with IE 8), also accessed from View > Page Style. Chrome requires an extension to use the feature (as of version 48). The web page can also provide its own user interface to let the user switch styles.

___

## `<link>`
The HTML `<link>` element specifies relationships between the current document and an external resource.

### Attributes
* `as` - is only used when `rel="preload"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct content security policy, and setting of correct `Accept` request header.
* `crossorigin` - enumerated attribute indicates whether CORS must be used when fetching the related resource.
* `href` - specifies the URL of the linked resource. A URL might be absolute or relative.
* `hreflang` - indicates the language of the linked resource.
* `integrity` - Contains inline metadata, a base64-encoded cryptographic hash of a resource (file) you’re telling the browser to fetch, that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation.
* `media` - specifies the media which the linked resource applies to. Its value must be a media query.
* `prefetch` - This attribute identifies a resource that might be required by the next navigation and that the user agent should retrieve it. This allows the user agent to respond faster when the resource is requested in the future.
* `referrerpolicy` - A string indicating which [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to use when fetching the resource
* `rel` - This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the link [types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types). The most common use of this attribute is to specify a link to an external style sheet: the `rel` attribute is set to `stylesheet`, and the `href` attribute is set to the URL of an external style sheet to format the page.
* `sizes` - defines the sizes of the icons for visual media contained in the resource. It must be present only if the `rel` contains the `icon` link types value.
* `target` - defines the frame or window name that has the defined linking relationship or that will show the rendering of any linked resource.
* `title` - The title attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet"> `it defines a preferred or an alternate stylesheet.
* `type` - is used to define the type of the content linked to. The value of the attribute should be a MIME type such as text/html, text/css, and so on. The common use of this attribute is to define the type of style sheet linked and the most common current value is text/css, which indicates a Cascading Style Sheet format. It is also used on rel="preload" link types, to make sure the browser only downloads file types that it supports.
* `methods` - the value of this attribute provides information about the functions that might be performed on an object.

Examples:
```html
<link href="style.css" rel="stylesheet">

<link rel="stylesheet" href="mystylesheet.css" onload="sheetLoaded()" onerror="sheetError()">
```

___

## `<meta>`
Represents metadata that cannot be represented by other HTML meta-related elements, like `<base>`, `<link>`, `<script>`, `<style>` or `<title>`.

### Attributes:
* `charset`

    This attribute declares the page's character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets).

* `content`

    This attribute contains the value for the `http-equiv` or `name` attribute, depending on which is used.

* `http-equiv`

    The attribute is named `http-equiv`(alent) because all the allowed values are names of particular HTTP headers:

    * `"content-security-policy"`

        Allows page authors to define a content policy for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.

    * `"refresh"`

        This instruction specifies:
        * The number of seconds until the page should be reloaded - only if the `content` attribute contains a positive integer.
        * The number of seconds until the page should redirect to another - only if the `content` attribute contains a positive integer followed by the string '`;url=`', and a valid URL.

    * [`Cache-control`](https://www.metatags.org/meta_http_equiv_cache_control)

        The meta cache control tag allows Web publishers to define how pages should be handled by caches.

        The allowed values are:
        * `Public` - public means that the resource can be cached by any cache (browser, CDN, etc)
        * `Private` - private means that the resource can only be cached by the browser.
        * `no-Cache` - tells the browser to cache the file but not to use it until it checks with the server to validate we have the latest version. This validation is done with the ETag header.
        * `no-Store` - tells the browser to always request the resource from the server

        You may add this Cache-control meta tag to all of your web-pages, so not only in the first index page. Make sure that on every page relevant meta tags are added.

* `name`

    This attribute defines the name of a piece of document-level metadata.

    > It should not be set if one of the attributes `itemprop`, `http-equiv` or `charset` is also set.

    `name` is associated with the value contained by the `content` attribute. The possible values for the `name` attribute are:

    * `application-name` which defines the name of the application running in the web page.
    * `author` which defines the name of the document's author.
    * `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
    * `generator` which contains the identifier of the software that generated the page
    * `keywords` which contains words relevant to the page's content separated by commas.
    * `referrer` which controls the `Referer` HTTP header attached to requests sent from the document.

        The `Referer` request header contains the address of the previous web page from which a link to the currently requested page was followed.

    * `creator` which defines the name of the creator of the document, such as an organization or institution.
    * `publisher` which defines the name of the document's publisher.
    * `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page.

        > The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a `robots.txt` file.

    * `viewport`, which gives hints about the size of the initial size of the viewport. Used by mobile devices only.

#### Note:
Depending on the attributes set, the kind of metadata can be one of the following:
* If `name` is set, it is document-level metadata, applying to the whole page.
* If `http-equiv` is set, it is a pragma directive — information normally given by the web server about how the web page is served.
* If `charset` is set, it is a charset declaration — the character encoding used by the webpage.
* If `itemprop` is set, it is user-defined metadata — transparent for the user-agent as the semantics of the metadata is user-specific.


#### [Read More about `<meta>` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

___

## `<picture></picture>`
Contains zero or more `<source>` elements and one `<img>` element to provide versions of an image for different display/device scenarios. The browser will consider each child `<source>` element and choose the best match among them based on `media` and `type` attributes; if no matches are found, the URL of the `<img>` element's src attribute is selected. The selected image is then presented in the space occupied by the `<img>` element.
```html
<picture>
    <source srcset="/media/examples/surfer-240-200.jpg"
            media="(min-width: 800px)">
    <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```

### Attributes
* `media`

    Specifies a media condition (similar to a media query) that the user agent will evaluate for each `<source>` element.

* `type`

    Specifies a _MIME type_ for the resource URL(s) in the `<source>` element's srcset attribute.

___


## `<base>`
Specifies the base URL to use for all relative URLs contained within a document.

> There can be only one <base> element in a document.

The base URL of a document can be queried from a script using `document.baseURI`.

### Attributes:
* `href`

    The base URL to be used throughout the document for relative URL addresses.

    > If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed.

* `target`

    Specifies the default `target` for all hyperlinks and forms in the page. The following keywords have special meanings:

    * `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.
    * `_blank`: Load the result into a new unnamed browsing context.
    * `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.
    * `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.

    > If this attribute is specified, this element must come before any other elements with attributes whose values are URLs.

___
