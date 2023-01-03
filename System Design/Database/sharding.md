## Sharding or Data Partitioning
__Data partitioning__ (also known as sharding) is a technique to break up a big database (DB) into many smaller parts. It is the process of splitting up a DB/table across multiple machines to improve the manageability, performance, availability, and load balancing of an application.

The justification for data sharding is that, after a certain scale point, it is cheaper and more feasible to scale horizontally by adding more machines than to grow it vertically by adding beefier servers.

With the growth in services and user base, it becomes tricky for a single server or database to function efficiently. We may experience lower performance with the architecture of a single database server. Here is some situation that could arise:
* Database operations become slower.
* Network bandwidth starts reaching the saturation level. 
* The database server starts running out of disk space at some point.

Database partition helps us fix all the above challenges by distributing data across several partitions. Each partition may reside on:
1. The same machine (__coresident__)

    The idea of co-resident partitioning is to reduce individual indexes size, and the amount of I/O needed to update records.

2. Different machines (__remote__).

    Similarly, the concept of remote partitioning is to increase the bandwidth access to data by having more RAM, avoiding disk access, or having more network interfaces and disk I/O channels available.

### When to Partition a Table?
Partitioning might seem helpful, but not all cases require us to partition data. Here are some scenarios when partition can be beneficial:
* When tables are too large to fit in memory.
* When new data are added or updated every day. A good example is a table containing historical data, where only the current month's data is updated, and the other 11 months' data are read-only.
* When the table data need to be distributed across different storage devices. The query tasks become easier if the data is distributed and stored across different servers or systems.

### Why do we need data partitioning?
* __Improve Availability:__ Database partitioning provides logical independence to the partitioned database, ensuring the high availability of our application. Here individual partition can be managed independently. For example, if one partition is unavailable, all of the other partitions remain available to execute database queries successfully. So it increases the availability of the service by avoiding a single point of failure for the entire dataset.

    Note: Keeping data in different partitions helps the database administrator do backup and recovery operations on each partition, independent of the other partitions. This could allow the active partition of the database to be made available sooner so access to the system can continue while the inactive data is still being restored.

* __Increase Scalability:__ Every hardware comes up with certain capacity limitations. With the increase in traffic, the performance of the services decreases. Data partitioning proves to increase scalability by distributing the data across multiple partitions. It gives the wings to the service to scale out without any further limitations.
* __Improve Security:__ Data Partitioning also helps improve the system’s security by storing sensitive and non-sensitive data into different partitions. This could provide better manageability and desirable security to sensitive data.
* __Increase Query Performance:__ Data Partitioning improves the performance of the system. Instead of querying the whole database, now the system has to query only a smaller component, which can increase service performance.
* __Improve Data Manageability:__ Data Partitioning divides tables and indexes into smaller and more manageable units. It's a kind of "divide and conquer" approach to data management, where maintenance work can focus on a particular table partition.

### Partitioning Methods
* #### Horizontal partitioning OR Sharding

    In this scheme, we put different rows into different tables.

    For example, if we are storing different places in a table, we can decide that locations with ZIP codes less than 10000 are stored in one table and places with ZIP codes greater than 10000 are stored in a separate table. This is also called a range based sharding as we are storing different ranges of data in separate tables.

    The key problem with this approach is that if the value whose range is used for sharding isn’t chosen carefully, then the partitioning scheme will lead to unbalanced servers.

* #### Vertical Partitioning

    In vertical partitioning, we partition the data vertically based on columns.

    For example, if we are building Instagram like application - where we need to store data related to users, photos they upload, and people they follow - we can decide to place user profile information on one DB server, friend lists on another, and photos on a third server.

    The disadvantages of vertical partition are as follows:
    * Our system might need to combine data from multiple partitions to answer a query. For example, a profile view request needs to combine a user profile, connections, and articles data. This increases the operational complexity of the system.
    * If the website experiences additional growth, it may be necessary to further partition a feature-specific database across multiple servers.

