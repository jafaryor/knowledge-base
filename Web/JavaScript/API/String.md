## String

JavaScript string is sequence of __16-bits__ values (called __code units__) that represent characters from UTF-16 encoding.

Each _element_ in a string is technically not a _character_, but a __code unit__.

__Unicode__ is an universal character set that defines the list of characters from majority of the writing systems, and associates for every character an unique number (code point).

__Unicode__ provides:
* unique number for every character, 
* no matter what the platform, 
* no matter what the program, 
* no matter what the language.

__Code point__ is a number assigned to a single character.

The code point is presented in the format `U+<hex>`, where `U+` is a prefix that means Unicode and `<hex>` is a number in hexadecimal.

Code points are numbers in range from `U+0000` to `U+10FFFF`.

__Plane__ is a range of `65,536` (or `10000_16`) contiguous Unicode code points from `U+n0000` up to `U+nFFFF`, where n can take values from `0_16` to `10_16`.

Planes split Unicode code points into 17 equal groups:
* Plane 0 contains code points from `U+0000` to `U+FFFF`,
* Plane 1 contains code points from `U+10000` to `U+1FFFF`
* ...
* Plane 16 contains code points from `U+100000` to `U+10FFFF`.

__Plane 0 (U+0000 - U+FFFF)__ is a special one, named __Basic Multilingual Plane__ or shortly __BPM__. It contains characters from most of the modern languages (Basic Latin, Cyrillic, Greek, etc) and a big number of symbols.

__Code unit__ is a bit sequence used to encode each character within a given encoding form.

Because astral code points require `21` bits to save the information, UTF-16 says that you need two code units of 16-bit. The code point `U+1F600` is split into so called surrogate pair: `0xD83D` (high-surrogate code unit) and `0xDE00` (low-surrogate code unit).

__Surrogate pair__ is a representation for a single abstract character that consists of a sequence of code units of two 16-bit code units, where the first value of the pair is a __high-surrogate code unit__ and the second value is a __low-surrogate code unit__.

[Link: What every JavaScript developer should know about Unicode](https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/)


## String API

* `String.fromCharCode(num1: number, [...], [numN: number]): string` - returns a string created from the specified sequence of UTF-16 code units.
    * `num1, ..., numN` - a sequence of numbers that are UTF-16 code units. The range is between `0` and `65535` (`0xFFFF`). Numbers greater than `0xFFFF` are truncated. No validity checks are performed.

    ```javascript
    String.fromCharCode(65, 66, 67);  // returns "ABC"
    String.fromCharCode(0x2014)       // returns "—"
    String.fromCharCode(0x12014)      // also returns "—"; the digit 1 is truncated and ignored
    ```

* `String.fromCodePoint(num1: number, [...], [numN: number]): string` - returns a string created by using the specified sequence of code points.  Since the higher code point characters use two (lower value) "surrogate" numbers to form a single character, `String.fromCodePoint()` can be used to return such a pair and thus adequately represent these higher valued characters.

    > Doesn't supported by IE.

    > `fromCharCode` is about twice as fast as `fromCodePoint`.

* `charAt([index: number = 0]): string` - returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string. Returns empty string if index is out of range.

    Fixing `charAt()` to support non-Basic-Multilingual-Plane (BMP) characters:
    ```javascript
    function fixedCharAt(str, idx) {
    var ret = '';
    str += '';
    var end = str.length;

    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    while ((surrogatePairs.exec(str)) != null) {
        var li = surrogatePairs.lastIndex;
        if (li - 2 < idx) {
            idx++;
        } else {
            break;
        }
    }

    if (idx >= end || idx < 0) {
        return '';
    }

    ret += str.charAt(idx);

    if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx + 1))) {
        // Go one further, since one of the "characters" is part of a surrogate pair
        ret += str.charAt(idx + 1);
    }

    return ret;
    }
    ```

* `charCodeAt([index: number = 0]): string|NaN` - returns an integer between `0` and `65535` representing the UTF-16 code unit at the given index (the UTF-16 code unit matches the Unicode code point for code points representable in a single UTF-16 code unit, but might also be the first code unit of a surrogate pair for code points not representable in a single UTF-16 code unit, e.g. Unicode code points > `0x10000`). If you want the entire code point value, use `codePointAt()`.

    Returns `NaN` if index is out of range.

