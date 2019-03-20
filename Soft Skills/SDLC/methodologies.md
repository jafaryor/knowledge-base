## Software Development Methodologies
Every business should decide on organizing the work process inside the company, according to its priorities and projects in development.
* #### Agile

    Agile software development is a conceptual framework for undertaking software engineering projects. There are a number of agile software development methodologies like Scrum, Crystal Methods and Dynamic Systems Development Model.

    The main goal of agile methods is minimizing the risk by developing software in short timeboxes, called iterations, which typically last one to four weeks. Each timebox is like a mini software project that includes all the tasks necessary to release the mini-increment of new functionality:
    * planning,
    * requirements analysis,
    * design,
    * coding,
    * testing, and
    * documentation.

    The iteration may not add enough functionality to warrant releasing the product, but an agile software project intends to be capable of releasing new software at the end of every iteration. After this iteration, the team reevaluates project priorities. Agile methods emphasize working product as the primary measure of the progress. Relative to the other methods Agile produce very little written documentation — the “real-time” is the preferable type of communication. Most of the development team members (and business owners too) are located nearby and can communicate face-to-face.

    __Pros__:
    * Adaptive approach that responds to changes favorably
    * Allows for direct communication to maintain transparency
    * Improved quality by finding and fixing defects quickly and identifying expectation mismatches early

    __Cons:__
    * Focuses on working with software and lacks documentation efficiency
    * Chances of getting off-track as outcome are not clear

* #### Waterfall

    The Waterfall model is a sequential development approach, in which development is seen as flowing steadily downwards (like a waterfall) through several phases, typically:
    * analysis
    * software requirements specificationSoftware design
    * software design
    * testing
    * integration (if there are multiple subsystems)
    * deployment (or Installation)
    * maintenance

    The linear and rigid nature of this method makes it easy to understand and manage. So its ideal for less experienced managers and teams. In this method, distinct goals are accomplished. Each phase must be 100% complete before moving onto the next phase, no turning back to modify the project or direction. In theory, this process leads to the project being delivered on time because each phase has been planned in detail. It can be used for projects with clear objectives and stable requirements.

    But in practice, waterfall development often falls short of expectations as it does not embrace the inevitable changes and revisions that become necessary with most projects.

    Emphasis is on planning, time schedules, target dates, budgets and implementation of an entire system at one time. Tight control is maintained over the life of the project via extensive written documentation, formal reviews, and approval/signoff by the user and information technology management occurring at the end of most phases before beginning the next phase. Written documentation is an explicit deliverable of each phase.

    Despite its inflexibility and thoughts of being out of date, this methodology intended to get rid of unnecessary paperwork, time-consuming regular meetings, and backlogs. So, this is a great choice for the small projects where all the aspects of development are known beforehand and a bad solution for complicated projects since it is quite inflexible.

    __Pros:__
    * Easy to understand and functional
    * Simple enough to handle as model is rigid
    * Saves significant amount of time
    * Allows for easy testing and analysis
    * It allows for departmentalization and managerial control

    __Cons:__
    * Only matches precise needs
    * Not applicable for maintenance projects
    * Does not allow editing in the testing phase
    * No option to know possible outcome of a project
    * Not excellent for long and ongoing projects

* #### Scrum

    Scrum is an iterative and incremental agile software development framework for managing product development.

    A key principle of Scrum is the dual recognition that customers will change their minds about what they want or need (requirements volatility) and that there will. Scrum adopts an evidence-based empirical approach — accepting that the problem cannot be fully understood or defined up front, and instead focusing on how to maximize the team’s ability to deliver quickly, to respond to emerging requirements, and to adapt to evolving technologies and changes in market conditions.

    Main features of Scrum:
    * a living backlog of prioritized work to be done
    * completion of a fixed set of backlog items in a series of short iterations or sprints
    * a brief daily meeting (“a scrum”) for explaining the progress, describing an upcoming work and possible obstacles
    * a brief planning session in which the backlog items for the sprint will be defined
    * a brief heartbeat retrospective when all team members reflect about the past sprint

    Scrum is best suited when the cost of delay is high and deadlines should meet a minimal delay. Scrum is often used when the end product is unclear or the requirements have no proper feedback from the clients. Here the client is involved in the whole process and determine and focus on certain sprint product backlog items that need to be completed (along with the team). Scrum takes its place among flexible methodologies that are appropriate for long-run development with frequent changes to requirements.

    __Pros:__
    * Decision making lies in the hands of the team
    * Business requirement document is considered insignificant
    * Lightly controlled method empathizing with constant updating

    __Cons:__
    * The processing method suffers because of wavering costs
    * Not suitable for big sized projects
    * Requires highly expert team, which has no place for novices

    ![scrum](../images/scrum.png)

