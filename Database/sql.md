## Structure Query Language (SQL)
Structure Query Language (SQL) is a database query language used for storing and managing data in Relational DBMS

### When to use 
* SQL is the easiest language used to communicate with the RDBMS
* Analyzing behavioral related and customized sessions
* Building custom dashboards
* It allows you to store and gets data from the database quickly
* Preferred when you want to use joins and execute complex queries

### Pros
* Reduced data storage footprint due to normalization and other optimization opportunities. Often results in better performance and more efficient use of resources.
* Strong and well-understood data integrity semantics through ACID (Atomicity, Consistency, Isolation, Durability).
* Standard access to data via SQL.
* Generally more flexible query support capable of handling a broader range of workloads. SQL abstracts over the underlying implementation and allows the engine to optimize queries to fit their on-disk representation.

### Cons
* Rigid data models that require careful up-front design to ensure adequate performance and resist evolution—changing a schema will often include downtime
* Scaling horizontally is challenging—either completely unsupported, supported in an ad-hoc way, or only supported on relatively immature technologies
* Non-distributed engines are generally a "single point of failure" that must be mitigated by replication and failover techniques; no illusion of infinite scalability
* Needs a Database Administrator.

### Operations
SQL defines following ways to manipulate data stored in an RDBMS.
* #### DDL: Data Definition Language

    This includes changes to the structure of the table like:
    * __CREATE__ - create a new table or database

        * `CREATE DATABASE`
        * `CREATE TABLE`

    * __ALTER__ - for alteration

        * `ALTER TABLE ... ADD`
        * `ALTER TABLE ... MODIFY`
        * `ALTER TABLE ... RENAME`
        * `ALTER TABLE ... DROP`

    * __TRUNCATE__ - delete data from table

        * `TRUNCATE TABLE` - empties the table

    * __DROP__ - delete a table

        * `DROP TABLE`
        * `DROP DATABASE`

    * __RENAME__ - rename a table

        * `RENAME TABLE`

    All DDL commands are auto-committed. That means it saves all the changes permanently in the database.

* #### DML: Data Manipulation Language

    DML commands are used for manipulating the data stored in the table and not the table itself.
    * __INSERT__ - insert a row

        ```sql
        INSERT INTO table_name [(column (, ...))]
            {VALUES (data_value (, ...)) | subquery}
        ```

    * __UPDATE__ - update an existing row

        ```sql
        UPDATE table_name
            SET column_name1 = data_value1 [, column_namei = data_valuei ...]
            [WHERE search_condition]
        ```

    * __DELETE__ - delete a row

        ```sql
            DELETE FROM table_name
                [WHERE search_condition]

            <!-- Delete all records from a table -->
            DELETE FROM table_name
        ```

    * __MERGE__ - merging two rows or two tables

    DML commands are not auto-committed. It means changes are not permanent to database, they can be rolled back.

* #### TCL: Transaction Control Language

    These commands are to keep a check on other commands and their affect on the database. These commands can annul changes made by other commands by rolling the data back to its original state. It can also make any temporary change permanent.

    * __COMMIT__ - permanently save

        * `COMMIT` - permanently save any transaction into the database.

        When we use any DML command like `INSERT`, `UPDATE` or `DELETE`, the changes made by these commands are not permanent, until the current session is closed, the changes made by these commands can be rolled back.

    * __ROLLBACK__ - undo changes

        * `ROLLBACK TO` - restores the database to last commited state.

        It is also used with SAVEPOINT command to jump to a savepoint in an ongoing transaction.

        If we have used the UPDATE command to make some changes into the database, and realise that those changes were not required, then we can use the ROLLBACK command to rollback those changes, if they were not commited using the COMMIT command.

    * __SAVEPOINT__ - save temporarily

        * `SAVEPOINT` - temporarily save a transaction so that you can rollback to that point whenever required.

        In short, using this command we can name the different states of our data in any table and then rollback to that state using the `ROLLBACK` command whenever required.

* #### DCL: Data Control Language

    Data Control Language(DCL) is used to control privileges in Database. To perform any operation in the database, such as for creating tables, sequences or views, a user needs privileges. Privileges are of two types,
    * __System__: This includes permissions for creating session, table, etc and all types of other system privileges.
    * __Object__: This includes permissions for any command or query to perform any operation on the database tables.

    * __GRANT__ - provide any user access privileges or other priviliges for the database.

        * `GRANT CREATE SESSION TO`
        * `GRANT CREATE TABLE TO`
        * `ALTER USER ... ON ...`
        * `GRANT sysdba TO ...` - grant all privilege to a user
        * `GRANT CREATE ANY TABLE TO`
        * `GRANT DROP ANY TABLE TO`

    * __REVOKE__ - take back permissions from any user.

        * `REVOKE CREATE TABLE FROM`

* #### DQL: Data Query Language

    Data query language is used to fetch data from tables based on conditions that we can easily apply.

    * __SELECT__ - 	retrieve records from one or more table

        * `SELECT`
            
            ```sql
            SELECT [DISTINCT | ALL] {* | column | column_expression [AS new_name] [, ...]}
                FROM table_name [alias] [, ...]
                [WHERE condition]
                [GROUP BY column_list]
                [HAVING condition]
                [ORDER BY column_list [ASC|DESC]];
            ```

            [`SELECT` syntax](https://www.postgresql.org/docs/current/sql-select.html)

        * `SELECT INTO` - creates a new table and fills it with data computed by a query.

            [`SELECT INTO` syntax](https://www.postgresql.org/docs/current/sql-selectinto.html)


## Joins
There are mainly two types of joins in DBMS:
* __Inner Joins__:
    
    * _Theta_ - allows you to merge two tables based on the condition represented by theta
    * _EQUI_ - a theta join which uses only equivalence condition.
    * _Natural_ - performs selection forming equality on those attributes which appear in both relations and eliminates the duplicate attributes.

* __Outer Join__: _Left_, _Right_, _Full_

    An outer join doesn't require each record in the two join tables to have a matching record.


### Cheat Sheet

![sql-cheat-sheet-01](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-cheat-sheet-01.png)

![sql-cheat-sheet-02](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-cheat-sheet-02.png)

![sql-cheat-sheet-03](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-cheat-sheet-03.png)

![sql-select](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-select.webp)

![sql-join](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-join.jpeg)

![sql-join-type](../../../Desktop/knowledge-base/Cheat%20Sheets/../Cheat%20Sheets/sql-join-type.png)

---

#### [Tutorial](https://www.guru99.com/sql.html)
