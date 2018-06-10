# Regular Expressions
__Regular expressions__ are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.

### Creating regular expression
```javascript
// If the regular expression remains constant, using this can improve performance
var re = /ab+c/g;

// Use the constructor function when you know the regular expression pattern will be changing
var re = new RegExp('ab+c', 'g');
```

### Methods that use regular expressions
* `RegExp.prototype.exec()`

    Executes a search for a match in a string. It returns an array of information or `null` on a mismatch.

* `RegExp.prototype.test()`

    Tests for a match in a string. It returns `true` or `false`.

* `String.prototype.match()`
    
    Executes a search for a match in a string. It returns an array of information or `null` on a mismatch.

* `String.prototype.search()`

    Tests for a match in a string. It returns the index of the match, or `-1` if the search fails.

* `String.prototype.replace()`

    Executes a search for a match in a string, and replaces the matched substring with a replacement substring.

* `String.prototype.split()`

    Uses a regular expression or a fixed string to break a string into an array of substrings.

> When you want to know whether a pattern is found in a string, use the `test()` or `search()` method; for more information (but slower execution) use the `exec()` or `match()` methods.

```javascript
var myArray = /d(b+)d/g.exec('cdbbdbsbz');
    // similar to "cdbbdbsbz".match(/d(b+)d/g); however,
    // the latter outputs Array [ "dbbd" ], while 
    // /d(b+)d/g.exec('cdbbdbsbz') outputs Array [ "dbbd", "bb" ].
```

### Using parentheses
Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered. For example, `/a(b)c/` matches the characters `'abc'` and remembers `'b'`. To recall these parenthesized substring matches, use the Array elements `[1], ..., [n]`.

To match a substring without causing the matched part to be remembered, within the parentheses preface the pattern with `?:`. For example, `(?:\d+)` matches one or more numeric characters but does not remember the matched characters.

```javascript
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);        // "Smith, John"
```

### Advanced searching with flags
Regular expressions have five optional flags that allow for global and case insensitive searching. These flags can be used separately or together in any order.
Flag | Description
--- | ---
__`g`__ | Global search
__`i`__ | Case-insensitive search
__`m`__ | Multi-line search
__`u`__ | unicode; treat a pattern as a sequence of unicode code points
__`y`__ | Perform a "sticky" search that matches starting at the current position in the target string

To include a flag with the regular expression, use this syntax:
```javascript
var re = /pattern/flags;
// or
var re = new RegExp('pattern', 'flags');

var re = /\w+\s/g;
// or
var re = new RegExp('\\w+\\s', 'g');
```

> Note that the flags are an integral part of a regular expression. They cannot be added or removed later.

The `g` flag is used with the `.exec()` method to get iterative progression.
```javascript
var xArray; while(xArray = re.exec(str)) console.log(xArray);
// produces: 
// ["fee ", index: 0, input: "fee fi fo fum"]
// ["fi ", index: 4, input: "fee fi fo fum"]
// ["fo ", index: 7, input: "fee fi fo fum"]
```

The `"g"` flag indicates that the regular expression should be tested against all possible matches in a string. A regular expression defined as both global (`"g"`) and sticky (`"y"`) will ignore the global flag and perform sticky matches.

The `m` flag is used to specify that a multiline input string should be treated as multiple lines. If the `m` flag is used, `^` and `$` match at the start or end of any line within the input string instead of the start or end of the entire string.

The `"u"` flag enables various Unicode-related features. With the `"u"` flag, any Unicode code point escapes will be interpreted as such.

The `"y"` flag indicates that it matches only from the index indicated by the `lastIndex` property of this regular expression in the target string (and does not attempt to match from any later indexes).
```javascript
var str = '#foo#';
var regex = /foo/y;

regex.lastIndex = 1;
regex.test(str);        // true
regex.lastIndex = 5;
regex.test(str);        // false (lastIndex is taken into account with sticky flag)
regex.lastIndex;        // 0 (reset after match failure)
```

> When the `y` flag is used with a pattern, `^` always matches only at the beginning of the input, or (if `multiline` is `true`) at the beginning of a line.
```javascript
var regex = /^foo/y;
regex.lastIndex = 2;
regex.test('..foo');    // false - index 2 is not the beginning of the string

var regex2 = /^foo/my;
regex2.lastIndex = 2;
regex2.test('..foo');   // false - index 2 is not the beginning of the string or line
regex2.lastIndex = 2;
regex2.test('.\nfoo');  // true - index 2 is the beginning of a line
```

