## Proxies
A proxy server is an intermediate server between the client and the back-end server. Clients connect to proxy servers to request for a service like a web page, file, connection, etc. In short, a __proxy server__ is a piece of software or hardware that acts as an intermediary for requests from clients seeking resources from other servers.

Typically, proxies are used to filter requests, log requests, or sometimes transform requests (by adding/removing headers, encrypting/decrypting, or compressing a resource).

Another advantage of a proxy server is that its cache can serve a lot of requests. If multiple clients access a particular resource, the proxy server can cache it and serve it to all the clients without going to the remote server.

### Types
* #### Open Proxy
  
  An __open proxy__ is a proxy server that is accessible by any Internet user. Generally, a proxy server only allows users within a network group (i.e. a closed proxy) to store and forward Internet services such as DNS or web pages to reduce and control the bandwidth used by the group. With an open proxy, however, any user on the Internet is able to use this forwarding service. There two famous open proxy types:

  1. __Anonymous Proxy__ - This proxy reveals its identity аs а server but does not disclose the initial IP address. Though this proxy server cаn be discovered easily іt cаn be beneficial for some users аs it hides their IP address.
  2. __Transparent Proxy__ – This proxy server again identifies itself, аnd with the support of HTTP headers, the first IP address cаn be viewed. The main benefit of using this sort of server is its ability to cache the websites.

* #### Reverse Proxy

  A reverse proxy retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself.
