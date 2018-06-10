// SWIFT 4.0

// 1. BASICS
let variable01: Int = 10, variable02: Int; // contant declaring
var constant01 = 1804; // variable declaring
/*
    Once you’ve declared a constant or variable of a certain type, you can’t declare it again with the same name,
        or change it to store values of a different type.
    If you need to give a constant or variable the same name as a reserved Swift keyword, surround the keyword with backticks (`) when using it as a name.
        However, avoid using keywords as names unless you have absolutely no choice.
    
*/

print("The current value of first variable is \(variable01)"); // print(_:separator:terminator:)
/*
    By default, the function terminates the line it prints by adding a line break.
    To print a value without a line break after it, pass an empty string as the terminator

*/

var justInteger: Int; // 32 or 64 bit integer depending on processor architecture
var unsignedInteger: UInt; // 32 or 64 bit integer depending on processor architecture
var floatNumber: Float; // 32-bit floating-point number
var floatNumber: Double; // 64-bit floating-point number
// Integer literals can be written as:
let decimalInteger = 17;        // A decimal number, with no prefix
let binaryInteger = 0b10001;    // A binary number, with a 0b prefix
let octalInteger = 0o21;        // An octal number, with a 0o prefix
let hexadecimalInteger = 0x11;  // A hexadecimal number, with a 0x prefix

let oneMillion = 1_000_000;     // for readability
let justOverOneMillion = 1_000_000.000_000_1;
/*
    Swift is a type-safe language. A type safe language encourages you to be clear about the types of values your code can work with.
    Unless you need to work with a specific size of integer, always use Int for integer values in your code.
    Double has a precision of at least 15 decimal digits, whereas the precision of Float can be as little as 6 decimal digits.
        The appropriate floating-point type to use depends on the nature and range of values you need to work with in your code.
        In situations where either type would be appropriate, Double is preferred.
    Swift always chooses Double (rather than Float) when inferring the type of floating-point numbers.
    Numeric literals can contain extra formatting to make them easier to read.
        Both integers and floats can be padded with extra zeros and can contain underscores to help with readability.
        Neither type of formatting affects the underlying value of the literal.
    Use the Int type for all general-purpose integer constants and variables in your code, even if they’re known to be nonnegative.
        Using the default integer type in everyday situations means that integer constants and variables are immediately
        interoperable in your code and will match the inferred type for integer literal values.
    Use other integer types only when they’re specifically needed for the task at hand, because of explicitly sized data
        from an external source, or for performance, memory usage, or other necessary optimization. Using explicitly sized types
        in these situations helps to catch any accidental value overflows and implicitly documents the nature of the data being used.
*/

let twoThousand: UInt16 = 2_000;
let one: UInt8 = 1;
let twoThousandAndOne = twoThousand + UInt16(one); // convert UInt8 into UInt16
let integerPi = Int(pi); // equals 3, and is inferred to be of type Int
/*
    To convert one specific number type to another, you initialize a new number of the desired type with the existing value.
    SomeType(ofInitialValue) is the default way to call the initializer of a Swift type and pass in an initial value.
        You can’tpass in any type here, however—it has to be a type for which UInt16 provides an initializer.
    Floating-point values are always truncated when used to initialize a new integer value in this way.
        This means that 4.75 becomes 4, and -3.9 becomes -3.
    The rules for combining numeric constants and variables are different from the rules for numeric literals.
        The literal value 3 can be added directly to the literal value 0.14159, because number literals don’t have
        an explicit type in and of themselves. Their type is inferred only at the point that they’re evaluated by the compiler.
*/

typealias AudioSample = UInt16; // Type aliases define an alternative name for an existing type.
/*
    Type aliases are useful when you want to refer to an existing type by a name that is contextually more appropriate,
        such as when working with data of a specific size from an external source
    Once you define a type alias, you can use the alias anywhere you might use the original name.
*/

let i = 1
if i {
    // this example will not compile, and will report an error
}
/*
    As with Int and Double above, you don’t need to declare constants or variables as Bool
        if you set them to true or false as soon as you create them.
*/


/*
    Tuples group multiple values into a single compound value. The values within a tuple can be of
        any type and don’t have to be of the same type as each other.
*/



