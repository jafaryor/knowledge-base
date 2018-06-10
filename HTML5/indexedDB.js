/*
    IndexedDB - is a low-level API for client-side storage of significant amounts of
    structured data, including files/blobs. This API uses indexes to enable
    high-performance searches of this data.

    While Web Storage is useful for storing smaller amounts of data, it is less useful
    for storing larger amounts of structured data. IndexedDB provides a solution.

    IndexedDB is a transactional database system, like an SQL-based RDBMS. However,
    unlike SQL-based RDBMSes, which use fixed-column tables, IndexedDB is a JavaScript-based
    object-oriented database. IndexedDB lets you store and retrieve objects that are
    indexed with a key; any objects supported by the structured clone algorithm can be
    stored. You need to specify the database schema, open a connection to your database,
    and then retrieve and update data within a series of transactions.

    The W3C has announced that the Web SQL database is a deprecated local storage specification
    so web developer should not use this technology any more. indexeddb is an alternative for
    web SQL data base and more effective than older technologies.

    Operations performed using IndexedDB are done asynchronously, so as not to block
    applications. IndexedDB originally included both synchronous and asynchronous APIs.
    The synchronous API was intended for use only with Web Workers.

    Features:
        * It stores key-pair values
        * It is not a relational database
        * Is mostly asynchronous
        * It is not a structured query language
        * It has supported to access the data from same domain

    Note:
        This feature is available in Web Workers.
        Like most web storage solutions, IndexedDB follows a same-origin policy.
*/