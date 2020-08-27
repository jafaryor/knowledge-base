# PostgreSQL
PostgreSQL is an advanced, enterprise-class, and open-source relational database system.

PostgreSQL supports both SQL (relational) and JSON (non-relational) querying.

PostgreSQL has many advanced features that other enterprise-class database management systems offer, such as:
* User-defined types
* Table inheritance
* Sophisticated locking mechanism
* Foreign key referential integrity
* Views, rules, subquery
* Nested transactions (savepoints)
* Multi-version concurrency control (MVCC)
* Asynchronous replication
* Native Microsoft Windows Server version
* Tablespaces
* Point-in-time recovery
* Ability to run a store procedure in different programming languages

A PostgreSQL session consists of the following cooperating processes (programs):
* A __server process__, which manages the database files, accepts connections to the database from client applications, and performs database actions on behalf of the clients. The database server program is called postgres.
* The __user's client__ (frontend) application that wants to perform database operations. Client applications can be very diverse in nature: a client could be a text-oriented tool, a graphical application, a web server that accesses the database to display web pages, or a specialized database maintenance tool. Some client applications are supplied with the PostgreSQL distribution; most are developed by users.

The PostgreSQL server can handle multiple concurrent connections from clients. To achieve this it starts (“forks”) a new process for each connection. From that point on, the client and the new server process communicate without intervention by the original `postgres` process. Thus, the master server process is always running, waiting for client connections, whereas client and associated server processes come and go.

The following are the common use cases of PostgreSQL:
* A robust database in the LAPP stack

    PostgreSQL is primarily used as a robust back-end database that powers many dynamic websites and web applications.

* General purpose transaction database

    Large corporations and startups alike use PostgreSQL as primary databases to support their applications and products.

* Geospatial database

    PostgreSQL with the PostGIS extension supports geospatial databases for geographic information systems (GIS).


## Database Diagram Design Tools
* #### Dbdiagram.io

    Dbdiagram.io is a simple tool to draw ER (Entity Relationship) diagrams by just writing code. It is designed for developers and data analysts.

    https://dbdiagram.io/home

* #### SqlDBM

    SqlDBM is a tool that provides an easy way to design your database on any browser. You do not require any other database engine or database modeling tools or apps to use this program.

    https://sqldbm.com/Home/


---

#### [PostgreSQL client for Node.js](https://node-postgres.com/)

#### [Documentation](https://www.postgresql.org/docs/)

#### [Tutorial](https://www.postgresqltutorial.com/what-is-postgresql/)

#### [Tools](https://github.com/dhamaniasad/awesome-postgres#high-availability)

#### [Advanced SQL for Professional Developers](https://egghead.io/lessons/postgresql-introduction-to-advanced-sql-for-professional-developers)
