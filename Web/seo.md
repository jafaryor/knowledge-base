## Search Optimization
### Give your site a URL structure
There are several ways to serve content to different devices. The three most common methods are:
* Responsive web design: serves the same HTML from one URL and uses CSS media queries to determine how the content is rendered on the client side. For example, Desktop and Mobile: http://www.example.com/
* Separate mobile site: redirects users to a different URL depending on the user-agent. For example, Desktop: http://www.example.com/ Mobile: http://m.example.com/
* Dynamic serving: serves different HTML from one URL depending on the user- agent. For example, Desktop and Mobile: http://www.example.com/

> Responsive web deisgn is recommended.

The benefits of making your website responsive are:
* Friendlier for user sharing.
* Quicker page load without redirects.
* Single URL for search results.

### Use `link[rel=canonical]` and `link[rel=alternate]` when serving separate URLs
* #### Use `alternate` for desktop

    When serving the desktop version, indicate that there's a mobile version on another URL by adding a link tag with a `rel="alternate"`
    ```html
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    ```

* #### Use `canonical` for mobile

    When serving the mobile version, indicate that there's a desktop (canonical) version on another URL by adding a `link` tag with a `rel="canonical"` attribute that points to the desktop version in the `href` attribute.
    ```html
    <link rel="canonical" href="http://www.example.com/">
    ```

![different_url-2x](../images/different_url-2x.png)

### Use the Vary HTTP header
Serving different HTML based on device type reduces unnecessary redirects, serves optimized HTML, and provides single URL for search engines. It also has several disadvantages:
* There may be intermediate proxies between a user's browsers and the server. Unless the proxy knows that the content varies depending on user agent, it may serve unexpected results.
* Changing contents depending on user agent risks being considered "cloaking", which is a violation of Google’s Webmaster Guidelines.

To indicate that the URL serves different HTML depending on user agent, provide a `Vary: User-Agent` in the HTTP header. This allows search indexing to treat desktop and mobile versions separately, and intermediate proxies to cache those contents gracefully.

### The difference between "crawl" and "index"
__Crawling__ - is when a search engine bot fetches your web page to analyze its content. The content is stored in the search engine's database and can be used to populate search result details, rank pages, and discover new pages by following links.

__Indexing__ - is when a search engine stores a website's URL and any associated information in its database so it is ready to serve as a search result.

You can use a text file called `robots.txt` to control how well-behaved crawlers access your web page. `robots.txt` is a simple text file describing how you want search bots to crawl your site.

Place `robots.txt` at the root directory of your website's host. If the domain has different schema, subdomains, or other ports, they are considered different hosts and should have robots.txt for each of their root directories.

To indicate you don't want an HTML page to be indexed, use a specific kind of `<meta>` tag
```html
<meta name="robots" content="noindex" />
```

To indicate that you don't want resources such as images, stylesheets, or script files to be indexed, add `X-Robots-Tag: noindex` in an HTTP header.
```
HTTP/1.1 200 OK
X-Robots-Tag: noindex
Content-Type: text/html; charset=UTF-8
```

[__Read More__](https://developers.google.com/web/fundamentals/discovery/search-optimization/)
