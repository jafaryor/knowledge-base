# HTTP
Hypertext Transfer Protocol (`HTTP`) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes. HTTP follows a classical client-server model, with a client opening a connection to make a request, then waiting until it receives a response. HTTP is a stateless protocol, meaning that the server does not keep any data (state) between two requests.

Though often based on a `TCP`/`IP` layer, it can be used on any reliable transport layer; that is, a protocol that doesn't lose messages silently, such as UDP.

![http-structure](./images/http-structure.png)

![http-request-and-response](./images/http-request-and-response.png)

![uri-parts](./images/uri-parts.png)

Let's take a look at the following `URI`: `https://user:password@example.com:443/api/v1/users/get-password-by-email;param=value?key=value#about`
* `URL` (Universal Resource Location): `https://example.com`
* Schema/Protocol: `https`
* Host: `example.com`

    It indicates which Web server is being requested. Alternatively, it is possible to directly use an IP address, but because it is less convenient, it is not often used on the Web.

* `PORT`: `443`

    It indicates the technical "gate" used to access the resources on the web server. It is usually omitted if the web server uses the standard ports of the HTTP protocol (`80` for HTTP and `443` for HTTPS) to grant access to its resources. Otherwise it is mandatory.

    > __`PORT` number can be skipped in the `URI` if it is equal to `443` for `https` protocol; and `80` for `http` protocol.__

* Credentials: `user:password`
* `URN` (Universal Resource Name): `/api/v1/users/get-password-by-email`
* Parameters: `params=value`

    Parameters (`;`) are mainly used to pass a values as an array.

* Query Parameters: `key=value`
* Fragment (a.k.a hash or anchor): `#about`

    Is an anchor to another part of the resource itself. On an HTML document, for example, the browser will scroll to the point where the anchor is defined; on a video or audio document, the browser will try to go to the time the anchor represents.


Schemas of protocols:
* `data` - Data URIs
* `file` - Host-specific file names
* `ftp` - File Transfer Protocol
* `http`/`https` - Hyper text transfer protocol (Secure)
* `mailto` - Electronic mail address
* `ssh` - Secure shell
* `tel` - telephone
* `urn` - Uniform Resource Names
* `view`-source - Source code of the resource
* `ws`/`wss` - (Encrypted) WebSocket connections


### HTTP Methods
The purpose of each of the HTTP request types when used with a RESTful web service is as follows
* `GET`: Retrieves data from the server (should only retrieve data and should have no other effect).
* `POST`: Sends data to the server for a new entity. It is often used when uploading a file or submitting a completed web form.
* `PUT`: Similar to `POST`, but used to replace/update an existing entity.
* `PATCH`: Similar to `PUT`, but used to update only certain fields within an existing entity.

    > Support for `PATCH` in browsers, servers, and web application frameworks is not universal.

* `DELETE`: Removes resource from the server.
* `TRACE`: Provides a means to test what a machine along the network path receives when a request is made. As such, it simply returns what was sent.
* `OPTIONS`: Allows a client to request information about the request methods supported by a service. The relevant response header is `Allow` and it simply lists the supported methods. (It can also be used to request information about the request methods supported for the server where the service resides by using a * wildcard in the URI.)
* `HEAD`: Same as the `GET` method for a resource, but returns only the response headers (i.e., with no entity-body).
* `CONNECT`: Primarily used to establish a network connection to a resource (usually via some proxy that can be requested to forward an HTTP request as TCP and maintain the connection). Once established, the response sends a 200 status code and a “Connection Established” message.

> There is a limit on the number of concurrent http connections that can happen at a time in a browser. The number depends on a browser.

> Workers also adhere to a global max number of connections per host name.

![http-methods](./images/http-methods.png)

#### [Read More](https://restfulapi.net/http-methods/)

__WEB STACK__ - the collection of software required for Web development. At a minimum, a Web stack contains an operating system (OS), a programming language, database software and a Web server.

### Components of HTTP-based systems:
* Client: the user-agent
* The Web server
* PROXY SERVER

    Intermediate program or computer used when navigating through different networks of the Internet. They facilitate access to content on the World Wide Web. A proxy intercepts requests and serves back responses; it may forward the requests, or not (for example in the case of a cache), and it may modify it (for example changing its headers, at the boundary between two networks). Thanks to the layered design of the Web, these are hidden in the network and transport layers. HTTP is on top at the application layer.

### Basic aspects of HTTP
* HTTP is simple
* HTTP is extensible.
    
    Introduced in HTTP/1.0, HTTP headers made this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics.

* HTTP is stateless, but not sessionless.
    
    HTTP is stateless: there is no link between two requests being successively carried out on the same connection. But while the core of HTTP itself is stateless, HTTP cookies allow the use of stateful sessions. Using header extensibility, HTTP Cookies are added to the workflow, allowing session creation on each HTTP request to share the same context, or the same state.

