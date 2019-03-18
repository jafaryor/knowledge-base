## Techniques for Javascript Performance Optimization
The compilers built into V8 is so-called method JITs, meaning the unit of compilation is always a method, aka a function in JavaScript speak.

Make sure to split large functions into smaller building blocks. This is generally good advice for maintainability, but also helps the JIT to properly optimize everything that’s relevant to your application. Smaller functions also generally play well together with the inlining machinery inside the JIT, and often reduce the cost of compilation and optimization.

Try to avoid mixing field values of different types, i.e. don’t mix numbers, strings, objects, other primitives, unless that’s what you intended to do. Specifically don’t pre-initialize number fields to `null` or `undefined`, but choose sensible default numbers (use `NaN` if in doubt)

#### [JavaScript Performance Pitfalls in V8](https://ponyfoo.com/articles/javascript-performance-pitfalls-v8)
