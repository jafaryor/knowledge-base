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

    Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client.

3. __Cacheable__

    Responses must implicitly or explicitly, define themselves as cacheable, or not, to prevent clients reusing stale or inappropriate data in response to further requests.

4. __Layered System__

    A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way. Intermediary servers may improve system scalability by enabling load-balancing and by providing shared caches. Layers may also enforce security policies.

5. __Code on Demand (optional)__

    REST allows client functionality to be extended by downloading and executing code in the form of applets or scripts. This simplifies clients by reducing the number of features required to be pre-implemented.

#### [More about REST](https://restfulapi.net/)


## Richardson Maturity Model
This model of division of REST services to identify their maturity level – is called Richardson Maturity Model. The more a service employs Rest Naming Convention, HTTP Methods and HATEOAS (Hypermedia) technologies – more mature it shall be considered.

![richardson-maturity-model](./images/richardson-maturity-model.jpg)

* #### Level 0

    Use no REST capabilities.

* #### Level 1

    Uses URIs. These services employ many URIs but only a single HTTP verb – generally HTTP `POST`. They give each individual resource in their universe a URI. Every resource is separately identified by a unique URI.

* #### Level 2

    Uses of URIs and HTTP.

* #### Level 3

    Use all REST capabilities.


## REST Resource Naming Guide
REST APIs use Uniform Resource Identifiers (URIs) to address resources.

Practices:
* Use nouns to represent resources

    RESTful URI should refer to a resource that is a thing (noun) instead of referring to an action (verb) because nouns have properties which verbs do not have – similar to resources have attributes.

* Consistency is the key

    * Use forward slash (`/`) to indicate a hierarchical relationships

        ```
        http://api.example.com/device-management
        http://api.example.com/device-management/managed-devices
        http://api.example.com/device-management/managed-devices/{id}
        http://api.example.com/device-management/managed-devices/{id}/scripts
        ```

    * Do not use trailing forward slash (`/`) in URIs

        ```
        http://api.example.com/device-management/managed-devices/
        http://api.example.com/device-management/managed-devices 	/*This is much better version*/
        ```

    * Use hyphens (`-`) to improve the readability of URIs

        ```
        http://api.example.com/inventory-management/managed-entities/{id}/install-script-location  //More readable
        http://api.example.com/inventory-management/managedEntities/{id}/installScriptLocation  //Less readable
        ```

    * Do not use underscores (`_`)

        It’s possible to use an underscore in place of a hyphen to be used as separator – But depending on the application’s font, it’s possible that the underscore (_) character can either get partially obscured or completely hidden in some browsers or screens.

    * Use lowercase letters in URIs

    * Do not use file extenstions

        File extensions look bad and do not add any advantage. Removing them decrease the length of URIs as well. No reason to keep them.

        If you want to highlight the media type of API using file extenstion then you should rely on the media type, as communicated through the `Content-Type` header

* Never use CRUD function names in URIs

    URIs should not be used to indicate that a CRUD function is performed. URIs should be used to uniquely identify resources and not any action upon them. HTTP request methods should be used to indicate which CRUD function is performed.

    ```
    HTTP GET http://api.example.com/device-management/managed-devices/{id}  //Get device for given Id
    HTTP PUT http://api.example.com/device-management/managed-devices/{id}  //Update device for given Id
    HTTP DELETE http://api.example.com/device-management/managed-devices/{id}  //Delete device for given Id
    ```

* Use query component to filter URI collection

    ```
    http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date
    ```


## HTTP Methods
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

__Safe__ methods are HTTP methods that do not modify the resource.

__Idempotent__ means that making multiple identical requests must produce the same result every time until another API (`POST` or `PUT`) has changed the state of the resource on the server.

| Method  | Safe | Idempotent |
| --- | --- | --- |
| `CONNECT` |   |   |
| `DELETE`  |   | √ |
| `GET`     | √ | √ |
| `HEAD`    | √ | √ |
| `OPTIONS` | √ | √ |
| `POST`    |   |   |
| `PUT`     |   | √ |
| `TRACE`   | √ | √ |

#### [Read More](https://restfulapi.net/http-methods/)


## HATEOAS (Hypermedia as the Engine of Application State)
HATEOAS is a constraint of the REST application architecture that keeps the RESTful style architecture unique from most other network application architectures. The term “hypermedia” refers to any content that contains links to other forms of media such as images, movies, and text.

