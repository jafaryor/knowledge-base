# System Design
Steps to solve a system design problem:
1. Requirements clarifications

    * Who will be using the system?
    * How will they be using it?
    * How many users are there?
    * What does the system do?
    * What are the inputs and outputs of the system?
    * How much data is expected to be handled?
    * How many requests per second are expected?
    * What is the expected read-to-write ratio?

2. System interface definition

    Define what APIs are expected from the system.

3. Back-of-the-envelope estimation

    * What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)?
    * How much storage will we need? We will have different numbers if users can have photos and videos in their tweets.
    * What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.

4. Defining data model
5. High-level design

    To begin the design process, it can be helpful to outline a high-level design with all of the critical components and try to draw a diagram representing the system's core components. This will help you to identify all of the components that are needed to solve the problem from end to end.

6. Database Design

    Before designing a hypothetical system, it is important to define how data will be processed. This includes identifying the inputs and outputs of the system, how they will be stored, and how the data will flow through the system. Determining which database would be the best fit for the problem can also be helpful at this stage.

7. Detailed design

    * Since we will be storing a massive amount of data, how should we partition our data to distribute it to multiple databases? Should we try to store all the data of a user on the same database? What issue could it cause?
    * How much and at which layer should we introduce cache to speed things up?
    * What components need better load balancing?

8. Scale the design

    To ensure that your system is able to meet the constraints of the problem being addressed, it is important to identify and address any potential bottlenecks. This may include considering approaches such as load balancing, horizontal scaling, caching, database sharding, replication, etc. to address scalability issues. By considering these options and determining which are most appropriate for your system, you can ensure that your design is able to handle the expected workload and meet the needs of your users.

9. Identifying and resolving bottlenecks

    * Is there any single point of failure in our system? What are we doing to mitigate it?
    * Do we have enough replicas of the data so that if we lose a few servers we can still serve our users?
    * Similarly, do we have enough copies of different services running such that a few failures will not cause total system shutdown?
    * How are we monitoring the performance of our service? Do we get alerts whenever critical components fail or their performance degrades?

---

#### [System Design Interview Course from Enjoy Algorithms](https://www.enjoyalgorithms.com/system-design-courses/)

#### [System Design Series' Articles](https://dev.to/karanpratapsingh/series/19332)

#### [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)
