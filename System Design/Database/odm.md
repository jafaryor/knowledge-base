## Object Document Mapper (ODM)
__Object-relational mapping__ - in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages.

__ODM__ is an object associated with NoSQL database. It maps objects with a Document Database like MongoDB.

ODM is the ORM for non-relational document oriented databases.

> An ORM maps between an Object Model and a Relational Database. An ODM maps between an Object Model and a Document Database.

### Mongoose
Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

Top reasons to use Mongoose:
* Schemas

    MongoDB is a denormalized NoSQL database. This makes it inherently schema-less as documents have varying sets of fields with different data types. While this provides your data model with flexibility as it evolves over time, it can be difficult to cope with coming from a SQL background. Mongoose defines a schema for your data models so your documents follow a specific structure with pre-defined data types.

* Validation

    Mongoose has built in validation for schema definitions. This saves you from writing a bunch of validation code that you have to otherwise write with the MongoDB driver.

* Instance Methods

    Mongoose provides optional pre and post save operations for data models. This makes it easy to define hooks and custom functionality on successful reads/writes etc. You can also define custom methods that act on a particular instance (or document). While you can achieve similar functionality with the native MongoDB driver, Mongoose makes it easier to define and organize such methods within your schema definition.

* Returning results

    Mongoose makes returning updated documents or query results easier. A prime example can be found with `update` queries. While the native driver returns an object with a success flag and the number of documents modified, Mongoose returns the updated object itself so you can easily work with the results.

---

#### [Mongoose Docs](https://mongoosejs.com/docs/index.html)
