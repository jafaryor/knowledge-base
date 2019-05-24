## JSONP
`JSONP` is used to request data from a server residing in a different domain than the client with `GET` request. It is a _pseudo-standard way_ to retreive data from a different domain,

`JSONP` enables sharing of data bypassing `same-origin policy`. The policy disallows running JavaScript to read media `DOM` elements or `XHR` data fetched from outside the page's origin.

The aggregation of the site's scheme, port number and host name identifies as its origin. Due to inherent insecurities, `JSONP` is being replaced by `CORS`.

`JSONP` makes sense only when used with a script element. For each new `JSONP` request, the browser must add a new `<script>` element, or reuse an existing one. The former option—adding a new script element—is done via dynamic `DOM` manipulation, and is known as _script element injection_.

After the element is injected, the browser evaluates the element, and performs an `HTTP GET` on the src `URL`, retrieving the content. Then the browser evaluates the return payload as JavaScript.

![JSONP workflow](./images/jsonp.png)
