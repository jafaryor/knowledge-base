## Software Develpoment Techniques
* #### Test-Driven Development (TDD)

    TDD is a software development discipline where developers write automated test cases for enhancement or new features before they write any code.

    The pure TDD cycle is to write one failing unit test, then enough code to pass the test. Then a second failing unit test, then enough new code to pass both tests. And so forth.

    TDD helps to ensure the quality by focusing on requirement before writing the code. It assists in keeping the code clear, simple and testable by breaking it down into small achievable steps. It is also provides documentation about how the system works for anyone coming into the team later

* #### Behavior-Driven Development (BDD)

    Behavioral Driven Development (BDD) is a software development approach that has evolved from TDD (Test Driven Development). It differs by being written in a shared language (English), which improves communication between tech and non-tech teams and stakeholders. In both development approaches, tests are written ahead of the code, but in BDD, tests are more user-focused and based on the system’s behavior.

    This technique operates at a slightly higher level than TDD while still following the basic principle of writing the test, then coding to pass the test.

    BDD focuses on the behavioural aspect of the system rather than the implementation aspect of the system.

    It can be difficult to distinguish between BDD and ATDD - the difference here is subtle.

* #### Acceptance-Test-Driven Development (ATDD)

    This and BDD are often, in my experience, used interchangeably, particularly if the acceptance test is expressed in the Given-When-Then pattern.

* #### MDD

    MDD stands for Model-Driven Development. Together with a number of non-functional requirements such as event management and security, there are 3 main architectural characteristics that can be outlined for the functional requirements, aforementioned to development. These are the solutions:
    * Limitations
    * Configuration
    * Domain model

    It is clear that the efficiency improvements from MDD are unquestionable and this methodology was used to implement numbers of Microsoft co-operation’s projects.

* #### DDD

    Domain Driven Design or DDD is a software development method for multipart requirements through linking the development to a growing model and it has some relationship to other ideas such as:
    * Model Driven Engineering
    * Object-Oriented Analysis and Design
    * Model Driven Architecture
    * POJOs (Plain Old Java Object)
    * POCOs (Plain Old CLR Object)
    * Event Sourcing (ES)
    * Domain-specific language (DSL)
    * Command Query Responsibility Segregation (CQRS)
    * Aspect-oriented programming (AOP)
    * The naked objects pattern

    One of the disadvantages of this methodology and the reason why it is not used for this project is because there has to be a great sequestration and encapsulation deal for implementation within the domain model. This is acceptable when there are number of business domain complexity.

#### The ‘Given-When-Then’ formula BDD example
This is the proposed template for writing BDD test cases for a user story, which can be defined as:
1. Given a certain scenario
2. When an action takes place
3. Then this should be the outcome.

#### [Study on A Few Software Development Methodologies](https://medium.com/@AmirHassanAzimi/study-on-a-few-software-development-methodologies-46b639d08d6e)
