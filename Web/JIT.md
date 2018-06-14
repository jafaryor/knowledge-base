## just-in-time (JIT) compilation
### History
JavaScript was created in 1995. It wasn’t designed to be fast, and for the first decade, it wasn’t fast.

Then the browsers started getting more competitive.

In 2008, a period that people call the performance wars began. Multiple browsers added just-in-time compilers, also called `JIT`s. As JavaScript was running, the `JIT` could see patterns and make the code run faster based on those patterns.

The introduction of these `JIT`s led to an inflection point in the performance of JavaScript. Execution of JS was 10x faster.

With this improved performance, JavaScript started being used for things no one ever expected it to be used for, like server-side programming with `Node.js`. The performance improvement made it feasible to use JavaScript on a whole new class of problems.

We may be at another one of those inflection points now, with `WebAssembly`.

### How JavaScript is run in the browser
JavaScript is an interpreted language.

__Interpreter pros and cons:__

Interpreters are quick to get up and running. You don’t have to go through that whole compilation step before you can start running your code. You just start translating that first line and running it.

Because of this, an interpreter seems like a natural fit for something like JavaScript. It’s important for a web developer to be able to get going and run their code quickly.

And that’s why browsers used JavaScript interpreters in the beginning.

But the __con__ of using an interpreter comes when you’re running the same code more than once. For example, if you’re in a loop. Then you have to do the same translation over and over and over again.

__Compiler pros and cons:__

The compiler has the opposite trade-offs.

It takes a little bit more time to start up because it has to go through that compilation step at the beginning. But then code in loops runs faster, because it doesn’t need to repeat the translation for each pass through that loop.

Another difference is that the compiler has more time to look at the code and make edits to it so that it will run faster (_optimize the code_).

The interpreter is doing its work during runtime, so it can’t take much time during the translation phase to figure out these optimizations.

### JIT: the best of both worlds
As a way of getting rid of the interpreter’s inefficiency—where the interpreter has to keep retranslating the code every time they go through the loop—browsers started mixing compilers in.

Different browsers do this in slightly different ways, but the basic idea is the same. They added a new part to the JavaScript engine, called a monitor (aka a profiler). That monitor watches the code as it runs, and makes a note of how many times it is run and what types are used.

At first, the monitor just runs everything through the interpreter. If the same lines of code are run a few times, that segment of code is called __warm__. If it’s run a lot, then it’s called __hot__.

When a function starts getting warm, the `JIT` will send it off to compilation. Then it will store that compilation. It makes JavaScript run faster by monitoring the code as it’s running it and sending hot code paths to be optimized. This has resulted in many-fold performance improvements for most JavaScript applications.

Even with these improvements, though, the performance of JavaScript can be unpredictable. And to make things faster, the `JIT` has added some overhead during runtime, including:
* optimization and deoptimization
* memory used for the monitor’s bookkeeping and recovery information for when bailouts happen
* memory used to store baseline and optimized versions of a function

There’s room for improvement here: that overhead could be removed, making performance more predictable. And that’s one of the things that `WebAssembly` does.

### [More Resources](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers)