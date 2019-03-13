## RAD SDLC Model
Rapid application development is a software development methodology that uses minimal planning in favor of rapid prototyping. A prototype is a working model that is functionally equivalent to a component of the product.

RAD model enables rapid delivery as it reduces the overall development time due to the reusability of the components and parallel development. RAD works well only if high skilled engineers are available and the customer is also committed to achieve the targeted prototype in the given time frame.

Since there is no detailed preplanning, it makes it easier to incorporate the changes within the development process.

The most important aspect for this model to be successful is to make sure that the prototypes developed are reusable.

#### Phases of the RAD Model
* Business Modeling

    This step in the RAD model takes information gathered through many business-related sources. The analysis takes all the pertinent information from the company. This info is then combined into a useful description of how the information can be used when it is processed, and what is making this specific information successful for the industry.

* Data Modeling

    The information gathered in the Business Modeling phase is reviewed and analyzed to form sets of data objects vital for the business. The attributes of all data sets is identified and defined. The relation between these data objects are established and defined in detail in relevance to the business model.

* Process Modeling

    The data object sets defined in the Data Modeling phase are converted to establish the business information flow needed to achieve specific business objectives as per the business model. Process descriptions for adding, deleting, retrieving or modifying a data object are given.

* Application Generation

    When all the information gathered is coded, and the system that is going to be used to create the prototype is built. The data models created are turned into actual prototypes that can be tested in the next step.

* Testing and Turnover

    The overall testing time is reduced in the RAD model as the prototypes are independently tested during every iteration. However, the data flow and the interfaces between all the components need to be thoroughly tested with complete test coverage.

![sdlc_rad_model](../images/sdlc_rad_model.jpg)

RAD is used on designing prototypes and then developers reengineer the prototypes into production-quality code

#### RAD vs Agile
| RAD Model |	Agile Model |
| --- | --- |
| RAD is used on designing prototypes and then developers reengineer the prototypes into production-quality code	| Prototypes are used only for design or basic business analysis during the inception phase |
| Developers focus on creating the feature (no matter how bad it is at first) and then improve it | The team breaks down the solution into features |
| RAD teams are managed by the project manager (PM)* | Team members are self-managing* |
| The Agile standards described aren't adhered to in RAD | Developers find and fix the bugs in the code as quickly as possible and the team has the confidence to change the code without breaking the product. |
| Developers work as individuals (often results in unmaintainable and poorly designed code) | Agile teams focus on communication and designing the product as a team |

#### Application
RAD projects follow iterative and incremental model and have small teams comprising of developers, domain experts, customer representatives and other IT resources working progressively on their component or prototype.

RAD model can be applied successfully to the projects in which clear modularization is possible. If the project cannot be broken into modules, RAD may fail.

Scenarios where RAD can be used:
* When the system can be modularized and then distributed in a divided form;
* When there are many designers available for the modeling
* When there is money in the budget for using automated code generating tools;
* When a system needs to be produced in a short span of time (2-3 months).
* Only if domain experts are available with relevant business knowledge.
* Should be used where the requirements change during the project and working prototypes are to be presented to customer in small iterations of 2-3 months.

#### Advantages:
* Flexible and adaptable to changes.
* Progress can be measured.
* Iteration time can be short with use of powerful RAD tools.
* Productivity with fewer people in a short time.
* Reduced development time.
* Increases reusability of components.
* Quick initial reviews occur.
* Encourages customer feedback.
* Integration from very beginning solves a lot of integration issues.
* With less people, productivity can be increased in short time

#### Disadvantages:
* Dependency on technically strong team members for identifying business requirements.
* Only system that can be modularized can be built using RAD.
* Inapplicable to cheaper projects as cost of modeling and automated code generation is very high.
* Management complexity is more.
* Suitable for systems that are component based and scalable.
* It can't be used for smaller projects.
* When technical risk is high, it is not suitable.
* If developers are not committed to delivering software on time, RAD projects can fail.

### Code Generation Tools
ACG tools may directly translate the software specification (low-level and/or highlevel requirements) into source code, thereby potentially eliminating or automating
several software development and verification activities.

Automatic code generation is vital to the cost effectiveness of development. It eliminates the manual effort in coding from design, therefore, accelerating the process while decreasing the chance of errors when compared to manual coding from requirements or models.

The reason to use code generation are fundamentally four: productivity, simplification, portability, and consistency.

* Productivity

    With code generation you write the generator once and it can be reused as many times as you need. Providing the specific inputs to the generator and invoke it is significantly faster than writing the code manually, therefore code generation permits to save time.

* Simplification

    With code generation you generate your code from some  abstract description. It means that your source of truth becomes that description, not the code. That description is typically easier to analyze and check compared with the whole generated code.

* Portability

    Once you have a process to generate code for a certain language or framework you can simply change the generator and target a different language or framework. You can also target multiple platforms at once. For example, with a parser generator you can get a parser in C#, Java and C++. Another example: you might write a UML diagram and use code generation to create both a skeleton class in C# and the SQL code to create a database for MySQL. So the same abstract description can be used to generate different kinds of artifacts.

* Consistency

    With code generation you get always the code you expect. The generated code is designed according to the same principles, the naming rule match, etc. The code always works the way you expect, of course except in the case of bugs in the generator. The quality of the code is consistent. With code written manually instead you can have different developers use different styles and occasionally introduce errors even in the most repetitive code.

As all tools code generation is not perfect, it has mainly two issues:

* Maintenance

    When you use a code generator tool your code becomes dependent on it. A code generator tool must be maintained. If you created it you have to keep updating it, if you are just using an existing one you have to hope that somebody keep maintaining it or you have to take over yourself. So the advantages of code generation are not free. This is especially risky if you do not have or cannot find the right competencies to work on the generator.

* Complexity

    Code generated automatically tend to be more complex than code written by hand. Sometimes it has to do with glue code, needed to link different parts together, or the fact that the generator supports more use cases than the one you need. In this second case the generated code can do more than what you want, but this is not necessarily an advantage. Generated code is also surely less optimized than the one you can write by hand. Sometimes the difference is small and not significant, but if your application need to squeeze every bit of performance code generation might not be optimal for you.

#### [Read More](https://tomassetti.me/code-generation/)
