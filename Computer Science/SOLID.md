__S.O.L.I.D__ is an acronym for the first five object-oriented design(OOD) principles by
    Robert C. Martin, popularly known as Uncle Bob.

S.O.L.I.D stands for:
When expanded the acronyms might seem complicated, but they are pretty simple to grasp.
* S - Single-responsiblity principle
    A class should have one and only one reason to change, meaning that a class
    should have only one job.
* O - Open-closed principle
    Objects or entities should be open for extension, but closed for modification.
* L - Liskov substitution principle
    Let q(x) be a property provable about objects of x of type T. Then q(y) should
    be provable for objects y of type S where S is a subtype of T.
    Every subclass/derived class should be substitutable for their base/parent class.
* I - Interface segregation principle
    A client should never be forced to implement an interface that it doesn't use
    or clients shouldn't be forced to depend on methods they do not use.
* D - Dependency Inversion Principle
    Entities must depend on abstractions not on concretions. It states that the high
    level module must not depend on the low level module, but they should depend
    on abstractions.
    Example:
    ```java
        class PasswordReminder {
            private $dbConnection;

            public
            function __construct(MySQLConnection $dbConnection) {
                $this - > dbConnection = $dbConnection;
            }
        }
        /*
            The PasswordReminder class should not care what database your application uses, to fix
            this again we "code to an interface", since high level and low level modules should
            depend on abstraction
        */
        class MySQLConnection implements DBConnectionInterface {
            public
            function connect() {
                return "Database connection";
            }
        }

        class PasswordReminder {
            private $dbConnection;

            public
            function __construct(DBConnectionInterface $dbConnection) {
                $this -> dbConnection = $dbConnection;
            }
        }
    ```

more: https://scotch.io/bar-talk/s-o-l-i-d-the-first-five-principles-of-object-oriented-design#toc-liskov-substitution-principle
[more](scotch.io)