## Special characters in regular expressions:
* ### `\`
    Matches according to the following rules:

    * A backslash that precedes a non-special character indicates that the next character is special and is not to be interpreted literally. For example, a `'b'` without a preceding `'\'` generally matches lowercase `'b'`s wherever they occur. But a `'\b'` by itself doesn't match any character; it forms the special word boundary character.

    * A backslash that precedes a special character indicates that the next character is not special and should be interpreted literally. For example, the pattern `/a*/` relies on the special character `'*'` to match `0` or more `a`'s. By contrast, the pattern `/a\*/` removes the specialness of the `'*'` to enable matches with strings like `'a*'`.

    Do not forget to escape `\` itself while using the `RegExp("pattern")` notation because `\` is also an escape character in strings.

* ### `^`
    Matches beginning of input. If the multiline flag is set to `true`, also matches immediately after a line break character.

    For example, `/^A/` does not match the `'A'` in `"an A"`, but does match the `'A'` in `"An E"`.

    The `'^'` has a different meaning when it appears as the first character in a character set pattern.

* ### `$`
    Matches end of input. If the multiline flag is set to `true`, also matches immediately before a line break character.

    For example, `/t$/` does not match the '`t'` in `"eater"`, but does match it in `"eat"`.

* ### `*`
    Matches the preceding expression `0` or more times. Equivalent to `{0,}`.

    For example, `/bo*/` matches `'boooo'` in `"A ghost booooed"` and `'b'` in `"A bird warbled"` but nothing in `"A goat grunted"`.

* ### `+`
    Matches the preceding expression `1` or more times. Equivalent to `{1,}`.

    For example, `/a+/` matches the `'a'` in `"candy"` and all the a's in `"caaaaaaandy"`, but nothing in `"cndy"`.

* ### `?`
    Matches the preceding expression `0` or `1` time. Equivalent to `{0,1}`.

    For example, `/e?le?/` matches the `'el'` in `"angel"` and the `'le'` in `"angle"` and also the `'l'` in `"oslo"`.

    If used immediately after any of the quantifiers `*`, `+`, `?`, or `{}`, makes the quantifier non-greedy (matching the fewest possible characters), as opposed to the default, which is greedy (matching as many characters as possible). For example, applying `/\d+/` to `"123abc"` matches `"123"`. But applying `/\d+?/` to that same string matches only the `"1"`.

    Also used in lookahead assertions, as described in the `x(?=y)` and `x(?!y)` entries of this table.
 
* ### `.`
    (The decimal point) matches any single character except the newline character.

    For example, `/.n/` matches `'an'` and `'on'` in `"nay, an apple is on the tree"`, but not `'nay'`.

* ### `(x)`
    Matches `'x'` and remembers the match, as the following example shows. The parentheses are called capturing parentheses.

    The `'(foo)'` and `'(bar)'` in the pattern `/(foo) (bar) \1 \2/` match and remember the first two words in the string `"foo bar foo bar"`. The `\1` and `\2` in the pattern match the string's last two words. Note that `\1, \2, ..., \n` are used in the matching part of the regex. In the replacement part of a regex the syntax `$1, $2, ..., $n` must be used, e.g.: `'bar foo'.replace(/(...) (...)/, '$2 $1')`.  `$&` means the whole matched string.

* ### `(?:x)`
    Matches `'x'` but does not remember the match. The parentheses are called non-capturing parentheses, and let you define subexpressions for regular expression operators to work with. Consider the sample expression `/(?:foo){1,2}/`. If the expression was `/foo{1,2}/`, the `{1,2}` characters would apply only to the last `'o'` in `'foo'`. With the non-capturing parentheses, the `{1,2}` applies to the entire word `'foo'`.

* ### `x(?=y)`
    Matches `'x'` only if `'x'` is followed by `'y'`. This is called a lookahead.

    For example, `/Jack(?=Sprat)/` matches `'Jack'` only if it is followed by `'Sprat'`. `/Jack(?=Sprat|Frost)/` matches `'Jack'` only if it is followed by `'Sprat'` or `'Frost'`. However, neither `'Sprat'` nor `'Frost'` is part of the match results.

* ### `x(?!y)`
    Matches `'x'` only if `'x'` is not followed by `'y'`. This is called a negated lookahead.

    For example, `/\d+(?!\.)/` matches a number only if it is not followed by a decimal point. The regular expression `/\d+(?!\.)/.exec("3.141")` matches `'141'` but not `'3.141'`.

* ### `x|y`
    Matches `'x'`, or `'y'` (if there is no match for `'x'`).

    For example, `/green|red/` matches `'green'` in `"green apple"` and `'red'` in `"red apple."` The order of `'x'` and `'y'` matters. For example `a*|b` matches the empty string in `"b"`, but `b|a*` matches `"b"` in the same string.

* ### `{n}`
    Matches exactly `n` occurrences of the preceding expression. `n` must be a positive integer.

    For example, `/a{2}/` doesn't match the `'a'` in `"candy,"` but it does match all of the `a`'s in `"caandy,"` and the first two `a`'s in `"caaandy."`

* ### `{n,}`
    Matches at least n occurrences of the preceding expression. N must be a positive integer.

    For example, /a{2,}/ will match "aa", "aaaa" and "aaaaa" but not "a"

