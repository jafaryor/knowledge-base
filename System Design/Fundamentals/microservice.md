## Monoliths
A monolith is a self-contained and independent application. It is built as a single unit and is responsible for not just a particular task, but can perform every step needed to satisfy a business need.

### Advantages
* Simple to develop or debug.
* Fast and reliable communication.
* Easy monitoring and testing.

### Disadvantages
* Maintenance becomes hard as the codebase grows.
* Tightly coupled application, hard to extend.
* Requires commitment to a particular technology stack.
* On each update, the entire application is redeployed.
* Reduced reliability as a single bug can bring down the entire system.
* Difficult to scale or adopt technologies new technologies.

### Improvement
A __Modular Monolith__ is an approach where we build and deploy a single application (that's the Monolith part), but we build it in a way that breaks up the code into independent modules for each of the features needed in our application.

This approach reduces the dependencies of a module in such as way that we can enhance or change a module without affecting other modules. When done right, this can be really beneficial in the long term as it reduces the complexity that comes with maintaining a monolith as the system grows.

---

## Microservices
A microservices architecture consists of a collection of small, autonomous services where each service is self-contained and should implement a single business capability.

Each service has a separate codebase, which can be managed by a small development team. Services can be deployed independently and a team can update an existing service without rebuilding and redeploying the entire application.

Services are responsible for persisting their own data or external state (database per service). This differs from the traditional model, where a separate data layer handles data persistence.

### Characteristics
* __Loosely coupled:__ Services should be loosely coupled so that they can be independently deployed and scaled. This will lead to the decentralization of development teams and thus, enabling them to develop and deploy faster with minimal constraints and operational dependencies.
* __Small but focused:__ It's about scope and responsibilities and not size, a service should be focused on a specific problem. Basically, "It does one thing and does it well". Ideally, they can be independent of the underlying architecture.
* __Built for businesses:__ The microservices architecture is usually organized around business capabilities and priorities.
* __Resilience & Fault tolerance:__ Services should be designed in such a way that they still function in case of failure or errors. In environments with independently deployable services, failure tolerance is of the highest importance.
* __Highly maintainable:__ Service should be easy to maintainable and test because services that cannot be maintained will be re-written.

### Advantages
* Loosely coupled services.
* Services can be deployed independently.
* Highly agile for multiple development teams.
* Improves fault tolerance and data isolation.
* Better scalability as each service can be scaled independently.
* Eliminates any long-term commitment to a particular technology stack.

### Disadvantages
* Complexity of a distributed system.
* Testing is more difficult.
* Expensive to maintain (individual servers, databases, etc.).
* Inter-service communication has its own challenges.
* Data integrity and consistency.
* Network congestion and latency.

### Best practices
* Model services around the business domain.
* Services should have loose coupling and high functional cohesion.
* Isolate failures and use resiliency strategies to prevent failures within a service from cascading.
* Services should only communicate through well-designed APIs. Avoid leaking implementation details.
* Data storage should be private to the service that owns the data
* Avoid coupling between services. Causes of coupling include shared database schemas and rigid communication protocols.
* Decentralize everything. Individual teams are responsible for designing and building services. Avoid sharing code or data schemas.
* Fail fast by using a circuit breaker to achieve fault tolerance.
* Ensure that the API changes are backward compatible.

### Pitfalls
* Service boundaries are not based on the business domain.
* Underestimating how hard is to build a distributed system.
* Shared database or common dependencies between services.
* Lack of Business Alignment.
* Lack of clear ownership.
* Lack of idempotency.
* Trying to do everything ACID.
* Lack of design for fault tolerance may result in cascading failures.

### Beware of the distributed monolith
Distributed Monolith is a system that resembles the microservices architecture but is tightly coupled within itself like a monolithic application. Adopting microservices architecture comes with a lot of advantages. But while making one, there are good chances that we might end up with a distributed monolith.

Our microservice is just a distributed monolith if any of these apply to it:
* Requires low latency communication.
* Services don't scale easily.
* Dependency between services.
* Sharing the same resources such as databases.
* Tightly coupled systems.

One of the primary reasons to build an application using microservice architecture is to have scalability. Therefore, microservices should have loosely coupled services which enable every service to be independent. The distributed monolith architecture takes this away and causes most components to depend on one another, increasing design complexity.

### Microservices vs Service Oriented Architecture (SOA)
Service oriented architecture (SOA) defines a way to make software components reusable via service interfaces. These interfaces utilize common communication standards and focus on maximizing application service reusability whereas microservices are built as a collection of various smallest independent service units focused on team autonomy and decoupling.

### Why you don't need microservices
While each approach has its own advantages and disadvantages, it is advised to start with a monolith when building a new system. It is important to understand, that microservices are not a silver bullet instead they solve an organizational problem. Microservices architecture is about your organizational priorities and team as much as it's about technology.

Before making the decision to move to microservices architecture, you need to ask yourself questions like:
* "Is the team too large to work effectively on a shared codebase?"
* "Are teams blocked on other teams?"
* "Does microservices deliver clear business value for us?"
* "Is my business mature enough to use microservices?"
* "Is our current architecture limiting us with communication overhead?"
