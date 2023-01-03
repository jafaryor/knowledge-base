# Available Databases

## SQL Databases
### MySQL 
Here are some MySQL benefits and strengths:
* __Owned by Oracle__: Although MySQL is free and open-source, the database system is owned and managed by Oracle.
* __Maturity__: MySQL is an extremely established database, meaning that there’s a huge community, extensive testing and quite a bit of stability.
* __Compatibility__: MySQL is available for all major platforms, including Linux, Windows, Mac, BSD, and Solaris. It also has connectors to languages like Node.js, Ruby, C#, C++, Java, Perl, Python, and PHP, meaning that it’s not limited to SQL query language.
* __Cost-effective__: The database is open-source and free.
* __Replicable__: The MySQL database can be replicated across multiple nodes, meaning that the workload can be reduced and the scalability and availability of the application can be increased.
* __Sharding__: While sharding cannot be done on most SQL databases, it can be done on MySQL servers. This is both cost-effective and good for business.
* __Who Should Use It?__ MySQL is a strong choice for any business that will benefit from its pre-defined structure and set schemas. For example, applications that require multi-row transactions - like accounting systems or systems that monitor inventory - or that run on legacy systems will thrive with the MySQL structure.

### Oracle Database
Another popular SQL database system, particularly with enterprise-level organizations, is Oracle Database. Oracle Database offers the following strengths and benefits:
* __Professionally developed and managed__: Oracle develops and manages the Oracle Database system. As a commercial option, this relational database management system benefits from frequent updates and excellent customer support.
* __A Unique SQL "dialect"__: Oracle Database uses its own dialect of SQL known as PL/SQL (Procedural Language/SQL). This language differs in small ways from traditional SQL, primarily in how it deals with stored procedures, built-in functions, and variables.
* __Expensive__: As a professionally developed and managed database system, Oracle is one of the most expensive options available.
* __Compatibility__: Oracle Database is available for any operating system.
* __DBMS Organization__: Oracle groups its objects by schemas that are a subset of database objects.
* __Large database sizes__: Oracle can handle extremely large databases, making it an excellent choice for enterprise companies with large data needs.
* __Easy to upgrade__: With Oracle Database, you can complete an upgrade without a needing to overhaul the system completely.
* __Transaction control__: With Oracle, new database connections are new transactions. You can make rollbacks and changes because values won't change prior to commit.
* __Other benefits__: Oracle offers bitmap indexing, partitioning, function-based indexing, reverse-key indexing, and star query optimization.
* __Who Should Use It?__ Oracle Database is an excellent database choice, but the costs could prevent small-to-medium-sized organizations from taking advantage of it. For an enterprise organization that has large data needs and a generous budget, this solution could be a match.

### Microsoft SQL Server
Microsoft SQL Server is a popular option for small-to-medium-sized companies. It offers the following benefits and advantages:
* __Professionally developed and managed__: Microsoft develops and manages the Microsoft SQL Server database system. As a commercial relational database management system, customers benefit from frequent updates and great user support.
* __A Unique SQL "Dialect"__: SQL Server employs its own dialect of SQL, called T-SQL (Transact SQL). Like Oracle, this differs from traditional SQL in how it handles built-in functions, stored procedures, and variables.
* __Compatibility__: SQL Server only works with Windows and Linux based systems.
* __Transaction control__: Since SQL Server has a separate execution of each command, it's hard to make adjustments mid-process when errors are found.
* __DBMS Organization__: SQL Server organizes tables, procedures, and views according to database names.
* __Easy to use__: SQL Server has a reputation for being easy to use.
* __Excellent support__: As a Microsoft product, SQL Server includes live product support, and excellent documentation.
* __Other features__: SQL Server features some great tools and features like BI tools, Database Tuning Advisor, SQL Server Management Studio, and SQL Server Profiler.
* __Who Should Use It?__ Microsoft SQL Server is an excellent choice for small-to-medium-sized organizations that need a high-quality, professionally-managed database system with excellent support, but don't require the cost or scalability of an enterprise solution like Oracle.

