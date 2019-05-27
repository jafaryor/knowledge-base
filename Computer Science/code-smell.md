## Code Smell
Is any characteristic in the source code of a program that possibly indicates a deeper problem. Determining what is and is not a code smell is subjective, and varies by language, developer, and development methodology.

Most common code smells:
* ### Bloaters

    Are code, methods and classes that have increased to such giant proportions that they are hard to work with. Usually these smells do not crop up right away, rather they accumulate over time as the program evolves (and especially when nobody makes an effort to eradicate them).

    * #### Long Method

        A method contains too many lines of code. Generally, any method longer than ten lines should make you start asking questions.

    * #### Large Class

        A class contains many fields/methods/lines of code.

    * #### Primitive Obsession (одержимость)

        Use of primitives instead of small objects for simple tasks (such as currency, ranges, special strings for phone numbers, etc.)

        Use of constants for coding information (such as a constant USER_ADMIN_ROLE = 1 for referring to users with administrator rights.)

        Use of string constants as field names for use in data arrays.

    * #### Long Parameter List

        More than three or four parameters for a method.

    * #### Data Clumps

        Sometimes different parts of the code contain identical groups of variables (such as parameters for connecting to a database). These clumps should be turned into their own classes.

* ### Object-Orientation Abusers
    
    All these smells are incomplete or incorrect application of object-oriented programming principles.

    * #### Switch Statements

        You have a complex `switch` operator or sequence of `if` statements.

    * #### Temporary Field

        Temporary fields get their values (and thus are needed by objects) only under certain circumstances. Outside of these circumstances, they are empty.

    * #### Refused Bequest (наследство)

        If a subclass uses only some of the methods and properties inherited from its parents, the hierarchy is got messed. The unneeded methods may simply go unused or be redefined and give off exceptions.

    * #### Alternative Classes with Different Interfaces
    
        Two classes perform identical functions but have different method names.

* ### Change Preventers

    These smells mean that if you need to change something in one place in your code, you have to make many changes in other places too. Program development becomes much more complicated and expensive as a result.

    * #### Divergent Change

        You find yourself having to change many unrelated methods when you make changes to a class. For example, when adding a new product type you have to change the methods for finding, displaying, and ordering products.

    * #### Shotgun Surgery
    
        Making any modifications requires that you make many small changes to many different classes.

    * #### Parallel Inheritance Hierarchies
    
        Whenever you create a subclass for a class, you find yourself needing to create a subclass for another class.

* ### Dispensables
    
    A dispensable is something pointless and unneeded whose absence would make the code cleaner, more efficient and easier to understand.

    * #### Comments

        A method is filled with explanatory comments.

    * #### Duplicate Code

        Two code fragments look almost identical.

    * #### Lazy Class

        Understanding and maintaining classes always costs time and money. So if a class doesn’t do enough to earn your attention, it should be deleted.

    * #### Data Class

        A data class refers to a class that contains only fields and crude methods for accessing them (getters and setters). These are simply containers for data used by other classes. These classes do not contain any additional functionality and cannot independently operate on the data that they own.

    * #### Dead Code

        A variable, parameter, field, method or class is no longer used (usually because it is obsolete).

    * #### Speculative Generality

        There is an unused class, method, field or parameter.

* ### Couplers

    All the smells in this group contribute to excessive (чрезмерное) coupling between classes or show what happens if coupling is replaced by excessive delegation.

    * #### Feature Envy

        A method accesses the data of another object more than its own data.

    * #### Inappropriate Intimacy

        One class uses the internal fields and methods of another class.

    * #### Message Chains

        In code you see a series of calls resembling: `$a->b()->c()->d()`

    * #### Middle Man

        If a class performs only one action, delegating work to another class, why does it exist at all?

___

#### [Read More](https://sourcemaking.com/refactoring/smells)
