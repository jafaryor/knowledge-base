# RegExp API

## Properties:
* `RegExp.prototype.flags: string` - returns a string consisting of the flags of the current regular expression object. Flags in the flags property are sorted alphabetically (from left to right, e.g. `"gimuy"`).

* `RegExp.prototype.global: boolean` - indicates whether or not the `"g"` flag is used with the regular expression. `global` is a read-only property of an individual regular expression instance.

* `RegExp.prototype.ignoreCase: boolean` - indicates whether or not the `"i"` flag is used with the regular expression. `ignoreCase` is a read-only property of an individual regular expression instance.

* `RegExp.prototype.multiline: boolean` - indicates whether or not the `"m"` flag is used with the regular expression. `multiline` is a read-only property of an individual regular expression instance.

* `RegExp.prototype.sticky: boolean` -  reflects whether or not the search is sticky (searches in strings only from the index indicated by the `lastIndex` property of this regular expression). sticky is a read-only property of an individual regular expression object.

* `RegExp.prototype.unicode` - indicates whether or not the `"u"` flag is used with a regular expression. `unicode` is a read-only property of an individual regular expression instance.

* `lastIndex` - a read/write integer property of regular expression instances that specifies the index at which to start the next match.

    This property is set only if the regular expression instance used the `"g"` flag to indicate a global search, or the `"y"` flag to indicate a sticky search. The following rules apply:
    * If `lastIndex` is greater than the length of the string, `test()` and `exec()` fail, then `lastIndex` is set to `0`.
    * If `lastIndex` is equal to the length of the string and if the regular expression matches the empty string, then the regular expression matches input starting at `lastIndex`.
    * If `lastIndex` is equal to the length of the string and if the regular expression does not match the empty string, then the regular expression mismatches input, and `lastIndex` is reset to `0`.
    * Otherwise, `lastIndex` is set to the next position following the most recent match.

* `RegExp.prototype.source: string` - returns a `String` containing the source text of the regexp object, and it doesn't contain the two forward slashes on both sides and any flags.

    > Starting with ECMAScript 5, the source property no longer returns an empty string for empty regular expressions. Instead, the string `"(?:)"` is returned. In addition, line terminators (such as `"\n"`) are escaped now.
    ```javascript
    new RegExp().source;                    // "(?:)"

    new RegExp('\n').source === '\n';       // true, prior to ES5
    new RegExp('\n').source === '\\n';      // true, starting with ES5
    ```

## Methods:
* `RegExp.prototype.exec(str: string): string[]|null` - method executes a search for a match in a specified string. Returns a result array, or `null` if the match fails.
    ```javascript
    // Match "quick brown" followed by "jumps", ignoring characters in between
    // Remember "brown" and "jumps"
    // Ignore case
    var re = /quick\s(brown).+?(jumps)/ig;
    var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
    ```
    Result:
    * `result`:
        * `[0]` - The full string of characters matched: `Quick Brown Fox Jumps`
        * `[1], ...[n]` - The parenthesized substring matches, if any. The number of possible parenthesized substrings is unlimited: `[1] = Brown, [2] = Jumps`
        * `index` - The 0-based index of the match in the string: `4`
        * `input` - The original string: `The Quick Brown Fox Jumps Over The Lazy Dog`

    * `re`:
        * `lastIndex` - The index at which to start the next match. When `"g"` is absent, this will remain as `0`: `25`
        * `ignoreCase` - Indicates if the `"i"` flag was used to ignore case: `true`
        * `global` - Indicates if the `"g"` flag was used for a global match: `true`
        * `multiline` - Indicates if the `"m"` flag was used to search in strings across multiple lines: `false`
        * `source` - The text of the pattern: `quick\s(brown).+?(jumps)`

    If your regular expression uses the `"g"` flag, you can use the `exec()` method multiple times to find successive matches in the same string.
    ```javascript
    var myRe = /ab*/g;
    var str = 'abbcdefabh';
    var myArray;

    while ((myArray = myRe.exec(str)) !== null) {
        var msg = 'Found ' + myArray[0] + '. ';
        msg += 'Next match starts at ' + myRe.lastIndex;
        console.log(msg);
    }
    // Found abb. Next match starts at 3
    // Found ab. Next match starts at 9
    ```

    > __!!! Note:__ Do not place the regular expression literal (or `RegExp` constructor) within the `while` condition or it will create an infinite loop if there is a match due to the `lastIndex` property being reset upon each iteration. Also be sure that the global flag is set or a loop will occur here also.

    You can also use `exec()` without creating a `RegExp` object:
    ```javascript
    var matches = /(hello \S+)/.exec('This is a hello world!');
    console.log(matches[1]);        // hello world!
    ```

* `RegExp.prototype.test(str: string): boolean` - executes a search for a match between a regular expression and a specified string. Returns `true` or `false`.

    As with `exec()`, `test()` called multiple times on the same global regular expression instance will advance past the previous match.
    If the regex has the global flag set, `test()` will advance the `lastIndex` of the regex. A subsequent use of `test()` will start the search at the substring of str specified by `lastIndex`.
    ```javascript
    var regex = /foo/g;

    // regex.lastIndex is at 0
    regex.test('foo');      // true

    // regex.lastIndex is now at 3
    regex.test('foo');      // false
    ```

* `RegExp.prototype.toString(): string` - returns a string representing the regular expression.
    ```javascript
    var myExp = new RegExp('a+b+c');
    console.log(myExp.toString());          // logs '/a+b+c/'

    var foo = new RegExp('bar', 'g');
    console.log(foo.toString());            // logs '/bar/g'
    ```

    > Starting with ECMAScript 5, an empty regular expression returns the string `"/(?:)/"` and line terminators such as `"\n"` are escaped:
    ```javascript
    new RegExp().toString(); // "/(?:)/"

    new RegExp('\n').toString() === '/\n/';  // true, prior to ES5
    new RegExp('\n').toString() === '/\\n/'; // true, starting with ES5
    ```

* `RegExp.prototype[Symbol.match] === String.prototype.match`
* `RegExp.prototype[Symbol.replace] === String.prototype.replace`
* `RegExp.prototype[Symbol.search] === String.prototype.search`
* `RegExp.prototype[Symbol.split] === String.prototype.split`