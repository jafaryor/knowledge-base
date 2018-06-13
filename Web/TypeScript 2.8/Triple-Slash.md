## Triple-Slash Directives
Triple-slash directives are single-line comments containing a single XML tag.

__Triple-slash directives are only valid at the top of their containing file.__ A triple-slash directive can only be preceded by single or multi-line comments, including other triple-slash directives. If they are encountered following a statement or a declaration they are treated as regular single-line comments, and hold no special meaning.

### `/// <reference path="..." />`
It serves as a declaration of dependency between files. Instruct the compiler to include additional files in the compilation process.

It is an error to reference a file that does not exist. It is an error for a file to have a triple-slash reference to itself.

If the compiler flag `--noResolve` is specified, triple-slash references are ignored; they neither result in adding new files, nor change the order of the files provided.

### `/// <reference types="..." />`
Similar to a `/// <reference path="..." />` directive, this directive serves as a declaration of dependency; a `/// <reference types="..." />` directive, however, declares a dependency on a package.

The process of resolving these package names is similar to the process of resolving module names in an `import` statement. An easy way to think of triple-slash-reference-types directives are as an `import` for declaration packages.

For example, including `/// <reference types="node" />` in a declaration file declares that this file uses names declared in `@types/node/index.d.ts`; and thus, this package needs to be included in the compilation along with the declaration file.

> Use these directives only when you’re authoring a d.ts file by hand.

### `/// <reference no-default-lib="true"/>`
This directive marks a file as a default library. You will see this comment at the top of `lib.d.ts` and its different variants.

This directive instructs the compiler to not include the default library (i.e. `lib.d.ts`) in the compilation. The impact here is similar to passing `--noLib` on the command line.

Also note that when passing `--skipDefaultLibCheck`, the compiler will only skip checking files with `/// <reference no-default-lib="true"/>`.

### `/// <amd-module />`
By default AMD modules are generated anonymous. This can lead to problems when other tools are used to process the resulting modules, such as bundlers (e.g. `r.js`).

The `amd-module` directive allows passing an optional module name to the compiler:
```typescript
///<amd-module name="NamedModule"/>
export class C {
}
```
Will result in assigning the name `NamedModule` to the module as part of calling the AMD define:
```typescript
define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
});
```

### `/// <amd-dependency />`
> __Note:__ this directive has been deprecated. Use `import "moduleName";` statements instead.

`/// <amd-dependency path="x" />` informs the compiler about a non-TS module dependency that needs to be injected in the resulting module’s require call.

The `amd-dependency` directive can also have an optional `name` property; this allows passing an optional name for an amd-dependency:
```typescript
/// <amd-dependency path="legacy/moduleA" name="moduleA"/>
declare var moduleA:MyType
moduleA.callStuff()
```
Generated JS code:
```typescript
define(["require", "exports", "legacy/moduleA"], function (require, exports, moduleA) {
    moduleA.callStuff()
});
```