* #### Functional Partitioning
    
    In this type of partitioning strategy, data is aggregated based on the contextual dependency of the service. A medical store system might store the medicines' information in one partition and invoice data in another partition.

We can go ahead with any specific type of data partitioning based on the structure of the data. However, in some cases, we can combine both horizontal and vertical partitioning to get the best of it.

### Partitioning Criteria
* #### Range Based Partitioning

    Range partitioning maps data to various partitions based on ranges of values of the partitioning key. In other words, we partition the table in such a way that each partition contains rows within a given range defined by the partition key.

* #### Hash-based partitioning

    Under this scheme, we apply a hash function to some key attributes of the entity we are storing; that yields the partition number.

    For example, if we have 100 DB servers and our ID is a numeric value that gets incremented by one each time a new record is inserted. In this example, the hash function could be `ID mod 100`, which will give us the server number where we can store/read that record. This approach should ensure a uniform allocation of data among servers.

    The disadvantage of this method is that dynamically adding/removing database servers becomes expensive. For example, if we wanted to add more partitions, some of the keys need to be remapped and migrated to a new partition, and the hash function will need to be changed. During data migration, neither the new nor the old hash function is entirely valid. So in this process, a large number of the requests cannot be served, and we will encounter a downtime till the migration completes.
    
    > This problem can be solved using consistent hashing!

* #### List partitioning

    In list partitioning, each partition is defined and selected based on the list of values on a column rather than a set of contiguous ranges of values.

    For example, we can decide all users living in Iceland, Norway, Sweden, Finland, or Denmark will be stored in a partition for the Nordic countries.

* #### Round-robin partitioning

    This is a very simple strategy that ensures uniform data distribution. With `n` partitions, the `i` tuple is assigned to partition `i mod n`.

* #### Composite partitioning

    Under this scheme, we combine any of the above partitioning schemes to devise a new scheme. Here we first partition the data using one technique, and then each partition is further subdivided into sub-partitions using the same or some other method.

    For example, first applying a list partitioning scheme and then a hash based partitioning. Consistent hashing could be considered a composite of hash and list partitioning where the hash reduces the key space to a size that can be listed.

### Common Problems of Sharding
On a sharded database there are certain extra constraints on the different operations that can be performed. Most of these constraints are due to the fact that operations across multiple tables or multiple rows in the same table will no longer run on the same server. Below are some of the constraints and additional complexities introduced by sharding:
1. #### Joins and Denormalization

    Performing joins on a database which is running on one server is straightforward, but once a database is partitioned and spread across multiple machines it is often not feasible to perform joins that span database shards. Such joins will not be performance efficient since data has to be compiled from multiple servers.

    A common workaround for this problem is to denormalize the database so that queries that previously required joins can be performed from a single table. Of course, the service now has to deal with all the perils of denormalization such as data inconsistency.

2. #### Referential integrity

    As we saw that performing a cross-shard query on a partitioned database is not feasible, similarly, trying to enforce data integrity constraints such as foreign keys in a sharded database can be extremely difficult.

    Most of RDBMS do not support foreign keys constraints across databases on different database servers. Which means that applications that require referential integrity on sharded databases often have to enforce it in application code. Often in such cases, applications have to run regular SQL jobs to clean up dangling references.

3. #### Rebalancing

    There could be many reasons we have to change our sharding scheme:
    * The data distribution is not uniform, e.g., there are a lot of places for a particular ZIP code that cannot fit into one database partition.
    * There is a lot of load on a shard, e.g., there are too many requests being handled by the DB shard dedicated to user photos.

    In such cases, either we have to create more DB shards or have to rebalance existing shards, which means the partitioning scheme changed and all existing data moved to new locations. Doing this without incurring downtime is extremely difficult. Using a scheme like directory based partitioning does make rebalancing a more palatable experience at the cost of increasing the complexity of the system and creating a new single point of failure (i.e. the lookup service/database).
