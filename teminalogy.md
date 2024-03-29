* __BACKWARD COMPATIBILITY__

    Is a property of a system, product, or technology that allows for interoperability with an older legacy system, or with input designed for such a system, especially in telecommunications and computing.

* __LOOSE COUPLING__ & __TIGHT COUPLING__

    Coupling measures the degree to which program modules rely on other modules. Loose coupling implies each component can operate or be tested independently of other components. Tight coupling implies each component "knows" the details or inner workings of other components.

* __SERIALIZATION__ - copying structured data to or from a primitive form such as a byte stream.

* __MARSHALING__ - rule to tell compiler how the data will be represented on another environment/system.

* __MIME__ - The Multipurpose Internet Mail Extensions (MIME) type is a standardized way to indicate the nature and format of a document.

    _MIME Sniffing_ - In the absence of a MIME type, or in some other cases where a client believes they are incorrectly set, browsers may conduct MIME sniffing, which is guessing the correct MIME type by looking at the resource. Each browser performs this differently and under different circumstances. There are some security concerns with this practice, as some MIME types represent executable content and others not. Servers can block MIME sniffing by sending the X-Content-Type-Options along the Content-Type.

    [Complete list of MIME types:](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)

    * application/octet-stream - binary files
    * text/plain - textual files
    * text/css, text/html
    * image/gif, image/jpeg, image/png, image/svg+xml
    * audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav, audio/webm, audio/ogg
    * video/webm, video/ogg, application/ogg
    * multipart/form-data - content of a completed HTML Form from the browser to the server
    * multipart/byteranges - is used in the context of sending partial responses back to the browser

* __URI__ — Uniform Resource Identifier. Обозначает имя и адрес ресурса в сети. Как правило делится на
    URL и URN, поэтому URL и URN это составляющие URI. (URI = URL + URN)
    Example: http://handynotes.ru/2009/09/uri-url-urn.html

* __URL__ (Uniform Resource Locator) -  Адрес некоторого ресурса в веб. URL определяет местонахождение
    ресурса и способ обращения к нему. (URI = URL)
    Example: http://handynotes.ru

* __URN__ (Unifrorm Resource Name) - identifies a resource by name in a particular namespace.
    Example: /2009/09/uri-url-urn.html

* In telecommunications, the round-trip delay time (__RTD__) or round-trip time (__RTT__) is the length of time it takes for a signal to be sent plus the length of time it takes for an acknowledgment of that signal to be received. In the context of computer networks, the signal is generally a data packet, and the RTT is also known as the ping time. An internet user can determine the RTT by using the ping command.

* __Head-of-line blocking__ (HOL blocking) in computer networking is a performance-limiting phenomenon that occurs when a line of packets is held up by the first packet. Examples include input buffered network switches, out-of-order delivery and multiple requests in HTTP pipelining.

* Data buffer (or just __BUFFER__) is a region of a physical memory storage used to temporarily store data while it is being moved from one place to another.

* __LATENCY__ - the time it takes for a certain operation to complete in a system. Most often this measure is a time duration, like milliseconds or seconds.

* __THROUGHPUT__ - the number of operations that a system can handle properly per time unit. For instance the throughput of a server can often be measured in requests per second (RPS or QPS).

    In the context of network, throughput is the number of data packets being successfully sent per second, and latency is the actual time those packets are taking to get there.

* __Hot Spot__ - when distributing a workload across a set of servers, that workload might be spread unevenly. This can happen if your sharding key or your hashing function are suboptimal, or if your workload is naturally skewed: some servers will receive a lot more traffic than others, thus creating a "hot spot".

* __CANONICAL URL__ - allows you to tell search engines that certain similar URLs are actually one and the same. Sometimes you have products or content that is accessible under multiple URLs, or even on multiple websites. Using a canonical URL (an HTML link tag with attribute `rel=canonical`) these can exist without harming your rankings.

* __WEBMASTER__ (from web and master),[1] is a person responsible for maintaining one or many websites.

* decision-to-decision path, or __DD-path__, is a path of execution (usually through a flow graph representing a program, such as a flow chart) between two decisions.

* __Obfuscation__ is the process of going through all of your class names in both the html and css, and converting something like ‘.header__nav — fixed’ into ‘.a_123’ which can help you squeeze some more bytes out of your rendering path.

* __in-place algorithm__ - an algorithm which transforms input using no auxiliary data structure. _In-place algorithm_ updates input sequence only through replacement or swapping of elements. An algorithm which is not in-place is sometimes called __not-in-place__ or __out-of-place__.

* __Sorting stability__ means that records with the same key retain their relative order before and after the sort.

    Stable Sorting Algorithms:
    * Insertion Sort
    * Merge Sort
    * Bubble Sort
    * Tim Sort

    Unstable Sorting Algorithms:
    * Heap Sort
    * Selection sort
    * Shell sort
    * Quick Sort

