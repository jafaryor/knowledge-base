## Request
The `Request` interface of the `Fetch API` represents a resource request.

You can create a new `Request` object using the `Request.Request()` constructor, but you are more likely to encounter a `Request` object being returned as the result of another API operation, such as a service worker `FetchEvent.request`.

__Constructor__
* `Request.Request()` - creates a new Request object.

__Properties:__
* `Request.method` [Read only]
    
    Contains the request's method (`GET`, `POST`, etc.)

* `Request.url` [Read only]

    Contains the `URL` of the request.

* `Request.headers` [Read only]

    Contains the associated `Headers` object of the request.

* `Request.context` [Read only]

    Contains the context of the request (e.g., `audio`, `image`, `iframe`, etc.)

* `Request.referrer` [Read only]

    Contains the referrer of the request (e.g., `client`).

* `Request.referrerPolicy` [Read only]

    Contains the referrer policy of the request (e.g., `no-referrer`).

* `Request.mode` [Read only]

    Contains the mode of the request (e.g., `cors`, `no-cors`, `same-origin`, `navigate`.)

* `Request.credentials` [Read only]

    Contains the credentials of the request (e.g., `omit`, `same-origin`).

* `Request.redirect` [Read only]

    Contains the mode for how redirects are handled. It may be one of follow, error, or manual.

* `Request.integrity` [Read only]

    Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).

* `Request.cache` [Read only]

    Contains the cache mode of the request (e.g., `default`, `reload`, `no-cache`).

`Request` implements `Body`, so it also has the following properties available to it:
* `Body.body` [Read only]

    A simple getter used to expose a `ReadableStream` of the body contents.

* `Body.bodyUsed` [Read only]

    Stores a `Boolean` that declares whether the body has been used in a response yet.

__Methods:__
* `Request.clone()`

    Creates a copy of the current `Request` object.

`Request` implements `Body`, so it also has the following methods available to it:
* `Body.arrayBuffer()`

    Returns a promise that resolves with an `ArrayBuffer` representation of the request body.

* `Body.blob()`

    Returns a promise that resolves with a `Blob` representation of the request body.

* `Body.formData()`

    Returns a promise that resolves with a `FormData` representation of the request body.

* `Body.json()`

    Returns a promise that resolves with a `JSON` representation of the request body.

* `Body.text()`

    Returns a promise that resolves with an `USVString` (text) representation of the request body.

```javascript
const myRequest = new Request('http://localhost/flowers.jpg');

const myURL = myRequest.url;            // http://localhost/flowers.jpg
const myMethod = myRequest.method;      // GET
const myCred = myRequest.credentials;   // omit


fetch(myRequest)
  .then(response => response.blob())
  .then(blob => {
    myImage.src = URL.createObjectURL(blob);
  });


const myRequest = new Request('http://localhost/api', {method: 'POST', body: '{"foo":"bar"}'});
 
const myURL = myRequest.url; // http://localhost/api
const myMethod = myRequest.method; // POST
const myCred = myRequest.credentials; // omit
const bodyUsed = myRequest.bodyUsed; // true
```