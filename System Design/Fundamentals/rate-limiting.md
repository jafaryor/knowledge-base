## Rate Limiting
Rate limiting is a technique used to control the amount of traffic allowed to access a system or network within a specific time period. It helps prevent the overuse or abuse of resources by limiting the rate at which events can occur. This can be used to optimize system performance and ensure that resources are distributed fairly among users.

For example, a website might use rate limiting to prevent someone from repeatedly trying to log in to an account with the wrong password. If the user attempts to log in too often within a certain time window, the website might block their access or slow down their requests. This helps prevent hackers or malicious actors from overburdening the system and causing attacks like Denial of Service (DoS).

Rate limiting can also protect APIs (Application Programming Interfaces) from being overwhelmed by too many requests. An API that uses rate limiting might throttle or temporarily block any client that tries to make too many API calls, ensuring that legitimate requests can still be processed without impacting overall performance.

Rate limiting runs within an application rather than on the web server. It is based on tracking the IP addresses of incoming requests and the time elapsed between them. The IP address is used to identify the source of the request.

### Benefits
* _Avoid resource depletion due to a Denial of Service (DoS) attack:_ By limiting the number of excess calls, a rate limiter can prevent DoS attacks, whether intentional or unintentional. For example, Twitter restricts users to 300 tweets every three hours, and the Google Docs APIs have a default limit of 300 per user every 60 seconds for reading queries.
* _Reduce expenses:_ Limiting excess requests can help reduce the number of servers needed and allocate more resources to high-priority APIs. This is particularly important for companies that use paid third-party APIs, which may be charged on a per-call basis.
* _Ensure that servers are not overburdened:_ A rate limiter can filter out extra requests produced by bots or user misconduct to reduce server load, helping to ensure that the system remains stable and efficient.

### Methods of implementing API Rate-Limiting
* Throttling
* Fixed Window Technique

    The fixed window technique is a rate limiting method that uses an incremental counter to track the number of incoming requests over a fixed time period, such as one hour. If the number of requests exceeds the specified limit during this time period, any additional requests will be discarded.

* Sliding Window Technique

    Sliding-window rate limiting algorithms are time-based and similar to fixed-window algorithms, but they differ in the starting point of each time window. With sliding-window rate limiting, the timeframe starts when a user makes a new request rather than at a predetermined time.

    Sliding-window algorithms help solve the issues faced by fixed-window rate limiting, such as starvation, by providing more flexibility. They also mitigate the starvation issue of leaky bucket rate limiting by starting a new time window whenever a request is made.

* Leaky Bucket Technique

    It converts incoming requests into a First In First Out (FIFO) queue with finite capacity, allowing it to process items at a consistent rate. All requests in a given time frame beyond the capacity of the queue are spilled off.

    The downside of this algorithm is that a burst of requests can fill up the bucket leading to the starvation of new requests. It also provides no guarantee that requests get completed in a given amount of time.

* Tocken Bucket

    Here we use a concept of a bucket. When a request comes in, a token from the bucket must be taken and processed. The request will be refused if no token is available in the bucket, and the requester will have to try again later. As a result, the token bucket gets refreshed after a certain time period.

Rate limiting counter DoS and DDoS Attacks
* __DoS__ (denial-of-service attack) - is a DoS attack is an attack in which a malicious user tries to bring down or damage a system in order to render it unavailable to users. Much of the time, it consists of flooding it with traffic. Some DoS attacks are easily preventable with rate limiting, while others can be far trickier to defend against.
* __DDoS__ (distributed denial-of-service attack) - is a DDoS attack is a DoS attack in which the traffic flooding the target system comes from many different sources (like thousands of machines), making it much harder to defend against.

__Redis__ - is an in-memory key-value store. Does offer some persistent storage options but is typically used as a really fast, best-effort caching solution. Redis is also often used to implement rate limiting.

### Rate Limiting in Distributed Systems
Rate Limiting becomes complicated when distributed systems are involved. The two broad problems that come with rate limiting in distributed systems are:
* Inconsistencies

    When using a cluster of multiple nodes, we might need to enforce a global rate limit policy. Because if each node were to track its rate limit, a consumer could exceed a global rate limit when sending requests to different nodes. The greater the number of nodes, the more likely the user will exceed the global limit.

    The simplest way to solve this problem is to use sticky sessions in our load balancers so that each consumer gets sent to exactly one node but this causes a lack of fault tolerance and scaling problems. Another approach might be to use a centralized data store like Redis but this will increase latency and cause race conditions.

* Race Conditions

    This issue happens when we use a naive "get-then-set" approach, in which we retrieve the current rate limit counter, increment it, and then push it back to the datastore. This model's problem is that additional requests can come through in the time it takes to perform a full cycle of read-increment-store, each attempting to store the increment counter with an invalid (lower) counter value. This allows a consumer to send a very large number of requests to bypass the rate limiting controls.

    One way to avoid this problem is to use some sort of distributed locking mechanism around the key, preventing any other processes from accessing or writing to the counter. Though the lock will become a significant bottleneck and will not scale well. A better approach might be to use a "set-then-get" approach, allowing us to quickly increment and check counter values without letting the atomic operations get in the way.
