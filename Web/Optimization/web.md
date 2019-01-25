## Loading Performance
### Text Content:
* Text minification.
* Remote resource compression with `Gzip`.

### Graphical Content
* As a rule of thumb, use `PNG` for clip art, line drawings, or wherever you need transparency, `JPG` for photographs (as it might weight less than `PNG`), and `GIF` when you need animation.
* __Remove Image Metadata__
* __Resize Image__

    All your images should be appropriately sized for their intended use and should not rely on the browser to resize them for rendering.

* __Crop images__ to show only what's important

* __Reduce image quality__

    In most cases, you can reduce the image quality, and thus the file size, without suffering any visible quality difference.

* __Compress Images__

    `PNG` and `JPG` images can be squashed down even more using a compression tool, which reduces file size without affecting either image dimensions or visual quality.

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

    Two main types of cache headers, `cache-control` and `expires`, define the caching characteristics for your resources.

    > Tip: Don't use an expiry greater than one year; that's effectively forever on the internet and, as noted above, is the maximum value for `max-age` under `cache-control`.

__Real User Monitoring__ (`RUM`) relies on JavaScript APIs in the browser to gather statistics on how sites perform for real users. Two specific APIs measure how fast documents and resources load for users by capturing high-resolution timings which measure various phases of resource loading. These are the Network and Resource Timing APIs, and this guide will help you make sense of the data they provide.
* _Navigation Timing_ collects performance metrics for HTML documents.
* _Resource Timing_ collects performance metrics for document-dependent resources. Stuff like style sheets, scripts, images, et cetera.


[Performance Measuring Tools](https://developers.google.com/web/fundamentals/performance/speed-tools/)

### APIs used to measure the performance:
* [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) - interface is used to observe performance measurement events and be notified of new `PerformanceEntry`s as they are recorded in the browser's performance timeline.

  > This feature is available in Web Workers.

* [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) - type is a `double` and is used to store a time value. The value could be a discrete point in time or the difference in time between two discrete points in time.

> You must ensure your `PerformanceObserver` is registered in the `<head>` of your document before any stylesheets, so it runs before _First Paint_ happens.

Once you have the data for a particular performance event, you can send it to whatever analytics service (_Google Analytics_) you use to capture the metric for the current user.

The [RAIL performance model](https://developers.google.com/web/fundamentals/performance/rail) teaches us that in order for a user interface to feel smooth, it should respond within `100ms` of user input.

| The Experience | The Metric |
| - | - |
| Is it happening? | First Paint (`FP`) / First Contentful Paint (`FCP`) |
| Is it useful?	| First Meaningful Paint (`FMP`) / Hero Element Timing |
| Is it usable? |	Time to Interactive (`TTI`) |
| Is it delightful? |	Long Tasks (technically the absence of long tasks) |

![perf-metrics-load-timeline](../images/perf-metrics-load-timeline.png)

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