* `codePointAt(pos: number): string|undefined` - returns a non-negative integer that is the Unicode code point value. Returns `undefined` if there is no element at `pos`.

* `concat(str01, [str02] ...): srting` method concatenates the string arguments to the calling string and returns a new string.

    > It is strongly recommended that the assignment operators (`+`, `+=`) are used instead of the `concat()` method as the assignment operators are several times faster.

* `endsWith(searchString: string, [length: number = this.length]): boolean` - determines whether a string ends with the characters of a specified string.
    * `length` - if provided it is used to determine the length of the string on which the method is run. If omitted, the default value is the length of the string.
    ```javascript
    var str = 'To be, or not to be, that is the question.';

    console.log(str.endsWith('question.')); // true
    console.log(str.endsWith('to be'));     // false
    console.log(str.endsWith('to be', 19)); // true
    ```

* `includes(searchString: string, [position: number = 0]): boolean` - determines whether one string may be found within another string.
    * `position` - the position within the string at which to begin searching for `searchString`.

* `indexOf(searchValue: string, [fromIndex: number = 0]): number` - returns the index within the calling String object of the first occurrence of the specified value, starting the search at `fromIndex`. Returns `-1` if the value is not found.

    For `fromIndex` values lower than `0` or greater than `str.length`, the search starts at index `0` and `str.length` respectively.

* `lastIndexOf(searchValue: string, [fromIndex: number = +Infinity]): number` - returns the index within the calling String object of the last occurrence of the specified value, searching backwards from fromIndex. Returns `-1` if the value is not found.

    If `fromIndex >= str.length`, the whole string is searched. If `fromIndex < 0`,  the behavior will be the same as if it would be `0`.

* `localeCompare(compareString, [locales], [options])` - returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order.

    Returns:
    * Negative when the `this` occurs before `compareString`
    * Positive when the `this` occurs after `compareString`
    * Returns `0` if they are equivalent

* `padEnd(targetLength: number, [padString: string = ' ']): string` - pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied from the end (right) of the current string.
    * `padString` - the string to pad the current string with. If this string is too long to stay within the target length, it will be truncated and the left-most part will be applied. The default value for this parameter is `" "` (`U+0020`).

* `padStart(targetLength: number, [padString: string = ' ']): string` - pads the current string with another string (repeated, if needed) so that the resulting string reaches the given length. The padding is applied from the start (left) of the current string.

* `repeat(count: number): string` - constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.

* `slice(beginIndex: number, [endIndex: number]): string` method extracts a section of a string and returns it as a new string.
    * `beginIndex` - the zero-based index at which to begin extraction. If negative, it is treated as `strLength + beginIndex`.
    * `endIndex` - the zero-based index before which to end extraction. The character at this index will not be included. If `endIndex` is omitted, `slice()` extracts to the end of the string. If negative, it is treated as `strLength + endIndex`.

* `split([separator = this], [limit: number]): string[]` - splits a `String` object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.
    * `separator` - specifies the string which denotes the points at which each split should occur. If `separator` is omitted or does not occur in `str`, the array returned contains one element consisting of the entire string. If `separator` is an empty string, `str` is converted to an array of characters.
    * `limit` - integer specifying a limit on the number of splits to be found. if the end of the string is reached before the specified limit is reached. The left-over text is not returned in the new array.

    If `separator` is a regular expression that contains capturing parentheses, then each time `separator` is matched, the results (including any undefined results) of the capturing parentheses are spliced into the output array. However, not all browsers support this capability.

    ```javascript
    var myString = 'Hello World. How are you doing?';
    var splits = myString.split(' ', 3);
     // ["Hello", "World.", "How"]

    var myString = 'Hello 1 word. Sentence number 2.';
    var splits = myString.split(/(\d)/);
    // [ "Hello ", "1", " word. Sentence number ", "2", "." ]

    var str = 'asdfghjkl';
    var strReverse = str.split('').reverse().join('');  // 'lkjhgfdsa'
    ```

    > __Note:__ When the string is empty, `split()` returns an array containing one empty string, rather than an empty array. If the string and separator are both empty strings, an empty array is returned.

