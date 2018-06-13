## Number API
* `Number.EPSILON = 2E-52` property represents the difference between `1` and the smallest floating point number greater than `1`.

* `Number.MAX_SAFE_INTEGER = 2E+53 - 1` constant represents the maximum safe integer in JavaScript. __Safe__ in this context refers to the ability to represent integers exactly and to correctly compare them. For example, `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` will evaluate to true, which is mathematically incorrect.

* `Number.MIN_SAFE_INTEGER = -(2E+53 - 1)` constant represents the minimum safe integer in JavaScript.

* `Number.MAX_VALUE = 1.79E+308` property represents the maximum numeric value representable in JavaScript. Values larger than `MAX_VALUE` are represented as "`Infinity`".

* `Number.MIN_VALUE = 5E-324` property represents the smallest positive numeric value representable in JavaScript. Values smaller than `MIN_VALUE` ("underflow values") are converted to `0`.

* `Number.NEGATIVE_INFINITY = -Infinity`
* `Number.POSITIVE_INFINITY = +Infinity`
* `Number.NaN = NaN`

* `Number.isFinite(value: number): boolean` - determines whether the passed value is a finite number.
    ```javascript
    Number.isFinite(Infinity);  // false
    Number.isFinite(NaN);       // false
    Number.isFinite(-Infinity); // false

    Number.isFinite(0);         // true
    Number.isFinite(2e64);      // true

    Number.isFinite('0');       // false, would've been true with
                                // global isFinite('0')
    Number.isFinite(null);      // false, would've been true with
                                // global isFinite(null)
    ```

* `Number.isInteger(value: any): boolean` - determines whether the passed value is an integer.

* `Number.isNaN(value: any): boolean` - determines whether the passed value is `NaN` and its type is `Number`. It is a more robust version of the original, global isNaN().

* `Number.isSafeInteger(value: number): boolean` - determines whether the provided value is a number that is a safe integer.
    A safe integer is an integer that:
    * can be exactly represented as an __IEEE-754__ double precision number, and
    * whose __IEEE-754__ representation cannot be the result of rounding any other integer to fit the __IEEE-754__ representation.

    > The __IEEE-754__ standard specifies a binary32 as having:
    > * Sign bit: 1 bit
    > * Exponent width: 8 bits
    > * Significand precision: 24 bits (23 explicitly stored)

    For example, `2E+53 - 1` is a safe integer: it can be exactly represented, and no other integer rounds to it under any IEEE-754 rounding mode. In contrast, `2E+53` is not a safe integer: it can be exactly represented in __IEEE-754__, but the integer `2E+53 + 1` can't be directly represented in __IEEE-754__ but instead rounds to `2E+53` under _round-to-nearest_ and _round-to-zero_ rounding.  The safe integers consist of all integers from `-(2E+53 - 1)` inclusive to `2E+53 - 1` inclusive.

* `Number.parseFloat(value: string): number` - parses a string argument and returns a floating point number. This method behaves identically to the global function `parseFloat()`.

* `Number.parseInt(value: string, [radix: number]): number` - parses a string argument and returns an integer of the specified radix or base. If the first character cannot be converted to a number, `NaN` is returned.
    * `value` - the value to parse. If the string argument is not a string, then it is converted to a string. Leading whitespace in the string argument is ignored.
    * `radix` - an integer between `2` and `36` that represents the radix (the base in mathematical numeral systems) of the above mentioned string. Specify `10` for the decimal numeral system commonly used by humans. __Always specify this parameter__ to eliminate reader confusion and to guarantee predictable behavior. Different implementations produce different results when a radix is not specified, usually defaulting the value to `10`.

* `toExponential([fractionDigits: number]): string` - returns a string representing the Number object in exponential notation.
    * `fractionDigits` - an integer specifying the number of digits after the decimal point. Defaults to as many digits as necessary to specify the number.
    ```javascript
    var numObj = 77.1234;

    console.log(numObj.toExponential());        // logs 7.71234e+1
    console.log(numObj.toExponential(4));       // logs 7.7123e+1
    console.log(numObj.toExponential(2));       // logs 7.71e+1
    console.log(77.1234.toExponential());       // logs 7.71234e+1
    console.log(77 .toExponential());           // logs 7.7e+1
    ```

