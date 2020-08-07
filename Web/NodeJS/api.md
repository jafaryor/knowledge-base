# NodeJS API
## File System
### Buffer
• API to manipulate binary data in node.
• Implements `UInt8Array` API
• Similar to arrays of integers from `0` to `255`.
• Size of the buffer is established when it is created and cannot be changed.
• To create a buffer you can use `Buffer.from()`, `Buffer.alloc()`, and `Buffer.allocUnsafe()`
• `allocUnsafe` is faster and therefore might be required in performance critical paths of
some applications. But it is, as the name imply, unsafe and a security risk.

```javascript
const buffer = Buffer.from('Hello World!');

console.log(buffer); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
console.log(buffer.toString()); // Hello World!

console.log(Buffer.alloc(3, 0x61)); // <Buffer 61 61 61>
```

### Sync Functions
* They all have the Sync suffix: `readFileSync`, `writeFileSync`, …
* They are the easiest to use
* Should not be used for code that is or can benefit from being async (like web services)
* Should not be used when the file sizes are unknown or known to be large.
* You should avoid using sync methods. As they block code, they can stop your entire microservice, webserver, program.
* Is ok to use for simple CLIs, utility scripts or programs that resemble a single-run tool and there is no intention of leveraging non-blocking execution.
* If you are in doubt, go for the _async_ functions or _stream_ API.

#### `readFileSync`
• Path parameter can be a file path as string or buffer, it can be a URL and can be an integer representing a file descriptor
• Encoding by default is null, but if left undefined buffer is returned.
• Options can be string, in that case will be the encoding.

```javascript
const fs = require('fs');

const fileContent = fs.readFileSync('./file.txt', 'utf8');
const fileBuffer = fs.readFileSync('./file.txt');

console.log(fileContent); // Hello World!
console.log(fileBuffer); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
console.log(fileBuffer.toString()); // Hello World!
```

#### `writeFileSync`
• File parameter works like readFileSync
• `writeFileSync` will replace the file if it already exists
• Encoding by default is utf8
• If data is buffer, encoding is ignored
• Options can be string, in that case it will be the encoding.

```javascript
const fs = require('fs');

const buffer = Buffer.from([
    0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21,
]);

fs.witeFileSync('./file.txt', 'Hello World!', 'utf8');
fs.writeFileSync('./file.txt', buffer);
```

#### `mkdirSync`
• Path parameter does not accept a file descriptor
• Recursive mode to create parent folders (Since node 10.12)
• Options can be an integer representing file mode on unix systems

```javascript
const fs = require('fs');

try {
    fs.mkdirSync('./parent/new-dir');
} catch (error) {
    console.error('Failed because directory parent doesn\'t exists');
}

fs.mkdirSync('./parent/new-dir', {recursive: true});
```

#### `accessSync`
• Test user’s permissions to file or directory specified by path.
• Mode option is useful for checking specific kinds of access, like: File_OK, Read Acess,
Write Access, ...
• __Don’t use__ access to check accessibility before opening/reading/writing. It is not recommended because introduces a race condition.

```javascript
const fs = require('fs');

try {
    // Check if the file is readable and writable.
    fs.accessSync('./file.txt', fs.constants.R_OK | fs.constants.W_OK);
} catch (error) {
    console.error(error);
}
```

#### `statSync`
• Get information about given file or directory
• Returns class `fs.Stat`, which contain very helpful methods and properties like: `isDirectoy()`, `isFIFO()`, `isFile()`, `isSocket()`, `isSymbolicLink()`, …
• Don’t use stat to check accessibility before opening/reading/writing. It is not recommended because introduces a race condition.

```javascript
const fs = require('fs');

const stats = fs.statSync('./file.txt');

console.log(`Is symbol link? ${stats.isSymbolicLink()}`);
console.log(`Is directory? ${stats.isDirectory()}`);
console.log(`Is file? ${stats.isFile()}`);
console.log(`Created at:? ${stats.birthtimeMs}`);
```


### Async Functions
* They don’t have a suffix: `readFile`, `writeFile`, `access`, `stat` …
* They will not block your code
* They cannot be stopped once started
* Functions like `readFile` will read the entire file to memory, so not the best option when the file size is unknown or known to be large.
* To avoid reading a big files at once and penetrating your server. Use `fs.read()` (manual partitioning) or `ReadStream` (automatically partitioned).

Signature of async functions are equal to the sync ones, except that they require a
callback as last argument.

