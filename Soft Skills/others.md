### [Code Review](https://medium.com/palantir/code-review-best-practices-19e02780015f)

__Continuous Integration__ - developement process where developers continually commit their changes to shared repo. The code repo is automatically built and tested before it is merged. CI tools: `Jenkins`, `Travis CI`, `Circle CI` ...

Use Circle CI as a CI tool if pusing to GitHub as Circle CI is already integrated into GirHub.

Continuous Integration encourages the team members to integrate the work frequently and automate the task of building the code, static analysis of code, running unit tests, functional test cases…etc.

__Continuous Delivery__ aims to automate the software delivery process to enable easy and assured deployments into production — at any time.

In CI/CD you setup a pipeline. Pipeline is nothing but a set of tasks to be run from the moment you pushed your code to the main branch till the final build is deployed on the server which makes the product live. Early feedback is the key in CI/CD.

__Refactoring__ is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.the war

During the refactoring stage, you have to look for code smells. Code smells are ning signs in your code.

In __Pair Programming__ there are always two people working on a single piece of code at the same time on the same machine. One who writes the code is called driver and another constantly reviews it as it is being written, he is called navigator. They constantly switch roles. The key advantage is the quality of the code. It brings the best possible solution as two minds are better than one.

Pros:
* Having 2 sets of eyes on code generally increases the quality of the code
* When one person gets tired or stuck, the pair can step in and help out (assuming one person is the main driver)
* Pairing facilitates knowledge transfer
* Pairing results in both programmers being intimately familiar with the code they worked on (as long as they both were engaged)

Cons:
* You are using 2 programmers instead of 1 (costly from a business perspective)
* If there is a huge discrepancy in skill between the pairs, the more experienced pair might lose patience, and the less experienced pair might lose confidence
If the pairs don’t get along or aren’t compatible, the session will not be effective

__Timeboxing__: is the approach for completing the project incrementally by breaking it down into splitting the project in portions, each with a fixed budget and a delivery date. For each portion a number of requirements are prioritised and selected. Because time and budget are fixed, the only remaining variables are the requirements.

__MoSCoW__: is a technique for prioritising work items or requirements. It is an acronym that stands for:
1. Must have : All features classified in this group must be implemented and if they are not delivered, the system would simply not work
2. Should have : Features of this priority is important to the system but can be omitted if time constraints endanger.
3. Could have : These features enhance the system with functional items which can easily be reassigned to a later timebox.
4 .Want to have : These features only serve a limited group of users and are of little value.

__PRINCE2__
