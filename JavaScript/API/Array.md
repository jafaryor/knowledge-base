## Array API
* `Array.from(arrayLike, [mapFn], [thisArg]) : Array` - creates a new array instance from an array-like or iterable object. Returns a new `Array` instance.
    > __array-like objetcs__ - objects with a length property and indexed elements
    ```javascript
    // Using an arrow function as the map function to manipulate the elements
    Array.from([1, 2, 3], x => x + x);              // [2, 4, 6]

    // Generate a sequence of numbers
    // Since the array is initialized with `undefined` on each position,
    // the value of `v` below will be `undefined`
    Array.from({length: 5}, (v, i) => i);           // [0, 1, 2, 3, 4]

    // creating copy of array arr
	var arrCopy = Array.from( arr );
    ```

* `Array.isArray(obj) : boolean` - determines whether the passed value is an `Array`.

* `Array.of(element01, [element02] ...) : Array` - creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
    > The difference between `Array.of()` and the `Array` constructor is in the handling of integer arguments: `Array.of(7)` creates an array with a single element, `7`, whereas `Array(7)` creates an empty array with a length property of `7`.
    ```javascript
    Array.of(7);                // [7] 
    Array.of(1, 2, 3);          // [1, 2, 3]

    Array(7);                   // [ , , , , , , ]
    Array(1, 2, 3);             // [1, 2, 3]
    ```
    > __Warning__: Using an empty slot array would work with some array functions, but others ignore empty slots (like `map(..)`, etc.). You should never intentionally work with empty slots, as it will almost certainly lead to strange/unpredictable behavior in your programs.

* `concat(array01, [array02] ...) : Array` - merge two or more arrays. Does not change the existing arrays, but instead returns a new array.
    > __Note:__ Concatenating array(s)/value(s) will leave the originals untouched.

    > __Warning:__ `concat` doesn't use deep copy!
    ```javascript
    var num1 = [[1]];
    var num2 = [2, [3]];
    var nums = num1.concat(num2);

    console.log(nums);          // [[1], 2, [3]]
    num1[0].push(4);
    console.log(nums);          // [[1, 4], 2, [3]] - because of no deep copy
    ```

* `copyWithin(target, [start = 0], [end = this.length]) : Array` | __MUTABLE__ - shallow copies part of an array to another location in the same array and returns it, without modifying its size.
    * `target` - Zero based index at which to copy the sequence to. If negative, target will be counted from the end.

        If `target` is at or greater than `arr.length`, nothing will be copied. If `target` is positioned after `start`, the copied sequence will be trimmed to fit `arr.length`.
    * `start` -  Zero based index at which to start copying elements from. If negative, start will be counted from the end.

        If `start` is omitted, will copy from the start (defaults to `0`).

    * `end` - Zero based index at which to end copying elements from. `copyWithin` copies up to but not including `end`. If negative, `end` will be counted from the end.

        If `end` is omitted, will copy until the end (default to `arr.length`).

    ```javascript
    [1, 2, 3, 4, 5].copyWithin(-2);                 // [1, 2, 3, 1, 2]
    [1, 2, 3, 4, 5].copyWithin(0, 3);               // [4, 5, 3, 4, 5]
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4);            // [4, 2, 3, 4, 5]
    [1, 2, 3, 4, 5].copyWithin(-2, -3, -1);         // [1, 2, 3, 3, 4]
    ```

* `entries() : Array` - returns a new `Array Iterator` object that contains the key/value pairs for each index in the array.
    ```javascript
    var a = ['a', 'b', 'c'];
    var iterator = a.entries();

    for (let e of iterator) {
        console.log(e);
    }
    // [0, 'a']
    // [1, 'b']
    // [2, 'c']
    ```

* `every(callback, [thisArg]) : boolean` - method tests whether all elements in the array pass the test implemented by the provided function.
    ```javascript
    function isBigEnough(element, index, array) {
        return element >= 10;
    }

    [12, 5, 8, 130, 44].every(isBigEnough);             // false
    [12, 54, 18, 130, 44].every(isBigEnough);           // true
    ```

