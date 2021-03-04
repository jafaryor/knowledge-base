## Ways of sending value from Server to Client
The HTTP protocol is based on a request/response pattern, which means that the server cannot push any data to the client (i.e., the server can only provide data to the client in response to a client request).

1. __Ajax Polling__ is a standard technique used by the vast majority of AJAX applications. The basic idea is that the client repeatedly polls (or requests) a server for data. The client makes a request and waits for the server to respond with data. If no data is available, an empty response is returned.

    1. The client opens a connection and requests data from the server using regular HTTP.
    2. The requested webpage sends requests to the server at regular intervals (e.g., 0.5 seconds).
    3. The server calculates the response and sends it back, just like regular HTTP traffic.
    4. The client repeats the above three steps periodically to get updates from the server.

    The problem with Polling is that the client has to keep asking the server for any new data. As a result, a lot of responses are empty, creating HTTP overhead.

2. __`Long polling`__ is a web application development pattern used to emulate pushing data from server to client. This is a variation of the traditional polling technique that allows the server to push information to a client whenever the data is available.

   With Long-Polling, the client requests information from the server exactly as in normal polling, but with the expectation that the server may not respond immediately. That’s why this technique is sometimes referred to as a _“Hanging GET”_.

   * If the server does not have any data available for the client, instead of sending an empty response, the server holds the request and waits until some data becomes available.
   * Once the data becomes available, a full response is sent to the client. The client then immediately re-request information from the server so that the server will almost always have an available waiting request that it can use to deliver data in response to an event.

    The basic life cycle of an application using HTTP Long-Polling is as follows:
    1. The client makes an initial request using regular HTTP and then waits for a response.
    2. The server delays its response until an update is available or a timeout has occurred.
    3. When an update is available, the server sends a full response to the client.
    4. The client typically sends a new long-poll request, either immediately upon receiving a response or after a pause to allow an acceptable latency period.
    5. Each Long-Poll request has a timeout. The client has to reconnect periodically after the connection is closed due to timeouts.

    There are two important drawbacks that need to be considered when using `long polling`:

    * `Long polling` requests are not different from any other HTTP request and web servers handle them the same way. This means that every long poll connection will reserve server resources, potentially maxing out the number of connections the server can handle. This can lead to HTTP connection timeouts.

    * Each web browser will limit the maximum number of connections web application can make. This means that your application load time and performance may be degraded.

    * Wasting both client and server resources while processing request/response.

3. A `WebSocket` is a protocol providing full-duplex communications channels over a single TCP connection. It provides a persistent connection between a client and a server that both parties can use to start sending data at any time. The client establishes a WebSocket connection through a process known as the WebSocket handshake. If the process succeeds, then the server and client can exchange data in both directions at any time. The WebSocket protocol enables communication between a client and a server with lower overheads, facilitating real-time data transfer from and to the server. This is made possible by providing a standardized way for the server to send content to the browser without being asked by the client and allowing for messages to be passed back and forth while keeping the connection open.In this way, a two-way (bi-directional) ongoing conversation can take place between a client and a server.

    * Benefit: Performance
    * Drawback:

        * Server can push message to Client only as long as client is connected to server. So if connection was lost, the client has to go and establish a new WebSocket connection again.
        * Server resource consuming.

4. __`Server-Sent Events` (SSEs)__ is method of continuously sending data from a server to the browser, rather than repeatedly requesting it.

   Under SSEs the client establishes a persistent and long-term connection with the server. The server uses this connection to send data to a client. If the client wants to send data to the server, it would require the use of another technology/protocol to do so.
   1. Client requests data from a server using regular HTTP.
   2. The requested webpage opens a connection to the server.
   3. The server sends the data to the client whenever there’s new information available.

    SSEs are best when we need real-time traffic from the server to the client or if the server is generating data in a loop and will be sending multiple events to the client.

   However, this HTML5 feature is not supported by IE, thus making it less attractive solution. There is a standardized HTML5 API called `EventSource`. With SSE, data is encoded as `text/event-stream` in the header.

5. __`HTTP/2 Server Push`__: Another standardised mechanism for pushing from server to client. These are known as "pushed responses" and the browser may cache these.

6. __`HTTP Streaming`__: the server is configured to hold on to a specific request from a client and keep the response open so that it can push data through it. When updates pertaining to the request are available server-side, the server sends a response through the request-response channel, and only closes the connection when explicitly told to do so. In such a manner, a client can listen for updates from the server and receive them instantly with none of the overhead associated with HTTP headers and the opening/closing of connections. It also eliminates the need for polling.

    To achieve an indefinite response, the server must respond to client requests by specifying Transfer Encoding: chunked in the header. This sets up a persistent connection from server to client and allows the server to send response data in chunks of newline-delimited strings. These chunks of data can then be received and processed on-the-fly by the client.
