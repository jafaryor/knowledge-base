## Ahead-of-Time Compilation (`AOT`)
`AOT` works by compiling your code before it is “delivered” to whatever runtime environment runs the code. A good example is Angular’s `AOT` compiler. Before your JavaScript code is run in the browser, it’s pre-compiled into an optimized JavaScript format before it’s sent to the browser. This is different from Just-in-time (`JIT`) which uses the browser to compile your code.

With `AOT`, your code is compiled before hand. With `JIT`, your code is compiled at runtime in the browser.

### `AOT` vs `JIT`
* __Smaller payloads__

    With `JIT`, the Angular compiler must ship with your JavaScript bundle so your code can be compiled by the browser. Since `AOT` compiles code before it is shipped, the Angular compiler is no longer needed with the resulting bundle. This drastically reduces the size of the bundle file that gets delivered to the browser and significantly cuts down on page load time.

* __Performance__

    Since the browser doesn't have to worry about compiling any Angular code, it can jump straight to rendering views. This makes for faster load times and dramatically improves performance. Additionally, since AOT ultimately reduces the amount of JavaScript code shipped, script execution time sees an improvement as well. Not only do pages load faster, they operate faster too!

> On the other hand, the `JIT` has more runtime information to use, so it can theoretically optimize code better than an `AOT` system

### [How Angular AOT Compilation works](https://angular.io/guide/aot-compiler)