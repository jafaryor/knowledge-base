## Media Element
### Fast Playback with Video Preload
<table>
  <tbody>
    <tr>
      <th></th>
      <th>
It's great...
      </th>
      <th>
But...
      </th>
    </tr>
    <tr>
      <td rowspan="3" style="white-space: nowrap">
        <strong>Video preload attribute</strong>
      </td>
      <td rowspan="3">
Simple to use for a unique file hosted on a web server.
      </td>
      <td>
Browsers may completely ignore the attribute.
      </td>
    </tr><tr>
      <td>
Resource fetching starts when the HTML document has been completely loaded and
parsed (e.g. the <code>DOMContentLoaded</code> event has fired). while the very different <code>window.onload</code> event will be fired when resource has actually been fetched.
      </td>
    </tr>
    <tr>
      <td>
MSE ignores the preload attribute on media elements because the app is responsible for
providing media to MSE.
      </td>
    </tr>
    <tr>
      <td rowspan="2" style="white-space: nowrap">
        <strong>Link preload</strong>
      </td>
      <td>
Forces the browser to make a request for a video resource without blocking
the document's <code><span>onload</span></code> event.
      </td>
      <td>
HTTP Range requests are not compatible.
      </td>
    </tr><tr>
      <td>
Compatible with MSE and file segments.
      </td>
      <td>
Should be used only for small media files (&lt;5 MB) when fetching full resources.
      </td>
    </tr>
    <tr>
      <td>
        <strong>Manual buffering</strong>
      </td>
      <td>
Full control
      </td>
      <td>
Complex error handling is the website's responsibility.
      </td>
    </tr>
  </tbody>
</table>

* __`<video preload>...</video>`__

    If the video source is a unique file hosted on a web server, you may want to use the video `preload` attribute to provide a hint to the browser as to how much information or content to preload. This means Media Source Extensions (MSE) is not compatible with `preload`.

    Resource fetching will start only when the initial HTML document has been completely loaded and parsed (e.g. the `DOMContentLoaded` event has fired) while the very different `window.onload` event will be fired when resource has actually been fetched.

    ```html
    <video id="video" preload>
        <source src="..." type="video/webm">
        <source src="..." type="video/mp4">
        <p>This browser does not support the video element.</p>
    </video>
    ```

    ![video-preload](./images/video-preload.svg)

    Setting the `preload` attribute to `metadata` indicates that the user is not expected to need the video, but that fetching its metadata (dimensions, track list, duration, and so on) is desirable. Note that starting in Chrome 64, the default value for `preload` is `metadata`. (It was `auto` previously).

    There are some caveats though. As this is just a hint, the browser may completely ignore the preload attribute. At the time of writing, here are some rules applied in Chrome:
    * In Android 4.3, Chrome forces the preload value to none due to an Android bug.
    * On a cellular connection (2G, 3G, and 4G), Chrome forces the preload value to metadata.

    > If your website contains many video resources on the same domain, I would recommend you set the `preload` value to `metadata` or define the `poster` attribute and set `preload` to `none`. That way, __you would avoid hitting the maximum number of HTTP connections to the same domain (`6` according to the HTTP 1.1 spec)__ which can hang loading of resources. Note that this may also improve page speed if videos aren't part of your core user experience.

* __`<link rel="preload">`__

    As covered in other articles, link preload is a declarative fetch that allows you to force the browser to make a request for a resource without blocking the `window.onload` event and while the page is downloading. Resources loaded via `<link rel="preload">` are stored locally in the browser, and are effectively inert until they're explicitly referenced in the DOM, JavaScript, or CSS.

    Preload is different from prefetch in that it focuses on current navigation and fetches resources with priority based on their type (script, style, font, video, audio, etc.). It should be used to warm up the browser cache for current sessions.

    ```html
    <link rel="preload" as="video" href="https://cdn.com/small-file.mp4">
    ```

    ![link-preload](./images/link-preload.svg)

    > Recommended to use this only for small media files (< 5MB).

    Link preload is not supported in every browser yet. You may want to detect its availability with the snippets below to adjust your performance metrics.
    ```javascript
    function preloadFullVideoSupported() {
        const link = document.createElement('link');
        link.as = 'video';
        return (link.as === 'video');
    }

    function preloadFirstSegmentSupported() {
        const link = document.createElement('link');
        link.as = 'fetch';
        return (link.as === 'fetch');
    }
    ```

