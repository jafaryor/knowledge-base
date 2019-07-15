## Technical Debt
Very simply, technical debt can be defined as the engineering work you owe yourself because something caused a gap between what you should have done versus what you did do.

Conceptualizes the trade off (компромисс) between the short-term benefit of rapid delivery and long-term value.

> Like monetary debt, technical debt can accumulate “interest”. In this concept, the interest is the increasing difficulty it can be to implement changes later on, especially as a software project dominoes through multiple phases. The longer technical debt is ignored or unaddressed, software entropy can occur.


### What causes technical debt
The debt is incurred when IT chooses to delay better coding and building internal pieces that should be there, for various reasons.

* Poor conception

    The rush in delivering faster often results in poorly designed software.

* Poor scheduling

    Underestimation during software development estimation process often causes technical debt.

* Bad development practices

    A lack of development good practices and conventions will lead developers to implement their design, rebuild over and over the same logic and format their codes the way they want rather than the way it is commonly accepted in the particular software project.

* Outdated technology

    With each technology improvement, new technical debt can arise.


### Signs:
* Code Smell
* Source code formatting
* Low test coverage
* Lack of modularity
* Code complexity
* Lack of documentation
* Product bugs


### How to measure:
One approach is to perform a static analysis of code using tools that support the analysis. Like:
* [Coverity](https://scan.coverity.com/)
* [SonarQube](https://www.sonarqube.org/)
* [Checkstyle](http://checkstyle.sourceforge.net/)
* [Closure Compiler](https://github.com/google/closure-compiler)


### Types
* Planned Technical Debt

    This type of technical debt occurs when the organization makes an informed decision to generate some technical debt with the full understanding of the consequences (risks and costs).

    Example: Going without unit tests to accelerate the develpoement

* Unintentional Technical Debt

    This refers to unplanned technical debt that arises due to poor practices. For example, a design approach that ends up containing many errors.

    This type of technical debt sometimes occurs as the direct result of poor communication within the organization.

* Unavoidable Technical Debt

    This occurs due to changes in the business and the progress of technology over time that present better solutions.

    It typically arises when scope changes are requested mid-project, that result in an immediate cost such as adding a new feature to an existing design to better support mobile delivery.


### Track
As the debts can survive multiple development cycles, tracking it is essential. Here’s how:
* Start a list of technical debts. (This includes all instances where the developers know the code isn’t as clean as it should or needs to be for future development.)
* List and group deferred tasks into workable units.
* Note the consequences of ignoring each unit.
* Keep the list visible.
* Inform teams that rely on delivery releases – like marketing, sales, etc. – that you’re working on technical debt, so that each new release cannot include only new features.
* Schedule regular and frequent time to pay off technical debt.


### Manage
* Assessment

    One way to come up with this measure is to look at the number of days developers would need to spend reducing technical debt by performing activities such as refactoring or replacing the application. Once you attached a dollar amount to these functions, you could then compare this data to other milestones, like number of remaining days before the release date. This will provide an excellent cost/benefit analysis and aid in communicating more effectively with the rest of the organization.

* Communication

    One of the most important steps to take in managing technical debt is to acknowledge that it exists in the first place and share that discovery with key stakeholders.

* Implementation

    There are three options to consider in terms of managing technical debt:
    1. Waive the requirement altogether.
    2. Refactor the application.
    3. Replace the application.

#### Agile
Because Agile embraces increments and iterations, instead of finished projects, implementing Agile theories can be a good way to stay on top of technical debt. Always thinking in short bursts of work makes it easier for IT teams to tackle smaller groups of technical debt: in an ongoing fashion.

> Use Test Automation and Continuous integration (CI) to track the progress.


#### [Read More](https://medium.com/existek/what-is-technical-debt-and-how-to-calculate-it-80193e4e746d)
