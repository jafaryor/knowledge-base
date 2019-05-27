## Refactoring techniques
__Refactoring__ is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior.

During the refactoring stage, you have to look for code smells. Code smells are ning signs in your code.

### Composing Methods
Much of refactoring is devoted to correctly composing methods. In most cases, excessively long methods are the root of all evil. The vagaries (капризы) of code inside these methods conceal (скрывать) the execution logic and make the method extremely hard to understand – and even harder to change.

> The refactoring techniques in this group streamline methods, remove code duplication, and pave the way for future improvements.

* #### Extract Method

    Problem: You have a code fragment that can be grouped together.

    Solution: Move this code to a separate new method (or function) and replace the old code with a call to the method.

* #### Inline Method

    Problem: When a method body is more obvious than the method itself.

    Solution: Replace calls to the method with the method’s content and delete the method itself.

* #### Extract Variable

    Problem: You have an expression that is hard to understand.

    Solution: Place the result of the expression or its parts in separate variables that are self-explanatory.

* #### Inline Temp

    Problem: You have a temporary variable that is assigned the result of a simple expression and nothing more.

    Solution: Replace the references to the variable with the expression itself.

* #### Replace Temp with Query

    Problem: You place the result of an expression in a local variable for later use in your code.

    Solution: Move the entire expression to a separate method and return the result from it. Query the method instead of using a variable. Incorporate the new method in other methods, if necessary.

* Split Temporary Variable

    Problem: You have a local variable that is used to store various intermediate values inside a method (except for cycle variables).

    Solution: Use different variables for different values. Each variable should be responsible for only one particular thing.

* #### Remove Assignments to Parameters

    Problem: Some value is assigned to a parameter inside method’s body.

    Solution: Use a local variable instead of a parameter.

* #### Replace Method with Method Object

    Problem: You have a long method in which the local variables are so intertwined that you cannot apply Extract Method.

    Solution: Transform the method into a separate class so that the local variables become fields of the class. Then you can split the method into several methods within the same class.

* #### Substitute Algorithm

    Problem: So you want to replace an existing algorithm with a new one?

    Solution: Replace the body of the method that implements the algorithm with a new algorithm.


### Moving Features between Objects
Even if you have distributed functionality among different classes in a less-than-perfect way, there is still hope.

> These refactoring techniques show how to safely move functionality between classes, create new classes, and hide implementation details from public access.

* #### Move Method

    Problem: A method is used more in another class than in its own class.

    Solution: Create a new method in the class that uses the method the most, then move code from the old method to there. Turn the code of the original method into a reference to the new method in the other class or else remove it entirely.

* #### Move Field

    Problem: A field is used more in another class than in its own class.

    Solution: Create a field in a new class and redirect all users of the old field to it.

* #### Extract Class

    Problem: When one class does the work of two, awkwardness results.

    Solution: Instead, create a new class and place the fields and methods responsible for the relevant functionality in it.

* Inline Class

    Problem: A class does almost nothing and is not responsible for anything, and no additional responsibilities are planned for it.

    Solution: Solution: Move all features from the class to another one.

* #### Hide Delegate

    Problem: The client gets object B from a field or method of object А. Then the client calls a method of object B.

    Solution: Create a new method in class A that delegates the call to object B. Now the client does not know about, or depend on, class B.

* #### Remove Middle Man

    Problem: A class has too many methods that simply delegate to other objects.

    Solution: Delete these methods and force the client to call the end methods directly.

* #### Introduce Foreign Method

    Problem: A utility class does not contain the method that you need and you cannot add the method to the class.

    Solution: Add the method to a client class and pass an object of the utility class to it as an argument.

* #### Introduce Local Extension

    Problem: A utility class does not contain some methods that you need. But you cannot add these methods to the class.

    Solution: Create a new class containing the methods and make it either the child or wrapper of the utility class.


### Organizing Data
These refactoring techniques help with data handling, replacing primitives with rich class functionality.

> Another important result is untangling of class associations, which makes classes more portable and reusable.

* #### Self Encapsulate Field

    Problem: You use direct access to private fields inside a class.

    Solution: Create a getter and setter for the field, and use only them for accessing the field.

* #### Replace Data Value with Object

    Problem: A class (or group of classes) contains a data field. The field has its own behavior and associated data.

    Solution: Create a new class, place the old field and its behavior in the class, and store the object of the class in the original class.

