## Waterfall SDLC Model
Is a linear-sequential life cycle model.

In a waterfall model, each phase must be completed before the next phase can begin and there is no overlapping in the phases.

> ![sdlc_waterfall_model](../images/sdlc_waterfall_model.jpg)

<table class="tablepress tablepress-id-6"><thead><tr class="row-1 odd"><th class="column-1">No</th><th class="column-2">Phase</th><th class="column-3">Activities Performed</th><th class="column-4">Deliverables</th></tr></thead><tbody class="row-hover"><tr class="row-2 even"><td class="column-1">1</td><td class="column-2">Requirement Analysis</td><td class="column-3">1. Capture all the requirements.<br> 2. Do brainstorming and walkthrough to understand the requirements.<br> 3. Do the requirements feasibility test to ensure that the requirements are testable or not.<br></td><td class="column-4">RUD ( Requirements Understanding Document)</td></tr><tr class="row-3 odd"><td class="column-1">2</td><td class="column-2">System Design</td><td class="column-3">1. As per the requirements, create the design<br> 2. Capture the hardware / software requirements.<br> 3. Document the designs<br></td><td class="column-4">HLD ( High Level Design document)<br> <br> LLD (Low level design document)<br></td></tr><tr class="row-4 even"><td class="column-1">3</td><td class="column-2">Implementation</td><td class="column-3">1. As per the design create the programes / code<br> 2. Integrate the codes for the next phase.<br> 3. Unit testing of the code<br></td><td class="column-4">Programs<br> Unit test cases and results<br></td></tr><tr class="row-5 odd"><td class="column-1">4</td><td class="column-2">System Testing</td><td class="column-3">1. Integrate the unit tested code and test it to make sure if it works as expected.                          2. Perform all the testing activities (Functional and non functional) to make sure that the system meets the requirements.<br> 3. In case of any anomaly, report it. <br> 4. Track your progress on testing through tools like traceability metrics, ALM<br> 5. Report your testing activities. <br></td><td class="column-4">Test cases<br> Test reports<br> Defect reports<br> Updated matrices.<br></td></tr><tr class="row-6 even"><td class="column-1">5</td><td class="column-2">System Deployment</td><td class="column-3">1. Make sure that the environment is up<br> 2. Make sure that there are no sev 1 defects open.<br> 3. Make sure that the test exit criteria are met. <br> 4. Deploy the application in the respective environment.<br> 5. Perform a sanity check in the environment after the application is deployed to ensure the application does not break. <br></td><td class="column-4">User Manual<br> <br> Environment definition / specification<br></td></tr><tr class="row-7 odd"><td class="column-1">6</td><td class="column-2">System maintenance</td><td class="column-3">1. Make sure that the application is up and running in the respective environment.<br> 2. Incase user encounters and defect, make sure to note and fix the issues faced.<br> 3. Incase any issue is fixed; the updated code is deployed in the environment. <br> 4.The application is always enhanced to incorporate more features, update the environment with the latest features<br></td><td class="column-4">User Manual<br> <br> List of production tickets<br> <br> List of new features implemented.<br></td></tr></tbody></table>

#### Application
* Requirements are very well documented, clear and fixed.
* Product definition is stable.
* Technology is understood and is not dynamic.
* There are no ambiguous requirements.
* The project is short.

#### Advantages:
* Simple and easy to understand and use
* Easy to manage due to the rigidity of the model. Each phase has specific deliverables and a review process.
* Phases are processed and completed one at a time.
* Works well for smaller projects where requirements are very well understood.
* Clearly defined stages.
* Well understood milestones.
* Easy to arrange tasks.
* Process and results are well documented.

#### Disadvantages:
* No working software is produced until late during the life cycle.
* High amounts of risk and uncertainty.
* Not a good model for complex and object-oriented projects.
* Poor model for long and ongoing projects.
* Not suitable for the projects where requirements are at a moderate to high risk of changing. So, risk and uncertainty is high with this process model.
* It is difficult to measure progress within stages.
* Cannot accommodate changing requirements.
* Adjusting scope during the life cycle can end a project.
* Integration is done as a "big-bang. at the very end, which doesn't allow identifying any technological or business bottleneck or challenges early.
