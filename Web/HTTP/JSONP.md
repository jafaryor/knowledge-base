## JSONP
`JSONP` is used to request data from a server residing in a different domain than the client.

`JSONP` enables sharing of data bypassing `same-origin policy`. The policy disallows running JavaScript to read media DOM elements or XHR data fetched from outside the page's origin. The aggregation of the site's scheme, port number and host name identifies as its origin. Due to inherent insecurities, JSONP is being replaced by `CORS`.

In the `JSONP` usage pattern, the URL request pointed to by the src attribute in the `<script>` element returns `JSON` data, with JavaScript code (usually a function call) wrapped around it. This "wrapped payload" is then interpreted by the browser. In this way, a function that is already defined in the JavaScript environment can manipulate the `JSON` data.

Including script tags from remote servers allows the remote servers to inject any content into a website. If the remote servers have vulnerabilities that allow JavaScript injection, the page served from the original server is exposed to an increased risk. If an attacker can inject any JavaScript into the original web page, then that code can retrieve additional JavaScript from any domain, bypassing same-origin policy. The `Content Security Policy` HTTP Header lets web sites tell web browsers which domain scripts may be included from.