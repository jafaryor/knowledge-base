## Code Quality
Code quality is a group of different attributes and requirements, determined and prioritized by your business. Here are the main attributes that can be used to determine it:
* __Simplicity__: Means you don’t do in ten lines what you can do in five. It means you make extra effort to be concise, but not to the point of obfuscation.
* __Clarity__: Easy to read and oversee for anyone who isn’t the creator of the code. If it’s easy to understand, it’s much easier to maintain and extend the code. Not just computers, but also humans need to understand it.
* __Maintainable__: A high-quality code isn’t overcomplicated. Anyone working with the code has to understand the whole context of the code if they want to make any changes.
* __Documented__: The best thing is when the code is self-explaining, but it’s always recommended to add comments to the code to explain its role and functions. It makes it much easier for anyone who didn’t take part in writing the code to understand and maintain it.
* __Refactored__: Code formatting needs to be consistent and follow the language’s coding conventions. Some [code refactoring tips here](https://apiumhub.com/tech-blog-barcelona/code-refactoring-techniques/).
* __Well-tested__: The less bugs the code has the higher its quality. Thorough testing filters out critical bugs ensuring that the software works the way it’s intended.
* __Extendible__: The code you receive has to be extendible. It’s not really great when you have to throw it away after a few weeks.
* __Efficiency__: High-quality code doesn’t use unnecessary resources to perform a desired action.
* __Readability__: Make the code more readable and easier to comprehend for everyone working on the project. It’s much harder to read and understand a bad quality code than to write it.
* __Lower technical debt__: Good quality code can speed up long-term software development since it can be reused and developers don’t have to spend that much time fixing old bugs and polishing code. It also makes it easier for new project members to join the project.
* __Modularity__
* __Efficiency__: Means your program is fast and economical.
* __Elegance__: Is like beauty: hard to describe but easy to recognize. Elegance combines simplicity, efficiency, and brilliance, and produces a feeling of pride.
* __Security__


### How improve
* Style guide. For code style consistency.
* Linter. Provide hints/advices how to iprove code quality.
* Refactor legacy code.
* Follow best practices.
* Code review.
* Functional tests. It shows if your code actually works or not.
* Static code analysis tools


### Clean code principles:
* If it isn’t tested, it’s broken
* Choose meaningful names. This is what makes code self-documenting.
* Classes and functions should be small and obey the Single Responsibility Principle (SRP)
* Catch and handle exceptions, even if you don’t think you need to. Better to be safe than sorry.
* Logs, logs, logs


#### Use CI
Here is the process:
* Continuous integration platform will run the linters on the code. If it fails, the process will stop here and the developer have to fix the style-related issues.
* It will run the functional test and move to the next step if the code runs according to plan.
* Then it starts calculating test coverage. If it doesn’t meet the predefined threshold, it will fail.


### How to measure
Use _Static Code Analysis Tools — Sonar_. Below there’s a small list of some of the cool things a tool of this sort can offer. It also provides the code quality metrics, which are:
* #### Complexity

    It is the Cyclomatic Complexity calculated based on the number of paths through the code.
    
    Complexity is incremented by one for each: function (i.e non-abstract and non-anonymous constructors, functions, procedures or methods), `if`, short-circuit (AKA lazy) logical conjunction (`&&`), short-circuit (AKA lazy) logical disjunction (`||`), ternary conditional expressions, loop, `case` clause of a `switch` statement, `throw` and `catch` statement.

* #### Cognitive Complexity

    How hard it is to understand the code's control flow.

* #### Reliability

    The analyzer detects possible failure points and points them out to us. These types of issues are important and should be resolved first since they expose points of failure. That means that our code is not simply low quality, but potentially broken.

* #### Maintainability (code smells)

    Code Smell and Technical Debt. (read about them separately)

* #### Security

* #### Unit test failures.

* #### Test Coverage

    The best way to measure test effectiveness is to track test coverage. It shows what portion (%) of the code is covered by the testing algorithm. To get a better understanding, it’s worth breaking down test coverage:
    * __Statement coverage__ (%): number of statements executed during a test divided by all statements
    * __Branch coverage__ (%): number of executed conditions divided by all conditions
    * __Function coverage__ (%): number of executed functions divided by all functions
    * __Lines coverage__ (%): number of lines ran during a test divided by all lines

    [Istanbul](https://istanbul.js.org/) is a cool tool for measuring test coverage for JavaScript codebase.

    Even if coverage wouldn’t be flawed, it still would be a mistake to try and get 100% coverage. While everything can be tested, not everything is easy to test!

    Think about UI animations, communication between Threads, operations on filesystem,…

    ![test-coverage-graph](./images/test-coverage-graph.png)

    Trying to test complex things doesn’t just take way to much effort. The resulting tests usually also tend to be so complex that they will end up being a maintenance burden.

    _[Read More](https://ordepdev.me/posts/code-coverage)_

* #### Duplications

* #### Issues

![code-qualitymeasure](./images/code-qualitymeasure.webp)
