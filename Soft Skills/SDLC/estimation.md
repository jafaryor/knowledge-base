## Agile Estimation
A team uses __Story Points__ when they estimate the amount of effort required to deliver a user story.

Notable features of story points are that they:
* represent the contributions of the whole team
* do not equate directly to time the task might take
* are a rough measure for planning purposes - similar to orders of magnitude
* are assigned in a Fibonacci-like sequence: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100
* estimate the ‘size’ of stories relative to each other

> Inspecting what has been done in the past could both reveal complexities as well as serve to reduce it. This is an essential part of estimating.

> Consistency reduces complexity and thus optimises predictability.

### Story points vs. hours
Here are few reasons to use story points:
* Dates don’t account for the non-project related work that inevitably creeps into our days: emails, meetings, and interviews that a team member may be involved in.
* Dates have an emotional attachment to them. Relative estimation removes the emotional attachment.
* Each team will estimate work on a slightly different scale, which means their velocity (measured in points) will naturally be different. This, in turn, makes it impossible to play politics using velocity as a weapon.
* Once you agree on the relative effort of each story point value, you can assign points quickly without much debate.
* Story points reward team members for solving problems based on difficulty, not time spent. This keeps team members focused on shipping value, not spending time.

### Techniques
___

#### Planning Poker
To estimate each item from the product backlog, team members get the same sets of cards with numbers written on them. Then, after a brief introduction of the product backlog item by the Product Owner (who doesn’t vote) and the discussion, they privately pick the card with the number of story points they consider relevant to the amount of work required to complete this item and reveal them at the same time.

If the numbers differ, team members discuss why they’ve chosen such amount of story points for a given feature, and then vote again. They do so till they reach a consensus, and then move onto the next item from the product backlog.

And if the number agreed on is high, let’s say 20, 40 or higher, it means that a story may require too much work for one sprint and may need to be broken down to smaller tasks.

___

#### Estimation by Analogy (Top-down)
Analogous estimation is a technique which uses the values of parameters from historical data as the basis for estimating similar parameter for a future activity.

Parameters examples: Scope, cost, and duration.

Measures of scale examples − Size, weight, and complexity.

Advantages:
* Analogous estimation is a better way of estimation in the initial stages of the project when very few details are known.

* The technique is simple and time taken for estimation is very less.

* Organization’s success rate can be expected to be high since the technique is based on the organization’s past project data.

* Analogous estimation can be used to estimate the effort and duration of individual tasks too. Hence, in WBS when you estimate the tasks, you can use Analogy.

Pros: calculation is fast; not much documentation is needed.

Cons: not so accurate in comparison with other techniques.

Accuracy: the lowest

___

#### Decomposition (Bottom-up)
The Project Estimation Approach that is widely used is Decomposition Technique. Decomposition techniques take a divide and conquer approach.

In this case a project or a task is broken into smaller parts until it gets possible to estimate each of them. Thus knowing how much time, efforts, resources or money are required for a certain task, it gets possible to summarize all of them and obtain a picture of the whole project estimate.

Pros: the highest level of accuracy; since all the project is divided into smaller parts, it is highly likely that not a detail will be missed.

Cons: it requires the greatest amount of time in comparison with other techniques.

Accuracy: the highest.

___

#### 3-point
A technique that involves people that are professional in the task we are estimating by this technique.

Like the name implies, there are three parts which are the three different estimates.
* An __optimistic estimate (O)__ is what Hailey and her team hope will be the amount of time to complete their project assuming everything goes as planned.
* The __pessimistic estimate (P)__ is the worst case scenario and is an estimate that Hailey and her team give if everything goes wrong.
* The __most likely estimate (M)__ is what will most likely happen and usually falls between the pessimistic and optimistic estimate.

Process:
1. _Discussion_ - The first step is to meet with the team and discuss what you may encounter that would make the project take longer and what could occur that may result in the project taking less time.
2. _Estimates_ - The next step is making all 3 estimates for each task.
3. _Calculate_ - calculate with one of the following formulas:
    * _Triangular Distribution_: `E = (O + M + P ) / 3`
    * _Beta_ (or _PERT_ = Project Evaluation and Review Technique):
        ![three-point-estimate](../images/three-point-estimate.png)

Pros: it is considered to be one of the most accurate estimation techniques in project management; it reduces the scenario with too optimistic and too inflated estimates.

Cons: it requires more time to provide three estimates for each task.

Accuracy: close to the highest value.

___

#### T-Shirt Sizes
This is a perfect technique for estimating a large backlog of relative large items. Especially when you have several concurrent scrum teams working on the same product.

Items are estimated into t-shirt sizes: XS, S, M, L, XL. The decision about the size is based on an open and mutual collaborative discussion.

This method is an informal and quick way to get an rough feeling about the total size of your backlog.

___

#### Dot Voting
When you are faced with a relative small set of items and in need of a super simple and effective technique to estimate you can use Dot Voting. This method has originated form decision making and you can use it for estimating.

Each person gets a small number of small stickers and can choose to vote for the individual items. The more dots is an indicator of a bigger size. Works well in both small and large group.

You have to limit the number of estimated items.

___

#### The Bucket System
Much faster than planning poker is the Bucket System. This system is a good alternative when estimating a large number of items with a large group of participants.

Create several buckets in the sequence of planning poker. The group estimates the items by placing them in these “buckets”.

[Watch on Youtube](https://www.youtube.com/watch?v=rD_N2jWfizo)

___

#### Large/Uncertain/Small
A very fast method of rough estimating is the Large/Uncertain/Small method.

The team is being asked to place the items in one of these categories. The first step is to categorize the obvious items in the two extreme categories. Next the group can discuss the more complex items.

This is actually a simplification of the bucket system. The system is especially good to use in smaller groups with comparable items. Next you can assign sizes to these 3 categories.

___

#### Affinity Mapping
This method is based on finding similarities in the estimated items.

The team is asked to group them together. Best way is to execute this is a visual way and order them form small groups to large.

It works best with a small group of people and a relative small number of items. You can assign estimation numbers to the different groups.

___

#### Ordering method
This is an exercise where you get an accurate image on the relative size of items. This works best in a small group of expert.

All items are placed in random order on a scale label ranging from low to high. Every participant is being asked to move one item on the scale. Each move is just one spot lower or one spot higher or pass the turn. This continues till no team member want to move items and passes their turn.

The ordering protocol is a method of getting fine grained size estimates. Works best with a relative small group of people and a large number of items.

___

### Next Step
Team velocity is the number of story points which is the sum of story pints assigned to the tasks done during the sprint.

To determine the budget of your project, you can use this basic formula:

> (total Story Points / Velocity * team hours per sprint cost) + non labor costs = estimated budget

For example, we have a project estimated on 100 story points and our team’s average velocity is 20. Assigning 5 people team to the project with $50 hourly rates, the team hours per sprint is worth $20,000 and $100,000 for 5 sprints. With a hypothetical non labor costs of $50,000, the estimated budget for our project would be $150,000.

___

#### [How to estimate article](https://medium.com/teamdeck/your-estimates-suck-but-thats-ok-30977c696212)