* `toFixed([digits]): string` - formats a number using fixed-point notation.
    * `digits` - number of digits to appear after the decimal point; this may be a value between `0` and `20`, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as `0`.
    ```javascript
    var numObj = 12345.6789;

    numObj.toFixed();       // Returns '12346': note rounding, no fractional part
    numObj.toFixed(1);      // Returns '12345.7': note rounding
    numObj.toFixed(6);      // Returns '12345.678900': note added zeros
    (1.23e+20).toFixed(2);  // Returns '123000000000000000000.00'
    (1.23e-10).toFixed(2);  // Returns '0.00'
    2.34.toFixed(1);        // Returns '2.3'
    2.35.toFixed(1);        // Returns '2.4'. Note that it rounds up in this case.
    -2.34.toFixed(1);       // Returns -2.3 (due to operator precedence, negative number literals don't return a string...)
    (-2.34).toFixed(1);     // Returns '-2.3' (...unless you use parentheses)
    ```

* `toLocaleString([locales: string, [options: Object]]): string` - returns a string with a language sensitive representation of this number.

* `toPrecision([precision: number]): string` method returns a string representing the Number object to the specified precision.
    ```javascript
    var numObj = 5.123456;

    console.log(numObj.toPrecision());    // logs '5.123456'
    console.log(numObj.toPrecision(5));   // logs '5.1235'
    console.log(numObj.toPrecision(2));   // logs '5.1'
    console.log(numObj.toPrecision(1));   // logs '5'

    numObj = 0.000123

    console.log(numObj.toPrecision());    // logs '0.000123'
    console.log(numObj.toPrecision(5));   // logs '0.00012300'
    console.log(numObj.toPrecision(2));   // logs '0.00012'
    console.log(numObj.toPrecision(1));   // logs '0.0001' 

    // note that exponential notation might be returned in some circumstances
    console.log((1234.5).toPrecision(2)); // logs '1.2e+3'
    ```

### Arguments which is used in toLocaleString([locales: string, [options: Object]]): string methods:
* `locales`
    A string with a BCP 47 language tag, or an array of such strings. For the general form and interpretation of the `locales` argument, see the Intl page. The following Unicode extension key is allowed:

    `nu`

    The numbering system to be used. Possible values include: `"arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt"`.

* `options`
    An object with some or all of the following properties:

    `localeMatcher`
    
    The locale matching algorithm to use. Possible values are "`lookup`" and "`best fit`"; the default is "`best fit`". For information about this option, see the Intl page.

    `style`

    The formatting style to use. Possible values are "`decimal`" for plain number formatting, "`currency`" for currency formatting, and "`percent`" for percent formatting; the default is "`decimal`".

    `currency`
    
    The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "`USD`" for the US dollar, "`EUR`" for the euro, or "`CNY`" for the Chinese RMB — see the Current currency & funds code list. There is no default value; if the __style__ is "`currency`", the __currency__ property must be provided.

    `currencyDisplay`

    How to display the currency in currency formatting. Possible values are "`symbol`" to use a localized currency symbol such as €, "`code`" to use the ISO currency code, "`name`" to use a localized currency name such as "`dollar`"; the default is "`symbol`".

    `useGrouping = true`
    
    Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are `true` and `false`.

    The following properties fall into two groups: `minimumIntegerDigits`, `minimumFractionDigits`, and `maximumFractionDigits` in one group, `minimumSignificantDigits` and `maximumSignificantDigits` in the other. If at least one property from the second group is defined, then the first group is ignored.

    `minimumIntegerDigits = 1`
    
    The minimum number of integer digits to use. Possible values are from `1` to `21`.

    `minimumFractionDigits = 0`

    The minimum number of fraction digits to use. Possible values are from `0` to `20`; the default for plain number and percent formatting is `0`; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (`2` if the list doesn't provide that information).

    `maximumFractionDigits`
    
    The maximum number of fraction digits to use. Possible values are from `0` to `20`; the default for plain number formatting is the larger of `minimumFractionDigits` and `3`; the default for currency formatting is the larger of `minimumFractionDigits` and the number of minor unit digits provided by the ISO 4217 currency code list (`2` if the list doesn't provide that information); the default for percent formatting is the larger of `minimumFractionDigits` and `0`.

    `minimumSignificantDigits = 1`
    
    The minimum number of significant digits to use. Possible values are from `1` to `21`.

    `maximumSignificantDigits`
    
    The maximum number of significant digits to use. Possible values are from `1` to `21`; the default is `minimumSignificantDigits`.

