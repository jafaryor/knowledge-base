## MapReduce
A popular framework for processing very large datasets in a distributed system efficiently, quickly, and in a fault-tolerant manner. A MapReduce job is comprised of 3 main steps:
1. __Map__ step, which runs a map function on the various chunks of the dataset and transforms these chunks into intermediate key-value pairs.
2. __Shuffle__ step, which reorganizes the intermediate key-value pairs such that pairs of the same key are routed to the same machine in the final step.
3. __Reduce__ step, which runs a reduce function on the newly shuffled key-value pairs and transforms them into more meaningful data.

The canonical example of a MapReduce use case is counting the number of occurrences of words in a large text file.

![map-reduce](./images/map-reduce.png)

MapReduce processes large amounts of data in a parallel and distributed manner by breaking it down into smaller pieces that can be processed concurrently. The results of these individual processing tasks are then combined to produce the final result.

By dividing the data processing workload into smaller pieces and distributing it across multiple nodes, MapReduce is able to handle large amounts of data concurrently, efficiently and quickly. This approach is particularly useful for analyzing and processing data sets that are too large to be handled by a single machine.

The number of map tasks is determined by the number of input file blocks, while the number of reduce tasks is decided by the job author. The MapReduce framework uses a hash of the key to ensure that all key-value pairs with the same key are sent to the same reducer. The key-value pairs must be sorted, and this is done in stages where each map task partitions its output based on the key's hash and writes it to a sorted file on the mapper's local disk.

When a mapper has completed its job, the MapReduce scheduler informs the reducers that they can begin fetching the output files from the mapper. The reducers connect to the mappers, retrieve the files, and merge them while preserving the sort order. The reducer is called with a key and an iterator that progressively reads all records with the same key. The reducer processes these records and generates output records that are written to a file on the distributed filesystem.

MapReduce is a powerful tool for processing large amounts of data in the big data paradigm. It allows businesses to efficiently process petabytes of data stored in HDFS, providing more accessible access to multiple data sources and data types. It also enables fast processing of massive amounts of data through parallel processing and minimal data movement.

### Application
MapReduce is a powerful tool that is used in a variety of applications, including distributed pattern-based searching, distributed sorting, and web link-graph reversal.

One notable use of MapReduce is in regenerating Google's index of the World Wide Web. It replaced the old programs that were used to update the index and run various analyses.

---

## Distributed File System (DFS)
A Distributed File System is an abstraction over a (usually large) cluster of machines that allows them to act like one large file system. The two most popular implementations of a DFS are the __Google File System (GFS)__ and the __Hadoop Distributed File System (HDFS)__.

Typically, DFSs take care of the classic availability and replication guarantees that can be tricky to obtain in a distributed-system setting. The overarching idea is that files are split into chunks of a certain size (4MB or 64MB, for instance), and those chunks are sharded across a large cluster of machines. A central control plane is in charge of deciding where each chunk resides, routing reads to the right nodes, and handling communication between machines.

Splitting data into smaller chunks and placing them across multiple machines enables fast and concurrent processing, since processing is done is multiple machines concurrently. It also increases throughput, as a client can receive the processed data by chunks at the same time and then combine them locally.

Different DFS implementations have slightly different APIs and semantics, but they achieve the same common goal: extremely large-scale persistent storage.

### Hadoop
A popular, open-source framework that supports MapReduce jobs and many other kinds of data-processing pipelines. Its central component is HDFS (Hadoop Distributed File System), on top of which other technologies have been developed.
