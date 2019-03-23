## Software Development Methodologies
Every business should decide on organizing the work process inside the company, according to its priorities and projects in development.
* ### Agile

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

* ### Waterfall

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

* ### Extreme Programming

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

* ### Rapid Application Development Methodology

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

* ### Spiral

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

* ### Kanban

    Kanban is a visualisation method that helps you see the flow of work through your team.

    Used in this way, it will show inefficiencies in your workflow and help you make tactical improvements. Central to Kanban is the visual board.

    ![kanban-principles](../images/kanban-principles.png)

    ![kanban-practices](../images/kanban-practices.png)

    Where:

    * __Limit Work in Progress (WIP)__: WIP is the number of items (i.e. cards, tickets, stories, tasks etc) that a team is currently working on.

        There are lots of good reasons why you should limit WIP:
        * You complete work faster
        * You get feedback faster
        * You deliver value to your customer faster
        * You avoid context switching
        * You can easily see bottlenecks
        * You won’t be flooded by unfinished work because it helps you manage capacity

    * __Make process policies explicit__: A list of “rules” for each stage of the workflow.

    * __Improve collaboratively, evolve experimentally__: The one event I advise you borrow from Scrum and lock into your team calendar from the get-go is regular Retrospectives. A key difference between Scrum-styled verses Kanban-styled Retrospectives is the focus on metrics and experimentation in Kanban.

    * __Manage flow__: Good Kanban teams focus on WIP. Great Kanban teams focus on flow — they use three artefacts and events to manage flow:

        1) The Kanban board helps them see actual and potential bottlenecks.
        2) Metrics (e.g. lead time, cycle time, queues and throughput) help them analyse flow. They use visualisation and metrics to find the biggest constraints they have and
        3) Retrospectives to make tactical process improvements to remove these constraints.

    #### How a Kanban board works:
    * The simplest Kanban board has a three-stage workflow — to do, doing and done.
    * A Kanban board isn’t a ticketing system. It helps you to visualise the flow of work through your team. Flow goes from left to right.
    * __To do__: Is the backlog. The backlog should be in prioritised order with the most important things first. The higher up an item is in the backlog, the better quality it should be i.e. the right size and the right amount of information for someone in your team to pick it up and work on it. Don’t spend too much time planning items further down the backlog. Priorities may change and that would be wasted effort. You want to plan just in time.
    * __Doing__: Is the process that a piece of work goes through from the time you start work on it through to completion. Limiting your WIP in this stage of the workflow is one of the key practices of Kanban.
    * __Done__: Is when your work has been completed. The goal is to get valuable work flowing through your team as quickly as possible. In order to measure speed you use Cycle Time: The average time it takes for an item to move from doing to done.

    ![kanban-work](../images/kanban-work.png)

    Once you are up and running as a Kanban team, you will need to work on incremental process improvements. This is where Retrospectives come in. How to hold it:
    1. Open: Use a quick check-in activity to set the stage and engage the team.
    2. Last improvement: Review the last experiment. What did we learn from it? Should we keep it or discard it?
    3. Kanban board & metrics: Review the board and/or metrics. What does the data show you?
    4. Generate insights: Discuss what is working well and what isn’t working well. Identify the biggest constraint. Discuss the root cause.
    5. Next improvement: Agree on an experiment to remove the constraint. Use the hypothesis driven format, “We believe `<this improvement>`. Will result in `<this outcome>`. We will know we have succeeded when `<we see this measurable signal>`.”
    6. Close: Use a quick closing activity to end the Retrospective.

