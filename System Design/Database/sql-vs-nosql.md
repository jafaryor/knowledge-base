## SQL vs NoSQL
In the world of databases, there are two main types of solutions: _SQL_ and _NoSQL_ (or _relational databases_ and _non-relational databases_). Both of them differ in the way they were built, the kind of information they store, and the storage method they use.

__Relational databases__ are structured and have predefined schemas like phone books that store phone numbers and addresses.

__Non-relational databases__ are unstructured, distributed, and have a dynamic schema like file folders that hold everything from a person’s address and phone number to their Facebook ‘likes’ and online shopping preferences.

### High level differences between SQL and NoSQL
* #### Storage

  SQL stores data in tables where each row represents an entity and each column represents a data point about that entity; for example, if we are storing a car entity in a table, different columns could be ‘Color’, ‘Make’, ‘Model’, and so on.
  
  NoSQL databases have different data storage models. The main ones are key-value, document, graph, and columnar.

* #### Schema

  In SQL, each record conforms to a fixed schema, meaning the columns must be decided and chosen before data entry and each row must have data for each column. The schema can be altered later, but it involves modifying the whole database and going offline.
  
  In NoSQL, schemas are dynamic. Columns can be added on the fly and each ‘row’ (or equivalent) doesn’t have to contain data for each ‘column.’

* #### Querying
  
  SQL databases use __SQL__ (structured query language) for defining and manipulating the data, which is very powerful.
  
  In a NoSQL database, queries are focused on a collection of documents. Sometimes it is also called __UnQL__ (Unstructured Query Language). Different databases have different syntax for using UnQL.

* #### Scalability
  
  In most common situations, SQL databases are vertically scalable,i.e., by increasing the horsepower (higher Memory, CPU, etc.) of the hardware, which can get very expensive. It is possible to scale a relational database across multiple servers, but this is a challenging and time-consuming process.
  
  On the other hand, NoSQL databases are horizontally scalable, meaning we can add more servers easily in our NoSQL database infrastructure to handle a lot of traffic. Any cheap commodity hardware or cloud instances can host NoSQL databases, thus making it a lot more cost-effective than vertical scaling. A lot of NoSQL technologies also distribute data across servers automatically.

* #### Reliability or ACID Compliancy (Atomicity, Consistency, Isolation, Durability)
  
  The vast majority of relational databases are ACID compliant. So, when it comes to data reliability and safe guarantee of performing transactions, SQL databases are still the better bet.
  
  Most of the NoSQL solutions sacrifice ACID compliance for performance and scalability.

### Which to use
When it comes to database technology, there’s no one-size-fits-all solution. That’s why many businesses rely on both relational and non-relational databases for different needs. Even as NoSQL databases are gaining popularity for their speed and scalability, there are still situations where a highly structured SQL database may perform better; choosing the right technology hinges on the use case.

#### Reasons to use SQL database
1. We need to ensure ACID compliance. ACID compliance reduces anomalies and protects the integrity of your database by prescribing exactly how transactions interact with the database. Generally, NoSQL databases sacrifice ACID compliance for scalability and processing speed, but for many e-commerce and financial applications, an ACID-compliant database remains the preferred option.
2. Data is highly structured and requires fewer updates
3. Service requires a large number of complex queries
4. Data Integrity is essential

#### Reasons to use NoSQL database
1. The flexibility, scalability, and speed is the key requirement of the system
2. Rapid development. NoSQL is extremely useful for rapid development as it doesn’t need to be prepaped ahead of time. If you’re working on quick iterations of your system which require making frequent updates to the data structure without a lot of downtime between versions, a relational database will slow you down.
3. The size of data is huge, and data needs flexible schemas
4. ACID compliance is not necessary
5. The service requires distributed architecture and cloud computing

#### Combining the best of two
With the increase in the systems’ complexity, sometimes it becomes handy to use both types of databases for various tasks associated with the service. For example, YouTube stores the video content in NoSQL databases and stores user metadata and some other information in relational databases. Hence, to meet the business requirements, one can integrate both types of services and use them in conjunction with each other by taking each database’s best characteristics.

Various databases offer both types of services like MySQL Document Store offers the structure of the SQL database and the features and flexibility of the NoSQL database. Similarly, MongoDB being a NoSQL database, also offers ACID transactions.

Another example, in the case of Flipkart, order data must adhere to ACID principles while also being infinitely expandable in the manner of a Columnar DB. In this situation, we’ll utilize a database combination like MySQL + Cassandra. All information about ongoing orders that must adhere to ACID properties will now be saved in a MySQL database. After they are completed, they will be moved to Cassandra, which can be used as a permanent store. As long as the ACID qualities are required, the data is stored in a relational database before being migrated to a columnar database to expand to the data. The issue has been resolved!