* `startsWith(searchString: string, position: number = 0): boolean` - determines whether a string begins with the characters of a specified string.
    * `position` - the position in this string at which to begin searching for `searchString`.

* `substr(start, [length: number]): string` - returns the part of a string between the start index and a number of characters after it.
    * If `length` is omitted, `substr()` extracts characters to the end of the string.
    * If `length` is `undefined`, `substr()` extracts characters to the end of the string.
    * If `length` is a negative number, it is treated as 0.

    > For both `start` and `length`, `NaN` is treated as`0`.

    ```javascript
    var aString = 'Mozilla';

    aString.substr(0, 1);   // 'M'
    aString.substr(1, 0);   // ''
    aString.substr(-1, 1);  // 'a'
    aString.substr(1, -1);  // ''
    aString.substr(-3);     // 'lla'
    aString.substr(1);      // 'ozilla'
    aString.substr(-20, 2); // 'Mo'
    aString.substr(20, 2);  // ''
    ```

* `substring(indexStart: number, [indexEnd: number]): string` - returns characters from `indexStart` up to but not including `indexEnd`. , or to the end of the string.
    * `indexStart` - the index of the first character to include in the returned substring.
    * `indexEnd` - the index of the first character to exclude from the returned substring.

    > Any argument value that is less than 0 or greater than `stringName.length` is treated as if it were `0` and `stringName.length` respectively. Any argument value that is `NaN` is treated as if it were `0`.

* `toLocaleLowerCase(locale: Object): string` - returns the calling string value converted to lower case, according to any locale-specific case mappings.
    * `locale` - The locale parameter indicates the locale to be used to convert to lower case according to any locale-specific case mappings. If multiple locales are given in an Array, the best available locale is used. The default locale is the host environment’s current locale.

* `toLocaleUpperCase(locale: Objcet): string` - returns the calling string value converted to upper case, according to any locale-specific case mappings.

* `toLowerCase(): string` - returns the calling string value converted to lower case.

