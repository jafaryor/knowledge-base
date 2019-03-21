## HTTP Caching
Caching is a technique that stores a copy of a given resource and serves it back
when requested. When a web cache has a requested resource in its store, it
intercepts the request and returns its copy instead of re-downloading from
the originating server. This achieves several goals: it eases the load of
the server that doesn’t need to serve all clients itself, and it improves
performance by being closer to the client, i.e., it takes less time to
transmit the resource back.

Each resource can define its caching policy via the `Cache-Control` HTTP header. `Cache-Control` directives control who can cache the response, under which conditions, and for how long.

Caching directives:
* `no-store`

  It simply disallows the browser and all intermediate caches from storing any version of the returned response—for example, one containing private personal or banking data. Every time the user requests this asset, a request is sent to the server and a full response is downloaded.

* `no-cache`

  Indicates that the returned response can't be used to satisfy a subsequent request to the same URL without first checking with the server if the response has changed.

* `public`

  It can be cached, even if it has HTTP authentication associated with it, and even when the response status code isn't normally cacheable. Most of the time, `public` isn't necessary, because explicit caching information (like `max-age`) indicates that the response is cacheable anyway.

* `private`

  These responses are typically intended for a single user, so an intermediate cache is not allowed to cache them. For example, a user's browser can cache an HTML page with private user information, but a CDN can't cache the page.

* `max-age`

    This directive specifies the maximum time in seconds that the fetched response is allowed to be reused from the time of the request.

* `must-revalidate`

    The cache must verify the status of the stale resources before using it and expired ones should not be used.

### Flow
1. When the server returns a response, it also emits a collection of HTTP headers, describing its content-type, length, caching directives, validation token, and more.

  ![http-request](../images/http-request.png)

2. Assume that 120 seconds have passed since the initial fetch and the browser has initiated a new request for the same resource. First, the browser checks the local cache and finds the previous response. Unfortunately, the browser can't use the previous response because the response has now expired. At this point, the browser could dispatch a new request and fetch the new full response. However, that’s inefficient because if the resource hasn't changed, then there's no reason to download the same information that's already in cache!

    That’s the problem that validation tokens, as specified in the `ETag` header, are designed to solve. The server generates and returns an arbitrary token, which is typically a hash or some other fingerprint of the contents of the file. The client doesn't need to know how the fingerprint is generated; it only needs to send it to the server on the next request. If the fingerprint is still the same, then the resource hasn't changed and you can skip the download.

    In the following example, the client automatically provides the ETag token in the "If-None-Match" HTTP request header. The server checks the token against the current resource. If the token hasn't changed, the server returns a "304 Not Modified" response, which tells the browser that the response it has in cache hasn't changed and can be renewed for another 120 seconds. Note that you don't have to download the response again, which saves time and bandwidth.

    ![http-cache-control](../images/http-cache-control.png)

### Defining optimal Cache-Control policy

![http-cache-decision-tree](../images/http-cache-decision-tree.png)

### Invalidating and updating cached responses
What if you want to update or invalidate a cached response? For example, suppose you've told your visitors to cache a CSS stylesheet for up to 24 hours (`max-age=86400`), but your designer has just committed an update that you'd like to make available to all users. How do you notify all the visitors who have what is now a _"stale"_ cached copy of your CSS to update their caches? You can't, at least not without changing the URL of the resource.

After the browser caches the response, the cached version is used until it's no longer fresh, as determined by max-age or expires, or until it is evicted from cache for some other reason— for example, the user clearing their browser cache. As a result, different users might end up using different versions of the file when the page is constructed: users who just fetched the resource use the new version, while users who cached an earlier (but still valid) copy use an older version of its response.

How do you get the best of both worlds: client-side caching and quick updates? You change the URL of the resource and force the user to download the new response whenever its content changes. Typically, you do this by embedding a fingerprint of the file, or a version number, in its filename—for example, `style.x234dff.css`.

__[Read More](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)__

#### [A Web Developer’s Guide to Browser Caching](https://medium.com/@codebyamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c)