* __Manual Buffering__

    We're not using service workers yet as the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) is also accessible from the Window object.
    ```javascript
    const videoFileUrls = [
        'bat_video_file_1.webm',
        'cow_video_file_1.webm',
        'dog_video_file_1.webm',
        'fox_video_file_1.webm',
    ];

    // Let's create a video pre-cache and store all first segments of videos inside.
    window.caches.open('video-pre-cache')
    .then(cache => Promise.all(videoFileUrls.map(videoFileUrl => fetchAndCache(videoFileUrl, cache))));

    function fetchAndCache(videoFileUrl, cache) {
        // Check first if video is in the cache.
        return cache.match(videoFileUrl)
        .then(cacheResponse => {
            // Let's return cached response if video is already in the cache.
            if (cacheResponse) {
                return cacheResponse;
            }
            // Otherwise, fetch the video from the network.
            return fetch(videoFileUrl)
            .then(networkResponse => {
                // Add the response to the cache and return network response in parallel.
                cache.put(videoFileUrl, networkResponse.clone());
                return networkResponse;
            });
        });
    }
    ```

    If `HTTP Range` is supported in the target device, you can make such to save requests the video pre-cache.
    ```javascript
    ...
    return fetch(videoFileUrl, { headers: { range: 'bytes=0-567139' } })
    .then(networkResponse => networkResponse.arrayBuffer())
    .then(data => {
        const response = new Response(data);
        // Add the response to the cache and return network response in parallel.
        cache.put(videoFileUrl, response.clone());
        return response;
    });
    ```

    When a user clicks a play button, we'll fetch the first segment of video available in the Cache API so that playback starts immediately if available. Otherwise, we'll simply fetch it from the network. Keep in mind that browsers and users may decide to clear the Cache.

    Use `MSE` to feed that first segment of video to the video element.
    ```javascript
    function onPlayButtonClick(videoFileUrl) {
        video.load(); // Used to be able to play video later.

        window.caches.open('video-pre-cache')
        .then(cache => fetchAndCache(videoFileUrl, cache)) // Defined above.
        .then(response => response.arrayBuffer())
        .then(data => {
            const mediaSource = new MediaSource();
            video.src = URL.createObjectURL(mediaSource);
            mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

            function sourceOpen() {
            URL.revokeObjectURL(video.src);

            const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp09.00.10.08"');
            sourceBuffer.appendBuffer(data);

            video.play().then(_ => {
                // TODO: Fetch the rest of the video when user starts playing video.
            });
            }
        });
    }
    ```

    Now what if you have fetched an entire video file and saved it in the Cache API. When the browser sends an HTTP Range request, you certainly don't want to bring the entire video into renderer memory as the Cache API doesn't support Range responses yet.

    So let me show how to intercept these requests and return a customized Range response from a service worker.

    ```javascript
    addEventListener('fetch', event => {
        event.respondWith(loadFromCacheOrFetch(event.request));
    });

    function loadFromCacheOrFetch(request) {
        // Search through all available caches for this request.
        return caches.match(request)
        .then(response => {

            // Fetch from network if it's not already in the cache.
            if (!response) {
            return fetch(request);
            // Note that we may want to add the response to the cache and return
            // network response in parallel as well.
            }

            // Browser sends a HTTP Range request. Let's provide one reconstructed
            // manually from the cache.
            if (request.headers.has('range')) {
            return response.blob()
            .then(data => {

                // Get start position from Range request header.
                const pos = Number(/^bytes\=(\d+)\-/g.exec(request.headers.get('range'))[1]);
                const options = {
                status: 206,
                statusText: 'Partial Content',
                headers: response.headers
                }
                const slicedResponse = new Response(data.slice(pos), options);
                slicedResponse.setHeaders('Content-Range': 'bytes ' + pos + '-' +
                    (data.size - 1) + '/' + data.size);
                slicedResponse.setHeaders('X-From-Cache': 'true');

                return slicedResponse;
            });
            }

            return response;
        }
    }
    ```

    > It is important to note that I used `response.blob()` to recreate this sliced response as this simply gives me a handle to the file ([in Chrome](https://github.com/whatwg/fetch/issues/569)) while `response.arrayBuffer()` brings the entire file into renderer memory.

    My custom `X-From-Cache` HTTP header can be used to know whether this request came from the cache or from the network.

    [Read More about Manual Buffering](https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload#manual_buffering)

[Sample Media App on GitHub](https://github.com/GoogleChrome/sample-media-pwa)

#### Advice:
* You may want to check navigator.connection.type prior to preloading. When it's set to cellular, you could prevent preloading and advise users that their mobile network operator might be charging for the bandwidth, and only start automatic playback of previously cached content.

    ```javascript
    if ('connection' in navigator) {
        if (navigator.connection.type == 'cellular') {
            // TODO: Prompt user before preloading video
        } else {
            // TODO: Preload the first segment of a video.
        }
    }
    ```

* Please take into account the battery level of users' devices before thinking about preloading a video. This will preserve battery life when the power level is low.

    ```javascript
    if ('getBattery' in navigator) {
    navigator.getBattery()
        .then(battery => {
            // If battery is charging or battery level is high enough
            if (battery.charging || battery.level > 0.15) {
            // TODO: Preload the first segment of a video.
            }
        });
    }
    ```

### Media Source Extensions API
[Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) (`MSE`) is a JavaScript API that lets you build streams for playback from segments of audio or video. Although not covered in this article, understanding `MSE` is needed if you want to embed videos in your site that do things like:
* Adaptive streaming, which is another way of saying adapting to device capabilities and network conditions
* Adaptive splicing, such as ad insertion
* Time shifting
* Control of performance and download size

You can preload the first segment of a video with `<link rel="preload">` and use it with MSE.

For the sake of simplicity, let's assume the entire video has been split into smaller files like "file_1.webm", "file_2.webm", "file_3.webm", etc. and we want to preload "file_1.webm" segment.
```html
<link rel="preload" as="fetch" href="https://cdn.com/file_1.webm">
```

Check out the [Media Session API](https://developers.google.com/web/updates/2017/02/media-session)

#### [Read More](https://developers.google.com/web/fundamentals/media/video)

#### [Ways of embedding SVG](https://vecta.io/blog/best-way-to-embed-svg/)
