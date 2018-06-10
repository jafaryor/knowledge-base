## Namespacing
Namespaces are simply named JavaScript objects in the global namespace. This makes namespaces a very simple construct to use. They can span multiple files, and can be concatenated using `--outFile`. Namespaces can be a good way to structure your code in a Web Application, with all dependencies included as `<script>` tags in your HTML page.

We can either have all namespace data in one file or split them across multiple files.

If the namespace implemented across multiple files we should use `/// <reference path="Validation.ts" />` in each file which extends the namespace.
* Validation.ts:
    ```typescript
    namespace Validation {
        export interface StringValidator {
            isAcceptable(s: string): boolean;
        }
    }
    ```
* LettersOnlyValidator.ts:
    ```typescript
    /// <reference path="Validation.ts" />
    namespace Validation {
        const lettersRegexp = /^[A-Za-z]+$/;
        export class LettersOnlyValidator implements StringValidator {
            isAcceptable(s: string) {
                return lettersRegexp.test(s);
            }
        }
    }
    ```
* ZipCodeValidator.ts:
    ```typescript
    /// <reference path="Validation.ts" />
    namespace Validation {
        const numberRegexp = /^[0-9]+$/;
        export class ZipCodeValidator implements StringValidator {
            isAcceptable(s: string) {
                return s.length === 5 && numberRegexp.test(s);
            }
        }
    }
    ```
* Test.ts:
    ```typescript
    /// <reference path="Validation.ts" />
    /// <reference path="LettersOnlyValidator.ts" />
    /// <reference path="ZipCodeValidator.ts" />

    // Some samples to try
    let strings = ["Hello", "98052", "101"];

    // Validators to use
    let validators: { [s: string]: Validation.StringValidator; } = {};
    validators["ZIP code"] = new Validation.ZipCodeValidator();
    validators["Letters only"] = new Validation.LettersOnlyValidator();

    // Show whether each string passed each validator
    for (let s of strings) {
        for (let name in validators) {
            console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
        }
    }
    ```

Another way that you can simplify working with of namespaces is to use `import q = x.y.z` to create shorter names for commonly-used objects.
```typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;      // namespace alias
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
```

## Ambient Namespaces
The popular library D3 defines its functionality in a global object called `d3`. Because this library is loaded through a `<script>` tag (instead of a module loader), its declaration uses namespaces to define its shape. For the TypeScript compiler to see this shape, we use an ambient namespace declaration.
```typescript
// D3.d.ts file:
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
```

## `/// <reference>`-ing a module
A common mistake is to try to use the `/// <reference ... />` syntax to refer to a module file, rather than using an `import` statement.

The reference tag here allows us to locate the declaration file that contains the declaration for the ambient module.
* myModules.d.ts
    ```typescript
    // In a .d.ts file or .ts file that is not a module:
    declare module "SomeModule" {
        export function fn(): string;
    }
    ```
* myOtherModule.ts
    ```typescript
    /// <reference path="myModules.d.ts" />
    import * as m from "SomeModule";
    ```

> The main difference between namespace and module is that modules declare their dependencies.