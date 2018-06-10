# F.I.R.S.T Principles of Unit Testing
* ### Fast
    * A developer should not hesitate to run the tests as they are slow.
    * All of these including setup, the actual test and tear down should execute really fast (milliseconds) as you may have thousands of tests in your entire project.

* ### Isolated/Independent
    * A test method should do the 3 As => Arrange, Act, Assert
    * Arrange: The data used in a test should not depend on the environment in which the test is running. All the data needed for a test should be arranged as part of the test.
    * Act: Invoke the actual method under test.
    * Assert: A test method should test for a single logical outcome, implying that typically there
    should be only a single logical assert. A logical assert could have multiple physical asserts as
    long as all the asserts test the state of a single object. In a few cases, an action can update
    multiple objects.
    * Avoid doing asserts in the Arrange part, let it throw exceptions and your test will still fail.
    * No order-of-run dependency. They should pass or fail the same way in suite or when run individually.
    * Do not do any more actions after the assert statement(s), preferably single logical assert.

* ### Repeatable
    * A test method should NOT depend on any data in the environment/instance in which it is running.
    * Deterministic results - should yield the same results every time and at every location where they run.
    No dependency on date/time or random functions output.
    * Each test should setup or arrange it's own data.
    What if a set of tests need some common data? Use Data Helper classes that can setup this data for re-usability.

* ### Self-Validating
    * No manual inspection required to check whether the test has passed or failed.

* ### Thorough and Timely
    * Should cover every use case scenario and NOT just aim for 100% coverage.
    * Should try to aim for Test Driven Development (TDD) so that code does not need re-factoring later.

# Code Coverage
Code coverage is about finding untested code.

> Test coverage is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs.

To measure what percentage of code has been exercised by a test suite, one or more coverage criteria are used.

Coverage criteria is usually defined as a rule or requirement, which test suite needs to satisfy.
There are a number of coverage criteria, the main ones being:
* __Function coverage__ – Has each function (or subroutine) in the program been called?
* __Statement coverage__ – Has each statement in the program been executed?
* __Branch coverage__ – Has each branch (also called DD-path) of each control structure (such as in if and case statements) been executed? For example, given an if statement, have both the true and false branches been executed? Another way of saying this is, has every edge in the program been executed?
* __Condition coverage__ (or predicate coverage) – Has each Boolean sub-expression evaluated both to true and false?

For example, consider the following C function:
```c
int foo (int x, int y)
{
    int z = 0;
    if ((x > 0) && (y > 0))
    {
        z = x;
    }
    return z;
}
```
Assume this function is a part of some bigger program and this program was run with some test suite.
* If during this execution function 'foo' was called at least once, then function coverage for this function is satisfied.
* Statement coverage for this function will be satisfied if it was called e.g. as foo(1,1), as in this case, every line in the function is executed including z = x;.
* Tests calling foo(1,1) and foo(0,1) will satisfy branch coverage because, in the first case, both if conditions are met and z = x; is executed, while in the second case, the first condition (x>0) is not satisfied, which prevents executing z = x;.
* Condition coverage can be satisfied with tests that call foo(1,0) and foo(0,1). These are necessary because in the first cases, (x>0) evaluates to true, while in the second, it evaluates false. At the same time, the first case makes (y>0) false, while the second makes it true.

__Other coverage criteria__

There are further coverage criteria, which are used less often:
* __Linear Code Sequence and Jump__ (__LCSAJ__) coverage a.k.a. __JJ-Path__ coverage – has every LCSAJ/JJ-path been executed?
* __Path coverage__ – Has every possible route through a given part of the code been executed?
* __Entry/exit coverage__ – Has every possible call and return of the function been executed?
* __Loop coverage__ – Has every possible loop been executed zero times, once, and more than once?
* __State coverage__ – Has each state in a finite-state machine been reached and explored?
* __Data-flow coverage__ – Has each variable definition and its usage been reached and explored?