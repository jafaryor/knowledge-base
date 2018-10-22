# !/usr/bin/env python3

import platform

print('This is Python version {}'.format(platform.python_version()))


# Varialbes
myInt = None                    # undefined variable
myInt = 5                       # define a integer
myFloat = float(5)              # define a float
myString = 'string'             # define a string
myString = "string"
myInt, myFloat = 7, 7.0         # multiple assignment

print('The length of myString = %s' %len(myString))
print(myString[1:])             # substring from index 1 till end
print(myString[1:4])            # substring from index 1 to before index 4
print(myString[1:6:2])          # [start:stop:step]
print(myString[::-1])           # reverse string


# Lists
# Lists are very similar to arrays. They can contain any type of variable,
# and they can contain as many variables as you wish.

myList = [1, 2, 3]
myList.append(4)
# Accessing an index which does not exist generates an exception (an error).

for value in myList:
    print(value)


# Operators
print(2 ** 3)                   # power operator
print('hello' + ' world')       # string concatenation
print('hello-' * 3)             # string mulyiplication
print([1, 2] + [4, 5])          # list concatenation
print([1, 2] * 2)               # list multiplication


# Printing
name = "Jafar"
age = 27
print("%s is %d years old." % (name, age))
# Any object which is not a string can be formatted using the %s operator as well
print("A list: %s" % myList)


# Conditions
print(isinstance(myFloat, float))   # instance check

if name == 'Jafar' and age == 26 or age == 27:
    print('and & or operators')

if 7 in [1, 3, 7]:
    print('in operator checks if value exists in the list')
elif not True:
    print('else if')
else:
    print('else')

# Unlike the double equals operator "==", the "is" operator does not match
# the values of the variables, but the instances themselves.
print([1, 2] == [1, 2])         # True
print([1, 2] is [1, 2])         # False


# Loops
for x in range(3):
    print(x)                    # 0, 1, 2

for x in range(3, 6):
    print(x)                    # 3, 4, 5

for x in range(3, 8, 2):
    print(x)                    # 3, 5, 7

i = 0
while i < 5:
    i += 1

# break and continue statements

# Prints out 0,1,2,3,4 and then it prints "count value reached 5"
i = 0
while(i < 5):
    print(i)
    i += 1
else:
    print("i value reached %d" %(i))

# Prints out 1,2,3,4
for i in range(1, 10):
    if(i%5 == 0):
        break
    print(i)
else:
    print("this is not printed because for loop is terminated because of break but not due to fail in condition")


# Functions
def sum_two_numbers(a, b):
    return a + b


# Classes and Objects
# Classes are essentially a template to create your objects.
class MyClass:
    variable = "blah"

    def function(self):
        print("This is a message inside the class.")

myobjectx = MyClass()


# Dictionary
phonebook = {
    'John': 938477566
}
phonebook["Jack"] = 938377264
phonebook["Jill"] = 947662781
print(phonebook)

for name, number in phonebook.items():
    print("Phone number of %s is %d" % (name, number))

del phonebook["John"]           # remove
phonebook.pop("Jill")           # also remove


# Modules and Packages
# A module is a piece of software that has a specific functionality.



