/*
Version 1.0 vs. Version 2.0
    * Architecture
        Angular 2.0 shows a substantial change in the structure as compared to version 1.0.
        The architecture of Angular v1 is based on MVC whereas the architecture of Angular
        v2 is based on service/controller.
    * JavaScript and TypeScript
        Angular v1.0 use JavaScript to build the application while Angular v2.0 uses the
        Typescript to write the application. TypeScript is a superset of JavaScript which
        helps to build more robust and structured code. Dart can be used by developers
        along with TypeScript in version 2.0.
    * Mobile Support
        Angular 1.x was made for responsive and two way binding app. There was no mobile
        support. Although there are other libraries which make angular 1.x run on mobile.
        Angular 2.0 is made keeping in mind mobile oriented architecture.
    * Component-based UI
        The controller concept which was present in Angular v1.0 is eliminated in
        Angular v2.0. Angular v2.0 has changed to component based UI.
    * SEO Friendly
        With Angular v1.0 developing the search engine friendly Single Page Applications
        was the major difficulty. But this bottleneck was eliminated in Angular v2.0
    * $scope
        Angular 2 is not using $scope anymore to glue view and controller.
    * Two-way data binding in Angular 2 really just boils down to event binding and property binding.
        Therefore, it can assume that a single pass of change detection will always be sufficient.
        If we take a look at the source code, we’ll notice that ngModel actually comes
        with a property and event binding as well.

        https://codewithstyle.info/change-detection-angular-versus-angularjs/

Version 2.0 vs. Version 4.0
    * Architecture
        The upgrade of the version from 2.0 to 4.0 has reduced it’s bundled file size
        by 60%. The code generated is reduced and has accelerated the application
        development. Here the developed code can be used for prod mode and debug.
    * Typescript
        Angular v4.0 is compatible with newer versions TypeScript 2.1 and TypeScript 2.2.
        This helps with better type checking and also enhanced IDE features for
        Visual Studio Code.


Features of Angular version 4.0:
    * View engine with less code
        The view engine is introduced in Angular 4 where the produced code of components
        can be reduced up to 60%. The bundles are reduced to thousands of KBs.
    * Router ParamMap
        Before Angular 4, simple object structures used to store route parameters.
        These Parameters were assessed by simple standard JavaScript syntax.
        Syntax:
            (parameterObject[‘parameter-name’] )
        But now in Angular 4, these parameters are available as a map.
        To use these parameters simple methods are called.
        Method call:
            (parameterMap.get(‘parameter-name’))
        This adds to the type security. Old values were unsafe in regards to the type
        as these values could take any type possible. But now, these values are
        string or array of strings.
    * Animation
        Up till AngularJS the code required for the animation part was always included
        in the application in spite of the fact that animation is actually used or not.
        The functions required for the same were also provided as a part of
        @angular/core module.
        But now in Angular 4, the animation is part of a separate package. This has
        eliminated the unnecessary bundles with large sized files.
    * ngIf with a new else statement in the template of component
            <div *ngIf="condition">...</div>
            <ng-template #then-block>...</ng-template>
            <ng-template #else-block>...</ng-template>
    * Smaller and faster
        Angular 4 has made the code file size smaller and improved the speed of the application.
    * Pipes
        'titlecase' pipe | and use to changes the first letter of each word into the uppercase.
    * Template
        The template is now ng-template. You should use the “ng-template” tag instead of “template”.
            Now Angular has its own template tag that is called “ng-template”.
    * Http
        Adding search parameters to an HTTP request has been simplified.
    * AS keyword – A new addition to the template syntax is the “as keyword” is use to simplify
        to the “let” syntax:
            <div *ngFor="let user of users | slice:0:2 as total; index as = i">
    * A new service has been introduced to easily get or update “Meta Tags”:
            @Component({
                selector: 'users-app',
                template: `<h1>Users</h1>`
            })
            export class UsersAppComponent {
                constructor(meta: Meta) {
                    meta.addTag({ name: 'Blogger', content: 'Anil Singh' });
                }
            }
    * Compare Select Options - A new “compareWith” directive has been added and it used to help
        you compare options from a select:
            <select [compareWith]="byUId" [(ngModel)]="selectedUsers">
                <option *ngFor="let user of users" [ngValue]="user.UId">{{user.name}}</option>
            </select>
    * CanDeactivate - This “CanDeactivate” interface now has an extra (optional) parameter and
        it is containing the next state.
    * Angular Universal. A ton of work has also been done on the Universal project which allows
        you to do server-side rendering. For performance boost and getting SEO friendly.


New in Angular 5.0
    * Make AOT the default
    * Remove *.ngfactory.ts files
    * Better error messages
    * Tree-Shakeable components
    * The compiler can also check more thoroughly your templates, with the new option
        'fullTemplateTypeCheck'. It can for example catch that a pipe is not used with
        the proper type. It can also analyze the local variables referencing a
        directive in your templates.
    * Forms. The ability to decide when the validity and value of a field or form is updated.
        To do so, the FormControl allows to use an options object as the second parameter,
        to define the synchronous and asynchronous validators, and also the updateOn option.
        Its value can be:
            * change, it’s the default: the value and validity are updated on every change;
            * blur, the value and validity are then updated only when the field lose the focus;
            * submit, the value and validity are then updated only when the parent form is submitted.
        Example:
            this.passwordCtrl = new FormControl('', {
            validators: Validators.required,
            updateOn: 'blur'
        This is of course also possible in template-driven form, with the ngModelOptions input
        of the NgModel directive:
            <input [(ngModel)]="user.login" [ngModelOptions]="{ updateOn: 'blur' }">
    * Http. The old @angular/http module is now officially deprecated and replaced by
        @angular/common/http (http://blog.ninja-squad.com/2017/07/17/http-client-module/).
    * Animations. Two new transition aliases are introduced: :increment and :decrement.
        Let’s say you want to animate a carousel with 5 elements, with a nice animation based
        on the index of the element displayed. You had to declare a transition like:
            transition('0 => 1, 1 => 2, 2 => 3, 3 => 4', ...)
        With Angular 5, you can now use transition(':increment')!
    * Added new router life cycle events for Guards and Resolvers:
·       GuardsCheckStart
·       GuardsCheckEnd
·       ResolveStart and
·       ResolveEnd
    * i18n. The messages extracted from your application now include the interpolations
        used in the template.
        Before:
            <source>
                Welcome to Ponyracer
                <x id="INTERPOLATION"/>
                <x id="INTERPOLATION_1"/>!
            </source>
        Now:
            <source>
                Welcome to Ponyracer
                <x id="INTERPOLATION" equiv-text="{{ user.firstName }}"/>
                <x id="INTERPOLATION_1" equiv-text="{{ user.lastName }}"/>!
            </source>
        Starting with Angular 5, you are encouraged to use an already possible alternative with ng-container:
            <ng-container i18n="@@home.justText">
                I don't output an element, just text
            </ng-container>
    * Pipes, i18n and breaking changes. More importantly, the pipes that were helping with the
        internationalization (number, percent, currency, date) have been completely overhauled.
            import { registerLocaleData } from '@angular/common';
            import localeFr from '@angular/common/locales/fr';
            registerLocaleData(localeFr);
        All the i18n pipes now take a locale as their last parameter, allowing to dynamically
            override it:
                @Component({
                selector: 'ns-locale',
                template: `
                    <p>The locale is {{ locale }}</p>
                    <!-- will display 'en-US' -->
                    <p>{{ 1234.56 | number:'1.0-3':'fr-FR' }}</p>
                    <!-- will display '1 234,56' -->
                `
                })
                class DefaultLocaleComponentOverridden {
                    constructor(@Inject(LOCALE_ID) public locale: string) { }
                }
    * Service Workers. Angular has a package called @angular/service-worker. you can picture
        them as small proxies in your browser. If you activate them in an app, it allows to
        cache static assets, and to not fetch them on every reload, improving performances.
        You can even go offline, and your app can still respond!
        @angular/service-worker is a small package, but filled with cool features.
        Did you know that if you add it to your Angular CLI application, and turn a flag on
        ("serviceWorker": true in .angular-cli.json), the CLI will automatically generate
        all the necessary stuff to cache your static assets by default.
        But it can even go further, allowing to cache external resources
        (like fonts, icons from a CDN…), route redirection and even dynamic content caching
        (like calls to your API), with different strategies possible (always fetch for fresh
        data, or always serve from cache for speed…). The package also offers a module called
        ServiceWorkerModule that you can use in your application to react to push events
        and notifications!
    * An emphasis on making it easier to build progressive web apps, so apps can be cached
        in the browser.
*/