* #### Change Value to Reference

    Problem: So you have many identical instances of a single class that you need to replace with a single object.

    Solution: Convert the identical objects to a single reference object.

* #### Change Reference to Value

    Problem: You have a reference object that is too small and infrequently changed to justify managing its life cycle.

    Solution: Turn it into a value object.

* #### Replace Array with Object

    Problem: You have an array that contains various types of data.

    Solution: Replace the array with an object that will have separate fields for each element.

* #### Duplicate Observed Data

    Problem: Is domain data stored in classes responsible for the GUI?

    Solution: Then it is a good idea to separate the data into separate classes, ensuring connection and synchronization between the domain class and the GUI.

* #### Change Unidirectional Association to Bidirectional

    Problem: You have two classes that each need to use the features of the other, but the association between them is only unidirectional.

    Solution: Add the missing association to the class that needs it.

* #### Change Bidirectional Association to Unidirectional

    Problem: You have a bidirectional association between classes, but one of the classes does not use the other’s features.

    Solution: Remove the unused association.

* #### Replace Magic Number with Symbolic Constant

    Problem: Your code uses a number that has a certain meaning to it.

    Solution: Replace this number with a constant that has a human-readable name explaining the meaning of the number.

* #### Encapsulate Field

    Problem: You have a public field.

    Solution: Make the field private and create access methods for it.

* #### Encapsulate Collection

    Problem: A class contains a collection field and a simple getter and setter for working with the collection.

    Solution: Make the getter-returned value read-only and create methods for adding/deleting elements of the collection.

* #### Replace Type Code with Class

    Problem: A class has a field that contains type code. The values of this type are not used in operator conditions and do not affect the behavior of the program.

    Solution: Create a new class and use its objects instead of the type code values.

* #### Replace Type Code with Subclasses

    Problem: You have a coded type that directly affects program behavior (values of this field trigger various code in conditionals).

    Solution: Create subclasses for each value of the coded type. Then extract the relevant behaviors from the original class to these subclasses. Replace the control flow code with polymorphism.

* #### Replace Type Code with State/Strategy

    Problem: You have a coded type that affects behavior but you cannot use subclasses to get rid of it.

    Solution: Replace type code with a state object. If it is necessary to replace a field value with type code, another state object is “plugged in”.

* #### Replace Subclass with Fields

    Problem: You have subclasses differing only in their (constant-returning) methods.

    Solution: Replace the methods with fields in the parent class and delete the subclasses.


### Simplifying Conditional Expressions
Conditionals tend to get more and more complicated in their logic over time, and there are yet more techniques to combat this as well.

* #### Decompose Conditional

    Problem: You have a complex conditional (if-then/else or switch).

    Solution: Decompose the complicated parts of the conditional into separate methods: the condition, then and else.

* #### Consolidate Conditional Expression

    Problem: You have multiple conditionals that lead to the same result or action.

    Solution: Consolidate all these conditionals in a single expression.

* #### Consolidate Duplicate Conditional Fragments

    Problem: Identical code can be found in all branches of a conditional.

    Solution: Move the code outside of the conditional.

* #### Remove Control Flag

    Problem: You have a boolean variable that acts as a control flag for multiple boolean expressions.

    Solution: Instead of the variable, use break, continue and return.

* #### Replace Nested Conditional with Guard Clauses

    Problem: You have a group of nested conditionals and it is hard to determine the normal flow of code execution.

    Solution: Isolate all special checks and edge cases into separate clauses and place them before the main checks. Ideally, you should have a “flat” list of conditionals, one after the other.

* #### Replace Conditional with Polymorphism

    Problem: You have a conditional that performs various actions depending on object type or properties.

    Solution: Create subclasses matching the branches of the conditional. In them, create a shared method and move code from the corresponding branch of the conditional to it. Then replace the conditional with the relevant method call. The result is that the proper implementation will be attained via polymorphism depending on the object class.

* #### Introduce Null Object

    Problem: Since some methods return null instead of real objects, you have many checks for null in your code.

    Solution: Instead of null, return a null object that exhibits the default behavior.

* #### Introduce Assertion

    Problem: For a portion of code to work correctly, certain conditions or values must be true.

    Solution: Replace these assumptions with specific assertion checks.


### Simplifying Method Calls
These techniques make method calls simpler and easier to understand. This, in turn, simplifies the interfaces for interaction between classes.

* #### Rename Method

    Problem: The name of a method does not explain what the method does.

    Solution: Rename the method.

