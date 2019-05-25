## Cross Browser Testing
Cross browser testing is the practice of making sure that the web sites and web apps you create work across an acceptable number of web browsers.

### You need to think about:
* Different browsers other than the one or two that you use regularly on your devices, including slightly older browsers that some people might still be using, which don't support all the latest, shiniest CSS and JavaScript features.
* Different devices with different capabilities, from the latest greatest tablets and smartphones, through smart TVs, right down to cheap tablets and even older feature phones that may run browsers with limited capabilities.
* People with disabilities, who use the Web with the aid of assistive technologies like screenreaders, or don't use a mouse (some people use only the keyboard).

### Cross browser issues commonly occur because:
* Sometimes browsers have bugs, or implement features differently.

* Some browsers may have different levels of support for technology features to others. 

    This is inevitable when you are dealing with bleeding edge features that browsers are just getting round to implementing, or if you have to support really old browsers that are no longer being developed, which may have been frozen.

* Some devices may have constraints that cause a web site to run slowly (mobile deices), or display badly (low resoution displays). 

> If you leave all the testing to the end of a project, any bugs you uncover will be a lot more expensive and time consuming to fix than if you uncover them and fix them as you go along.

### Workflows for cross browser testing
The workflow for testing and bug fixes on a project can be broken down into roughly the following four phases:
1. Initial planning

    In the initial planning phase, you will probably have several planning meetings with the site owner/client, in which you determine exactly what the web site should be — what content and functionality should it have, what should it look like, etc.

    Once you've got an idea of the required featureset, and what technologies you will likely build these features with, you should start exploring the target audience — what browsers, devices, 

2. Development

    Use Polyfills to mimic any missing support using JavaScript or other technologies.

    Using [Modernizer](https://modernizr.com/) to write a single bit of code and then does different things in the background depending on what the browser supports.

    ccept that some things aren't going to work the same on all browsers, and provide different (acceptable) solutions in browsers that don't support the full functionality. 

    Accept that your site just isn't going to work in some older browsers, and move on.

3. Testing/discovery

    After each implementation phase, you will need to test the new functionality.

    At this point, fix any problems you find with your new code.

    Finally, you can get smarter with your testing using auditing or automation tools ([Selenium](http://www.seleniumhq.org/));

4. Fixes/iteration

    Debug the issue.
    
    Use HTML and CSS validators. Use JS linters.

> A __shim__ is a library that brings a new API to an older environment, using only the means of that environment.

> A __polyfill__ is a shim for a browser API. It typically checks if a browser supports an API. If it doesn’t, the polyfill installs its own implementation.

Steps 2–4 will tend to be repeated as many times as necessary to get all of the implementation done.

