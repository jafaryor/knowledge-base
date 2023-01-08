## GraphQL
GraphQL is a query language for APIs and a runtime for fulfilling those queries with existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. 

GraphQL is designed to make APIs fast, flexible, and developer-friendly. It can even be deployed within an integrated development environment (IDE) known as GraphiQL. As an alternative to REST, GraphQL lets developers construct requests that pull data from multiple data sources in a single API call. 

Additionally, GraphQL gives API maintainers the flexibility to add or deprecate fields without impacting existing queries. Developers can build APIs with whatever methods they prefer, and the GraphQL specification will ensure they function in predictable ways to clients.

Key takeaways:
* GraphQL is a modern query language and a runtime for APIs, widely seen as a successor to REST APIs.
* GraphQL is built around the concept of "get exactly what you asked for", without any under fetching or over fetching of data.
* GraphQL makes it easier to aggregate data from multiple sources, and uses a type system to describe data rather than multiple endpoints.

GraphQL supports reading, writing (mutating), and subscribing to changes to data (realtime updates – most commonly implemented using WebHooks).

When sending queries to your API, GraphQL returns a very predictable result, without any over fetching or under fetching, ensuring that apps using GraphQL are fast, stable, and scalable.

### Concepts
* __Schema__

    A GraphQL schema describes the functionality clients can utilize once they connect to the GraphQL server.

* __Queries__

    A query is a request made by the client. It can consist of fields and arguments for the query. The operation type of a query can also be a mutation which provides a way to modify server-side data.

* __Resolvers__

    Resolver is a collection of functions that generate responses for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler.

### Advantages
* Eliminates over-fetching of data.
* Strongly defined schema.
* Code generation support.
* Payload optimization.

### Disadvantages
* Shifts complexity to server-side.
* Caching becomes hard.
* Versioning is ambiguous.
* N+1 problem.

    Let's say you have a collection of `Car` objects (database rows), and each `Car` has a collection of Wheel objects (also rows). In other words, `Car` → `Wheel` is a 1-to-many relationship.

    Now, let's say you need to iterate through all the cars, and for each one, print out a list of the wheels. The naive O/R implementation would do the following: `SELECT * FROM Cars`. And then for each `Car`: `SELECT * FROM Wheel WHERE CarId = ?`.
    
    In other words, you have one select for the `Cars`, and then `N` additional selects, where `N` is the total number of cars.

### Use cases
* Reducing app bandwidth usage as we can query multiple resources in a single query.
* Rapid prototyping for complex systems.
* When we are working with a graph-like data model.

### REST vs GraphQL vs gRPC
A REST API is an "architectural concept" for network-based software. GraphQL, on the other hand, is a query language and a set of tools that operate over a single endpoint. In addition, over the last few years, REST has been used to make new APIs, while the focus of GraphQL has been to optimize for performance and flexibility.

While typical REST APIs might require loading from multiple URLs, GraphQL APIs get all the data in a single request - making apps quick even on slow mobile network connections.

Now that we know how these API designing techniques work, let's compare them based on the following parameters:
* Will it cause tight coupling?
* How chatty (distinct API calls to get needed information) are the APIs?
* What's the performance like?
* How complex is it to integrate?
* How well does the caching work?
* Built-in tooling and code generation?
* What's API discoverability like?
* How easy is it to version APIs?

| Type | Coupling | Chattiness | Performance | Complexity | Caching | Codegen | Discoverability | Versioning |
| - | - | - | - | - | - | - | - | - |
| __REST__ | Low | High | Good | Medium | Great | Bad | Good | Easy |
| __GraphQL__ | Medium | Low | Good | High | Custom | Good | Good | Custom | 
| __gRPC__ | High | Medium | Great | Low | Custom | Great | Bad | Hard |
