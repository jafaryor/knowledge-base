## Loading Performance
### Text Content:
* Text minification.
* Remote resource compression with `Gzip`.

### HTTP
* __Use module bundler__
* __Combine Graphical Resources__ to get the `sprite`.
    > Note: Physically combining files as discussed above might not achieve the desired result on `HTTP/2`.
* __Script Location__

    Common convention is to put script blocks in the page head. The problem with this positioning is that, typically, little to none of the script is really meant to execute until the page is displayed but, while it is loading, it unnecessarily blocks page rendering. Identifying render-blocking script is one of the reporting rules of PageSpeed Insights.

    A simple and effective solution is to reposition the deferred script block at the end of the page. That is, put the script reference last, just before the closing body tag. This allows the browser to load and render the page content, and then lets it download the script while the user perceives the initial content.

    > An exception to this technique is any script that manipulates the initial content or `DOM`, or provides required page functionality prior to or during rendering.

* __Code Location__

    Of course, the technique described above splits your JavaScript into two files on the server and thus requires two HTTP requests instead of one, exactly the situation we're trying to avoid. A better solution for relocating critical, pre-render scripts might be to place them directly inside the page itself, referred to as an _inline push_.

* __Enable Cache__

    Two main types of cache headers, `Cache-control` and `expires`, define the caching characteristics for your resources.

    > Tip: Don't use an expiry greater than one year; that's effectively forever on the internet and, as noted above, is the maximum value for `max-age` under `Cache-control`.

