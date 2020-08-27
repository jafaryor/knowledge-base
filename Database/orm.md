# Object-Relational-Mapper (ORM)
__Object-relational-mapping__ is the idea of being able to write queries like the one above, as well as much more complicated ones, using the object-oriented paradigm of your preferred programming language.

### Pros
* You get to write in the language you are already using anyway. If we’re being honest, we probably aren’t the greatest at writing SQL statements. SQL is a ridiculously powerful language, but most of us don’t write in it often. We do, however, tend to be much more fluent in one language or another and being able to leverage that fluency is awesome!
* It abstracts away the database system so that switching from MySQL to PostgreSQL, or whatever flavor you prefer, is easy-peasy.
* Depending on the ORM you get a lot of advanced features out of the box, such as support for transactions, connection pooling, migrations, seeds, streams, i18n and all sorts of other goodies.
* Many of the queries you write will perform better than if you wrote them yourself.
* It forces you to write MVC code, which, in the end, makes your code a little cleaner.
* Can provide a caching layer above the DB.

### Cons
* If you are a master at SQL, you can probably get more performant queries by writing them yourself.
* There is overhead involved in learning how to use any given ORM.
* The initial configuration of an ORM can be a headache.
* As a developer, it is important to understand what is happening under the hood. Since ORMs can serve as a crutch to avoid understanding databases and SQL, it can make you a weaker developer in that portion of the stack.
* Performance is OK for usual queries, but a SQL master will always do better with his own SQL for big projects.
* Might dictate certain DB design decisions.

__Sequelize__ is a promise-based ORM for Node.js and io.js. It supports PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features transaction support, relations, read replication and more.

Example
```javascript
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
```

---

#### [Sequelize documentation](https://sequelize.org/)
