## Storage Taxonomy
Let’s start by understanding some of the dimensions by which we can analyze data storage for web apps.

### Data Model
The model for storing units of data determines how data is organized internally, which impacts ease of use, cost and performance of storage and retrieval requests.
* __Structured__: Data stored in tables with predefined fields, as is typical of SQL based database management systems, lends itself well to flexible and dynamic queries, where the full range of query types may not be be known a priori. A prominent example of a structured datastore in the browser is IndexedDB.

* __Key/Value__: Key/Value datastores, and related NoSQL databases, offer the ability to store and retrieve unstructured data indexed by a unique key. Key/Value datastores are like hash tables in that they allow constant-time access to indexed, opaque data. Prominent examples of key/value datastores are the Cache API in the browser and Apache Cassandra on the server.

* __Byte Streams__: This simple model stores data as a variable length, opaque string of bytes, leaving any form of internal organization to the application layer. This model is particularly good for file systems and other hierarchically organized blobs of data. Prominent examples of byte stream datastores include file systems and cloud storage services.

### Persistence
Storage methods for web apps can be analyzed according to the scope over which data is made persistent.

* __Session Persistence__: Data in this category is retained only as long as a single web session or browser tab remains active. An example of a storage mechanism with session persistence is the Session Storage API.

* __Device Persistence__: Data in this category is retained across sessions and browser tabs/windows, within a particular device. An example of a storage mechanism with device persistence is the Cache API.

* __Global Persistence__: Data in this category is retained across sessions and devices. As such, it is the most robust form of data persistence. An example of a storage mechanism with global persistence is Google Cloud Storage.

### Transactions
Often, it is important for a collection of related storage operations to succeed or fail atomically. Database management systems have traditionally supported this feature using the transaction model, where related updates may be grouped into arbitrary units

### Sync/Async
Some storage APIs are synchronous in the sense that storage or retrieval requests block the currently active thread until the request is completed.

