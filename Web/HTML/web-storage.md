## Web Storage
Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using cookies.

Advantages:
* Fast data retrieval times
* Offline work

Disadvantages:
* 50Mb of storage space
* Device dependant: Switching devices, clearing browser cache and upgrading or reinstalling the browser may delete the data.

Ways to store data in client side:
* Web Storage
    * 10Mb limit
    * Data is in key-value pairs of string
    * Sync execution only
    * Available on all modern browsers
    * Isolated to their own domain
* URL manipulation
    * Limit on length of URL which varies across browsers
* [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

    Is an indexed object store.

    * Async execution
    * Complex to implement and maintain

* `WebSQL` (deprecated and replaced by `IndexedDB`)

    Is a relational database solution for browsers based on SQLite

* [File Storage](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) (Experimental)

    Is a file system solution for the web. Developers can store large objects in a sandboxed part of the user's file system and directly link to them via URL. Although Chrome and Opera are the only browsers that currently implement the feature, its standardization is ongoing.

* Browser Cache

    * 4096 bytes limit
    * persist between browser sessions
    * have an expiration date
    * available across domains
    * send with every HTTP request

* Application Cache

Web Storage:
* `sessionStorage`
    * Deleted after browser tab closes
* `localStorage`
    * Persists between browser sessions
    * Deleted by user

The two mechanisms within Web Storage are as follows:
* `sessionStorage` maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores)
* `localStorage` does the same thing, but persists even when the browser is closed and reopened.

These mechanisms are available via the `window.sessionStorage` and `window.localStorage` properties.

> 'Incognito', 'Private Browsing' or something similar that doesn't store data like history and cookies.

> Browser cookies and Web Storage can be easily disabled by user

[Great resourse about Web Storage and their limitations](https://www.html5rocks.com/en/tutorials/offline/quota-research/)

### LRU policySection
When the available disk space is filled up, the quota manager will start clearing out data based on an LRU policy — the least recently used origin will be deleted first, then the next one, until the browser is no longer over the limit.

We track the "last access time" for each origin using temporary storage. Once the global limit for temporary storage is reached (more on the limit later), we try to find all currently unused origins (i.e., ones with no tabs/apps open that are keeping open datastores). These are then sorted according to "last access time." The least recently used origins are then deleted until there's enough space to fulfill the request that triggered this origin eviction.

### IndexedDB
`IndexedDB` - is a low-level API for client-side storage of significant amounts of
structured data, including files/blobs. This API uses indexes to enable
high-performance searches of this data.

While Web Storage is useful for storing smaller amounts of data, it is less useful
for storing larger amounts of structured data. `IndexedDB` provides a solution.

`IndexedDB` is a transactional database system, like an SQL-based RDBMS. However,
unlike SQL-based RDBMSes, which use fixed-column tables, `IndexedDB` is a JavaScript-based
object-oriented database. `IndexedDB` lets you store and retrieve objects that are
indexed with a key; any objects supported by the structured clone algorithm can be
stored. You need to specify the database schema, open a connection to your database,
and then retrieve and update data within a series of transactions.

The W3C has announced that the Web SQL database is a deprecated local storage specification
so web developer should not use this technology any more. `IndexedDB` is an alternative for
web SQL data base and more effective than older technologies.

Operations performed using `IndexedDB` are done asynchronously, so as not to block
applications. `IndexedDB` originally included both synchronous and asynchronous APIs.
The synchronous API was intended for use only with Web Workers.

Features:
* It stores key-pair values
* It is not a relational database
* Is mostly asynchronous
* It is not a structured query language
* It has supported to access the data from same domain

> This feature is available in Web Workers.

Like most web storage solutions, `IndexedDB` follows a same-origin policy.