### PostgreSQL
We listed PostgreSQL last among the SQL DBMS's because it's a hybrid SQL/NoSQL database system that finds a middle-ground between these two options. PostgreSQL offers the following strengths and benefits:
* __Cost-effectiveness__: PostgreSQL is a free and open-source database system. The PostgreSQL Global Development Group develops and manages the system.
* __Compatibility__: PostgreSQL is available for a variety of operating systems, including HP-UX, FreeBSD, Linux, OpenBSD, NetBSD, OS X, Unix, Solaris, and Windows. It also offers support for the languages .Net, C++, C, Java, Delphi, Perl, PHP, JavaScript (Node.js), Python, and Tsl.
* __ORDBMS__: PostgreSQL is an "Object Oriented Database Management System" (ORDBMS), not simply a "Relational Database Management System (RDBMS). This means it serves as a hybrid between a strictly relational model (SQL) and a strictly object-oriented model (NoSQL).
* __User support__: PostgreSQL doesn't have its own customer support, per se, but there is an active community that will readily provide free support. Moreover, excellent paid support options are available from third-party service providers.
* __High ACID Compliance__: PostgreSQL is known for offering the highest levels of atomicity, consistency, isolation, and durability. These are the four standards experts use to judge the quality of a database design. Learn more about ACID compliance here.
* __Pure SQL__: Another benefit of PostgreSQL is the fact that it utilizes one of the purest forms of SQL available, as opposed to other database systems that often have unique variances.
* __Who Should Use It?__ As a hybrid between a relational database and an object-oriented database, PostgreSQL is excellent when your data doesn't mesh well with a perfectly relational model. It works great for extra-large databases and for performing complicated queries.


## NoSQL Databases
### MongoDB
The following are some of the benefits and strengths of MongoDB:
* __Free to use__: Since October 2018, MongoDB's updates have been published under the Server Side Public License (SSPL) v1, and the database is free to use.
* __Dynamic schema__: As mentioned, this gives you the flexibility to change your data schema without modifying any of your existing data.
* __Scalability__: MongoDB is horizontally scalable, which helps reduce the workload and scale your business with ease.
* __Manageability__: The database doesn’t require a database administrator. Since it is fairly user-friendly in this way, it can be used by both developers and administrators.
* __Speed__: It’s high-performing for simple queries.
* __Flexibility__: You can add new columns or fields on MongoDB without affecting existing rows or application performance.
* __Not Acid Compliant__: As a NoSQL database, MongoDB is not ACID compliant. See PostgreSQL above for more about ACID compliance.
* __MongoDB Atlas__ (a new feature): MongoDB recently added MongoDB Atlas global cloud database technology to its offerings. This feature allows you to deploy fully-managed MongoDB via AWS, Azure, or GCP. MongoDB Atlas lets you use drivers, integrations, and tools to reduce the time required to manage your database. Here's the pricing information from Atlas.
* __Who Should Use It?__ MongoDB is a good choice for businesses that have rapid growth or databases with no clear schema definitions (i.e., you have a lot of unstructured data). If you cannot define a schema for your database, if you find yourself denormalizing data schemas, or if your data requirements and schemas are constantly evolving - as is often the case with mobile apps, real-time analytics, content management systems, etc. - MongoDB can be a strong choice for you.