* #### Extreme Programming

    Extreme Programming approach (__XP__) refers to an agile software engineering methodology. It was created to avoid the development of functions that are not currently needed. It aimed at the creation of a top-notch (high standard) final product with no regard for frequent changes in requirements. Another aim of this method is reducing the costs of software essentials. To achieve that, continuous testing and planning are applied.

    It is the best choice if your client has a deadline to deliver the product with no clear understanding of how it must work, and the risk is higher. XP techniques are setup to address and mitigate the risks and increase the likelihood of success.

    Unlike Waterfall methodology, where the requirements for the system are determined and often “frozen”, XP means that the cost of changing the requirements at a later stage in the project can be very high.

    XP team is supposed to have a customer on site, who specifies and prioritizes work for the team, and who can answer questions as soon as they arise.

    Extreme programmers only write code to meet actual needs at the present time in a project. For reviewing the code XP programmers work in pairs, sharing one screen and keyboard (which also improves communication) so that all code is reviewed as it is written.

    In Extreme Programming, tests are written before the code is written. The code is considered complete when it passes the tests (but then it needs refactoring to remove complexity). Despite it’s thought that XP could only work in small teams of fewer than 12 persons, it has been used successfully on teams of over a hundred developers.

    __Pros:__
    * It lays focus on customer involvement
    * Establishes rational plans and schedules
    * Developers are exceptionally committed to the project
    * Equipped with modernistic methods for quality software

    __Cons:__
    * Effectiveness depends on the people involved
    * Requires frequent meeting for development raising total costs
    * Necessitates for excessive development changes
    * Exact possibilities and future outcomes are really unknown

    ![extreme-programming](../images/extreme-programming.png)

* #### Rapid Application Development Methodology

    Rapid Application Development (RAD) Methodology is created to take the maximum advantage of the development software. It aimed to reduce the amount of construction needed to build a product. RAD is a condensed development process that produces a high-quality system with low investment costs. It’s possible due to the ability to quickly adjust needed things. It aimed at providing quick results.

    RAD is most effective for projects with a well-defined business objective and a clearly defined user group, but which are not computationally complex. It is especially useful if the project is of small to medium size and time sensitive. However, it requires a stable team composition with highly skilled developers. Deep knowledge is essential when working on a condensed development timeline that requires approval after each construction phase.

    RAD (rapid application development) proposes that products can be developed faster and of higher quality by:
    * using workshops or focus groups to gather requirements.
    * prototyping and user testing of designs
    * re-using software components.
    * following a schedule that defers design improvements to the next product version.
    * keeping review meetings and other team communication informal.

    RAD usually embraces object-oriented programming methodology, which inherently fosters (поощрять) software re-use.

    __Pros:__
    * Makes the entire development process effortless
    * Assists client in taking quick reviews
    * Encourages feedback from customers for improvement

    __Cons:__
    * Dependant on the team for performance
    * Works on modularized system confined on this methodology
    * Requires extremely skilled personnel to handle complexities
    * Not applicable for the small budgeted projects

    ![rad-methodology](../images/rad-methodology.png)

* #### Spiral

    The Spiral methodology extends the Waterfall model by adding rapid prototyping.

    It suits to large-scale complex systems. Spiral is generally chosen over the waterfall approach for large, expensive, and complicated projects.

    The Spiral Lifecycle Model is a sophisticated lifecycle model that focuses on early identification and reduction of project risks. A spiral project starts on a small scale, explores risks, makes a plan to handle the risks, and then decides whether to take the next step of the project (to do the next iteration of the spiral). It derives its rapid development benefit from continuously reducing the projects risk level. Success at using the Spiral Lifecycle Model depends on conscientious, attentive, and knowledgeable management.

    You can find the steps in the Spiral model as follows:
    1. The new system requirements are defined in details
    2. A preliminary design is created
    3. A first prototype of the new system is constructed from the preliminary design
    4. A second prototype is evolved using four steps:
        1. evaluation of the first prototype;
        2. defining the requirements for the second prototype;
        3. planning and designing the second prototype;
        4. constructing and testing the second prototype
    5. If the risk is great the project could be aborted. Risk factors might involve development cost overruns
    6. The existing prototype is evaluated in the same manner as was the previous prototype, and, if necessary, another prototype is developed from it
    7. The preceding steps are iterated until the customer is satisfied
    8. The final system is constructed (based on the refined prototype)
    9. The final system is thoroughly evaluated and tested
    10. Routine maintenance is carried out on a continuing basis to prevent large-scale failures and to minimize downtime

    __Pros:__
    * Risk factors are considerably reduced
    * Excellent for large and complex projects
    * Allows for additional functionality later
    * Suitable for highly risky projects with varied business needs

    __Cons:__
    * Costly model in software development
    * Failure in risk analysis phase may damage the whole project
    * Not appropriate for low-risk projects
    * Might get continued and never finish

* #### Kanban

    The term Kanban has a verbatim translation. “Kan” means visible or visual and “ban” means a card or board.

* #### Crystal Methods

* #### Dynamic System Development Method
