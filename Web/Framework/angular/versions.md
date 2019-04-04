## Version 1.0 vs. Version 2.0
* #### Architecture

    Angular 2.0 shows a substantial change in the structure as compared to version 1.0. The architecture of Angular v1 is based on MVC whereas the architecture of Angular v2 is component-based.

* #### JavaScript and TypeScript

    Angular v1.0 use JavaScript to build the application while Angular v2.0 uses the Typescript to write the application. TypeScript is a superset of JavaScript which helps to build more robust and structured code.

* #### Mobile Support

    Angular 1.x was made for responsive and two way binding app. There was no mobile support. Although there are other libraries which make angular 1.x run on mobile. Angular 2.0 is made keeping in mind mobile oriented architecture.

* #### Component-based UI

    The controller concept which was present in Angular v1.0 is eliminated in Angular v2.0. Angular v2.0 has changed to component based UI.

* #### SEO Friendly

    With Angular v1.0 developing the search engine friendly Single Page Applications was the major difficulty. But this bottleneck was eliminated in Angular v2.0

* #### `$scope`

    Angular 2 is not using `$scope` anymore to glue view and controller.

* #### Unidirectional data flow in Angular

    Two-way data binding in Angular 2 really just boils down to event binding and property binding.

    | AngularJS | Angular |
    | --- | --- |
    | Change detection is invoked internally by the framework (by calling $digest). Sometimes it is necessary to trigger change detection manually | Change detection is invoked automatically using zones. The framework hooks into internal browser API calls and performs CD after asynchronous events. |
    | Two-way data binding is supported which means that single pass of change detection is not enough. AngularJS runs digest cycles until the model stabilizes. | Two-way data binding is not supported, so single pass of change detection is enough. Unidirectional data flow is enforced - the data flows from the model to the view, never the other way around. |
    | Dirty checking is dynamic. Watchers are created at runtime. | Every component has its own custom change detector. With AOT enabled change detectors can be generated at build time. |

    > If we take a look at the source code, we’ll notice that `ngModel` actually comes with a property and event binding as well.
