## CSS in JavaScript
`CSS-in-JS` abstracts the `CSS` model to the _component level_, rather than the document level (modularity).

`CSS` was never actually made for component based approaches. `CSS-in-JS` solves exactly this problem.

### Pros:
* __Thinking in components__ — No longer do you have to maintain bunch of style-sheets.
* `CSS-in-JS` leverages the full power of the JavaScript ecosystem to enhance `CSS`.
* __“True rules isolation”__ — Scoped selectors are not enough. `CSS` has properties which are inherited automatically from the parent element, if not explicitly defined. Thanks to [jss-isolate](http://cssinjs.org/jss-isolate) plugin, `JSS` rules will not inherit properties.
* __Scoped selectors__ — `CSS` has just one global namespace. It is impossible to avoid selector collisions in non-trivial applications. Naming conventions like `BEM` might help within one project, but will not when integrating third-party code. `JSS` generates unique class names by default when it compiles JSON representation to `CSS`.
* __Vendor Prefixing__ — The `CSS` rules are automatically vendor prefixed, so you don’t have to think about it.
* __Code sharing__ — Easily share constants and functions between JS and `CSS`.
* Only the styles which are currently in use on your screen are also in the DOM ([react-jss](https://github.com/cssinjs/react-jss)).
* Dead code elimination
* Unit tests for `CSS`!

### Cons:
* Learning curve
* New dependencies
* Harder for newer teammates to adapt to the code-base

### Libraries:
* #### JSS

    [`JSS`](http://cssinjs.org/?v=v9.8.7) is a more powerful abstraction over CSS. It uses JavaScript as a language to describe styles in a declarative and maintainable way. It is a high performance JS to `CSS` compiler which works at runtime and server-side.

    The Idea of `JSS` is exactly the opposite. It is about using just one language for the logic and styling and get benefits from both worlds.

* #### Radium
* #### Glamorous
    ...

__[More Detailed about CSS-in-JS](https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc)__

## CSS Modules
Alternative to `CSS-in-JS` is __CSS Modules__.

They generate locally scoped class names that are easy to reason about, without introducing complex conventions.

A `CSS Module` is a CSS file in which all class names and animation names are _scoped locally_ by default.

![css-modules-compiler-extended](./images/css-modules-compiler-extended.png)

Loading a CSS module into the local scope of your component is as simple as using require or import, just like you would any other JavaScript module
```javascript
import styles from './ScopedSelectors.css';
```

Once your module is loaded you can reference your CSS class names like you would any other property.
```javascript
import React, { Component } from 'react';
import styles from './ScopedSelectors.css';

export default class ScopedSelectors extends Component {
  render() {
    return (
      <div className={styles.root}>
        <p className={styles.text}>Scoped Selectors</p>
      </div>
    );
  }
};
```

Where do you get a _CSS Modules compiler_? If you are using `Webpack`, you already have one. Just add the `"?modules"` option to `css-loader`.

Example:

![css-modules-compiler](./images/css-modules-compiler.png)

CSS Modules are not suitable for every project. A component based architecture is required (React, Angular, Vue).

__[More Detailed about CSS Modules](https://medium.com/front-end-developers/css-modules-solving-the-challenges-of-css-at-scale-85789980b04f)__

### Solves:
* _Global Scope_

    CSS Modules eliminate collisions in the global scope, by leveraging uniquely generated class names using a modified BEM notation.

* _Overqualified Selectors_

    Because CSS modules live at the component level, there’s no need to write write deeply nested selectors. Class names can be kept simple and relevant to the component.

    ```css
    .widget table row cell .content .header .title {
      ...
    }
    ```

    Overqualified selectors have several issues:
    * They’re a performance nightmare. This small example would require the browser to make 7 fetch attempts across the DOM before rendering.
    * They add a lot of unnecessary weight to your site. Byte count still matters, especially on mobile where data speeds are limited.
    * They limit reusability. Instead of working with the cascade, they’re fighting against it, limiting reuse and promoting duplication.

* _Refactoring_

    Refactoring is made simple, because we’re working at the component level, we can easily determine which styles apply to the component. For styles that use composition, we can quickly locate the other affected components.

## BEM
As an alternative. BEM methodology advocates modularity in CSS through the use of selector naming conventions.
