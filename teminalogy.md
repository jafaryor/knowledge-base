* __BACKWARD COMPATIBILITY__:
    is a property of a system, product, or technology that allows for interoperability
    with an older legacy system, or with input designed for such a system, especially
    in telecommunications and computing.

* __LOOSE COUPLING__ & __TIGHT COUPLING__:
    Coupling measures the degree to which program modules rely on other modules.
    Loose coupling implies each component can operate or be tested independently of other
    components. Tight coupling implies each component "knows" the details or inner
    workings of other components.

* __SERIALIZATION__ - copying structured data to or from a primitive form such as a byte stream.

* __MARSHALING__ - rule to tell compiler how the data will be represented on another environment/system.

* __MIME__ - The Multipurpose Internet Mail Extensions (MIME) type is a standardized way to indicate the
    nature and format of a document.
    MIME Sniffing - In the absence of a MIME type, or in some other cases where a client
    believes they are incorrectly set, browsers may conduct MIME sniffing, which is guessing
    the correct MIME type by looking at the resource. Each browser performs this differently and
    under different circumstances. There are some security concerns with this practice, as some
    MIME types represent executable content and others not. Servers can block MIME sniffing
    by sending the X-Content-Type-Options along the Content-Type.
    Complete list of MIME types:
        https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
    application/octet-stream - binary files
    text/plain - textual files
    text/css, text/html
    image/gif, image/jpeg, image/png, image/svg+xml
    audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav, audio/webm, audio/ogg
    video/webm, video/ogg, application/ogg
    multipart/form-data - content of a completed HTML Form from the browser to the server
    multipart/byteranges - is used in the context of sending partial responses back to the browser

* __URI__ — Uniform Resource Identifier. Обозначает имя и адрес ресурса в сети. Как правило делится на
    URL и URN, поэтому URL и URN это составляющие URI. (URI = URL + URN)
    Example: http://handynotes.ru/2009/09/uri-url-urn.html

* __URL__ (Uniform Resource Locator) -  Адрес некоторого ресурса в веб. URL определяет местонахождение
    ресурса и способ обращения к нему. (URI = URL)
    Example: http://handynotes.ru

* __URN__ (Unifrorm Resource Name) - identifies a resource by name in a particular namespace. (URI = URN)
    Example: /2009/09/uri-url-urn.html

* In telecommunications, the round-trip delay time (__RTD__) or round-trip time (__RTT__) is the length of time
    it takes for a signal to be sent plus the length of time it takes for an acknowledgment of that
    signal to be received.
    In the context of computer networks, the signal is generally a data packet, and the RTT is also
    known as the ping time. An internet user can determine the RTT by using the ping command.

* __Head-of-line blocking__ (HOL blocking) in computer networking is a performance-limiting phenomenon that
    occurs when a line of packets is held up by the first packet. Examples include input buffered network
    switches, out-of-order delivery and multiple requests in HTTP pipelining.

* An __HTTP__ method is safe if it doesn't alter the state of the server. In other words, a method is
    safe if it leads to a read-only operation. Several common HTTP methods are safe: GET, HEAD, or OPTIONS

* An __HTTP__ method is idempotent if an identical request can be made once or several times in a row
    with the same effect while leaving the server in the same state. In other words, an idempotent
    method should not have any side-effects (except for keeping statistics). Implemented correctly,
    the GET, HEAD, PUT, and DELETE method are idempotent, but not the POST method.

* Data buffer (or just __BUFFER__) is a region of a physical memory storage used to temporarily store
    data while it is being moved from one place to another.

* __LATENCY__ - an expression of how much time it takes for a packet of data to get from one
    designated point to another

* __CANONICAL URL__ - allows you to tell search engines that certain similar URLs are actually one
    and the same. Sometimes you have products or content that is accessible under multiple URLs,
    or even on multiple websites. Using a canonical URL (an HTML link tag with attribute
    rel=canonical) these can exist without harming your rankings.

* __TLS__ - Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol
    used by applications to communicate securely across a network, preventing tampering with and
    eavesdropping on email, web browsing, messaging, and other protocols.

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
