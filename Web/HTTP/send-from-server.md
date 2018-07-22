## Ways of sending value from Server to Clien
The HTTP protocol is based on a request/response pattern, which means that the server cannot push any data to the client (i.e., the server can only provide data to the client in response to a client request).

1. `Long polling` is a web application development pattern used to emulate pushing data from server to client. When the `long polling` pattern is used, the client submits a request to the server and the connection then remains active until the server is ready to send data to the client. The connection is closed only after data is sent back to the client or connection timeout occurs. The client then creates a new request when the connection is closed, thus restarting the loop.

    There are two important drawbacks that need to be considered when using `long polling`:

    * `Long polling` requests are not different from any other HTTP request and web servers handle them the same way. This means that every long poll connection will reserve server resources, potentially maxing out the number of connections the server can handle. This can lead to HTTP connection timeouts.

    * Each web browser will limit the maximum number of connections web application can make. This means that your application load time and performance may be degraded.

    * Wasting both client and server resources while processing request/response.

2. In HTML5, a useful alternative to `long polling` is using a `WebSocket`. A `WebSocket` is a protocol providing full-duplex communications channels over a single TCP connection. The `WebSocket` protocol makes possible more interaction between a browser and a web site, facilitating live content and eliminates the need for the `long polling` paradigm.

    * Benefit: Performance
    * Drawback:
    
        * Server can push message to Client only as long as client is connected to server. So if connection was lost, the client has to go and establish a new WebSocket connection again.
        * Server resource consuming.

3. Another potential answer could be `Server-sent DOM Events`. Which is method of continuously sending data from a server to the browser, rather than repeatedly requesting it. However, this HTML5 feature is not supported by IE, thus making it less attractive solution. There is a standardized HTML5 API called `EventSource`. With SSE, data is encoded as `text/event-stream` in the header.

4. `HTTP/2 Server Push`: Another standardised mechanism for pushing from server to client. These are known as "pushed responses" and the browser may cache these.

5. `HTTP Streaming`: the server is configured to hold on to a specific request from a client and keep the response open so that it can push data through it. When updates pertaining to the request are available server-side, the server sends a response through the request-response channel, and only closes the connection when explicitly told to do so. In such a manner, a client can listen for updates from the server and receive them instantly with none of the overhead associated with HTTP headers and the opening/closing of connections. It also eliminates the need for polling.

    To achieve an indefinite response, the server must respond to client requests by specifying Transfer Encoding: chunked in the header. This sets up a persistent connection from server to client and allows the server to send response data in chunks of newline-delimited strings. These chunks of data can then be received and processed on-the-fly by the client.