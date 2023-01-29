# System Design
Steps to solve a system design problem:
1. Requirements clarifications

    Functional requirements:
    * "What are the features that we need to design for this system?"
    * "What are the edge cases we need to consider, if any, in our design?"
    * What are the inputs and outputs of the system?
    * "Our system should record metrics and analytics"
    * "Service health and performance monitoring?"

    Non-functional requirements:
    * "Each request should be processed with the minimum latency"
    * "System should be highly available"
    * How much data is expected to be handled?
    * How many requests per second are expected?
    * What is the expected read-to-write ratio?
    * How many users are expected / what is the likely traffic volume?

2. Estimation and Constraints

    Estimate the scale of the system we're going to design. It is important to ask questions such as:

    * "What is the desired scale that this system will need to handle?" E.g., number of new tweets, number of tweet views, number of timeline generations per sec., ...
    * "What is the read/write ratio of our system?"
    * "How many requests per second?"
    * "How much storage will we need?" We will have different numbers if users can have photos and videos in their tweets.
    * "What network bandwidth usage are we expecting?" This will be crucial in deciding how we will manage traffic and balance load between servers.

    These questions will help us scale our design later.

3. Data model design

    Once we have the estimations, we can start with defining the database schema. Doing so in the early stages of the interview would help us to understand the data flow which is the core of every system. In this step, we basically define all the entities and relationships between them.

    * "What are the different entities in the system?"
    * "What are the relationships between these entities?"
    * "How many tables do we need?"
    * "Is NoSQL a better choice here?"

4. System interface definitio

    Define what APIs are expected from the system.

    It is advised to keep the interface as simple as possible and come back to it later when covering extended requirements.

5. High-level design

    Now we have established our data model and API design, it's time to identify system components (such as Load Balancers, API Gateway, etc.) that are needed to solve our problem and draft the first design of our system.

    Once we have a basic diagram, we can start discussing with the interviewer how the system will work from the client's perspective.

6. Database Design

    Before designing a hypothetical system, it is important to define how data will be processed. This includes identifying the inputs and outputs of the system, how they will be stored, and how the data will flow through the system. Determining which database would be the best fit for the problem can also be helpful at this stage.

7. Detailed design

    Now it's time to go into detail about the major components of the system we designed. As always discuss with the interviewer which component may need further improvements.

    * Since we will be storing a massive amount of data, how should we partition our data to distribute it to multiple databases? Should we try to store all the data of a user on the same database? What issue could it cause?
    * How much and at which layer should we introduce cache to speed things up?
    * What components need better load balancing?
    * "How will we handle a sudden spike in traffic?"

8. Scale the design

    To ensure that your system is able to meet the constraints of the problem being addressed, it is important to identify and address any potential bottlenecks. This may include considering approaches such as load balancing, horizontal scaling, caching, database sharding, replication, etc. to address scalability issues. By considering these options and determining which are most appropriate for your system, you can ensure that your design is able to handle the expected workload and meet the needs of your users.

9. Identifying and resolving bottlenecks

    * Is there any single point of failure in our system? What are we doing to mitigate it?
    * Do we have enough replicas of the data so that if we lose a few servers we can still serve our users?
    * Similarly, do we have enough copies of different services running such that a few failures will not cause total system shutdown?
    * How are we monitoring the performance of our service? Do we get alerts whenever critical components fail or their performance degrades?
    * "Is database sharding required?"

> Make sure to read the engineering blog of the company you're interviewing with. This will help you get a sense of what technology stack they're using and which problems are important to them.

---

#### [System Design Interview Course from Enjoy Algorithms](https://www.enjoyalgorithms.com/system-design-courses/)

#### [Light System Design Course](https://www.karanpratapsingh.com/courses/system-design)

#### [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)