### Apache Cassandra
Apache Cassandra (or Cassandra DB) was originally a Facebook product, but in 2008, Facebook released it to the world as a free, open-source NoSQL database system. Here are some of Cassandra's benefits and strengths:
* __Free and Open-Source__: After Facebook made Cassandra open-source, Apache took over the project in 2010.
* __Highly scalable__: Cassandra benefits from a "masterless design." That means all of its nodes are identical, which creates operational simplicity, making it easy to scale up to a larger database architecture.
* __Active everywhere__: Users can write and read from all Cassandra nodes.
* __Fast writes and reads__: Cassandra's design speeds up read and write commands tremendously via its distributed, highly-available organization, even in the case of massive projects.
* __Not ACID Compliant__: As a NoSQL database, Cassandra is not ACID compliant, instead Cassandra offers atomic, isolated and durable transactions with eventual consistency.
* __Support for SQL__: Even though it's not ACID compliant, Cassandra does offer some support for SQL via SQL-like DDL, DML, and SELECT statements.
* __Poor with updating and deleting data__: Cassandra is not optimized for updating and deleting data.
* __Offers excellent data protection__: Cassandra features a commit log design that makes sure data isn't lost. It also features backup/restore which adds additional data protection.
* __Redundancy of data and node function__: Cassandra offers constant uptime and eliminates singular points of failure.
* __Who Should Use It?__ Cassandra is most popular for use with IoT (internet of things) technology because it offers fast, real-time insights. It excels at writing time-based log activities, error logging, and sensor data. If you need fast read and write processing, Cassandra could be your database. Cassandra is also good for those who want to work with SQL-like data types on a NoSQL database.

### Google Cloud BigTable
As a Google product, Google Cloud BigTable is not free, but it comes with distinct advantages that may be worth the price required to use it. Now let's take a look at the advantages of BigTable:
* __Low latency__: According to Google, BigTable offers a consistent sub-10ms latency.
* __Replication__: Through replication, BigTable provides higher availability, durability, and resilience when zonal failures happen. Replication also offers "high availability for live serving apps, and workload isolation for serving vs. analytics."
* __Machine learning__: BigTable features a storage engine for use with machine learning applications.
* __Easy to integrate__: Integrates well with open-source data analytics tools.
* __Highly scalable__: Google BigTable can work with massive data sources in the hundreds of petabytes scale.
* __Fully managed with Integrations__: Like MongoDB Atlas, BigTable is fully managed, which reduces workload requirements. It also integrates instantly with many platforms, which streamlines the ETL processes required to load data.
* __Highly compatible with Google services__: As a Google product, BigTable integrates well with other services under the Google umbrella.
* __When Should You Use It?__ According to Google, BigQuery is great for fintech, IoT, and advertising technology as well as other use cases. For fintech, you can create a check for fraud patterns and watch real-time transaction information. You can also save and consolidate financial market data, trading activity, and more. For IoT, you can ingest and understand massive amounts of real-time time series data recorded from sensors to create dashboards and valuable analytics. For advertising, you can gather large amounts of customer behavior data to find patterns that inform your marketing efforts.

### Firebase

### Apache HBase
As a database modeled after Google BigQuery, Apache Hbase was created to work with large datasets. Here are some of the benefits and strengths of HBase:
* __Open-source and free__: Apache HBase is an open-source, free, NoSQL database system managed by Apache. It was modeled after Google Cloud BigTable (above), to offer BigTable-like features on top of the Hadoop Distributed File System (HDFS).
* __Massive tables__: HBase was specifically created to manage large datasets.
* __Scales across a cluster__: Hbase is excellent at scaling across a cluster. Clusters relate to clustering algorithms, which are used to derive machine learning insights from data.
* __Data management__: HBase organizes rows into "regions." The regions determine how the table will be divided across more than one node that make up a cluster. If one of the regions is too big, HBase automatically breaks it up to evenly distribute the load across more than one server.
Works with both unstructured and semi-structured data: As a NoSQL database, HBase is ideal for storing both semi-structured and structured information.
* __Consistency__: HBase offers fast, consistent processing of read and write commands. After performing a write, all of the read requests on the data will produce the same response.
* __Failover__: HBase uses replication to offer failover, which reduces or eliminates the negative impact of a system failure on users.
* __Sharding__: HBase offers automatic and configurable sharding for tables.
* __When Should You Use It?__ The Apache HBase website advises to use HBase "when you need random, realtime read/write access to your big data." The database is designed to host massive tables of information that include billions of rows and millions of columns.

### CouchDB

### Redis

### DynamoDB

### Neo4j