### Comparison
| API | Data Model | Persistence | Browser Support | Transactions | Sync/Async |
| - | - | - | - | - | - |
| [File system](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem) | Byte stream | device | 52% | No | Async |
| [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | key/value | device | 93% | No | Sync |
| [Session Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | key/value | session | 93% | No | Sync |
| [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) | structured | device | 100% | No | Sync |
| [WebSQL](https://www.w3.org/TR/webdatabase/) | structured | device | 77% | Yes | Async |
| [Cache](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) | key/value | device | 60% | No | Async |
| [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) | hybrid | device | 83% | Yes | Async |
| [cloud storage](https://cloud.google.com/storage/) | byte stream | global | 100% | No | Both |

These criteria lead naturally to the following technology choices:
* For offline storage, use the Cache API. This API is available in any browser that supports Service Worker technology necessary for creating offline apps. The Cache API is ideal for storing resources associated with a known URL.
* For storing application state and user-generated content, use IndexedDB. This enables users to work offline in more browsers than just those that support the Cache API.
* For global byte stream storage: use a Cloud Storage service.

### Web Storage
Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using cookies. Web Storage (e.g `LocalStorage` and `SessionStorage`) is synchronous, has no Web Worker support and is size and type (strings only) limited.

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

    Is a relational database solution for browsers based on SQLite. WebSQL does not have broad browser support and its use is not recommended.

* [File Storage](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem) (Experimental)

    Is a file system solution for the web. Developers can store large objects in a sandboxed part of the user's file system and directly link to them via URL. Although Chrome and Opera are the only browsers that currently implement the feature, its standardization is ongoing.
    The File System API is not supported on any browser besides Chrome. The File API is being improved in the File and Directory Entries API and File API specs but neither is sufficiently mature or standardized to encourage widespread adoption yet.

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

Both APIs are asynchronous (IndexedDB is event based and the Cache API is Promise based). They also work with web workers, window and service workers. IndexedDB is available everywhere.

[Great resourse about Web Storage and their limitations](https://www.html5rocks.com/en/tutorials/offline/quota-research/)

### LRU policySection
When the available disk space is filled up, the quota manager will start clearing out data based on an LRU policy — the least recently used origin will be deleted first, then the next one, until the browser is no longer over the limit.

We track the "last access time" for each origin using temporary storage. Once the global limit for temporary storage is reached (more on the limit later), we try to find all currently unused origins (i.e., ones with no tabs/apps open that are keeping open datastores). These are then sorted according to "last access time." The least recently used origins are then deleted until there's enough space to fulfill the request that triggered this origin eviction.

| Browser | Eviction Policy |
| - | - |
| Chrome | LRU once Chrome runs out of space |
| Firefox | LRU if the whole disk gets full |
| Safari | No eviction |
| Edge | No eviction |

An origin is given an amount of space to do with as it pleases. This free space is shared across all forms of origin storage (`IndexedDB`, `Cache API`, `localStorage` etc). The amount given isn’t specified and will vary depending on device and storage conditions.

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

### Cookies
Cookies have their uses but are synchronous, lack web worker support and are also size-limited.

In Chrome and Opera, your storage is per origin (rather than per API). Both storage mechanisms will store data until the browser [quota](http://www.html5rocks.com/en/tutorials/offline/quota-research/) is reached. Apps can check how much quota they’re using with the [Quota Management API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota). In Chrome, apps can use up to 6% of free disk space. In Firefox, apps can use up to 10% of free disk space, but will prompt the user for further storage requests after 50MB data stored. In mobile Safari, apps can use up to 50MB max, whereas desktop Safari allows unlimited storage (and prompts after 5MB). IE10+ maxes out at 250MB and prompts the user at 10MB. 

### Recomendation
* For the network resources necessary to load your app while offline, use the Cache API (part of service workers).
* For all other data, use IndexedDB (with a promises wrapper).

[__Read More__](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa)

### Best Practices for Using `IndexedDB`
* _Not everything can be stored in `IndexedDB` on all platforms_

    If you are storing large, user-generated files such as images or videos, then you may try to store them as File or Blob objects. This will work on some platforms but fail on others. Safari on iOS, in particular, cannot store Blobs in `IndexedDB`.

    Luckily it is not too difficult to convert a Blob into an ArrayBuffer, and visa versa. Storing ArrayBuffers in `IndexedDB` is very well supported.

    Remember, however, that a Blob has a _MIME_ type while an ArrayBuffer does not. You will need to store the type alongside the buffer in order to do the conversion correctly.

    ```javascript
    function arrayBufferToBlob(buffer, type) {
        return new Blob([buffer], {type: type});
    }

    function blobToArrayBuffer(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
            resolve(reader.result);
            });
            reader.addEventListener('error', reject);
            reader.readAsArrayBuffer(blob);
        });
    }
    ```

* _Writing to storage may fail_

    Errors when writing to `IndexedDB` can happen for a variety of reasons, and in some cases these reasons are outside of your control as a developer. For example, some browsers currently don't allow writing to `IndexedDB` when in private browsing mode. There's also the possibility that a user is on a device that's almost out of disk space, and the browser will restrict you from storing anything at all.

* _Stored data may have been modified or deleted by the user_

    Unlike server-side databases where you can restrict unauthorized access, client-side databases are accessible to browser extensions and developer tools, and they can be cleared by the user.

* _Stored data may be out of date_

    Similar to the previous section, even if the user hasn't modified the data themselves, it's also possible that the data they have in storage was written by an old version of your code, possibly a version with bugs in it.

* _

    As a general rule, reads and writes to `IndexedDB` should not be larger than required for the data being accessed.

    While `IndexedDB` makes is possible to store large, nested objects as a single record (and doing so is admittedly quite convenient from a developer perspective), this practice should be avoided. The reason is because when `IndexedDB` stores an object, it must first create a structured clone of that object, and the structured cloning process happens on the main thread. The larger the object, the longer the blocking time will be.

    Instead of storing the entire state tree in a single record, you should break it up into individual records and only update the records that actually change.

    The same is true if you store large items like images, music or video in `IndexedDB`. Store each item with its own key rather than inside a larger object, so that you can retrieve the structured data without paying the cost of also retrieving the binary file.
    