* ### Scrum

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

    #### How it works:
    ![scrum-start](../images/scrum-start.jpeg)

    There are 3 roles:
    * Product Owner

        The Product Owner represents the business and handles the relationship between the product and the investment of time, resources, and energy that the business is incurring. The PO ensure that maximum ROI is achieved.

        Tactically, they help the team understand what is higher priority and what is lower priority, what might be more valuable to work on and less valuable to work on. Their role is to help shift resources and time and attention. Sometimes, but not always, they may prioritize things on the backlog but they are the only ones who can ask the team to work and who can change the order of the backlog.

        Finally, they help the team understand the requirements so as to maximize time and resources to produce higher efficiency and effectiveness (thus boosting ROI). They do this by creating user stories that generally look like this:

        > As a `<type of user>`, I want to `<do something>`, so that `<some value is created>`.

        A Product Owner:
        * Holds and maintains vision for the product
        * Represents the interests of the business
        * Represents the customer(s)
        * Owns the backlog
        * Orders and priorities the product backlog
        * Creates acceptance criteria for the items in backlog
        * Is available to assist and answer team’s questions

    * Scrum Master

        The Scrum Master plays the role of coach and helps guide the team to better self-organization, performance, and decision making. While the team focuses on building the best product, the SM focuses on building a high-performance team.

        In summary, they:
        * The resident Scrum expert and advisor
        * A coach for the team
        * The remove blockers, impediments, and help the team continue to move forward
        * The facilitate the backlog and the other parts of Scrum

    * Team Member

        A Team Member has the most authority in the Scrum system as they have the authority to decide how the work gets done, what tools they should use, what techniques should be deployed, and the associated costs of those decisions.

        Team Members:
        * Responsible for completing user stories to incrementally increase the value of the product
        * Self-organize to get all of the work done
        * Owns and creates the estimates for the work
        * Owns the “how to do the work” decisions
        * Avoids single-minded, specialist-thinking and instead considers the team’s performance in aggregate above their own

    __The Product Backlog__ is the master list of all of the planned and desired deliverables for the product. This can (and should) include features, bugs, documentation, Q/A, and more, essentially including anything that is meaningful and important to create for the product as a whole.

    Items within the backlog are called __user stories__.

    The list of backlog items or user stories is prioritized and ordered from the most important to the least important. The items at the top are also specific, well understood, and can be executed against quickly and efficiently. This means that they are also generally small tasks. Items further down the list are more ambiguous, less defined, and larger in scope and scale.

    Each item in the backlog should generally have the following:
    * Which users the story will benefit (who is it for)
    * A brief description of the desired functionality (what needs to be built)
    * The reason that this story is valuable (why we should do it)
    * An estimate as to how much work the story requires to implement
    * Acceptance criteria that will help the team know when it has been implemented correctly

    __Sprint Backlog__ is the team’s to do list for the sprint. Unlike The Product Backlog, it has a finite life-span: The length of the agreed upon sprint. It includes all the stories that the team has committed to delivering in the sprint and the associated tasks.

    __Burn Charts__ help the team understand the relationship between time and scope. Points are on the y-axis while sprints are on the x-axis. As time progresses, one can see how many points are remaining in the overall product and the relative speed and pace at which the team is working through the points and the sprints.

    ![burn-chart](../images/burn-chart.jpeg)

    __Task Board__ represents all the team’s tasks visibly so that everyone knows what is being worked on and by whom. The more simple of task boards have three columns:
    * To Do
    * Doing
    * Done

    Effective Scrum Teams define what _“done”_ means and then apply it to their Task Board and user stories. This is what is often described as the _“Definition of Done”_.

    __Sprint Cycle__ consists of several meetings, often called _“ceremonies”_:
    * Sprint Planning

        The goal is for the team to commit to a set of deliverables for the sprint and to also identify the tasks required to deliver upon the agreed user stories or backlog items. With the team, the Product Owner presents the suggested stories to prioritize and the team discusses their position and priority.

        The Product Owner decides which stories are going to be considered for the sprint while the team members doing the work are the ones who decide how much work they can reasonably take on.

        In the second part of the meeting the team then decides how the work will be done, decomposing the agreed stories into tasks. As tasks are defined the resulting stories on the backlog may change as well as more information become apparent and usable. It is not uncommon for a team to over-commit to the number of user stories in the beginning and then have to remove some as more details emerge.

        The result of this planning session is the Sprint Backlog which consists of the aforementioned user stories and the resulting associated tasks.

    * Daily Scrum/ Daily Standup

        Is when most teams hold a quick meeting near the beginning of the day to share the following:
        1. What tasks have been completed since the last Daily Scrum
        2. What tasks are to be completed by the next Daily Scrum
        3. What obstacles are slowing the team down

        Each member of the team participates and the meeting should be pointed, specific, and brief. The point is for everyone to get an idea of global progress and to identify issues before they become larger ones. This allows the team to actively inspect and adapt to changes in near real-time.

    * Story Time

        Happens mid-Sprint to discuss how the team can improve on the stories in the product backlog which are user stories for future sprints. These are not user stories in the current sprint.

        The Product Owner defines and refines the acceptance criteria for user stories in the backlog and also point values for stories that do not yet have an estimate. This is essentially an opportunity for the team to guess at how much work will be required to get the story done.

        Not all Scrum Teams have an official Story Time and many teams do this at-will daily.

    * Sprint Review

        A public declaration that the current sprint or cycle is done and it’s time to show the work that’s been completed. Stakeholders from the business are often invited to review progress as well.

        The stakeholders, upon review, will undoubtedly have feedback and suggestions and it is the job of the PO primarily to capture these things for review later.

    * Retrospective

        The final meeting for the team to gather so that they can inspect, adapt, and optimize their ever-improving performance as a team. This meeting is just for the team itself.

        The conversations should revolve around what they learned during the sprint and how that learning can be effectively applied to the next sprint so that work can be done more efficiently and more effectively.

    The Sprint Cycle is a fixed period of time where you work on small parts of the larger product. The goal after each sprint is the same: A demonstrable working piece of software.

    It is very common for teams to have sprint cycles that last 2 weeks, although in early-stage ventures the cycle times might be as small as 1 week. When Scrum was first introduced the cycles were around 4 weeks or one month.

    The goal of short sprints or cycles is so that continuous improvement happens faster and that any important learnings aren’t lost into the ether. The Scrum process is designed specifically to catch these new and important learnings and then apply them immediately into the system for improvement.

    For a one week sprint, you’ll usually have the following with time breakdowns:
    * Monday: Sprint Planning (1–2 hours)
    * Tuesday: Daily Standup (15 minutes)
    * Wednesday: Daily Standup (15 minutes), Story Time (1 hour)
    * Thursday: Daily Standup (15 minutes)
    * Friday: Daily Standup (15 minutes), Sprint Review (30 minutes), Retrospective (1–2 hours)

    ![scrum-sprint-cycle](../images/scrum-sprint-cycle.jpeg)

    #### [Read More about Scrum](https://guide.freecodecamp.org/agile/scrum/)

* #### Crystal Methods

* #### Dynamic System Development Method


https://medium.freecodecamp.org/why-agile-sucks-at-your-company-and-what-you-can-do-about-it-f4bebcc661c3