* `fill(value, [start = 0], [end = this.length]) : Array` | __MUTABLE__ - fills all the elements of an array from a start index to an end index with a static value. The end index is not included.

    > The __`fill`__ method is a mutable method, it will change `this` object itself, and return it, but not a copy of it.
    ```javascript
    let arr = [1, 2, 3];
    arr.fill(4);                    // [4, 4, 4]
    arr;                            // [4, 4, 4]

    [1, 2, 3].fill(4, 1);            // [1, 4, 4]
    [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
    [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
    [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
    [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
    [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]

    Array(3).fill(4);                // [4, 4, 4]
    [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

    // Objects by reference.
    var arr = Array(3).fill({}) // [{}, {}, {}];
    arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
    ```

* `filter(callback, [thisArg]) : Array` - creates a new array with all elements that pass the test implemented by the provided function.
    ```javascript
    function isNumber(obj) {
        return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
    }
    [15, null, NaN, 'undefined'].filter(isNumber);
    ```

* `find(callback, [thisArg]) : any|undefined` - returns the __value__ of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
    ```javascript
    function isPrime(element, index, array) {
        var start = 2;
        while (start <= Math.sqrt(element)) {
            if ((element % start++) < 1) {
                return false;
            }
        }

        return element > 1;
    }

    console.log([4, 5, 8, 12].find(isPrime));           // 5
    ```

* `findIndex(callback, [thisArg]) : number` - returns the __index__ of the first element in the array that satisfies the provided testing function. Otherwise `-1` is returned.
    ```javascript
    console.log([4, 6, 7, 12].findIndex(isPrime));      // 2
    ```

* `flatMap(callback, [thisArg]) : Array` - first maps each element using a mapping function, then flattens the result into a new array. It is identical to a `map` followed by a `flatten` of depth 1.

* `flatten([depth = 1]) : Array` - creates a new array with all sub-array elements concatted into it recursively up to the specified depth.
    * `depth` (Optional) - the depth level specifying how deep a nested array structure should be flattened. Defaults to `1`.

* `forEach(callback, [thisArg]) : undefined` - executes a provided function once for each array element.
    > __Note:__ There is no way to stop or break a `forEach()` loop other than by throwing an exception.

* `includes(searchElement, [fromIndex = 0]) : boolean` - determines whether an array includes a certain element, returning `true` or `false` as appropriate.
    ```javascript
    [1, 2, NaN].includes(NaN);              // true
    ```
    > `Array#includes()` uses matching logic that will find NaN values, but will not distinguish between `-0` and `0`.

* `indexOf(searchElement, [fromIndex = 0]) : number` - returns the first index at which a given element can be found in the array, or `-1` if it is not present.

* `join([separator = ',']) : string` - joins all elements of an array (or an array-like object) into a string and returns this string.
    > __Warning:__ If an element is `undefined` or `null`, it is converted to the empty string.

* `keys() : Array` - returns a new `Array Iterator` object that contains the keys for each index in the array.
    ```javascript
    var arr = ['a', , 'c'];
    var sparseKeys = Object.keys(arr);
    var denseKeys = [...arr.keys()];
    console.log(sparseKeys);            // ['0', '2']
    console.log(denseKeys);             // [0, 1, 2]
    ```

* `lastIndexOf(searchElement, [fromIndex = this.length - 1]) : number` - returns the last index at which a given element can be found in the array, or `-1` if it is not present. The array is searched backwards, starting at `fromIndex`.

* `map(callback, [thisArg])` - creates a new array with the results of calling a provided function on every element in the calling array.
    ```javascript
    [1, 2, 3].map(Math.sqrt);           // [1, 4, 9]
    ```

* `pop() : any|undefined` | __MUTABLE__ - removes the __last__ element from an array and returns that element. This method changes the length of the array. Returns the removed element from the array; `undefined` if the array is empty.

