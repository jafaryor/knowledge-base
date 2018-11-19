# Python 3
Python is a modern object-oriented scripting language.

Python philosophy:
* Beautiful is better than ugly.
* Explicit is better than implicit.
* Simple is better than complex.
* Complex is better than complicated.
* Flat is better than nested.
* Sparse is better than dense.
* Readability counts.
* Special cases aren't special enough to break the rules.
* Although practicality beats purity.
* Errors should never pass silently.
* Unless explicitly silenced.
* In the face of ambiguity, refuse the temptation to guess.
* There should be one-- and preferably only one --obvious way to do it.
* Although that way may not be obvious at first unless you're Dutch.
* Now is better than never.
* Although never is often better than right now.
* If the implementation is hard to explain, it's a bad idea.
* If the implementation is easy to explain, it may be a good idea.
* NameSpaces are one honking great idea -- let's do more of those!

> type: `import this`, to see this list

Everything is an Object.

The very first line of python script is `Shebang Line`. This line references the Python __interpreter__:
```python
#!/usr/bin/env python3
```
> There should not be any space and new line before this line. The Shebang (`#!`) should be the very first letters of any script.

The Shebang Line is for Linux-like OSs. The Windows platform will ignore this line.

_Statement_ is a unit of execution.

_Expression_ is a unit of evaluation. In Python anything that return a value is an expression.

> Every function is returns a value.

Whitespaces is significant. Python uses indentation for blocks, instead of curly braces. Both tabs and spaces are supported, but the standard indentation requires standard Python code to use four spaces.

Python is completely object oriented, and not "statically typed". __You do not need to declare variables before using them, or declare their type.__ Every variable in Python is an object.

Mixing operators between numbers and strings is not supported: `myInt + myFloat + myString`

`print()` argument specifiers you should know:
* `%s` - String (or any object with a string representation, like numbers)
* `%d` - Integers
* `%f` - Floating point numbers
* `%.<number of digits>f` - Floating point numbers with a fixed amount of digits to the right of the dot.
* `%x/%X `- Integers in hex representation (lowercase/uppercase)

Unlike languages like `C`, `C++`.. we can use `else` for loops. When the loop condition of `for` or `while` statement fails then code part in `else` is executed. If break statement is executed inside for loop then the `else` part is skipped. Note that `else` part is executed even if there is a continue statement.

### Modules
Modules in Python are simply Python files with a .py extension. The name of the module will be the name of the file. A Python module can have a set of functions, classes or variables defined and implemented.

Modules are imported from other modules using the `import` command:
```python
# game.py
# import the draw module
import draw

def play_game():
    ...

def main():
    result = play_game()
    draw.draw_game(result)

# this means that if this script is executed, then 
# main() will be executed
if __name__ == '__main__':
    main()
```
`draw.py` file:
```python
# draw.py

def draw_game():
    ...

def clear_screen(screen):
    ...
```

When the `import draw` directive will run, the Python interpreter will look for a file in the directory which the script was executed from, by the name of the module with a `.py` prefix, so in our case it will try to look for `draw.py`. If it will find one, it will import it. If not, he will continue to look for built-in modules.

You may have noticed that when importing a module, a `.pyc` file appears, which is a compiled Python file. Python compiles files into Python bytecode so that it won't have to parse the files each time modules are loaded. If a `.pyc` file exists, it gets loaded instead of the `.py` file, but this process is transparent to the user.

Direct import the function `draw_game`:
```python
from draw import draw_game
```

We may also use the import * command to import all objects from a specific module:
```python
# game.py
# import the draw module
from draw import *

def main():
    result = play_game()
    draw_game(result)       # instead of - draw.draw_game(result)
```

We may also load modules under any name we want. This is useful when we want to import a module conditionally to use the same name in the rest of the code.
```python
# game.py
# import the draw module
if visual_mode:
    # in visual mode, we draw using graphics
    import draw_visual as draw
else:
    # in textual mode, we print out text
    import draw_textual as draw

def main():
    result = play_game()
    # this can either be visual or textual depending on visual_mode
    draw.draw_game(result)
```

The first time a module is loaded into a running Python script, it is initialized by executing the code in the module once. If another module in your code imports the same module again, it will not be loaded twice but once only - so local variables inside the module act as a __singleton__ - they are initialized only once.
```python
# draw.py

def draw_game():
    # when clearing the screen we can use the main screen object initialized in this module
    clear_screen(main_screen)
    ...

def clear_screen(screen):
    ...

class Screen():
    ...

# initialize main_screen as a singleton
main_screen = Screen()
```

There are a couple of ways we could tell the Python interpreter where to look for modules, aside from the default, which is the local directory and the built-in modules. You could either use the environment variable `PYTHONPATH` to specify additional directories to look for modules in, like this:
```python
PYTHONPATH=/foo python game.py
```
Another method is the `sys.path.append` function. You may execute it before running an `import` command:
```python
sys.path.append("/foo")
```
This will add the `foo` directory to the list of paths to look for modules in as well.

We can look for which functions are implemented in each module by using the `dir` function. When we find the function in the module we want to use, we can read about it more using the `help` function, inside the Python interpreter:
```python
help(urllib.urlopen)
```

Packages are namespaces which contain multiple packages and modules themselves. They are simply directories, but with a twist.

Each package in Python is a directory which __MUST__ contain a special file called `__init__.py`. This file can be empty, and it indicates that the directory it contains is a Python package, so it can be imported the same way a module can be imported.

The `__init__.py` file can also decide which modules the package exports as the API, while keeping other modules internal, by overriding the `__all__` variable, like so:
```python
__init__.py:

__all__ = ["bar"]
```

### Numpy Arrays
Numpy arrays are great alternatives to Python Lists. Some of the key advantages of Numpy arrays are that they are fast, easy to work with, and give users the opportunity to perform calculations across entire arrays.

