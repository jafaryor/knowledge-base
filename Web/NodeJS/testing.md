## NodeJS Testing
### Mocha
[Mocha](https://mochajs.org/) is a JavaScript test framework that runs both on Node.js and in the browser. It provides functionality for testing both synchronous and asynchronous code with a very simple and similar interface.


### Chai
[Chai](https://www.chaijs.com/) is an assertion library which have some assertion styles for different testing processes, and it can
be used with any testing framework and even without it.

The assertion library is what actually runs the specs and determines whether any given condition is valid or not. Ultimately, every test is ran by methods which are derived from our assertion library.

When you are comparing output of unit with expected result just by typing “`===`” or using build-in library assert, but in other cases. We may need to compare object, arrays, or just some property of a result. For example we need to check if unit returns string with no care about content of this string, or we need to check, if unit returns array that consists just of 3 elements.


### Sinon
[Sinon](https://sinonjs.org/) is a standalone library with spies, stubs and mocks. It can be used with any testing framework.

* __Spy__ - is a function that records arguments, return value, the value of this and thrown exceptions (if any) for all its calls.

* __Stubs__ - functions (spies) with pre-programmed behavior, for example when you need function to run specific function part like throw an error or prevent some method to being called directly (to avoid http call, database initialization and write and etc.).

* __Mocks__ - are fake methods (like spies) with pre-programmed behavior (like stubs) as well as preprogrammed expectations, for example you need function to return something, but only if arguments are correct.


### Istanbul
[Istanbul](https://istanbul.js.org/) is a code coverage tool that computes statement, line, function and branch coverage.


### Fast-Check
A __property__ is something that holds true for any given input.

An __arbitrary__ is a generator for the given data type: strings, numbers, arrays, custom types…

__Property based testing__ is another way to test programs. Instead of relying on hard-coded inputs and outputs, it checks characteristics of the output given the whole range of possible inputs.

By nature, property based testing puts less constraints on the inputs. As a consequence, the scope of covered inputs is much higher and can lead to unexplored code paths

[Fast-check](https://github.com/dubzzz/fast-check) is a property based testing framework for JavaScript.

A __property-based framework__ is something which gives you an ability to write property assertions, uses arbitraries to generate data and ensures that tests fail with counterexamples

Benefits:
* __Cover the scope of all possible inputs__: by construct, it does not restrict the generated inputs if not asked to do so. Consequently it can theorically generate all possible inputs and cover the whole range of strings, integers or whatever type required by the system under test.
* __Shrink the input in case of failure__: whenever it fails, the framework tries to reduce the input to a smaller input. For instance: if the condition of the failure is the existence of a given character in a string it should return the one-character string having only this character. This is certainly one of the most interesting features of such approach as most of the time the failure can be summarized by a very small case.
* __Reproducible and replayable__: each time it runs a property test, a seed is produced in order to be able to re-run the test again on the same datasets. Any run failure causes the framework to print both the failing case and the seed in order to be able to fully reproduce the run.


### Swagger
The [OpenAPI Specification (OAS)](https://www.openapis.org/) defines a standard, language-agnostic interface to RESTful APIs which allows humans and computers to discover and understand the capabilities of the service without access to the source code.

[Swagger](https://swagger.io/) Swagger is in essence an Interface Description Language for describing RESTful APIs expressed using JSON. Swagger is used together with a set of open-source software tools to design, build, document, and use RESTful web services. Swagger includes automated documentation, code generation (into many programming languages), and test-case generation.


---

#### [Getting Node.js Testing and TDD Right](https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/)

#### [Unit Test Your JavaScript Using Mocha and Chai](https://www.sitepoint.com/unit-test-javascript-mocha-chai/)

#### [Sinon Tutorial: JavaScript Testing with Mocks, Spies & Stubs](https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/)

#### [Intro to Property-Based Testing](https://dev.to/jdsteinhauser/intro-to-property-based-testing-2cj8)

#### [John Hughes - Don't Write Tests](https://www.youtube.com/watch?v=hXnS_Xjwk2Y)
