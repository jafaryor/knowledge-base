## Angular Notes
The objects provided to the decorators are called `metadata`.
```javascript
@Injectable({
    <metadata object fields>
})
...
```

Tow types of directives:
* Structural - designed to alter the DOM layout by adding or removing DOM elements. Examples: `ngIf`, `ngFor`, `routerOutlet`
* Attribute - change the behaviour or apperiance of an existing DOM element

Use `#` to declare a variable in the HTML so you could reference it within component's template:
```html
Address: <input #billing>
Shipping: <input #shipping>
<button (click)="shipping.value = billing.value"></button>
```

> By defuaul Angular scopes all styles within the component by giving each HTML element a unique ID.

Interpolation -> `{{}}`

Non-supported in `{{}}`:
* Assignments
* Newing up variables
* Chaining expressions
* Incrementing/Decrimenting

__`[]`__ - property binding. It then transforms into `{{}}`. So all rules from the `{{}}` also applies to the `[]`.

__`()`__ - event binding.

### `*ngIf`:
```html
<div *ngIf="..."></div>
```
will turn into (handled by angular during component template parsing):
```html
<ng-template [ngIf]="...">
    <div></div>
</ng-template>
```
So the `*` is just a syntactic sugar.

### Forms
There are 2 common aproaches to building forms:
* __Template Driven__ - when the majority of form logic is crafted in the template markup
* __Model Driven__ - when the majority of form logic is crafted in the component class

### Dependency Injection
`@Inject()` is a manual mechanism for letting Angular know that a parameter must be injected. It is only needed for injecting _primitives_.