* `toUpperCase(): string` - returns the calling string value converted to uppercase (the value will be converted to a string if it isn't one).

* `trim(): string` - removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

* `trimLeft(): string` - removes whitespace from the left end of a string.

* `trimRight(): string` - removes whitespace from the right end of a string.

* ``String.raw`templateString`:string `` __or__ `  String.raw(callSite, ...substitutions):string` - is a tag function of template literals. It's used to get the raw string form of template strings (that is, the original, uninterpreted text).
    * `callSite` - well-formed template call site object, like `{ raw: ['foo', 'bar', 'baz'] }`.
    * `...substitutions` - contains substitution values.
    * `templateString` - a template string, optionally with substitutions (`${...}`).

    ```javascript
    String.raw`Hi\n${2+3}!`;
    // 'Hi\n5!', the character after 'Hi'
    // is not a newline character,
    // '\' and 'n' are two characters.

    String.raw`Hi\u000A!`;
    // 'Hi\u000A!', same here, this time we will get the
    //  \, u, 0, 0, 0, A, 6 characters.
    // All kinds of escape characters will be ineffective
    // and backslashes will be present in the output string.
    // You can confirm this by checking the .length property
    // of the string.

    let name = 'Bob';
    String.raw`Hi\n${name}!`;
    // 'Hi\nBob!', substitutions are processed.

    // Normally you would not call String.raw() as a function,
    // but to simulate `t${0}e${1}s${2}t` you can do:
    String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
    // Note that 'test', a string, is an array-like object
    // The following is equivalent to
    // `foo${2 + 3}bar${'Java' + 'Script'}baz`
    String.raw({
    raw: ['foo', 'bar', 'baz'] 
    }, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
    ```

* `search(regexp: RegExp): number` - executes a search for a match between a regular expression and this `String` object. Returns the index of the first match between the regular expression and the given string; if not found, `-1`.

* `replace(regexp: RegExp|substr: string, newSubstr:stinrg|function: Function)` - returns a new string with some or all matches of a `pattern` replaced by a `replacement`. The `pattern` can be a string or a `RegExp`, and the `replacement` can be a string or a function to be called for each match.

    * `regexp` (pattern) - a `RegExp` object or literal. The match or matches are replaced with `newSubStr` or the value returned by the specified `function`.
    * `substr` (pattern) - a `String` that is to be replaced by `newSubStr`. It is treated as a verbatim string and is not interpreted as a regular expression. Only the first occurrence will be replaced.
    * `newSubStr` (replacement) - the `String` that replaces the substring specified by the specified `regexp` or `substr` parameter. A number of special replacement patterns are supported.
    * `function` (replacement) - a function to be invoked to create the new substring to be used to replace the matches to the given `regexp` or `substr`. Arguments:
        * `match` - the matched substring. (Corresponds to `$&` above.)
        * `p1, p2, ...` - the _nth_ parenthesized submatch string, provided the first argument to `replace()` was a `RegExp` object. (Corresponds to `$1`, `$2`, etc. above.) For example, if `/(\a+)(\b+)/`, was given, `p1` is the match for `\a+`, and `p2` for `\b+`.
        * `offset` - the offset of the matched substring within the whole string being examined. (For example, if the whole string was `'abcd'`, and the matched substring was `'bc'`, then this argument will be 1.)
        * `string` - the whole string being examined.

    The _replacement string_ can include the following special replacement patterns:
    * `$$` - Inserts a "$".
    * `$&` - Inserts the matched substring.
    * `$` ` - Inserts the portion of the string that precedes the matched substring.
    * `$'` - Inserts the portion of the string that follows the matched substring.
    * `$n` - Where `n` is a positive integer less than `100`, inserts the nth parenthesized submatch string, provided the first argument was a `RegExp` object. Note that this is 1-indexed.

    Examples:
    * Switching words in a string
        ```javascript
        var re = /(\w+)\s(\w+)/;
        var str = 'John Smith';
        var newstr = str.replace(re, '$2, $1');     // Smith, John
        ```
    * Replacing a Fahrenheit degree with its Celsius equivalent
        ```javascript
        function f2c(x) {
            function convert(str, p1, offset, s) {
                return ((p1 - 32) * 5/9) + 'C';
            }
            var s = String(x);
            var test = /(-?\d+(?:\.\d*)?)F\b/g;

            return s.replace(test, convert);
        }
        ```

* `match(regexp: RegExp): string[]|null` - retrieves the matches when matching a string against a regular expression.

    If the string matches the expression, it will return an Array containing the entire matched string as the first element, followed by any results captured in parentheses.
    
    If there were no matches, `null` is returned.

    ```javascript
    var re = new MyRegExp('([0-9]+)-([0-9]+)-([0-9]+)');
    var str = '2016-01-02';
    var result = str.match(re); // String.prototype.match calls re[Symbol.match]

    console.log(result.group(1)); // 2016
    console.log(result.group(2)); // 01
    console.log(result.group(3)); // 02
    ```

    If the regular expression includes the `g` flag, the method returns an Array containing all matched substrings rather than match objects.
    
    If the regular expression does not include the `g` flag, `str.match()` will return the same result as `RegExp.exec()`.

    * If you need to know if a string matches a regular expression `RegExp`, use `RegExp.test()`.
    * If you only want the first match found, you might want to use `RegExp.exec()` instead.
    * if you want to obtain capture groups and the global flag is set, you need to use `RegExp.exec()` instead.

    ```javascript
    var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
        str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
        str3 = "The contract was declared null and void.";

    str1.match("number");   // "number" is a string. returns ["number"]
    str1.match(NaN);        // the type of NaN is the number. returns ["NaN"]
    str1.match(Infinity);   // the type of Infinity is the number. returns ["Infinity"]
    str1.match(+Infinity);  // returns ["Infinity"]
    str1.match(-Infinity);  // returns ["-Infinity"]
    str2.match(65);         // returns ["65"]
    str2.match(+65);        // A number with a positive sign. returns ["65"]
    str3.match(null);       // returns ["null"]
    ```

* `normalize([form = 'NFC']): string` - returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first).
    * `form` - specifies the Unicode Normalization Form:
        * `NFC` — Normalization Form Canonical Composition (Characters are decomposed by canonical equivalence, and multiple combining characters are arranged in a specific order).
        * `NFD` — Normalization Form Canonical Decomposition (Characters are decomposed and then recomposed by canonical equivalence).
        * `NFKC` — Normalization Form Compatibility Composition (Characters are decomposed by compatibility, and multiple combining characters are arranged in a specific order).
        * `NFKD` — Normalization Form Compatibility Decomposition (Characters are decomposed by compatibility, then recomposed by canonical equivalence).

    The __canonical ordering__ is mainly concerned with the ordering of a sequence of combining characters.

    | NFC character | A | m | é ||
    |:-:|---|:-:|:-:|:-:|
    | NFC code point | 0041 | 006d | 00e9 |
    | NFD code point | 0041 | 006d | 0065 | 0301 |
    | NFD character	 | A | m | e | ◌́ |

    ```javascript
    // U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
    // U+0323: COMBINING DOT BELOW
    var str = '\u1E9B\u0323';


    // Canonically-composed form (NFC)

    // U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
    // U+0323: COMBINING DOT BELOW
    str.normalize('NFC'); // '\u1E9B\u0323'
    str.normalize();      // same as above


    // Canonically-decomposed form (NFD)

    // U+017F: LATIN SMALL LETTER LONG S
    // U+0323: COMBINING DOT BELOW
    // U+0307: COMBINING DOT ABOVE
    str.normalize('NFD'); // '\u017F\u0323\u0307'


    // Compatibly-composed (NFKC)

    // U+1E69: LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE
    str.normalize('NFKC'); // '\u1E69'


    // Compatibly-decomposed (NFKD)

    // U+0073: LATIN SMALL LETTER S
    // U+0323: COMBINING DOT BELOW
    // U+0307: COMBINING DOT ABOVE
    str.normalize('NFKD'); // '\u0073\u0323\u0307'
    ```

