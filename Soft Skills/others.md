### [Code Review](https://medium.com/palantir/code-review-best-practices-19e02780015f)

__Continuous Integration__ - developement process where developers continually commit their changes to shared repo. The code repo is automatically built and tested before it is merged. CI tools: `Jenkins`, `Travis CI`, `Circle CI` ...

Use Circle CI as a CI tool if pusing to GitHub as Circle CI is already integrated into GirHub.

Continuous Integration encourages the team members to integrate the work frequently and automate the task of building the code, static analysis of code, running unit tests, functional test cases…etc.

__Continuous Delivery__ aims to automate the software delivery process to enable easy and assured deployments into production — at any time.

In CI/CD you setup a pipeline. Pipeline is nothing but a set of tasks to be run from the moment you pushed your code to the main branch till the final build is deployed on the server which makes the product live. Early feedback is the key in CI/CD.

__Refactoring__ is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.the war

During the refactoring stage, you have to look for code smells. Code smells are ning signs in your code.

In __Pair Programming__ there are always two people working on a single piece of code at the same time on the same machine. One who writes the code is called driver and another constantly reviews it as it is being written, he is called navigator. They constantly switch roles. The key advantage is the quality of the code. It brings the best possible solution as two minds are better than one. 
