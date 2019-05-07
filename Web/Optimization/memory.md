## Memory Optimization
Think of memory as a graph with primitive types (like numbers and strings) and objects (associative arrays). It might visually be represented as a graph with a number of interconnected points.

An object can hold memory in two ways:
* Directly by the object itself.
* Implicitly by holding references to other objects, and therefore preventing those objects from being automatically disposed by a garbage collector (GC for short).

The memory graph starts with a _root_, which may be the `window` object of the browser or the `Global` object of a Node.js module.

> __Whatever is not reachable from the root gets GC.__

The __Heap__ is a network of interconnected objects. In the mathematical world, this structure is called a graph or memory graph.

Primitive types (Numbers, Booleans, Strings) cannot reference other values and are always leafs or terminating nodes.

### Terminology
__JS Heap__ represents how much memory the reachable objects on your page are using. If this number is increasing, either new objects are being created, or the existing objects are growing.

__DOM Nodes__ are stored in native memory. If this value is increasing, DOM nodes are getting created.

__Shallow size__ is the size of memory that is held by the object itself.

__Renderer Memory__ is all memory of the process where an inspected page is rendered: _native memory_ + _JS heap memory of the page_ + _JS heap memory of all dedicated workers started by the page_. Nevertheless, even a small object can hold a large amount of memory indirectly, by preventing other objects from being disposed of by the automatic garbage collection process.

__Retained size__ is the size of memory that is freed once the object itself is deleted along with its dependent objects that were made unreachable from _GC roots_.

> Both the Shallow and Retained size columns represent data in bytes.

Memory issues are important because they are often perceivable by users. Users can perceive memory issues in the following ways:
* __A page's performance gets progressively worse over time__. This is possibly a symptom of a memory leak. A memory leak is when a bug in the page causes the page to progressively use more and more memory over time.
* __A page's performance is consistently bad. This is possibly a symptom of memory bloat__. Memory bloat is when a page uses more memory than is necessary for optimal page speed.
* __A page's performance is delayed or appears to pause frequently__. This is possibly a symptom of frequent garbage collections. Garbage collection is when the browser reclaims memory. The browser decides when this happens. During collections, all script execution is paused. So if the browser is garbage collecting a lot, script execution is going to get paused a lot.

### Dev Tools:
* #### Heap Snapshot

    A DOM node can only be garbage collected when there are no references to it from either the page's DOM tree or JavaScript code. A node is said to be "__detached__" when it's removed from the DOM tree but some JavaScript still references it. __Detached DOM__ nodes are a common cause of memory leaks.

    _Heap Snapshots_ are one way to identify detached nodes. As the name implies, heap snapshots show you how memory is distributed among your page's JS objects and DOM nodes at the point of time of the snapshot.

* #### Allocation Timelines

    The Allocation Timeline is another tool that can help you track down memory leaks in your JS heap.

* #### Record Allocation Profiler

    Use the Record Allocation Profiler type to view memory allocation by JavaScript function.

* #### Spot frequent garbage collections

    In the Task Manager, frequently rising and falling Memory or JavaScript Memory values represent frequent garbage collections. In Timeline recordings, frequently rising and falling JS heap or node count graphs indicate frequent garbage collections.









#### [Read More](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)
