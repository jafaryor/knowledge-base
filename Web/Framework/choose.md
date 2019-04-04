## Angular
Angular is a known Typescript-based JavaScript MVVM framework, founded in 2009, backed by Google and used for developing highly interactive web applications. It is widely used by Google, Forbes, WhatsApp and many other Fortune 500 companies.

### Benefits:
* Component-based architecture that provides a higher quality of code: Components can be thought of as small pieces of an interface that are independent of each other.

* Reusability: Developers can reuse components across different parts of an application. This is particularly useful in enterprise-scope applications that use similar elements like search boxes, date pickers, sorting lists, etc.

* Readability: Encapsulation also ensures that new developers – who’ve been recently on-boarded to a project – can read code better and eventually reach their plateau of productivity faster.

* Unit-test friendly. The independent nature of components simplifies unit tests, quality assurance procedures aimed at verifying the performance of the smallest parts of the application, units.

* Maintainability: Components that are easily decoupled from each other can be easily replaced with better implementations.

* RxJS: RxJS is a library commonly used with Angular to handle asynchronous data calls. It allows for handling events independently in parallel and continuing execution without waiting for some event to happen and leaving a web page unresponsive. RxJS has a steep learning curve, but once you master it, it makes life easier.

### Limitations:
* Migrating legacy systems from AngularJS to Angular requires time:

    The difference between AngularJS and Angular is large, so is the path of migration from the past to the future. Unlike updating from say Angular 5 to Angular 6, it won’t be a breeze, especially if you’re dealing with a legacy monstrosity. There are different ways to do that, one of which is to use a hybrid approach. It entails having both old and new Angular operating at the same time while you incrementally update the whole product. Not only does it take time, you’ll have to review many tools, the transition to a new language, and deal with a heavier app.

* Steep learning curve

    On-boarding new developers familiar with JavaScript to learn and use new Angular, will be challenged compared to similar React or Vue on-boarding. The array of topics and aspects to be covered is large. Learning it, at least on the basic level, is mandatory for using Angular. Engineers complain about error messages that are too cryptic to grasp without additional research followed by trial-and-error manipulations.

* TypeScript

    While TypeScript improves maintainability of code, having to learn it doesn’t make the curve gentler.

> Angular is the most mature of the frameworks, has good backing in terms of contributors and is a complete package. However, the learning curve is steep and concepts of development in Angular may put off new developers. Angular is a good choice for companies with large teams and developers who already use TypeScript.

___

## React
Maintained by Facebook, React is a JavaScript library for building UI components for web applications. It is widely used by Facebook(duh!), Uber, Netflix, Udemy and may more.

### Benefits:
* Updates process is optimized and accelerated.
* JSX makes components/blocks code readable. It displays how components are plugged or combined with.
* Has a fairly low learning curve.
* Uses JSX for template creation instead of the usual JavaScript.
* Uses just one direction data flow — downward. And in this type of structure, there is no way that child elements can affect the parent data.
* Uses Virtual DOM which greatly increases the Speed of your app and only updates the parts where the changes have occurred.
* Excellent cross platform supporter.
* Easy to adopt and has UI focused Design.

### Limitations:
* Learning curve. Being not full-featured framework it is requered in-depth knowledge for integration user interface free library into MVC framework.
* In ReactJS you need more code for development then it’s counterparts.
* Not using isomorphic approach to exploit application leads to search engines indexing problems.
* Lots of developers dislike JSX React’s documentation, manuals are difficult for newcomers’ understanding.

> React is just old enough to be mature and has a huge number of contributions from the community. It is gaining widespread acceptance. The job market for React is really good, and the future for this framework looks bright.
React looks like a good choice for someone getting started with front-end JavaScript frameworks, startups and developers who like some flexibility. The ability to integrate with other frameworks seamlessly gives it a great advantage for those who would like some flexibility in their code.

___

## Vue
New in the market, Vue.js is one of the most-discussed and rapidly growing JavaScript framework. Released in February 2014, you can build interactive UIs using HTML, CSS and Javascript. It is widely used by Alibaba. Gitlab, and is being picked up by many developers globally.

### Benefits:
* Documentation: Vue.js has incredibly well-thought documentation which is very thorough and well-written. All a beginner requires to write their first application is just some basic Javascript and HTML.

* Size: One of the most significant features I found with Vue is it’s size. The production ready build of Vue.js weighs only 18kb after gzipping, compared to approximately 80kb for minified jQuery (depending on what version you use) and 29kb after gzipping. It should also be noted that the Vue.js ecosystem is also small and fast.With Vue.js, users can separate the template-to-virtual-DOM compiler and even the run time.

* Scalability and versatility: It works well both as a library and a fully fledged framework. My next project will involve almost a pure Vue.js web application that consumes the Wordpress REST API. So it provides me with the speed of development I need whilst providing the less technical content creators in my company with the familiarity and ease they trust by bolting into a CMS like Wordpress.

* Readability for the perfectionist: I find Vue.js incredibly easy to read. Functions are incredibly accessible and if your naming conventions are right “thisFunctionWillDoThis” then you won’t go far wrong. For example, for form submissions I like to break each field validation into its own function. The times where the designers have requested I change full name to first and last name fields (or vice versa) it pays to have a separate functions.

* Easier to learn than $jQuery: This one is a little subjective, but I found it much, much easier to start building the basics with Vue.js over more traditional Javascript frameworks such as jQuery. It is incredibly approachable — the documentation is excellent, and although some have found issue with the community being mainly non-English speaking, I’ve found the community incredibly supportive.

### Limitations
* Lack of some common solid plugins/components: Due to the relative age of Vue.js, there is a fairly well known lack of common plugins that make working with various tools easier. Google Maps being a pretty common example. I have yet to work with Google Maps within Vue.js, and always resort to vanilla Javascript.

* Evolving fast: A lot of Vue learners have mentioned that Vue.js is evolving rather fast, so a lot of the examples you find online may be outdated. I’d always invest in a solid online course, a good read of the documentation and a solid book to boot.

* Minor issues with iOS and Safari: I’ve found minor issues with older iOS and Safari devices; but, being entirely honest the issues are often fixable, albeit with a little more digging for some issues.

* Reactivity caveats: If you read the documentation, there are some reactivity caveats, like setting an item from an array directly (e.g., `this.items[key]=value`) or adding a new data property. This might be both good and bad depending on use cases. However, for most cases it's nice to have everything specified upfront inside data.

> Vue is new to the arena, without the backing of a major company.
However, it has done really well in the last few years to come out as a strong competitor for Angular and React. This is perhaps playing a role with a lot of Chinese giants like Alibaba and Baidu picking Vue as their primary front-end JavaScript framework. Vue should be your choice if you prefer simplicity, but also like flexibility.

___

* #### [Choosing a JavaScript Framework in 2018](https://medium.com/@ZombieCodeKill/choosing-a-javascript-framework-535745d0ab90)

* #### [How to Choose the Best Front-end Framework](https://www.toptal.com/javascript/choosing-best-front-end-framework)

* #### [The Best JS Frameworks for Front End](https://rubygarage.org/blog/best-javascript-frameworks-for-front-end)

* #### [Virtual DOM vs Real DOM , Angular vs React , Framework vs Libraries , SPA’s vs MPA’s](https://medium.com/@ahaseeb12251998/virtual-dom-vs-real-dom-angular-vs-react-framework-vs-libraries-spas-vs-mpa-s-946fceb70955)