* #### Add Parameter

    Problem: A method does not have enough data to perform certain actions.

    Solution: Create a new parameter to pass the necessary data.

* #### Remove Parameter

    Problem: A parameter is not used in the body of a method.

    Solution: Remove the unused parameter.

* #### Separate Query from Modifier

    Problem: Do you have a method that returns a value but also changes something inside an object?

    Solution: Split the method into two separate methods. As you would expect, one of them should return the value and the other one modifies the object.

* #### Parameterize Method

    Problem: Multiple methods perform similar actions that are different only in their internal values, numbers or operations.

    Solution: Combine these methods by using a parameter that will pass the necessary special value.

* #### Replace Parameter with Explicit Methods

    Problem: A method is split into parts, each of which is run depending on the value of a parameter.

    Solution: Extract the individual parts of the method into their own methods and call them instead of the original method.

* #### Preserve Whole Object

    Problem: You get several values from an object and then pass them as parameters to a method.

    Solution: Instead, try passing the whole object.

* #### Replace Parameter with Method Call

    Problem: Before a method call, a second method is run and its result is sent back to the first method as an argument. But the parameter value could have been obtained inside the method being called.

    Solution: Instead of passing the value through a parameter, place the value-getting code inside the method.

* #### Introduce Parameter Object

    Problem: Your methods contain a repeating group of parameters.

    Solution: Replace these parameters with an object.

* #### Remove Setting Method

    Problem: The value of a field should be set only when it is created, and not change at any time after that.

    Solution: So remove methods that set the field’s value.

* #### Hide Method

    Problem: A method is not used by other classes or is used only inside its own class hierarchy.

    Solution: Make the method private or protected.

* #### Replace Constructor with Factory Method

    Problem: You have a complex constructor that does something more than just setting parameter values in object fields.

    Solution: Create a factory method and use it to replace constructor calls.

* #### Replace Error Code with Exception

    Problem: A method returns a special value that indicates an error?

    Solution: Throw an exception instead.

* #### Replace Exception with Test

    Problem: You throw an exception in a place where a simple test would do the job?

    Solution: Replace the exception with a condition test.


### Dealing with Generalisation
Abstraction has its own group of refactoring techniques, primarily associated with moving functionality along the class inheritance hierarchy, creating new classes and interfaces, and replacing inheritance with delegation and vice versa.

* #### Pull Up Field

    Problem: Two classes have the same field.

    Solution: Remove the field from subclasses and move it to the superclass.

* #### Pull Up Method

    Problem: Your subclasses have methods that perform similar work.

    Solution: Make the methods identical and then move them to the relevant superclass.

* #### Pull Up Constructor Body

    Problem: Your subclasses have constructors with code that is mostly identical.

    Solution: Create a superclass constructor and move the code that is the same in the subclasses to it. Call the superclass constructor in the subclass constructors.

* #### Push Down Method

    Problem: Is behavior implemented in a superclass used by only one (or a few) subclasses?

    Solution: Move this behavior to the subclasses.

* #### Push Down Field

    Problem: Is a field used only in a few subclasses?

    Solution: Move the field to these subclasses.

* #### Extract Subclass

    Problem: A class has features that are used only in certain cases.

    Solution: Create a subclass and use it in these cases.

* #### Extract Superclass

    Problem: You have two classes with common fields and methods.

    Solution: Create a shared superclass for them and move all the identical fields and methods to it.

* #### Extract Interface

    Problem: Multiple clients are using the same part of a class interface. Another case: part of the interface in two classes is the same.

    Solution: Move this identical portion to its own interface.

* #### Collapse Hierarchy

    Problem: You have a class hierarchy in which a subclass is practically the same as its superclass.

    Solution: Merge the subclass and superclass.

* #### Form Template Method

    Problem: Your subclasses implement algorithms that contain similar steps in the same order.

    Solution: Move the algorithm structure and identical steps to a superclass, and leave implementation of the different steps in the subclasses.

* #### Replace Inheritance with Delegation

    Problem: You have a subclass that uses only a portion of the methods of its superclass (or it’s not possible to inherit superclass data).

    Solution: Create a field and put a superclass object in it, delegate methods to the superclass object, and get rid of inheritance.

* #### Replace Delegation with Inheritance

    Problem: A class contains many simple methods that delegate to all methods of another class.

    Solution: Make the class a delegate inheritor, which makes the delegating methods unnecessary.
