## AntiPatterns
Are a pattern that tell how to go from a problem to a bad solution. Identifying bad practices can be as valuable as identifying good practices.

A well formulated AntiPattern also tells you why the bad solution looks attractive (e.g. it actually works in some narrow context), why it turns out to be bad, and what positive patterns are applicable in its stead.

Examples of anti-patterns in JavaScript are the following:
* Polluting the global namespace by defining a large number of variables in the global context
* Passing strings rather than functions to either `setTimeout` or `setInterval` as this triggers the use of `eval()` internally.
* Modifying the Object class prototype (this is a particularly bad anti-pattern)
* Using JavaScript in an inline form as this is inflexible
* The use of `document.write` where native DOM alternatives such as `document.createElement`
    are more appropriate. `document.write` has been grossly misused over
    the years and has quite a few disadvantages including that if it's executed after the
    page has been loaded it can actually overwrite the page you're on, whilst `document.createElement`
    does not. You can see here for a live example of this in action.
    It also doesn't work with XHTML which is another reason opting for more DOMfriendly
    methods such as `document.createElement` is favorable.
* __Bleeding edge technology__ is a category of technologies so new that they could have a high risk of being unreliable and lead adopters to incur greater expense in order to make use of them
* __Mushroom management__ is a style of management in which the personnel are not familiar with the ideas or the general state of the company, and are given work without knowing the purpose of this work. Mushroom management means that workers' curiosity and self-expression are not supported.
* __Overengineering__ (or over-engineering) is the act of designing a product to be more robust or have more features than necessary for its intended use, or for a process to be unnecessarily complex or inefficient.

[Read More](https://en.wikipedia.org/wiki/Anti-pattern#Examples)
