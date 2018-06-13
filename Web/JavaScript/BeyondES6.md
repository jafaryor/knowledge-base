# Beyond ES6

## Exponentiation Operator
An `**` operator has been proposed for JavaScript to perform exponentiation in the same way that `Math.pow(..)` does.
```javascript
var a = 2;

a ** 4;			// Math.pow( a, 4 ) == 16
a **= 3;		// a = Math.pow( a, 3 )
a;			// 8
```

## `~` operator
The `~` operator here conforms the return value of `indexOf(..)` to a value range that is suitably boolean coercible. That is:
* `-1` produces `0` (falsy),
* anything else produces a non-zero (truthy) value, which is what we for deciding if we found the value or not.
```javascript
var vals = [ "foo", "bar", 42, "baz" ];

if (~vals.indexOf( 42 )) {
	// found it!
}
```

## SIMD (Single Instruction, Multiple Data)
The SIMD API exposes various low-level (CPU) instructions that can operate on more than a single number value at a time. For example, you'll be able to specify two vectors of 4 or 8 numbers each, and multiply the respective elements all at once (data parallelism!).

```javascript
var v1 = SIMD.float32x4( 3.14159, 21.0, 32.3, 55.55 );
var v2 = SIMD.float32x4( 2.1, 3.2, 4.3, 5.4 );

SIMD.float32x4.mul( v1, v2 );
// [ 6.597339, 67.2, 138.89, 299.97 ]
```

SIMD will include several other operations besides `mul(..)` (multiplication), such as `sub()`, `div()`, `abs()`, `neg()`, `sqrt()`, and many more.

Parallel math operations are critical for the next generations of high performance JS applications.

## WebAssembly (WASM)
`WASM` provides an alternate path for other languages to target the browser's runtime environment without having to first pass through JavaScript. Essentially, if WASM takes off, JS engines will grow an extra capability to execute a binary format of code that can be seen as somewhat similar to a bytecode (like that which runs on the JVM).

`WASM` proposes a format for a binary representation of a highly compressed AST (syntax tree) of code, which can then give instructions directly to the JS engine and its underpinnings, without having to be parsed by JS, or even behave by the rules of JS. Languages like C or C++ can be compiled directly to the WASM format instead of ASM.js, and gain an extra speed advantage by skipping the JS parsing.

`asm.js` is a subset of JavaScript designed to allow computer software written in languages such as C to be run as web applications while maintaining performance characteristics considerably better than standard JavaScript, the typical language used for such applications.

> WASM is faster than ASM.js

