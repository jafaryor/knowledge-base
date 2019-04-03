## BEM (Block Element Modifier)
The Block, Element, Modifier methodology (commonly referred to as BEM) is a popular naming convention for classes in HTML and CSS.

```css
/* Block component */
.btn {}

/* Element that depends upon the block */
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {}
.btn--big {}
```

In this CSS methodology a __block__ is a top-level abstraction of a new component, for example a button: `.btn { }`. This block should be thought of as a parent. Child items, or __elements__, can be placed inside and these are denoted by two underscores following the name of the block like `.btn__price { }`. Finally, __modifiers__ can manipulate the block so that we can theme or style that particular component without inflicting changes on a completely unrelated module. This is done by appending two hyphens to the name of the block just like `btn--orange`.

### Why use?
* Modularity

    BEM makes your CSS free from the hell of cascading. As Blocks are styled to not be dependent on other elements of the page.

* Reusability

    It also promotes reuse of CSS classes since these classes were built based on Blocks and have modifiers to customize them.

* Structure

    It gives your CSS code a solid structure that remains simple and easy to understand. It also communicates function and purpose.