* __Reduce Latency with a Content Delivery Network (CDN)__

    Besides speeding up the delivery of your assets around the globe a CDN also can dramatically decrease your latency.

    A content delivery network (__CDN__) is a network of edge servers strategically placed across the globe with the purpose of delivering digital content to users as fast as possible.

    [Read More about CDN](https://www.keycdn.com/what-is-a-cdn)

* __Avoid 301 Redirects__

    Redirects are performance killers. Avoid them whenever possible. A redirect will generate additional round trip times (RTT) and therefore quickly doubles the time that is required to load the initial HTML document before the browser even starts to load other assets.

* __Hotlink Protection__

    Hotlink protection refers to restricting HTTP referrers in order to prevent others from embedding your assets on other websites. Hotlink protection will save you bandwidth by prohibiting other sites from displaying your images.

* __Infrastructure__

    Having a fast web host is equally as important as any website performance optimization you could make, as it is the backbone of your site. Stay away from cheap shared hosting.

### Optimizing performance
* __Optimizing `FP`/`FCP`__:
  * [`HTTP/2` Server Push](https://developers.google.com/web/fundamentals/performance/http2/#server_push)
  * [App Shell Pattern](https://developers.google.com/web/updates/2015/11/app-shell)

* __Optimizing `FMP`/`TTI`__:
  * Once you've identified the most critical UI elements on your page (the _hero elements_), you should ensure that your initial script load contains just the code needed to get those elements rendered and make them interactive.
  * Try as hard as possible to minimize the time between `FMP` and `TTI`.
  * One of the most frustrating experiences for a user is tapping on an element and then having nothing happen.

* __Preventing long tasks__:

  * Split up your code and prioritizing the order in which it's loaded.
  * [`requestIdleCallback`](https://developers.google.com/web/updates/2015/08/using-requestidlecallback) will schedule work when there is free time at the end of a frame, or when the user is inactive. This means that there’s an opportunity to do your work without getting in the user’s way. You can postpone analytics task.

    Scheduling non-essential work yourself is very difficult to do. It’s impossible to figure out exactly how much frame time remains

> Test with low bandwidth and high latency

### CSS

* __Avoiding the `display: none` trap__

    Does `display: none` avoid triggering a request for an image `src`?
    ```html
    <div style="display:none"><img src="img.jpg"></div>
    ```
    No. The image will be requested although it is hidden.

    Does `display: none` avoid triggering a request for a `background: url()`?
    ```html
    <div style="display:none">
        <div style="background: url(img.jpg)"></div>
    </div>
    ```
    Yes. CSS backgrounds aren’t fetched as soon as an element is parsed.

* __Caching image assets__

    Most of the images you deliver to users are static assets that will not change in the future. The best caching strategy for such assets is aggressive caching. For this, set
    ```
    Cache-Control:public; max-age=31536000
    ```

* __Preloading critical image assets__

    `<link rel=preload>` is a declarative fetch, allowing you to force the browser to make a request for a resource without blocking the document’s onload event. It enables increasing the priority of requests for resources that might otherwise not be discovered until later in the document parsing process.

    ```html
    <link rel="preload" as="image" href="logo.jpg"/>
    ```

    Image resources for `<img>`, `<picture>`, `srcset` and SVGs can all take advantage of this optimization.

* __Prefetch__

    `prefetch` informs the browser of a resource that is expected to be needed as part of a future navigation or user interaction, for example, something that might be needed later, if the user takes the action we’re expecting. These resources are fetched at the Lowest priority in Chrome, when the current page is done loading and there’s bandwidth available.
    ```html
    <link rel="prefetch" href="page-2.html">
    <link as="image" href="/images/animation.svg" rel="prefetch"> 
    ```

* __Preconnect to server__ (_Experimantal_)

    Provides a hint to the browser suggesting that it open a connection to the linked web site in advance, without disclosing any private information or downloading any content, so that when the link is followed the linked content can be fetched more quickly.

    ```html
    <link href="wss://server" rel="preconnect"> 
    <link href="stun:stun.some-domain" rel="preconnect">   
    ```

* __DNS prefetch__

    Suggests that the browser fetch the linked resource in advance, as it is likely to be requested by the user. Starting with Firefox 44, the value of the crossorigin attribute is taken into consideration, making it possible to make anonymous prefetches.

    > Note: The Link Prefetch FAQ has details on which links can be prefetched and on alternative methods.

    ```html
    <link rel="dns-prefetch" href="//example.com">
    ```

* __Prerender__ (`Experimantal`)

    Suggests that the browser fetch the linked resource in advance, and that it also render the prefetched content offscreen so it can be quickly presented to the user once needed.

    ```html
    <link rel="prerender" href="//example.com">
    ```

[Read More](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)

### PRPL
`PRPL` is a pattern that optimizes for interactivity through aggressive code-splitting and caching.

`PRPL` stands for:
* __Push__ critical resources for the initial URL route using <link preload> and http/2.
* __Render__ initial route.
* __Pre-cache__ remaining routes.
* __Lazy-load__ and create remaining routes on demand.

`PRPL` strives to optimize for:
* Minimum time-to-interactive.
  * Especially on first use (regardless of entry point).
  * Especially on real-world mobile devices.
* Maximum caching efficiency, especially over time as updates are released.
* Simplicity of development and deployment.

__App entrypoint__

The entrypoint must import and instantiate the shell, as well as conditionally load any required polyfills.

The main considerations for the entrypoint are:
* Has minimal static dependencies, in other words, not much beyond the app-shell itself.
* Conditionally loads required polyfills.
* Uses absolute paths for all dependencies.

__App shell__

The shell is responsible for routing and usually includes the main navigation UI for the app.

The app should lazy-load fragments as they're required. For example, when the user changes to a new route, it imports the fragment(s) associated with that route. This may initiate a new request to the server, or simply load the resource from the cache.

The shell (including its static dependencies) should contain everything needed for first paint.

__Bundled build__
The build process could produce a set of different bundles: one bundle for the shell, and one bundle for each fragment.

![app-build-bundles](../images/app-build-bundles.png)


[Read More about PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

### Progressive Bootstrapping
Progressive rendering and bootstraping means you send a functionally viable (though minimal) view in the HTML, including JS and CSS. As more recources arrive, the app progressively "unlocks" features.

### Resource Hints
* `preconnect` informs the browser that your page intends to establish a connection to another origin, and that you’d like the process to start as soon as possible.

    Establishing connections often involves significant time in slow networks, particularly when it comes to secure connections, as it may involve DNS lookups, redirects, and several round trips to the final server that handles the user’s request. Taking care of all this ahead of time can make your application feel much snappier to the user without negatively affecting the use of bandwidth.
    ```html
    <link rel="preconnect" href="https://cdn.example.com">
    ```

* `dns-prefetch` handles the DNS lookup only, so it’s a small subset of `preconnect`, but it’s got wider browser support, so it may serve as a nice fallback. You use it the exact same way:
    ```html
    <link rel="dns-prefetch" href="http://example.com">
    ```

### Fonts
Fonts are a great example of late-discovered resources that must be fetched, often sitting at the bottom of one of several CSS files loaded by a page.

* Preload fonts:
    ```html
    <link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">
    ```

    > Note that the use of crossorigin here is important; without this attribute, the preloaded font is ignored by the browser, and a new fetch takes place. This is because fonts are expected to be fetched anonymously by the browser, and the preload request is only made anonymous by using the crossorigin attribute.

* `font-display` property.

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

### Client Hint
Client hints are a set of opt-in _HTTP request headers_ that give us insight into these aspects of the user’s device and the network they’re connected to. This is an another method of content negotiation, which means changing content responses based on browser request headers.

___

## Optimizing JavaScript
Unlike images which only incur relatively trivial decode time once downloaded, JavaScript must be parsed, compiled, and then finally executed. Byte for byte, this makes JavaScript more expensive than other types of resources.

![js_vs_image](../images/js_vs_image.png)

### Tree shaking
Tree shaking is a form of dead code elimination.

When tree shaking, use the following Babel options:
```javascript
{
    "presets": [
        ["env", {
        "modules": false
        }]
    ]
}
```

To not let the Babel to transpile the ES6 Modules into CommonJS Modules, which are harder to tree shake.

If you run into a stubborn library that won't respond to tree shaking, look to see if it exports its methods using the ES6 syntax. If it's exporting stuff in CommonJS format (e.g., `module.exports`), that code won't be tree shakeable by webpack.

`Lodash` is a bit of a strange case in that tree shaking as it's described in this guide doesn't work. Because of how `Lodash` is architected, you have to a) install the `lodash-es` package in lieu of (вместо) regular old `lodash` and b) use a slightly different syntax (referred to as "cherry-picking") to shake off the other dependencies:
```javascript
// This still pulls in all of lodash even if everything is configured right.
import { sortBy } from "lodash";

// This will only pull in the sortBy routine.
import sortBy from "lodash-es/sortBy";
```

### Code Splitting
Modern sites often combine all of their JavaScript into a single, large bundle. When JavaScript is served this way, loading performance suffers. Large amounts of JavaScript can also tie up the main thread, delaying interactivity. This is especially true of devices with less memory and processing power.

An alternative to large bundles is code-splitting, which is where JavaScript is split into smaller chunks. This enables sending the minimal code required to provide value upfront, improving page-load times. The rest can be loaded on demand.

Code-splitting can be done in the following ways:
* __Vendor splitting__ separates vendor code (e.g., React, lodash, etc.) away from your app's code. This allows you to keep application and vendor code separate. This isolates the negative performance impacts of cache invalidation for returning users when either your vendor or app code changes. This should be done in every app.
* __Entry point splitting__ separates code by entry point(s) in your app, which are the scripts where tools like webpack and Parcel start when they build a dependency tree of your app.

    Conveniently, when there are multiple entry points, webpack treats them all as separate dependency trees, meaning that code is automatically split into named chunks like so.

    Though we've created nicely split chunks for each page, there's still a problem: There's a lot of duplicate code in each chunk. This is because webpack treats each entry point as its own dependency tree without assessing what code is shared between them.

    Here, the duplicate code comes from vendor scripts. To remedy this, we'll tell webpack to create a separate chunk for those scripts. To do this, we'll use the `optimization.splitChunks` configuration object.

    If you really want to go for the gold, though, you can eliminate most or all shared code between bundles and employ a type of splitting called "commons splitting". In the example app, this can be achieved by creating another entry under `cacheGroups`

    [Read More](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)

* __Dynamic splitting__ separates code where `dynamic import()` statements are used. This type of splitting is often best for single page applications.

    Another method is to lazy load scripts with the [`dynamic import()`](https://developers.google.com/web/updates/2017/11/dynamic-import) statement:

    ```javascript
    import("./myFancyModule.js").then(module => {
        module.default(); // Call a module's default export
    });
    ```

    Since `import()` returns a Promise, you can also use async/await:

    ```javascript
    let module = await import("./myFancyModule.js");
    module.default(); // Access a module's default export
    ```

    When this approach makes sense: You're developing a single page application with many discrete pieces of functionality that not all users may, well, use. Lazy loading this functionality can reduce JS parse/compile activity as well as bytes sent over the network.

    The most intuitive tool to use for dynamic code splitting is [Parcel](https://parceljs.org/). Without any configuration, Parcel builds a dependency tree accounting for both static and dynamic modules, and outputs scripts with names that nicely align with your inputs.

    Like Parcel, webpack can split dynamic imports to separate files. It does so with little guidance, in fact.

Use [Workbox](https://developers.google.com/web/tools/workbox/) to add service workers for your app.