### `locales`
Optional. A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the locales argument, see the __Intl API__. The following Unicode extension keys are allowed:

* `co`
    
    Variant collations for certain locales. Possible values include: `"big5han", "dict", "direct", "ducet", "gb2312", "phonebk", "phonetic", "pinyin", "reformed", "searchjl", "stroke", "trad", "unihan"`. The `"standard"` and `"search"` values are ignored; they are replaced by the `options` property `usage` (see below).

* `kn`
    
    Whether numeric collation should be used, such that "1" < "2" < "10". Possible values are `"true"` and `"false"`. This option can be set through an `options` property or through a Unicode extension key; if both are provided, the `options` property takes precedence.

* `kf`
    
    Whether upper case or lower case should sort first. Possible values are `"upper"`, `"lower"`, or `"false"` (use the locale's default). This `option` can be set through an `options` property or through a Unicode extension key; if both are provided, the options property takes precedence.

### `options`
Optional. An object with some or all of the following properties:

* `localeMatcher`
    
    The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see the __Intl API__.

* `usage`
    
    Whether the comparison is for sorting or for searching for matching strings. Possible values are `"sort"` and `"search"`; the default is `"sort"`.

* `sensitivity`
    Which differences in the strings should lead to non-zero result values. Possible values are:
    * `"base"`: Only strings that differ in base letters compare as unequal. Examples: `a ≠ b, a = á, a = A`.
    * `"accent"`: Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: `a ≠ b, a ≠ á, a = A`.
    * `"case"`: Only strings that differ in base letters or case compare as unequal. Examples: `a ≠ b, a = á, a ≠ A`.
    * `"variant"`: Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: `a ≠ b, a ≠ á, a ≠ A`.
    The default is `"variant"` for usage `"sort"`; it's locale dependent for usage `"search"`.

* `ignorePunctuation`
    
    Whether punctuation should be ignored. Possible values are `true` and `false`; the default is `false`.

* `numeric`
    
    Whether numeric collation should be used, such that "1" < "2" < "10". Possible values are `true` and `false`; the default is `false`. This option can be set through an `options` property or through a Unicode extension key; if both are provided, the `options` property takes precedence. Implementations are not required to support this property.

* `caseFirst`

    Whether upper case or lower case should sort first. Possible values are `"upper"`, `"lower"`, or `"false"` (use the locale's default); the default is "false". This option can be set through an `options` property or through a Unicode extension key; if both are provided, the `options` property takes precedence. Implementations are not required to support this property.

### Note
All these string method are case sensitive.