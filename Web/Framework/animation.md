## Doing Animation in Angular
SVG slips right into your Angular components just like HTML. You can put SVG elements in Angular templates. You can bind data to them. You can bind event listeners on them. You can style them in component stylesheets. You can divide them into several components. You can even do content projection with them. There are just a few ground rules to remember when working with SVG in Angular, all of which are caused by differences in the underlying DOM implementations between SVG and HTML:
* Use the `svg:` namespace prefix on elements to let Angular know you're talking about SVG.
* Use the `attr.` prefix for attribute bindings to let Angular know you want an attribute binding, not a property binding.
When you define SVG components, don't use element selectors to avoid ending up with unknown elements in the DOM. Instead, you can use attribute selectors: `selector: '[my-component]'` that you can then apply to standard SVG elements: `<svg:g my-component></svg:g>`.

When animating SVG, avoid SMIL since it is deprecated and support is limited. Insted, use one of the following standard options:
* CSS transitions and animations.
* Angular Animations (which uses Web Animations as its engine).

In practice, both CSS and Web Animations currently have limited applicability: You can only animate a [subset of SVG attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute#Presentation_attributes), and there are browser quirks. When you need something more sophisticated, or just don't want to deal with browser inconsistencies, incorporate [Greensock](https://greensock.com/) or some other animation library.

Canvas is also available for use in Angular. You may want to use it when you have large, complex scenes to render since its immediate rendering mode makes more efficient use of resources. The flipside of this is that Canvas code is usually more complex than SVG because of its low-level nature.

When you want to use a Canvas, you can use the `<canvas>` tag in a component template, give it a reference variable name, inject it into the component class as a `@ViewChild()` and then draw on it using the standard canvas drawing API from the component's lifecycle hooks or event handlers.

For drawing changing data, it is a good idea to use the `OnChanges` lifecycle hook, often combined with the `OnPush` change detection strategy

To animate canvas graphics, you can set up a `requestAnimationFrame` loop inside your Canvas component, and draw individual animation frames manually. This often entails a lot of coding work, but sometimes it just can't be avoided.

Remember to run your `requestAnimationFrame()` loop outside the Angular zone unless you have a very good reason to do otherwise.

#### [Read More about Angular Animation](https://teropa.info/blog/2016/12/12/graphics-in-angular-2.html)