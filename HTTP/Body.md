## Body
Provides methods relating to the body of the response/request, allowing you to declare what its content type is and how it should be handled.

`Body` is implemented by both `Request` and `Response`. This provides these objects with an associated body (a stream), a used flag (initially unset), and a MIME type (initially the empty byte sequence).

__Properties:__
* `Body.body` (Read only)

    A simple getter used to expose a `ReadableStream` of the body contents.

* `Body.bodyUsed` (Read only)

    A `Boolean` that indicates whether the body has been read.

__Methods:__
* `Body.arrayBuffer()`
    
    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with an `ArrayBuffer`.

* `Body.blob()`
    
    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `Blob`.

* `Body.formData()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `FormData` object.

* `Body.json()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as `JSON`.

* `Body.text()`

    Takes a `Response` stream and reads it to completion. It returns a promise that resolves with a `USVString` (text). The response is always decoded using UTF-8.

```javascript
fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
	.then(res => res.blob())
	.then(res => {
		var objectURL = URL.createObjectURL(res);
		myImage.src = objectURL;
});
```