* ### `{n,m}`
    Where `n` and `m` are positive integers and `n <= m`. Matches at least `n` and at most `m` occurrences of the preceding expression. When `m` is omitted, it's treated as `∞`.

    For example, `/a{1,3}/` matches nothing in `"cndy"`, the `'a'` in `"candy,"` the first two `a`'s in `"caandy,"` and the first three `a`'s in `"caaaaaaandy"`. Notice that when matching `"caaaaaaandy"`, the match is `"aaa"`, even though the original string had more `a`'s in it.

* ### `[xyz]`
    Character set. This pattern type matches any one of the characters in the brackets, including escape sequences. Special characters like the dot(`.`) and asterisk (`*`) are not special inside a character set, so they don't need to be escaped. You can specify a range of characters by using a hyphen, as the following examples illustrate.

    The pattern `[a-d]`, which performs the same match as `[abcd]`, matches the `'b'` in `"brisket"` and the `'c'` in `"city"`. The patterns `/[a-z.]+/` and `/[\w.]+/` match the entire string `"test.i.ng"`.

* ### `[^xyz]`
    A negated or complemented character set. That is, it matches anything that is not enclosed in the brackets. You can specify a range of characters by using a hyphen. Everything that works in the normal character set also works here.

    For example, `[^abc]` is the same as `[^a-c]`. They initially match `'r'` in `"brisket"` and `'h'` in `"chop."`

* ### `[\b]`
    Matches a backspace (`U+0008`). You need to use square brackets if you want to match a literal backspace character. (Not to be confused with `\b`.)

* ### `\b`
    Matches a word boundary. A word boundary matches the position where a word character is not followed or preceded by another word-character. Note that a matched word boundary is not included in the match. In other words, the length of a matched word boundary is zero. (Not to be confused with `[\b]`)

    Examples:
    * `/\bm/` matches the `'m'` in `"moon"` ;
    * `/oo\b/` does not match the `'oo'` in `"moon"`, because `'oo'` is followed by `'n'` which is a word character;
    * `/oon\b/` matches the `'oon'` in `"moon"`, because `'oon'` is the end of the string, thus not followed by a word character;
    * `/\w\b\w/` will never match anything, because a word character can never be followed by both a non-word and a word character.

    > __Note__: JavaScript's regular expression engine defines a [specific set of characters](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6) to be "word" characters. Any character not in that set is considered a word break. This set of characters is fairly limited: it consists solely of the Roman alphabet in both upper- and lower-case, decimal digits, and the underscore character. Accented characters, such as "é" or "ü" are, unfortunately, treated as word breaks.

* ### `\B`
    Matches a non-word boundary. This matches a position where the previous and next character are of the same type: Either both must be words, or both must be non-words. The beginning and end of a string are considered non-words.

    For example, `/\B../` matches `'oo'` in `"noonday"`, and `/y\B./` matches `'ye'` in `"possibly yesterday."`

* ### `\cX`
    Where `X` is a character ranging from `A` to `Z`. Matches a control character in a string.

    For example, `/\cM/` matches control-M (`U+000D`) in a string.

* ### `\d`
    Matches a digit character. Equivalent to `[0-9]`.

    For example, `/\d/` or `/[0-9]/` matches `'2'` in `"B2 is the suite number."`

* ### `\D`
    Matches a non-digit character. Equivalent to `[^0-9]`.

    For example, `/\D/` or `/[^0-9]/` matches `'B'` in `"B2 is the suite number."`

* ### `\f`
    Matches a form feed (`U+000C`).

* ### `\n`
    Matches a line feed (`U+000A`).

* ### `\r`
    Matches a carriage return (`U+000D`).

* ### `\s`
    Matches a single __white space character__, including __space, tab, form feed, line feed__. Equivalent to: `[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.

    For example, `/\s\w*/` matches `' bar'` in `"foo bar."`

* ### `\S`
    Matches a single character other than white space. Equivalent to: `[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.

    For example, `/\S*/` matches `'foo'` in `"foo bar."`

* ### `\t`
    Matches a tab (`U+0009`).
* ### `\v`
    Matches a vertical tab (`U+000B`).
* ### `\w`
    Matches any alphanumeric character including the underscore. Equivalent to: `[A-Za-z0-9_]`.

* ### `\W`
    Matches any non-word character. Equivalent to `[^A-Za-z0-9_]`.

    For example, `/\W/` or `/[^A-Za-z0-9_]/` matches `'%'` in `"50%"`.

* ### `\n`
    Where `n` is a positive integer, a back reference to the last substring matching the `n` parenthetical in the regular expression (counting left parentheses).

    For example, `/apple(,)\sorange\1/` matches `'apple, orange,'` in `"apple, orange, cherry, peach"`.

* ### `\0`
    Matches a `NULL` (`U+0000`) character. Do not follow this with another digit, because `\0<digits>` is an octal escape sequence. Instead use `\x00`.

* ### `\xhh`
    Matches the character with the code `hh` (two hexadecimal digits)
* ### `\uhhhh`
    Matches the character with the code `hhhh` (four hexadecimal digits)
* ### `\u{hhhh}`
    (only when `u` flag is set) Matches the character with the Unicode value `hhhh` (hexadecimal digits).