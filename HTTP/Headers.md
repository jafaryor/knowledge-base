## Headers
The `Headers` interface of the `Fetch API` allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A `Headers` object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like `append()`. In all methods of this interface, header names are matched by case-insensitive byte sequence. 

For security reasons, some headers can only be controlled by the user agent. These headers include the [forbidden header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)  and [forbidden response header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name).

An object implementing Headers can directly be used in a `for...of` structure, instead of `entries()`: `for (var p of myHeaders)` is equivalent to `for (var p of myHeaders.entries())`.

__Constructor__
* `Headers.Headers()` - Creates a new `Headers` object.

__Methods:__
* `Headers.append()`

    Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.

* `Headers.delete()`
    
    Deletes a header from a `Headers` object.

* `Headers.entries()`

    Returns an `iterator` allowing to go through all key/value pairs contained in this object.

* `Headers.forEach()`

    Executes a provided function once for each array element.

* `Headers.get()`

    Returns a `ByteString` sequence of all the values of a header within a `Headers` object with a given name.

* `Headers.has()`

    Returns a boolean stating whether a `Headers` object contains a certain header.

* `Headers.keys()`

    Returns an `iterator` allowing you to go through all keys of the key/value pairs contained in this object.

* `Headers.set()`
    
    Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.

* `Headers.values()`

    Returns an `iterator` allowing you to go through all values of the key/value pairs contained in this object.

```javascript
var myHeaders = new Headers();

myHeaders.append('Content-Type', 'text/xml');
myHeaders.get('Content-Type') // should return 'text/xml'

var myHeaders = new Headers({
    'Content-Type': 'text/xml'
});

// or, using an array of arrays:
myHeaders = new Headers([
    ['Content-Type', 'text/xml']
]);

myHeaders.get('Content-Type') // should return 'text/xml'
```