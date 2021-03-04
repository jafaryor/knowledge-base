# System Design
Steps to solve a system design problem:
1. Requirements clarifications
2. System interface definition

    Define what APIs are expected from the system.

3. Back-of-the-envelope estimation

    * What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)?
    * How much storage will we need? We will have different numbers if users can have photos and videos in their tweets.
    * What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.

4. Defining data model
5. High-level design
6. Detailed design

    * Since we will be storing a massive amount of data, how should we partition our data to distribute it to multiple databases? Should we try to store all the data of a user on the same database? What issue could it cause?
    * How much and at which layer should we introduce cache to speed things up?
    * What components need better load balancing?

7. Identifying and resolving bottlenecks

    * Is there any single point of failure in our system? What are we doing to mitigate it?
    * Do we have enough replicas of the data so that if we lose a few servers we can still serve our users?
    * Similarly, do we have enough copies of different services running such that a few failures will not cause total system shutdown?
    * How are we monitoring the performance of our service? Do we get alerts whenever critical components fail or their performance degrades?

---

#### [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)
