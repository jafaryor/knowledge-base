## REST
Representational State Transfer (`REST`) is an architectural style that defines a set of constraints and properties based on HTTP.

Other kinds of web services, such as `SOAP` web services, expose their own arbitrary sets of operations.

__[More about REST](https://www.youtube.com/watch?v=e6h87rzeGJE)__

## HTTP Methods
The purpose of each of the HTTP request types when used with a RESTful web service is as follows:

* `GET`: Retrieves data from the server (should only retrieve data and should have no other effect).
* `POST`: Sends data to the server for a new entity. It is often used when uploading a file or submitting a completed web form.
* `PUT`: Similar to `POST`, but used to replace an existing entity.
* `PATCH`: Similar to `PUT`, but used to update only certain fields within an existing entity.
* `DELETE`: Removes data from the server.
* `TRACE`: Provides a means to test what a machine along the network path receives when a request is made. As such, it simply returns what was sent.
* `OPTIONS`: Allows a client to request information about the request methods supported by a service. The relevant response header is Allow and it simply lists the supported methods. (It can also be used to request information about the request methods supported for the server where the service resides by using a * wildcard in the URI.)
* `HEAD`: Same as the `GET` method for a resource, but returns only the response headers (i.e., with no entity-body).
* `CONNECT`: Primarily used to establish a network connection to a resource (usually via some proxy that can be requested to forward an HTTP request as TCP and maintain the connection). Once established, the response sends a 200 status code and a “Connection Established” message.

> There is a limit on the number of concurrent http connections that can happen at a time in a browser. The number depends on a browser.

> Workers also adhere to a global max number of connections per host name.