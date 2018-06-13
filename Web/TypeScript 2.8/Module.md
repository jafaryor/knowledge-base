# Modules
For a small JS application modules might not be optimal, but for larger applications, the cost comes with long term modularity and maintainability benefits. Modules provide for better code reuse, stronger isolation and better tooling support for bundling.

Consider an import statement like `import { a } from "moduleA";` in order to check any use of `a`, the compiler needs to know exactly what it represents, and will need to check its definition `moduleA`. `moduleA` could be defined in one of your own `.ts/.tsx` files, or in a `.d.ts` that your code depends on.

There are two possible module resolution strategies: `Node` and `Classic`. You can use the `--moduleResolution` flag to specify the module resolution strategy. If not specified, the default is `Classic` for `--module AMD | System | ES2015` or `Node` otherwise.


## Classic Module Resolusion
A relative import will be resolved relative to the importing file. So `import { b } from "./moduleB"` in source file `/root/src/folder/A.ts` would result in the following lookups:
1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`

For non-relative module imports, however, the compiler walks up the directory tree starting with the directory containing the importing file, trying to locate a matching definition file. A non-relative import to `moduleB` such as `import { b } from "moduleB"`, in a source file `/root/src/folder/A.ts`, would result in attempting the following locations for locating `"moduleB"`:
1. `/root/src/folder/moduleB.ts`
2. `/root/src/folder/moduleB.d.ts`
3. `/root/src/moduleB.ts`
2. `/root/src/moduleB.d.ts`
4. `/root/moduleB.ts`
5. `/root/moduleB.d.ts`
6. `/moduleB.ts`
7. `/moduleB.d.ts`


## Node Module Resolusion
### How Node.js resolves modules
This resolution strategy attempts to mimic the Node.js module resolution mechanism at runtime.

Traditionally, imports in Node.js are performed by calling a function named `require`. The behavior Node.js takes will differ depending on if `require` is given a _relative path_ or a _non-relative path_.

Relative paths are fairly straightforward. As an example, let’s consider a file located at `/root/src/moduleA.js`, which contains the `import var x = require("./moduleB");` Node.js resolves that import in the following order:
1. Ask the file named `/root/src/moduleB.js`, if it exists.
2. Ask the folder `/root/src/moduleB` if it contains a file named `package.json` that specifies a `"main"` module. In our example, if Node.js found the file `/root/src/moduleB/package.json` containing `{ "main": "lib/mainModule.js" }`, then Node.js will refer to `/root/src/moduleB/lib/mainModule.js`.
3. Ask the folder `/root/src/moduleB` if it contains a file named `index.js`. That file is implicitly considered that folder’s `“main”` module.

However, resolution for a non-relative module name is performed differently. Node will look for your modules in special folders named `node_modules`. A `node_modules` folder can be on the same level as the current file, or higher up in the directory chain. Node will walk up the directory chain, looking through each `node_modules` until it finds the module you tried to load.

Following up our example above, consider if `/root/src/moduleA.js` instead used a non-relative path and had the `import var x = require("moduleB");`. Node would then try to resolve `moduleB` to each of the locations until one worked.
1. `/root/src/node_modules/moduleB.js`
2. `/root/src/node_modules/moduleB/package.json` (if it specifies a "main" property)
3. `/root/src/node_modules/moduleB/index.js`
4. `/root/node_modules/moduleB.js`
5. `/root/node_modules/moduleB/package.json` (if it specifies a "main" property)
6. `/root/node_modules/moduleB/index.js`
7. `/node_modules/moduleB.js`
8. `/node_modules/moduleB/package.json` (if it specifies a "main" property)
9. `/node_modules/moduleB/index.js`

### How TypeScript resolves modules
TypeScript will mimic the Node.js run-time resolution strategy in order to locate definition files for modules at compile-time. To accomplish this, TypeScript overlays the TypeScript source file extensions (`.ts`, `.tsx`, and `.d.ts`) over the Node’s resolution logic. TypeScript will also use a field in `package.json` named `"types"` to mirror the purpose of `"main"` - the compiler will use it to find the `“main”` definition file to consult.

For example, an `import` statement like `import { b } from "./moduleB"` in `/root/src/moduleA.ts` would result in attempting the following locations for locating `"./moduleB"`:
1. `/root/src/moduleB.ts`
2. `/root/src/moduleB.tsx`
3. `/root/src/moduleB.d.ts`
4. `/root/src/moduleB/package.json` (if it specifies a "types" property)
5. `/root/src/moduleB/index.ts`
6. `/root/src/moduleB/index.tsx`
7. `/root/src/moduleB/index.d.ts`
> Recall that Node.js looked for a file named `moduleB.js`, then an applicable `package.json`, and then for an `index.js`.

Similarly a non-relative import will follow the Node.js resolution logic, first looking up a file, then looking up an applicable folder. So `import { b } from "moduleB"` in source file `/root/src/moduleA.ts` would result in the following lookups:
1. `/root/src/node_modules/moduleB.ts`
2. `/root/src/node_modules/moduleB.tsx`
3. `/root/src/node_modules/moduleB.d.ts`
4. `/root/src/node_modules/moduleB/package.json` (if it specifies a "types" property)
5. `/root/src/node_modules/moduleB/index.ts`
6. `/root/src/node_modules/moduleB/index.tsx`
7. `/root/src/node_modules/moduleB/index.d.ts`
8. `/root/node_modules/moduleB.ts`
9. `/root/node_modules/moduleB.tsx`
10. `/root/node_modules/moduleB.d.ts`
11. `/root/node_modules/moduleB/package.json` (if it specifies a "types" property)
12. `/root/node_modules/moduleB/index.ts`
13. `/root/node_modules/moduleB/index.tsx`
14. `/root/node_modules/moduleB/index.d.ts`
15. `/node_modules/moduleB.ts`
16. `/node_modules/moduleB.tsx`
17. `/node_modules/moduleB.d.ts`
18. `/node_modules/moduleB/package.json` (if it specifies a "types" property)
19. `/node_modules/moduleB/index.ts`
20. `/node_modules/moduleB/index.tsx`
21. `/node_modules/moduleB/index.d.ts`

## Additional module resolution flags
* ### `Base URL`

    Using a `baseUrl` is a common practice in applications using AMD module loaders where modules are “deployed” to a single folder at run-time. The sources of these modules can live in different directories, but a build script will put them all together.

    Setting `baseUrl` informs the compiler where to find modules. All module imports with non-relative names are assumed to be relative to the `baseUrl`.

* ### `Path mapping`

    Sometimes modules are not directly located under baseUrl. For instance, an import to a module `"jquery"` would be translated at runtime to `"node_modules/jquery/dist/jquery.slim.min.js"`. Loaders use a mapping configuration to map module names to files at run-time.

    The TypeScript compiler supports the declaration of such mappings using `"paths"` property in `tsconfig.json` files.
    ```typescript
    {
        "compilerOptions": {
            "baseUrl": ".", // This must be specified if "paths" is.
            "paths": {
                // This mapping is relative to "baseUrl"
                "jquery": ["node_modules/jquery/dist/jquery"]

                "*": [
                    "*",
                    "generated/*"
                ]
            }
        }
    }
    ```

    This tells the compiler for any module import that matches the pattern `"*"` (i.e. all values), to look in two locations:
    * `"*"`: meaning the same name unchanged, so map `<moduleName> => <baseUrl>/<moduleName>`
    * `"generated/*"`: meaning the module name with an appended prefix `“generated”`, so map `<moduleName> => <baseUrl>/generated/<moduleName>`

    * `import ‘folder1/file2’`
        * pattern ‘*’ is matched and wildcard captures the whole module name
        * try first substitution in the list: ‘*’ -> `folder1/file2`
        * result of substitution is non-relative name - combine it with baseUrl -> `projectRoot/folder1/file2.ts`
        * File exists. Done.
    * `import ‘folder2/file3’`
        * pattern ‘*’ is matched and wildcard captures the whole module name
        * try first substitution in the list: ‘*’ -> `folder2/file3`
        * result of substitution is non-relative name - combine it with baseUrl -> `projectRoot/folder2/file3.ts`.
        * File does not exist, move to the second substitution
        * second substitution ‘generated/*’ -> `generated/folder2/file3`
        * result of substitution is non-relative name - combine it with baseUrl -> `projectRoot/generated/folder2/file3.ts`.
        * File exists. Done.

    * ### `rootDirs`
        Sometimes the project sources from multiple directories at compile time are all combined to generate a single output directory. This can be viewed as a set of source directories create a `“virtual”` directory.

        Example:
        ```typescript
        src
        └── views
            └── view1.ts (imports './template1')
            └── view2.ts

        generated
        └── templates
                └── views
                    └── template1.ts (imports './view2')
        ```
        tsconfig.json:
        ```typescript
        {
            "compilerOptions": {
                "rootDirs": [
                    "src/views",
                    "generated/templates/views"
                ]
            }
        }
        ```

        Every time the compiler sees a relative module import in a subfolder of one of the rootDirs, it will attempt to look for this import in each of the entries of rootDirs.

    * ### `--traceResolution`
        As discussed earlier, the compiler can visit files outside the current folder when resolving a module. This can be hard when diagnosing why a module is not resolved, or is resolved to an incorrect definition. Enabling the compiler module resolution tracing using `--traceResolution` provides insight in what happened during the module resolution process.

    * ### `--noResolve`
        The `--noResolve` compiler options instructs the compiler not to “add” any files to the compilation that were not passed on the command line. It will still try to resolve the module to files, but if the file is not specified, it will not be included.
        ```typescript
        import * as A from "moduleA" // OK, 'moduleA' passed on the command-line
        import * as B from "moduleB" // Error TS2307: Cannot find module 'moduleB'.
        // because mobuleB was not passed in executed command.
        ```
        The executed command: `tsc app.ts moduleA.ts --noResolve`.


`tsconfig.json` turns a folder into a “project”. Without specifying any `“exclude”` or `“files”` entries, all files in the folder containing the `tsconfig.json` and all its sub-directories are included in your compilation. If you want to exclude some of the files use `“exclude”`, if you would rather specify all the files instead of letting the compiler look them up, use “`files”`.

That was `tsconfig.json` automatic inclusion. That does not embed module resolution as discussed above. If the compiler identified a file as a target of a module import, it will be included in the compilation regardless if it was excluded in the previous steps. So to exclude a file from the compilation, you need to exclude it and all files that have an `import` or `/// <reference path="..." />` directive to it.