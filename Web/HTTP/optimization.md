## HTTP Optimization Techniques
* __Image Optimization__
* __Reduce HTTP Requests__

    * Inline your JavaScript (only if it is very small)
    * Using CSS Sprites
    * Reducing assets such as 3rd party plugins that make a large number of external requests
    * Don’t use 3rd party frameworks unless they are absolutely needed
    * Use less code!
    * Combining your CSS and JS files (with HTTP/2 concatenation is no longer as important)

* __Minify CSS and JavaScript__
* __Critical Path and Render Blocking Resources__
* __Reduce Latency with a Content Delivery Network (CDN)__

    Besides speeding up the delivery of your assets around the globe a CDN also can dramatically decrease your latency.

    A content delivery network (__CDN__) is a network of edge servers strategically placed across the globe with the purpose of delivering digital content to users as fast as possible.

    [Read More about CDN](https://www.keycdn.com/what-is-a-cdn)

* __TTFB__

    _Time to first byte_ (`TTFB`) is the measurement of the responsiveness of a web server. Basically it is the time it takes your browser to start receiving information after it has requested it from the server. A website’s TTFB is calculated as:

    _HTTP request time + Process request time + HTTP response time_

    By using a CDN, a fast web host, and a reliable DNS provider you can dramatically reduce your overall TTFB.

* __Avoid 301 Redirects__

    Redirects are performance killers. Avoid them whenever possible. A redirect will generate additional round trip times (RTT) and therefore quickly doubles the time that is required to load the initial HTML document before the browser even starts to load other assets.

* __Caching__

    HTTP headers such as:
    * `Cache-control`
    * `Pragma`
    * `Expires`
    * `Validators`

    If you are using KeyCDN you can add or modify the Expires and Cache-Control response header fields that are sent to the client.

* __Prefetch and Preconnect__

    Domain name prefetching is a good solution to already resolve domain names before a user actually follows a link.
    ```html
    <link rel="dns-prefetch" href="//www.example.com">
    ```

    Preconnect allows the browser to set up early connections before an HTTP request is actually sent to the server.
    ```html
    <link href='https://cdn.keycdn.com' rel='preconnect' crossorigin>
    ```

* __HTTP/2__

* __Hotlink Protection__
    
    Hotlink protection refers to restricting HTTP referrers in order to prevent others from embedding your assets on other websites. Hotlink protection will save you bandwidth by prohibiting other sites from displaying your images.

* __Enable Gzip Compression__

    Gzip is another form of compression which compresses web pages, CSS, and javascript at the server level before sending them over to the browser.

* __Infrastructure__

    Having a fast web host is equally as important as any website performance optimization you could make, as it is the backbone of your site. Stay away from cheap shared hosting.

* __Server Scaled Images__

    You should always upload your images at scale and not rely on CSS to size them down.

* __Database Optimization__
