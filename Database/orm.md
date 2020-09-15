## Object-Relational-Mapper (ORM)
__Object-relational-mapping__ is the idea of being able to write queries like the one above, as well as much more complicated ones, using the object-oriented paradigm of your preferred programming language.

ORM which is to map an object with a relational world, it basically converts data between incompatible types in object oriented programming languages.

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

### Sequelize
[Sequelize](https://sequelize.org/) is a promise-based ORM for Node.js and io.js. It supports PostgreSQL, MySQL, MariaDB, SQLite and MSSQL and features transaction support, relations, read replication and more.

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

### TypeORM
[TypeORM](https://typeorm.io/#/) is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8). Its goal is to always support the latest JavaScript features and provide additional features that help you to develop any kind of application that uses databases - from small applications with a few tables to large scale enterprise applications with multiple databases.

TypeORM supports both [Active Record](https://typeorm.io/#/active-record-data-mapper/what-is-the-active-record-pattern) and [Data Mapper](https://typeorm.io/#/active-record-data-mapper/what-is-the-data-mapper-pattern) patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high quality, loosely coupled, scalable, maintainable applications the most productive way.

#### Active Record
Using the __Active Record__ approach, you define all your query methods inside the model itself, and you save, remove, and load objects using model methods.

Simply said, the Active Record pattern is an approach to access your database within your models.

```typescript
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

    static findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }
}
```

#### Data Mapper
Using the __Data Mapper__ approach, you define all your query methods in separate classes called "repositories", and you save, remove, and load objects using repositories. In data mapper your entities are very dumb - they just define their properties and may have some "dummy" methods.

Simply said, data mapper is an approach to access your database within repositories instead of models.

```typescript
import {Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository} from "typeorm";

// Entity
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;
}

// Repository
@EntityRepository()
export class UserRepository extends Repository<User> {
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }
}
```