In the following example, you will first create two Python lists. Then, you will import the numpy package and create numpy arrays out of the newly created lists.
```python
# Create 2 new lists height and weight
height = [1.87,  1.87, 1.82, 1.91, 1.90, 1.85]
weight = [81.65, 97.52, 95.25, 92.98, 86.18, 88.45]

# Import the numpy package as np
import numpy as np

# Create 2 numpy arrays from height and weight
np_height = np.array(height)
np_weight = np.array(weight)
```

Now we can perform _element-wise_ calculations on height and weight. For example, you could take all 6 of the height and weight observations above, and calculate the BMI for each observation with a single equation. These operations are very fast and computationally efficient. They are particularly helpful when you have 1000s of observations in your data.
```python
# Calculate bmi
bmi = np_weight / np_height ** 2
```

Another great feature of Numpy arrays is the ability to subset. For instance, if you wanted to know which observations in our BMI array are above 23, we could quickly subset it to find out.
```python
# For a boolean response
bmi > 23

# Print only those observations above 23
bmi[bmi > 23]
```

### Pandas
`Pandas` is a high-level data manipulation tool developed by Wes McKinney. It is built on the Numpy package and its key data structure is called the `DataFrame`. `DataFrame`s allow you to store and manipulate tabular data in rows of observations and columns of variables.

There are several ways to create a `DataFrame`. One way way is to use a dictionary. For example:
```python
dict = {
        "country": ["Brazil", "Russia", "India", "China", "South Africa"],
        "capital": ["Brasilia", "Moscow", "New Dehli", "Beijing", "Pretoria"],
        "area": [8.516, 17.10, 3.286, 9.597, 1.221],
        "population": [200.4, 143.5, 1252, 1357, 52.98]
    }

import pandas as pd
brics = pd.DataFrame(dict)
print(brics)
#      area    capital       country  population
# 0   8.516   Brasilia        Brazil      200.40
# 1  17.100     Moscow        Russia      143.50
# 2   3.286  New Dehli         India     1252.00
# 3   9.597    Beijing         China     1357.00
# 4   1.221   Pretoria  South Africa       52.98
```

Another way to create a `DataFrame` is by importing a csv file using Pandas. Now, the csv `cars.csv` is stored and can be imported using `pd.read_csv`:
```python
# Import pandas as pd
import pandas as pd

# Import the cars.csv data: cars
cars = pd.read_csv('cars.csv')
```

There are several ways to index a `Pandas` `DataFrame`. One of the easiest ways to do this is by using square bracket notation.

In the example below, you can use square brackets to select one column of the cars `DataFrame`. You can either use a single bracket or a double bracket. The single bracket with output a `Pandas` `Series`, while a double bracket will output a `Pandas` `DataFrame`.
```python
# Import pandas and cars.csv
import pandas as pd
cars = pd.read_csv('cars.csv', index_col = 0)

# Print out country column as Pandas Series
print(cars['cars_per_cap'])

# Print out country column as Pandas DataFrame
print(cars[['cars_per_cap']])

# Print out DataFrame with country and drives_right columns
print(cars[['cars_per_cap', 'country']])
```

Square brackets can also be used to access observations (rows) from a `DataFrame`.
```python
# Import cars data
import pandas as pd
cars = pd.read_csv('cars.csv', index_col = 0)

# Print out first 4 observations
print(cars[0:4])

# Print out fifth, sixth, and seventh observation
print(cars[4:6])
```

You can also use `loc` and `iloc` to perform just about any data selection operation. `loc` is label-based, which means that you have to specify rows and columns based on their row and column labels. `iloc` is integer index based, so you have to specify rows and columns by their integer index like you did in the previous exercise.
```python
# Import cars data
import pandas as pd
cars = pd.read_csv('cars.csv', index_col = 0)

# Print out observation for Japan
print(cars.iloc[2])

# Print out observations for Australia and Egypt
print(cars.loc[['AUS', 'EG']])
```

### Generators
Generators are very easy to implement, but a bit difficult to understand.

Generators are used to create iterators, but with a different approach. Generators are simple functions which return an iterable set of items, one at a time, in a special way.

When an iteration over a set of item starts using the for statement, the generator is run. Once the generator's function code reaches a `yield` statement, the generator yields its execution back to the for loop, returning a new value from the set. The generator function can generate as many values (possibly infinite) as it wants, yielding each one in its turn.

Here is a simple example of a generator function which returns 7 random integers:
```python
import random

def lottery():
    # returns 6 numbers between 1 and 40
    for i in range(6):
        yield random.randint(1, 40)

    # returns a 7th number between 1 and 15
    yield random.randint(1,15)

for random_number in lottery():
    print("And the next number is... %d!" %(random_number))
```

### Closure
A Closure is a function object that remembers values in enclosing scopes even if they are not present in memory. It's very important to note that the nested functions can access the variables of the enclosing scope. However, at least in python, they are only readonly. However, one can use the "nonlocal" keyword explicitly with these variables in order to modify them.

### Decorators
Decorators allow you to make simple modifications to callable
objects like functions, methods, or classes.
```python
@decorator
def functions(arg):
    return "value"

# is equal to:

def function(arg):
    return "value"
function = decorator(function)
```
As you may have seen, a decorator is just another function which takes a functions and returns one.

### Code Introspection
Code introspection is the ability to examine classes, functions and keywords to know what they are, what they do and what they know. Python provides several functions and utilities for code introspection.
* `help()` # to get reference about passed argument
* `dir()` 
* `hasattr()` 
* `id()` 
* `type()` 
* `repr()` 
* `callable()` 
* `issubclass()` 
* `isinstance()` 
* `__doc__ `
* `__name__`