* `push(element01, [element02] ...)` | __MUTABLE__ - adds one or more elements to the end of an array and returns the new length of the array.
    ```javascript
    [1, 2].push([3, 4]);            // [1, 2, 3, 4]
    ```

* `reduce(callback, [initialValue = this[0]]) : any` - applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
    * `callback`:
        * `accumulator` - The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback
        * currentValue
        * currentIndex (Optional)
        * array (Optional)
    > Calling `reduce()` on an empty array without an initial value is an error.

    > __Note:__ If `initialValue` isn't provided, `reduce()` will execute the callback function starting at index `1`, skipping the first index. If `initialValue` is provided, it will start at index `0`.

    ```javascript
    [ 0, 1, 2, 3 ].reduce(
        ( accumulator, currentValue ) => accumulator + currentValue,
        0
    );              // 6

    [[0, 1], [2, 3], [4, 5]].reduce(
        function(accumulator, currentValue) {
            return accumulator.concat(currentValue);
        },
        []
    );              // [0,1,2,3,4,5]

    [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4]
        .sort()
        .reduce((accumulator, current) => {
            const length = accumulator.length
            if (length === 0 || accumulator[length - 1] !== current) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);     // [1,2,3,4,5]
    ```

* `reduceRight(callback, [initialValue = this[0]]) : any` - applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.

* `reverse() : Array` | __MUTABLE__ - reverses an array in place, mutating the array, and returning a reference to the array.

* `shift() : any|undefined` | __MUTABLE__ -  removes the first element from an array and returns that removed element.

* `slice([begin = 0], [end = this.length]) : Array` - returns a shallow copy of a portion of an array into a new array object selected from `begin` to `end` (end not included). The original array will not be modified.

* `some(callback, [thisArg]) : boolean` - tests whether at least one element in the array passes the test implemented by the provided function.

* `sort([compareFunction]) : Array` | __MUTABLE__ - sorts the elements of an array in place and returns the array. The sort is not necessarily stable.
    * If `compareFunction` omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each element.

    ```javascript
    function compare(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }

    function compareNumbers(a, b) {
        return a - b;
    }
    ```

* `splice(start, [deleteCount = this.length-start], [item01], [item02] ...) : Array` - changes the contents of an array by removing existing elements and/or adding new elements.
    * If `deleteCount` is `0`, then no elements to remove.
    * `item1, item2, ...` (Optional) - The elements to add to the array, beginning at the start index. If you don't specify any elements, `splice()` will only remove elements from the array.

    Returns an array containing the deleted elements.

* `toLocaleString([locales], [options]) : string` - returns a string representing the elements of the array. The elements are converted to Strings using their `toLocaleString` methods and these Strings are separated by a locale-specific String (such as a comma “,”).
    * `locales` (Optional) - A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the `Intl` page.
    * `options` (Optional) - An object with configuration properties, for:
        * Object: `Object.prototype.toLocaleString()`
        * Number: `Number.prototype.toLocaleString()`
        * Date: `Date.prototype.toLocaleString()`
    ```javascript
    var prices = ['￥7', 500, 8123, 12]; 
    prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
    // "￥7,￥500,￥8,123,￥12"
    ```

* `toString() : string` - returns a string representing the specified array and its elements.

* `unshift(element01, [element02] ...)` - adds one or more elements to the beginning of an array and returns the new length of the array.

* `values()` - returns a new `Array Iterator` object that contains the values for each index in the array.
    ```javascript
    var arr = ['w', 'y', 'k', 'o', 'p'];
    var iterator = arr.values();

    console.log(iterator.next().value); // w 
    console.log(iterator.next().value); // y 

    for (let letter of iterator) {
        console.log(letter);
    }
    ```

### `callback`:
* `currentValue` (required) - current element being processed in the array.
* `index` (optional) - index of the current element being processed in the array.
* `array` (optional) - the array every was called upon.