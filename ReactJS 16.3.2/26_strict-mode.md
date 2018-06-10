## Strict Mode
`StrictMode` is a tool for highlighting potential problems in an application. Like `Fragment`, `StrictMode` does not render any visible UI. It activates additional checks and warnings for its descendants.

> Strict mode checks are run in development mode only; they do not impact the production build.

You can enable strict mode for any part of your application by surrounding in with `<React.StrictMode>` tag:
```jsx
<Header />
<React.StrictMode>
    <div>
        <ComponentOne />
        <ComponentTwo />
    </div>
</React.StrictMode>
<Footer />
```
In the above example, strict mode checks will not be run against the `Header` and `Footer` components.

`StrictMode` currently helps with:
* __Identifying components with unsafe lifecycles__

    As explained in [this blog post](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html), certain legacy lifecycle methods are unsafe for use in async React applications. However, if your application uses third party libraries, it can be difficult to ensure that these lifecycles aren’t being used. Fortunately, strict mode can help with this!

* __Warning about legacy string ref API usage__

    Previously, React provided two ways for managing refs: the __legacy string ref API__ and the __callback API__. Although the string ref API was the more convenient of the two, it had [several downsides](https://github.com/facebook/react/issues/1373) and so our official recommendation was to use the callback form instead.

    Since object refs were largely added as a replacement for string refs, strict mode now warns about usage of string refs.

* __Detecting unexpected side effects__

    Conceptually, React does work in two phases:

    * The __render phase__ determines what changes need to be made to e.g. the DOM. During this phase, React calls `render` and then compares the result to the previous render.
    * The __commit phase__ is when React applies any changes. (In the case of React DOM, this is when React inserts, updates, and removes DOM nodes.) React also calls lifecycles like `componentDidMount` and `componentDidUpdate` during this phase.

    The _commit phase_ is usually very fast, but rendering can be slow. For this reason, the upcoming async mode (which is not enabled by default yet) breaks the rendering work into pieces, pausing and resuming the work to avoid blocking the browser. This means that React may invoke render phase lifecycles more than once before committing, or it may invoke them without committing at all (because of an error or a higher priority interruption).

    Render phase lifecycles include the following class component methods:
    * `constructor`
    * `componentWillMount`
    * `componentWillReceiveProps`
    * `componentWillUpdate`
    * `getDerivedStateFromProps`
    * `shouldComponentUpdate`
    * `render`
    * `setState` updater functions (the first argument)

    Because the above methods might be called more than once, it’s important that they do not contain side-effects. Ignoring this rule can lead to a variety of problems, including memory leaks and invalid application state. Unfortunately, it can be difficult to detect these problems as they can often be non-deterministic.

    Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following methods:
    * Class component `constructor` method
    * The `render` method
    * `setState` updater functions (the first argument)
    * The static `getDerivedStateFromProps` lifecycle

    > This only applies to development mode. Lifecycles will not be double-invoked in production mode.