This architectural style lets you use hypermedia links in the response contents so that the client can dynamically navigate to the appropriate resource by traversing the hypermedia links.

There is no universally accepted format for representing links between two resources in JSON.

A REST client hits an initial API URI and _uses the server-provided links to dynamically discover available actions and access the resources it needs_. The client need not have prior knowledge of the service or the different steps involved in a workflow. Additionally, the _clients no longer have to hard code the URI structures for different resources_. This allows the server to make URI changes as the API evolves without breaking the clients.

The following are the two popular formats for specifying JSON REST API hypermedia links:
* ### RFC 5988 (web linking)

    [RFC 5988](https://tools.ietf.org/html/rfc5988) puts forward a framework for building links that defines the relation between resources on the web. Each link in RFC 5988 contains the following properties.

* ### JSON Hypermedia API Language (HAL)

    [JSON HAL](https://en.wikipedia.org/wiki/Hypertext_Application_Language) is a promising proposal that sets the conventions for expressing hypermedia controls, such as links, with JSON or XML.


## Security
#### REST Security Design Principles:
* Least Privilege

    An entity should only have the required set of permissions to perform the actions for which they are authorized, and no more. Permissions can be added as needed and should be revoked when no longer in use.

* Fail-Safe Defaults

    A user’s default access level to any resource in the system should be “denied” unless they’ve been granted a “permit” explicitly.

* Economy of Mechanism

    The design should be as simple as possible. All the component interfaces and the interactions between them should be simple enough to understand.

* Complete Mediation

    A system should validate access rights to all its resources to ensure that they’re allowed and should not rely on cached permission matrix. If the access level to a given resource is being revoked, but that isn’t reflected in the permission matrix, it would violate the security.

* Open Design

    This principle highlights the importance of building a system in an open manner—with no secret, confidential algorithms.

* Separation of Privilege

    Granting permissions to an entity should not be purely based on a single condition, a combination of conditions based on the type of resource is a better idea.

* Least Common Mechanism

    It concerns the risk of sharing state among different components. If one can corrupt the shared state, it can then corrupt all the other components that depend on it.

* Psychological Acceptability

    It states that security mechanisms should not make the resource more difficult to access than if the security mechanisms were not present. In short, security should not make worse the user experience.

#### Best Practices to Secure REST APIs
* Keep it Simple

    Secure an API/System – just how secure it needs to be. Every time you make the solution more complex “unnecessarily”, you are also likely to leave a hole.

* Always Use HTTPS

    By always using SSL, the authentication credentials can be simplified to a randomly generated access token that is delivered in the username field of HTTP Basic Auth. It’s relatively simple to use, and you get a lot of security features for free.

    If you use HTTP 2, to improve performance – you can even send multiple requests over a single connection, that way you avoid the complete TCP and SSL handshake overhead on later requests.

* Use Password Hash

    Passwords must always be hashed to protect the system (or minimize the damage) even if it is compromised in some hacking attempt. There are many such hashing algorithms which can prove really effective for password security e.g. MD5, SHA, PBKDF2, bcrypt and scrypt algorithms.

* Never expose information on URLs

    Usernames, passwords, session tokens, and API keys should not appear in the URL, as this can be captured in web server logs, which makes them easily exploitable.

    ```
    https://api.domain.com/user-management/users/{id}/someAction?apiKey=abcd123456789  //Very BAD !!
    ```

    Above URL exposes API key So, never use this form of security.

* Consider OAuth

    Though [basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication) is good enough for most of the APIs and if implemented correctly, it’s secure as well – yet you may want to consider OAuth as well. The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf.

* Consider Adding Timestamp in Request

    Along with other request parameters, you may add a request timestamp as HTTP custom header in API request. The server will compare the current timestamp to the request timestamp, and only accepts the request if it is within a reasonable timeframe (1-2 minutes, perhaps).

    This will prevent very basic replay attacks from people who are trying to brute force your system without changing this timestamp.

* Input Parameter Validation

    Validate request parameters on the very first step, before it reaches to application logic. Put strong validation checks and reject the request immediately if validation fails. In API response, send relevant error messages and example of correct input format to improve user experience.