#### Promise API
• The promise version of the functions don’t accept a callback as last parameter. Instead,
they return a promise.
• They can be found at fs.promises
• They are a recent addition. On node 10 you will se an experimental warning if you use
them.

```javascript
const fs = require('fs');
const fsPromise = fs.promises;

fs.readFile('./file.txt', 'utf8', (error, file) => {
    if (error) return console.error(error.code, error.message);

    console.log(file);
});

fsPromises.readFile('./file.txt', 'utf8')
    .then(console.log)
    .catch(console.error);

async function read() {
    try {
        const file = await fsPromises.readFile('./file.txt', 'uts8');

        console.log(file);
    } catch (error) {
        console.error(error.code, error.message);
    }
}

read();
```

Error handling in Async filesystem functions: 
• As said with the sync functions, you always must handle IO errors somehow.
• When using callbacks, the first parameter of the callback function will be an `error` object
or `null`.
• When using promises, add a `catch` to the promise.
• When using `await`, add a `try`/`catch` block.


### Streams
• Event based APIs for asynchronous data
• Can be piped together. (The output of one stream is the input of another)
• Can be paused of closed prematurely
• Can avoid memory overflow if used correctly
• `Readable`, `Writable`, `Duplex` and `Transform` streams

#### Readable Stream
• Are an abstraction from a source from which data is consumed. Examples: A _file_, `STDIN`, _HTTP Request_
• Can be consumed in two modes, _flowing_ and _paused_
• In __flowing mode__, data is read automatically and provided as quickly as possible via the
`EventEmitter` interface.
• In __paused mode__, the `stream.read()` method must be called explicitly to read chunks of
data.
• All Readable streams begin in paused mode but can be switched to flowing mode in one of the following ways
• Adding a `'data'` event handler.
• Calling the `stream.resume()` method.
• Calling the `stream.pipe()` method to send the data to a Writable Stream.
• The important concept to remember is that a Readable will not generate data until a mechanism for either consuming or ignoring that data is provided. If the consuming mechanism is disabled or taken away, the Readable will attempt to stop generating the data.
• For backward compatibility reasons, removing `'data'` event handlers will not automatically pause the stream. Also, if there are piped destinations, then calling `stream.pause()` will not guarantee that the stream will remain paused once those destinations drain and ask for more data.

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('./file.txt', {
    highWaterMark: 10 // make chunks max size of 10 bytes.
});

// Reading starts only when data is registered.
readStream.on('data', chunk => {
    console.log(chunk.length); // 10 bytes
})

readStream.on('error', console.error);

readStream.on('close', () => {
    console.log('The file was closed');
})
```

> The Readable stream API evolved across multiple Node.js versions and provides multiple methods of consuming stream data. In general, developers should choose one of the methods of consuming data and should never use multiple methods to consume data from a single stream. Specifically, using a combination of `on('data')`, `on('readable')`, `pipe()`, or `async` iterators could lead to unintuitive behavior.

#### Writable stream
• Writable streams are an abstraction for a destination to which data is written. Ex: _HTTP_ _Responses_, `STDOUT`, _File write streams._
• To write on them, call the `write()` method or pipe it to a readable stream.

```javascript
const fs = require('fs');
const zlib = require('zlib');
const {pipeline} = require('stream');

const gzip = zlib.createGzip();
const readable = fs.createReadStream('./file-01.txt');
const writable = fs.createWriteStream('./file-02.txt', 'utf8');

writable.write('some text');
writable.end('last line');

readable.pipe(gzip).pipe(writable);

pipeline(
    readable,
    gzip,
    writable,
    (error) => {
        if (error) console.error(error);
        else console.log('Done!');
    }
);
```


## Readline
Reads the file line by line:
``` javascript
const fs = require('fs');
const readline = require('readline');

const readStream = readline.createInterface({
    input: fs.createReadSteam('./file.txt');
    crlfDelay: Infinity // make sure we read \r\n correctly.
});

readStream.on('line', line => {
    console.log(`Line from file: ${line}`);
});
```


## Path Module
• Has several functions for working with paths, like `path.join()`, `path.resolve()` and `path.relative()`
• Don’t ever try to manipulate paths by hand, always use the path module instead.
• Every module has a special variable called `__dirname` which contains the path for the module file itself.

```javascript
const path = require('path');

const filePth = path.join(__dirname, '../..', 'node-js/hello-world.js');
```

---

### [Creating a Server](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

### [Implementing a WebSocket server with Node.js](https://medium.com/hackernoon/implementing-a-websocket-server-with-node-js-d9b78ec5ffa8)
