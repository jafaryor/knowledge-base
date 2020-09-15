# GraphQL
[GraphQL](https://graphql.org/) is a query language for APIs. It is often used as an alternative to RESTful APIs, but can also be used as an additional "gateway" layer on top of existing RESTful services.

GraphQL helps you to load data from server to client. It enables programmers to choose the types of requests they like to make.

Unlike REST, GraphQL provides a single ul to make the requests.

### Reasons to use
* It provides a human-readable query.
* In GraphQL, it is very easy to deal with many database.
* It is suited for microservices and complex systems.
* You can fetch data with a single API call.
* It helps you with query batching and caching.
* You do not face, over, and under fetching problems.
* Tailoring requests to your needs.
* It helps you to discover the schema in the appropriate format.
* GraphQL automatically keeps documentation in sync with API changes.
* API evolution is possible without versioning.
* GraphQL fields are used in multiple queries that can be shared to a higher component level for reuse.
* You can choose which functions to expose and how they work.
* It can be used for rapid application prototyping.

### Application
* It provides Relay and other client frameworks
* GraphQL helps you to improve the performance of the mobile app.
* It can reduce over fetching problem to lower server-side cloud service and decrease the client-side, network usage.
* It can be used when the client application has to specify which fields are needed in long query format.
* GraphQL can be fully utilized when you have to add functionality to your old or existing API.
* It is used when you have to simplify complex API.
* Mix and mash façade pattern, which is commonly used in object-oriented programming.
* When you have to aggregate data from more than one place into one convenient API.
* You can use GraphQL as an abstraction on an existing API to specify response structure based on user needs.

### Features
* It provides declarative query language, which is not imperative.
* It is hierarchical and product-centric.
* GraphQL is strongly typed. It means queries are executed within the context of a particular system.
* Queries in GraphQL are encoded in the client, not in the server.
* It has all the features of the application layer of the OSI model.

### GraphQL vs REST
| GraphQL | REST |
| - | - |
| It follows client-driven architecture. | It follows server-driven architecture. |
| GraphQL can be organized in terms of a schema. | REST can be organized in terms of endpoints. |
| GraphQL is a growing community. | REST is a very large community. |
| The development speed in GraphQL is fast. | The development speed in REST is Slow. |
| The learning curve in GraphQL is difficult. | The learning curve in REST is moderate. |
| The identity is separated from how you fetch it. | The endpoint you call in REST is the identity of a particular object. |
| In GraphQL, the server determines available resources. | The shape and size of the resource is determined by the server in REST. |
| GraphQL provides high consistency across all platforms. | It is hard to get consistency across all platforms. |

### Disadvantages
* Young ecosystem
* Lack of resources on the backend part.
* Missing design pattern for a complex app.
* Performance issues with complex queries.
* Overkill for small applications
* GraphQL does not depend on the HTTP caching methods that enable storing request content.
* GraphQL does not understand files. Hence, a file uploading feature is not included in it.
* With GraphQL, be prepared to have a lot of pre-development education like learning the Schema Definition Language.

GraphQL is a language not a specific implementation. The implementation is divide into client side and server side.

## Tools
* [GraphiQL](https://github.com/graphql/graphiql): It is an ID that integrates with the browser and also interacts with the API of GraphQL. Some of the functions that GraphiQL includes are mutations, data querying, and autocompletes queries.
* [GraphQL Playground](https://www.npmjs.com/package/graphql-playground): It is a powerful IDE that has an in-built editor for handling mutations, validation, GraphQl queries, subscriptions, etc. The developer can use this IDE to visualize the structure of the schema.
* [Prisma](https://www.prisma.io/): Prisma is a database abstraction layer which turns your databases into GraphQL APIs with CRUD (Create, Read, Update and Delete) operations. It creates all tables and generates all the necessary APIs from defined data model.
* [Bit](https://bit.dev/): It is open-source tool and platform that converts reusable code into components. Developers can use them to share and develop various projects.
