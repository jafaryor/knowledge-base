## HTTP 2
`HTTP1.1` was limited to processing only one outstanding request per `TCP` connection, forcing browsers to use multiple `TCP` connections to process multiple requests simultaneously.

However, using too many TCP connections in parallel leads to TCP congestion that causes unfair monopolization of network resources. Web browsers using multiple connections to process additional requests occupy a greater share of the available network resources, hence downgrading network performance for other users.

The internet industry was naturally forced to hack these constraints with practices such as __domain sharding__, __concatenation__, __data inlining__ and __spriting__, among others.

`HTTP/2` provides decreased latency to improve page load speed by supporting:
* ### Multiplexed streams

    Loading of page elements in parallel over a single `TCP` connection

    Bi-directional sequence of text format frames sent over the HTTP/2 protocol exchanged between the server and client are known as `streams`. Earlier iterations of the HTTP protocol were capable of transmitting only one stream at a time along with some time delay between each stream transmission.

    Binary frame formats enable the exchange of multiple, concurrently open, independent bi-directional sequences without latency between successive `streams`. This approach presents an array of benefits of HTTP/2 explained below:
    * The parallel multiplexed requests and response do not block each other.
    * A single TCP connection is used to ensure effective network resource utilization despite transmitting multiple data `streams`.
    * No need to apply unnecessary optimization hacks – such as image sprites, concatenation and domain sharding, among others – that compromise other areas of network performance.
    * Reduced latency, faster web performance, better SEO rankings.
    * Reduced OpEx and CapEx in running network and IT resources.

* ### HTTP/2 Server Push

    This capability allows the server to send additional cacheable information to the client that isn’t requested but is anticipated in future requests. For example, if the client requests for the resource X and it is understood that the resource Y is referenced with the requested file, the server can choose to push Y along with X instead of waiting for an appropriate client request.

    The client places the pushed resource Y into its cache for future use. This mechanism saves a request-respond round trip and reduces network latency. The client must explicitly allow the server to Push cacheable resources with HTTP/2 or terminate pushed streams with a specific stream identifier.

    HTTP/2 implementation presents significant performance for pushed resources, with other benefits of HTTP/2 explained below:
    * The client saves pushed resources in the cache.
    * The client can reuse these cached resources across different pages.
    * The server can multiplex pushed resources along with originally requested information within the same TCP connection.
    * The server can prioritize pushed resources – a key performance differentiator in HTTP/2 vs HTTP1.
    * The client can decline pushed resources to maintain an effective repository of cached resources or disable Server Push entirely.
    * The client can also limit the number of pushed streams multiplexed concurrently.

    The HTTP/2 multiplexes and prioritizes the pushed data stream to ensure better transmission performance as seen with other request-response data streams. As a built-in security mechanism, the server must be authorized to Push the resources beforehand.

* ### Binary Protocols

    ![binary-protocols](./images/binary-protocols.png)

    Benefits:
    * Low overhead in parsing data – a critical value proposition in HTTP/2 vs HTTP1.
    * Less prone to errors.
    * Lighter network footprint.
    * Effective network resource utilization.
    * Eliminating security concerns associated with the textual nature of HTTP1.x such as response splitting attacks.
    * Enables other capabilities of the HTTP/2 including compression, multiplexing, prioritization, flow control and effective handling of TLS.
    * Compact representation of commands for easier processing and implementation.
    * Efficient and robust in terms of processing of data between client and server.
    * Reduced network latency and improved throughput.

* ### Stream prioritization

    HTTP/2 implementation allows the client to provide preference to particular data streams. Although the server is not bound to follow these instructions from the client, the mechanism allows the server to optimize network resource allocation based on end-user requirements.

    Stream prioritization works with Dependencies and Weight assigned to each stream. Although all streams are inherently dependent on each other except, the dependent streams are also assigned weight between `1` and `256`.

    Benefits:
    * Effective network resource utilization.
    * Reduced time to deliver primary content requests.
    * Improved page load speed and end-user experience.
    * Optimized data communication between client and server.
    * Reduced negative effect of network latency concerns.

* ### Stateful Header Compression

    Data compression of `HTTP` headers.

    ![http2-hpack-compression](./images/http2-hpack-compression.png)

    Benefits:
    * Effective stream prioritization.
    * Effective utilization of multiplexing mechanisms.
    * Reduced resource overhead – one of the earliest areas of concerns in debates on HTTP/2 vs HTTP1 and HTTP/2 vs SPDY.
    * Encodes large headers as well as commonly used headers which eliminates the need to send the entire header frame itself. The individual transfer size of each data stream shrinks rapidly.
    * Not vulnerable to security attacks such as CRIME exploiting data streams with compressed headers.

* It’s backwards compatible with `HTTP/1.1`
* It is slower than `HTTP/1.1` with common front-end practices, e.g.
sprites, file concatenation, etc.

An important operational benefit of `HTTP/2` is that it avoids the head-of-line blocking problem in `HTTP 1`.

`Head-of-line blocking` (`HOL` blocking) in computer networking is a performance-limiting phenomenon that occurs when a line of packets is held up by the first packet

The HTTP/2 browser support includes `HTTPS` encryption and actually complements the overall security performance of `HTTPS` deployments. Features such as fewer TLS handshakes, low resource consumption on both client and server sides and improved capabilities in reusing existing web sessions while eliminating vulnerabilities associated with HTTP1.x present HTTP/2 as a key enabler to secure digital communication in sensitive network environments.

`MIME` is an acronym for __Multi-purpose Internet Mail Extensions__. It is used as a standard way of classifying file types over the Internet.

Web servers and browsers have a defined list of `MIME` types, which facilitates transfer of files of a known type, irrespective of operating system or browser.

A `MIME` type actually has two parts: a type and a subtype that are separated by a slash (`/`). For example, the `MIME` type for Microsoft Word files is `application/msword` (i.e., type is `application` and the subtype is `msword`).

### Resources

__[More about HTTP/2](https://kinsta.com/learn/what-is-http2/#)__

__[HTTP/2 Migration Instruction](https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/)__

__[HTTP/2 Frequently Asked Questions](https://http2.github.io/faq/)__

__[Read More](https://developers.google.com/web/fundamentals/performance/http2/)__