* HTTP and connections.
    
    A connection is controlled at the transport layer, Among the two most common transport protocols on the Internet, TCP is reliable and UDP isn't. HTTP subsequently relies on the TCP standard. HTTP/1.0 opened a TCP connection for each request/response exchange, introducing two major
    flaws: opening a connection needs several round-trips of messages and therefore slow, but becomes more efficient when several messages are sent, and regularly sent: warm connections are more efficient than cold ones. In order to mitigate these flaws, HTTP/1.1 introduced pipelining (which proved difficult to implement) and persistent connections: the underlying TCP connection can be partially controlled using the Connection header. HTTP/2 went a step further by multiplexing messages
    over a single connection, helping keep the connection warm, and more efficient.

List of common features controllable with HTTP:
* Cache

    How documents are cached can be controlled by HTTP. The server can instruct proxies, and clients, what to cache and for how long. The client can instruct intermediate cache proxies to ignore the stored document.

* Relaxing the origin constraint

    To prevent snooping and other privacy invasions, Web browsers enforce strict separation between Web sites. Only pages from the same origin can access all the information of a Web page. Though such constraint is a burden to the server, HTTP headers can relax this strict separation server-side, allowing a document to become a patchwork of information sourced from different domains (there could even be security-related
    reasons to do so).

* Authentication

    Some pages may be protected so only specific users can access it. Basic authentication may be provided by HTTP, either using the WWW-Authenticate and similar headers, or by setting a specific session using HTTP cookies.

* Proxy and tunneling

    Servers and/or clients are often located on intranets and hide their true IP address to others. HTTP requests then go through proxies to cross this network barrier. Not all proxies are HTTP proxies. The SOCKS protocol, for example, operates at a lower level. Others, like ftp, can be handled by these proxies.

* Sessions

    Using HTTP cookies allows you to link requests with the state of the server. This creates sessions, despite basic HTTP being a state-less protocol. This is useful not only for e-commerce shopping baskets, but also for any site allowing user configuration of the output.

### HTTP flow
When the client wants to communicate with a server, either being the final server or an intermediate proxy, it performs the following steps:
1. Open a TCP connection: The TCP connection will be used to send a request, or several, and receive an answer. The client may open a new connection, reuse an existing connection, or open several TCP connections to the servers.
2. Send an HTTP message: HTTP messages (before HTTP/2) are human-readable. With HTTP/2, these simple messages are encapsulated in frames, making them impossible to read directly, but the principle remains the same.
3. Read the response sent by the server.
4. Close or reuse the connection for further requests.

If HTTP pipelining is activated, several requests can be sent without waiting for the first response to be fully received. HTTP pipelining has been superseded in HTTP/2 with more robust multiplexing requests within a frame.

### HTTP Messages
HTTP/1.1 and earlier HTTP messages are human-readable. In HTTP/2, these messages are embedded into a new binary structure, a frame, allowing optimizations like compression of headers
and multiplexing. There are two types of HTTP messages, requests and responses, each with its own format.

* REQUESTS

    ```http
    GET /path/to/ HTTP/1.1      -> [Request Line] - METHOD(GET) PATH(/path/to/) VERSION_OF_PROTOCOL(HTTP/1.1)
    Host: jafar.me              -> [Headers] - HEADER_START
    Accept-Language: tj         -> [Headers] - HEADERS_END
    ```

    Requests consists of the following elements:
    * An HTTP method, usually a verb like GET, POST or a noun like OPTIONS or HEAD that defines the operation the client wants to perform.
    * The path of the resource to fetch; the URL of the resource stripped from elements that are obvious from the context, for example without the protocol (http://), the domain (here jafar.me), or the TCP port (here 80).
    * The version of the HTTP protocol.
    * Optional headers that convey additional information for the servers.
    * Or a body, for some methods like POST, similar to those in responses, which contain the resource sent.

* RESPONSES

    ```http
    HTTP/1.1 200 OK                                 -> [HTTP Status Code] - VERSION_OF_PROTOCOL STATUS_CODE STATUS_MESSAGE
    Date: Sat, 09 Oct 2010 14:28:02 GMT             -> [Headers] - HEADER_START
    Server: Apache
    Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
    ETag: "51142bc1-7449-479b075b2891b"
    Accept-Ranges: bytes
    Content-Length: 29769
    Content-Type: text/html                         -> [Headers] - HEADERS_END

    <!DOCTYPE html... (here comes the 29769 bytes of the requested web page)    -> [Message Body]
    ```

    Responses consist of the following elements:
    * The version of the HTTP protocol they follow.
    * A status code, indicating if the request has been successful, or not, and why.
    * A status message, a non-authoritative short description of the status code.
    * HTTP headers, like those for requests.
    * Optionally, a body containing the fetched resource.

> Everything which goes inside "[]" is HTTP structure parts.
