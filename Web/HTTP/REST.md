## REST
Representational State Transfer (`REST`) is an architectural style that defines a set of constraints and properties based on HTTP.

Other kinds of web services, such as `SOAP` web services, expose their own arbitrary sets of operations.

The six constraints are:
1. __Uniform Interface__

    The uniform interface constraint defines the interface between clients and servers. It simplifies and decouples the architecture, which enables each part to evolve independently. The four guiding principles of the uniform interface are:

    * _Resource-Based_
        
        Individual resources are identified in requests using URIs as resource identifiers. The resources themselves are conceptually separate from the representations that are returned to the client. For example, the server does not send its database, but rather, some HTML, XML or JSON that represents some database records expressed.

    * _Manipulation of Resources Through Representations_

        When a client holds a representation of a resource, including any metadata attached, it has enough information to modify or delete the resource on the server, provided it has permission to do so.

    * _Self-descriptive Messages_

        Each message includes enough information to describe how to process the message. For example, which parser to invoke may be specified by an Internet media type (previously known as a MIME type). Responses also explicitly indicate their cache-ability.

    * Hypermedia as the Engine of Application State (HATEOAS)

        Clients deliver state via body contents, query-string parameters, request headers and the requested URI (the resource name). Services deliver state to clients via body content, response codes, and response headers. This is technically referred-to as hypermedia (or hyperlinks within hypertext).

2. __Stateless__

    As `REST` is an acronym for _REpresentational State Transfer_, statelessness is key. Essentially, what this means is that the necessary state to handle the request is contained within the request itself, whether as part of the URI, query-string parameters, body, or headers. The URI uniquely identifies the resource and the body contains the state (or state change) of that resource.

3. __Cacheable__

    As on the World Wide Web, clients can cache responses. Responses must therefore, implicitly or explicitly, define themselves as cacheable, or not, to prevent clients reusing stale or inappropriate data in response to further requests.

4. __Client-Server__

    The uniform interface separates clients from servers. This separation of concerns means that, for example, clients are not concerned with data storage, which remains internal to each server, so that the portability of client code is improved. Servers are not concerned with the user interface or user state, so that servers can be simpler and more scalable. Servers and clients may also be replaced and developed independently, as long as the interface is not altered.

5. __Layered System__

    A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way. Intermediary servers may improve system scalability by enabling load-balancing and by providing shared caches. Layers may also enforce security policies.

6. __Code on Demand (optional)__

    Servers are able to temporarily extend or customize the functionality of a client by transferring logic to it that it can execute. Examples of this may include compiled components such as Java applets and client-side scripts such as JavaScript.

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