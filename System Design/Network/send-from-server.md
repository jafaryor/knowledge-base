## Ways of sending value from Server to Client
The HTTP protocol is based on a request/response pattern, which means that the server cannot push any data to the client (i.e., the server can only provide data to the client in response to a client request).

1. __`Polling`__ - is the act (not technology) of fetching a resource or piece of data regularly at an interval to make sure your data is not too stale.

    1. The client opens a connection and requests data from the server using regular HTTP.
    2. The requested webpage sends requests to the server at regular intervals (e.g., 0.5 seconds).
    3. The server calculates the response and sends it back, just like regular HTTP traffic.
    4. The client repeats the above three steps periodically to get updates from the server.

    The problem with Polling is that the client has to keep asking the server for any new data. As a result, a lot of responses are empty, creating HTTP overhead.

2. __`Long polling`__ - is a variation of the traditional polling technique that allows the server to push information to a client whenever the data is available.

   With Long-Polling, the client requests information from the server exactly as in normal polling, but with the expectation that the server may not respond immediately. That’s why this technique is sometimes referred to as a _“Hanging GET”_.

   * If the server does not have any data available for the client, instead of sending an empty response, the server holds the request and waits until some data becomes available.
   * Once the data becomes available, a full response is sent to the client. The client then immediately re-request information from the server so that the server will almost always have an available waiting request that it can use to deliver data in response to an event.

   However, it can be a challenge for the server to manage unfulfilled client requests and handle new information that becomes available before the client has made a new request.

    The basic life cycle of an application using HTTP Long-Polling is as follows:
    1. The client makes an initial request using regular HTTP and then waits for a response.
    2. The server delays its response until an update is available or a timeout has occurred.
    3. When an update is available, the server sends a full response to the client.
    4. The client typically sends a new long-poll request, either immediately upon receiving a response or after a pause to allow an acceptable latency period.
    5. Each Long-Poll request has a timeout. The client has to reconnect periodically after the connection is closed due to timeouts.

    Long Polling is a more efficient version of traditional polling because it reduces the number of requests that need to be made to the server.

    There are two important drawbacks that need to be considered when using `long polling`:

    * `Long polling` requests are not different from any other HTTP request and web servers handle them the same way. This means that every long poll connection will reserve server resources, potentially maxing out the number of connections the server can handle. This can lead to HTTP connection timeouts.
    * Each web browser will limit the maximum number of connections web application can make. This means that your application load time and performance may be degraded.
    * Wasting both client and server resources while processing request/response.

    > Browsers limit the number of HTTP connections with the same domain name. This restriction is defined in the HTTP specification (RFC2616). Most modern browsers allow __6__ connections per domain.

3. `WebSocket` - is a protocol providing full-duplex communications channels over a single TCP connection. It provides a persistent connection between a client and a server that both parties can use to start sending data at any time.

    Web sockets and HTTP differ significantly, but both protocols depend on TCP at layer 4 (transport layer) in the OSI model and are located at layer 7 (application layer).

    Web socket protocol mitigates the overhead associated with HTTP by enabling communication between a client and a server with low-weight overheads, aiming to provide real-time data transfer across the channel.

    It maintains a long-held single TCP socket connection between the client and the server to enable the bi-directional messages to be distributed efficiently, providing a latency-free connection.

    Previously it used to support only strings, but now in the latest spec, it can send even the binary messages using `Blob` or `ArrayBuffer` object.

    The client establishes a WebSocket connection through a process known as the WebSocket handshake. This process starts with the client sending a regular HTTP request to the server. An `Upgrade` header is included in this request that informs the server that the client wishes to establish a WebSocket connection.

    > Note: WebSocket URLs use the `ws` scheme. There is also `wss` for secure WebSocket connections which is the equivalent of HTTPS.

    Application: live chat, multi-player game, online maps, live results ...

4. __`Server-Sent Events` (SSEs)__ - is a type of server push technology that establishes a long-lasting connection between the client and the server. It allows the server to automatically send updates to the client via an HTTP connection, using a single directional channel for data delivery.

    To receive these updates, the client uses a JavaScript API called `EventSource`. SSE is designed to improve cross-browser streaming capabilities by establishing a unidirectional connection to send continuous data streams and updates to the client.

    In the context of Server-Sent Events, if the client loses the connection to the event source, it will try to reconnect by sending the ID of the last event received to the server via a new HTTP request, using the `Last-Event-ID` header. The server will then listen for this request and start sending events that have occurred since the supplied ID. This allows the client to catch up on any missed events and helps to ensure the reliability of the event stream.

    Server Sent Events are real-time events that are emitted by the server and received by the browser. To establish communication between the client and server, the client creates a new JavaScript `EventSource` object and passes the `URL` of the endpoint that is expected to return a stream of events. The `EventSource` interface connects to the server over HTTP and receives events in an _`text/event-stream`_ format. Whenever the server writes an event to the HTTP response, the client receives it and processes it in a listener callback function. The HTTP response connection remains open until it is considered stale or until the client closes it.

    > It is worth noting that there is a limit to the number of Server-Sent Events connections that can be active at any given time. Most browsers are limited to __6__ SSE connections.

    Server-Sent Events are useful for delivering fast updates and have a low overhead in their implementation. They are well-suited for systems that require real-time, one-way data flow and are commonly used in the news feeds of social media platforms like Twitter, Instagram, and Facebook. They are also useful for updating stock price charts and providing live sports updates.

5. __`HTTP/2 Server Push`__ - is a performance technique aimed at reducing latency by loading resources even before the client knows they will be needed.

    Let’s say you have a website where all pages rely on styles defined in an external style sheet named `styles.css`. When the user requests `index.html` from the server, we can push `styles.css` to the user just after we begin sending the response for `index.html`.

    Rather than waiting for the server to send `index.html` and then waiting for the browser to request and receive `styles.css`, the user only has to wait for the server to respond with both `index.html` and `styles.css` on the initial request. This means that the browser can begin rendering the page faster than if it had to wait.

6. __`Streaming`:__ - is act of continuously getting a feed of information from a server by keeping an open connection between the two machines or processes.

    The HTTP streaming mechanism keeps a request open indefinitely. It never terminates the request or closes the connection, even after the server pushes data to the client. This mechanism significantly reduces the network latency because the client and the server do not need to open and close the connection.

    The basic life cycle of an application using HTTP streaming is as follows:
    1. The client makes an initial request and then waits for a response.
    2. The server defers the response to a poll request until an update is available, or until a particular status or timeout has occurred.
    3. Whenever an update is available, the server sends it back to the client as a part of the response.
    4. The data sent by the server does not terminate the request or the connection. The server returns to step 3.

    The HTTP streaming mechanism is based on the capability of the server to send several pieces of information in the same response, without terminating the request or the connection.

    To achieve an indefinite response, the server must respond to client requests by specifying `Transfer Encoding: chunked` and omitting `Content-Length` in the header. This sets up a persistent connection from server to client and allows the server to send response data in chunks of newline-delimited strings. These chunks of data can then be received and processed on-the-fly by the client.

    Streaming involves breaking a resource that you want to receive over a network down into small chunks, then processing it bit by bit. This is something browsers do anyway when receiving assets to be shown on webpages — videos buffer and more is gradually available to play, and sometimes you'll see images display gradually as more is loaded.
