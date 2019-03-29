## Code Quality
* If it isn’t tested, it’s broken
* Choose meaningful names

    This is what makes code self-documenting.

* Classes and functions should be small and obey the Single Responsibility Principle (SRP)
* Catch and handle exceptions, even if you don’t think you need to

    Better to be safe than sorry.

* Logs, logs, logs

### Static code analysis tools — Sonar
Below there’s a small list of some of the cool things a tool of this sort can offer.
* #### Reliability

    The analyzer detects possible failure points and points them out to us. These types of issues are important and should be resolved first since they expose points of failure. That means that our code is not simply low quality, but potentially broken.

* #### Maintainability (code smells)

    Code smells are maintainability related issues that may cause problems in the future and contribute to the technical debt of our codebase. Technical debt is measured by the amount of estimated time it will take to fix all code smells and contributes to the maintainability rating of the project.

    Lastly, the maintainability rating is a measure of the proportion of technical debt and total project time.

    Most common code smells:
    * __Duplicated code__: don’t repeat yourself!
    * __Long methods__: although they are not always wrong, shorter methods still are easier to read and to understand.
    * __Large class/lazy class/’overloaded’ class__: a class could be too long, or do too little, or have too many responsibilities. Beware your class!
    * __Data classes__: classes with all data and no behaviour can smell.
    * __Long parameter list__: limit the number of parameters or use an object to combine them.
    * __Comments__: ask yourself — are the comments necessary? Can you refactor the code so that comments are not required?
    * __Dead code__: delete code that isn’t being used.
    * __Inconsistent names__: pick a set of standard terminology and stick to it throughout your methods.
    * __Uncommunicative name__: does the name of the method describe what the method does? If not, change the name of your method.

* #### Complexity

* #### Security

* #### Coverage
