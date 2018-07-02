## Response
The `Response` interface of the Fetch API represents the response to a request.

You can create a new `Response` object using the `Response.Response()` constructor, but you are more likely to encounter a Response object being returned as the result of another API operation, for example a service worker `Fetchevent.respondWith`, or a simple `GlobalFetch.fetch()`.

__Constructor__
* `Response()` - creates a new `Response` object.

__Properties__
* `Response.headers` [Read only]

    Contains the `Headers` object associated with the response.

* `Response.ok` [Read only]

    Contains a boolean stating whether the response was successful (status in the range `200-299`) or not.

* `Response.redirected` [Read only]

    Indicates whether or not the response is the result of a redirect; that is, its `URL` list has more than one entry.

* `Response.status` [Read only]

    Contains the status code of the response (e.g., `200` for a `success`).

* `Response.statusText` [Read only]

    Contains the status message corresponding to the status code (e.g., `OK` for `200`).

* `Response.type` [Read only]

    Contains the type of the response (e.g., `basic`, `cors`).

* `Response.url` [Read only]

    Contains the `URL` of the response.

* `Response.useFinalURL`

    Contains a `boolean` stating whether this is the final URL of the response.

Response implements `Body`, so it also has the following properties available to it:
* `Body.body` [Read only]

    A simple getter used to expose a `ReadableStream` of the body contents.

* `Body.bodyUsed` [Read only]

    Stores a `Boolean` that declares whether the body has been used in a response yet.

__Methods:__
* `Response.clone()`
    
    Creates a clone of a `Response` object.

* `Response.error()`

    Returns a new `Response` object associated with a network error.

* `Response.redirect()`

    Creates a new response with a different `URL`.

Response implements `Body`, so it also has the following methods available to it:
* `Body.arrayBuffer()`
    
    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with an `ArrayBuffer`.

* `Body.blob()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `Blob`.

* `Body.formData()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `FormData` object.

* `Body.json()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as `JSON`.

* `Body.text()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `USVString` (text).

```javascript
fetch('flowers.jpg').then(function(response) {
  return response.blob();
}).then(function(blob) {
  var objectURL = URL.createObjectURL(blob);
  myImage.src = objectURL;
});
```