* __Separation of Concerns (SoC)__ is a design principle for separating a computer program into distinct sections, such that each section addresses a separate concern. A _concern_ is a set of information that affects the code of a computer program.

* __concern__ is a particular set of information that has an effect on the code of a computer program.

* __cross-cutting concerns__ are aspects of a program that affect other concerns.

* __aspect__ of a program is a feature linked to many other parts of the program, but which is not related to the program's primary function.

* __deterministic algorithm__ is an algorithm which, given a particular input, will always produce the same output, with the underlying machine always passing through the same sequence of states.

* The term __idempotent__ is used more comprehensively to describe an operation that will produce the same results if executed once or multiple times

* __mixin__ - a class or interface in which some or all of its methods and/or properties are unimplemented, requiring that another class or interface provide the missing implementations.

* __Syntax__ is the concept that concerns itself only whether or not the sentence is valid for the grammar of the language. Syntax is about the structure or the grammar of the language. It answers the question: how do I construct a valid sentence?

* __Semantics__ is the concept that concerns whether or not the sentence has a valid meaning. Semantics is about the meaning of the sentence. It answers the questions: is this sentence valid? If so, what does the sentence mean?

* __Edge Case__ occurs at an extreme (maximum or minimum) operating parameter.

* __Corner Case__ - occurs outside of normal operating parameters, specifically when multiple environmental variables or conditions are simultaneously at extreme levels, even though each parameter is within the specified range for that parameter.

* __Boundary Case__ - occurs when one of inputs is at or just beyond maximum or minimum limits.

* __Sanitization__ is the removal of malicious data from user input, such as form submissions.

* __Distributed Networking__ - a distributed computing network system, where the computer programming and the data to be worked on are spread out across more than one computer.

* In networking, __black holes__ refer to places in the network where incoming or outgoing traffic is silently discarded (or "dropped"), without informing the source that the data did not reach its intended recipient.

* In cryptography, a __nonce__ is an arbitrary number that can be used just once. It is similar in spirit to a nonce word, hence the name. It is often a random or pseudo-random number issued in an authentication protocol to ensure that old communications cannot be reused in replay attacks.

* Single instruction, multiple data (__SIMD__) -  is a class of parallel computers. It describes computers with multiple processing elements that perform the same operation on multiple data points simultaneously.

* __Dead Code Elimination__ (also known as __DCE__, dead code removal, dead code stripping, or dead code strip) is a compiler optimization to remove code which does not affect the program results.

* __Emulators__ focus on recreating the behavior of a system, with no regard for how the system functions internally. __Simulators__ focus on modeling the components of a system.

* __lie-fi__ - When your phone or tablet indicates that you are connected to a wireless network, however you are still unable to load webpages or use any internet services with your device.

* A content delivery network (__CDN__) refers to a geographically distributed group of servers which work together to provide fast delivery of Internet content.

* Browser __fingerprinting__ is the capability of a site to identify or
re-identify a visiting user, user agent or device via configuration settings or
other observable characteristics

* __heuristic__ is a technique designed for solving a problem more quickly when classic methods are too slow, or for finding an approximate solution when classic methods fail to find any exact solution. The objective of a heuristic is to produce a solution in a reasonable time frame that is good enough for solving the problem at hand.

* __Communication__: The exchange of ideas and information

* __Cooperation__: Independent goals with agreements not to interfere with each other.

* __Coordination__: Actions of users directed by a coordinator to achieve a common goal.

* __Collaboration__: The process of shared creation; collectively creating something new that could not have been created by the individual users.

* __Web Server vs Application Server__

    The _Web server_'s main job is to display the site content and the _application server_ is in charge of the logic, the interaction between the user and the displayed content. The application server is working in conjunction with the web server, where one displays and the other one interacts.

* __DTO (Data Transfer Object)__

    Data transfer object is an object that defines how data will be sent over the network. They are also used for validation and type checking.

* __Socket__

    A network socket is a software structure within a network node of a computer network that serves as an endpoint for sending and receiving data across the network. A socket is created by concatenating the __IP__ number of a system and a software __port__ number (not a ​hardware port number). While port is bound to a process. It means socket refers to a process in a machine specified by its IP.

* __Stub__

    Stub is an object that holds predefined data and uses it to answer calls during tests. Such as: an object that needs to grab some data from the database to respond to a method call.

* __Mocks__

    Mocks are objects that register calls they receive. In test assertion, we can verify on Mocks that all expected actions were performed. Such as: a functionality that calls e-mail sending service.

* __CAPEX__ - Capital expenditures are major investments over assets that are held for a long time.

* __OPEX__ - Operational Expenditures are day-to-day expenses that keep the company running.

* __Serialization__ - is the process of translating data into a format that can be transmitted or stored elsewhere. Later, reconstruction or deserialization of the data should be possible.

* __Cold storages__ - are low-cost storages where archived data is kept. It is done to save money on storage charges and to migrate data that isn’t used frequently.