[Read More about DI](https://angular.io/guide/dependency-injection)

[Read More about DI in action](https://angular.io/guide/dependency-injection-in-action)

[More about `@NgModule`](https://angular.io/guide/ngmodules)

### Testing
Use `karma-spec-reporter` karma plugin to see full information about test results. Run:
```
sudo npm install karma-spec-reporter --save-dev
```
Then, import the plugin into `karma.conf.js`:
```javascript
config.set({
    ...
    plugins: [
        ...
        require('karma-spec-reporter') // import the plugin
    ],
    ...
    coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary' ], // add 'text-summary'
        fixWebpackSourcePaths: true
    },
    ...
    reporter: [ 'spec', 'kjhtml' ], // replace 'progress' with 'spec'
})
```
To see the result of test:
```
ng test --single-run --code-coverage
```


Use __Commit Hooks__ tools like `husky` to run a test or linter before making commit.


* `npm ls` - all installed packages
* `npm outdated` - shows what packages need to be updated
* `npm update <library-name>` - updates a specific library


__Server Side Rendering__ (`SSE`) - allows webpages to be presented much faster, more SEO friendly, and improves performance. You going to need _Angular Universal_, to make Angular SSE.

You need to enable `CORS` if two web apps are on the same domain but different ports.

With `CouchDB` you can have a web app without logic in backend.

Use `ErrorHandler` build-in class from `@angular/core` to intercept any error occured in the app.
```javascript
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
    handleError(error) {
        console.log(error);
    }
}
```
and add in main module:
```javascript
@NgModule({
    ...
    providers: [
        { provide: ErrorHandler, useClass: ErrorHandlerService }
    ]
})
```

Use `JsonpModule` to make a JSONP request from Angular.


[Read More](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)

### Angular CLI
When you need a globaly available CSS library or JS library you should include the path to it in the `.angular-cli.json` file, to make them avaiable everywhere in the app.

`ng eject` basically get-rid of Angular CLI scripts and introduce webpack scripts in `package.json`, underlying `webpack.config.js` file mainly for comprehensive way to manage the project and it will be completely our responsibility to manage the project configurations after this.

### RxJS
When doing search by user input:
```javascript
import 'rxjs/add/operator/debounceTime';
...

ngOnInit() {
    this.searchSubject$
        .debounceTime(200) // debounce time
        .distinctUntilChanged() // pass value only if previous value != current value
        .switchMap(this.doHttp); // if user starts typing, we cancel the previous request and make a new one
}
```

### `*ngSwitch` vs `*ngIf`
With `NgIf` we can conditionally add or remove an element from the DOM.

The key difference between the `NgIf` solution is that by using `NgSwitch` we evaluate the expression only once and then choose the element to display based on the result.

### `ng-container`
The `ng-container` directive provides us with an element that we can attach a structural directive to a section of the page, without having to create an extra element just for that.

There is another major use case for the `ng-container` directive: it can also provide a placeholder for injecting a template dynamically into the page.

We can take the template itself and instantiate it anywhere on the page, using the `ngTemplateOutlet` directive:
```html
<ng-template #loading>
    <div>Loading...</div>
</ng-template>

<ng-container *ngTemplateOutlet="loading"></ng-container>
```

The value passed to this `ngTemplateOutlet` directive can be any expression that evaluates into a template reference, more on this later.

Inside the `ng-template` tag body, we have access to the same context variables that are visible in the outer template. But each template can also define its own set of input variables.
```javascript
@Component({
    selector: 'app-root',
    template: `      
    <ng-template #estimateTemplate let-lessonsCounter="estimate">
        <div> Approximately {{lessonsCounter}} lessons ...</div>
    </ng-template>

    <ng-container 
    *ngTemplateOutlet="estimateTemplate; context:ctx">
    </ng-container>
`})
export class AppComponent {
    @ViewChild('estimateTemplate')
    private estimateTemplate: TemplateRef<any>;

    totalEstimate = 10;
    ctx = {estimate: this.totalEstimate};
}
```

> The type of template is `TemplateRef`.


### [Angular Optimization Techniques](https://netbasal.com/optimizing-the-performance-of-your-angular-application-f222f1c16354)
* __`OnPush`__

    By default, Angular runs change detection on all components every time something changes in your app — from a click event to data received from an ajax call. (user events, timers, xhr, promises, etc.)

    We can set the `ChangeDetectionStrategy` of our component to `ChangeDetectionStrategy.OnPush`. This tells Angular that the component only depends on his `Inputs` (aka pure) and needs to be checked in only the following cases:
    * The `Input` reference changes.
    * An event occurred from the component or one of his children.
    * You run change detection explicitly by calling `detectChanges()` / `tick()` / `markForCheck()`.

* __`TrackBy`__

    If, at some point, we need to change the data in the collection, Angular can’t keep track of items in the collection and has no knowledge of which items have been removed or added.

    As a result, Angular needs to remove all the DOM elements associated with the data and create them again. This can mean a lot of DOM manipulations, especially in the case of a big collection. And, as we know, DOM manipulations are expensive.

    With `trackBy` function, Angular can track which items have been added or removed according to the unique identifier and only create or destroy the things that have changed.

* __Avoid Computing Values in the Template__

    If the value is not changed dynamically at runtime, a better solution would be to:

    * Use pure pipes — Angular executes a pure pipe only when it detects a pure change to the input value.
    * Creates a new property and set the value once

* __Disable Change Detection__

    Imagine that you have a component that depends on data that changes constantly, many times per second.

    Updating the user interface whenever new data arrives can be expensive. A more efficient way would be to check and update the user interface every X seconds.

    We can do that by detaching the component’s change detector and conducting a local check every x seconds.

    ```typescript
    @Component({
        selector: 'giant-list',
        template: `
            <li *ngFor="let d of dataProvider.data">Data {{d}}</lig>
        `,
    })
    class GiantList {
        constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
            ref.detach();
            setInterval(() => {
            this.ref.detectChanges();
            }, 5000);
        }
    }
    ```

* __Lazy Loading__

* __Avoiding Excessive Change Detection By Escaping The Angular Zone__

    Angular applications are always executed inside an "Angular Zone". The most important effect this has is that change detection gets automatically executed without us having to do anything: Whenever any browser event (a click event, an HTTP response, a `setTimeout`, etc.) occurs, we enter the Angular Zone and run the event handling code. After that's done we exit the zone and Angular performs change detection for the application.

    For 99.9% of the time, this is exactly what we want. But with paint loops we have a problem, which is that `requestAnimationFrames` are also executed within the Angular Zone. And that means when we have an animation running we __end up running up to 60 change detections every second__.

    There's a very easy way out of this, which is to take our paint loop and run it outside the Angular zone. We can do this by injecting the `NgZone` object into our canvas component, and then scheduling the first paint to run outside the zone by using the `runOutsideAngular` method:
    ```typescript
    constructor(private ngZone: NgZone) {}

    ngOnInit() {
        this.running = true;
        this.ngZone.runOutsideAngular(() => this.paint());
    }
    ```

    When starting a work consisting of one or more asynchronous tasks that don't require UI updates or error handling to be handled by Angular. Such tasks can be kicked off via `runOutsideAngular` and if needed, these tasks can reenter the Angular zone via `run`.

    [Read more about NgZone](https://angular.io/api/core/NgZone)
