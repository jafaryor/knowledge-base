## Angular Related Notes

### Performance
Load Time Performance Techniques:
1. __AOT__: As opposed to JIT Compilation where the compilation is done in the browser, AOT compiles much of the code during the build process
2. __Tree-shaking__: This is the process of removing unused code resulting in smaller build size.
3. __Uglify__: It is the process where the code size is reduced using various code transformations like mangling, removal of white spaces, removal of comments etc.
4. __Google Closure Compiler__: This is the compiler used by Google for their products which results in much smaller bundle size compared to Webpack uglify by performing much more aggressive minification.
5. __Module Bundler__: Webpack
6. __Prod flag__: For the production, build specify the “prod” flag in the angular-cli application. It will enable various build optimizations like uglify, AOT, removal of sourcemaps, service workers (if enabled) producing a much smaller build size.
7. __Build-optimizer flag__: If you are using angular-cli make sure you specify “build-optimizer” flag for your production build. This will disable the vendor chunk and will result in more smaller code.
8. __Lazy loading__: Lazy loading is the mechanism where instead of loading complete app, we load only the modules which are required at the moment thereby reducing the initial load time. We can even prevent whole modules from being loaded based on some condition (`canLoad` guard).
9. __Server side rendering__: Rendering the first page of your application on the server and serving it as a static page causes near to instant rendering
10. __Progressive Web App__: PWA makes your app load much faster, it gives the offline capability to your app and gives near native app experience
11. __Ivy Render Engine__: It results in much smaller bundle size than the current engine with template debugging capabilities.
[NG Conf video about Ivy Engine](https://www.youtube.com/watch?v=dIxknqPOWms&feature=youtu.be&t=1360)
12. __RxJS 6__: RxJS 6 makes the whole library more tree-shakable thereby reducing the final bundle size. However, it has some breaking changes like operators chaining is not possible instead, `pipe()` function (helps in better tree shaking) is introduced to add operators.
13. __Service worker cache__: If you have configured your app to support PWA, make sure to specify all the necessary static resources in the PWA config JSON. These static files will be cached in the client’s browser making the second time load much faster.
14. __Cache-control header__: cache-control header controls who caches the response under what condition and for how long thus eliminating the need for network round trip for the resources which are cached.
15. __Third party packages__: Review the third party packages you are using and see if better and smaller alternative is available as it may reduce the final size of your build. Update them regularly.
16. __`defer` and `async` attributes__: Delays the loading of scripts until the document is not parsed. But `async` doesn't respecting the order of loading of the scripts.
17. __Gzip compression__: Gzip compression can greatly decrease the size of the response body
18. __`preload` and `prefetch` attributes__: `preload` and `prefetch` are almost similar with the only difference is that `preload` resources have greater priority. So use `preload` for the assets which are essential for the initial rendering and use `prefetch` for the resources which are required after site load (required in future across the pages). [More](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf).
19. __Compressing images__
20. __Slow `DNS` and `SSL`__

Run Time Performance Techniques:
1. __Change Detection__: By default on each asynchronous event, Angular performs a dirty checking by performing a change detection for the whole component tree. Such dirty checking could be a lot computation heavy for a medium to large apps. You can drastically reduce the change detection by setting `ChangeDetectionStrategy` to `OnPush`. This tells Angular that the component only depends on his `Input`s ( aka pure ) and needs to be checked in only the following cases:
    * The `Input` reference changes.
    * An event occurred from the component or one of his children.
2. __Detach Change Detector__: We can completely detach the component from change detection thereby giving a developer the control to inform Angular as to when and where to perform the change detection.
3. __Web Workers__: The JavaScript implementation in all browser is single threaded thus making the whole app to run on a single thread. Such single-threaded execution drastically reduces the frame rate of the complex application as both UI painting and JS execution handled by the same thread. As Angular by default avoids direct DOM manipulation, it is possible to run the entire Angular app in a separate web worker thread thereby keeping the main thread free to just handle the UI rendering. Check this [post](https://stackoverflow.com/questions/43276044/angular-cli-generated-app-with-web-workers#answer-43276045) to see how to run an angular-cli app inside web worker.
4. __Webassembly__: Webassembly is a low level assembly like a language enabling near-native performance. WebAssembly aims to execute at native speed by taking advantage of common hardware capabilities available on a wide range of platforms.
5. __`trackBy`__: By default, `*ngFor` identifies object uniqueness by reference. If the object reference is broken by updating the content of the object, Angular removes the related DOM node completely and recreate it again even though the actual change required is for only a small part of the DOM node. This issue can be easily solved by using `trackBy`.
6. __Pure Pipes__: In the `@Pipe` decorator you can specify `pure` flag as `true`. This flag indicates that the pipe is not dependent on any outside or global state and is side effect free. Angular executes a pure pipe only when it detects a pure change to the input value.
7. __Avoid complex computations in the template__: Avoid doing complex calculation in the HTML template (ex calling some component method inside the template). The problem is, because Angular needs to re-run your function in every change detection cycle, if the function performs expensive tasks.
Instead leverage the use of pure pipes thereby taking advantage of Angular caching and hence avoiding duplicate operations or if the use of pipe is not possible, see the opportunity to pre-calculate the values and then directly bind values instead of calling the component method in the template.
8. __`enableProdMode`__: Invoking `enableProdMode()` avoids Angular from performing additional checks for change detection.
9. __AOT__: AOT not only improves the build time performance but also the runtime performance of the app.
10. __Optimize Events__: Slower DOM events block change detection until the event is not completed. For example, if you have a click event in your template which is handled in the component and the component itself is calling service method to process it, the change detection will not complete until the control is not returned from the service. If your service is taking more time to perform the intended operation, then it will ultimately slow down the change detection. See the opportunity to optimize your logic to improve the duration or if possible try to move your service logic to separate web worker thread or use wasm if needed.
11. __Unsubscribing Observables__
12. __Observable `share()` operator__: If you have subscribed the observable at multiple locations/components, then each subscription will try to produce the data even though the data is duplicate. We can avoid the processing of the duplicate data across subscriptions using the `share()` operator.
    ```javascript
        this.data = this.http.get<any> ('apiUrl').pipe(share());
    ```
13. __Progressive Web Apps__: The PWA not just give you a load time optimization but also the runtime optimizations making your app more responsive, interactive, fast, smooth animations, offline support etc.
14. `console.log()`: Using `console.log()` statements in your production code could be a bad idea as it will slow down the performance of the app and also logging objects with `console.log()` creates memory leak issue. When browser’s console window is open, the `console.log()` execution slows down even further by many times thus impacting site’s performance significantly. It’s better to completely remove the `console.log()` statements from your production code or at least have an environment specific conditional logging.
15. __Global Variables__: The variables defined in the global scope won’t be cleared until the window is reloaded or tab is closed thus resulting in the memory leak if the global variable is not intended to be used throughout the app. If for some reason you want to have global variables, there are [better ways](https://stackoverflow.com/questions/36158848/what-is-the-best-way-to-declare-a-global-variable-in-angular-2-typescript) to do it in the Angular.
16. __Event listeners__: Adding event listeners to your DOM node could create memory leak issue. If you forget to remove the listener inside the $destroy event of your directive, it will hold a reference to a DOM node even if it is removed from the document. The DOM tree will then become a “Detached DOM tree” and will leak. Modern JS engines are able to figure most of this situations for you and remove the listeners, but more complex tree hierarchies can challenge even the best GC.





