## Animation
There are two primary ways to create animations on the web: with CSS and with JavaScript. Which one you choose really depends on the other dependencies of your project, and what kinds of effects you're trying to achieve.
* Use CSS animations for simpler "one-shot" transitions, like toggling UI element states.
* Use JavaScript animations when you want to have advanced effects like bouncing, stop, pause, rewind, or slow down.
* If you choose to animate with JavaScript, use the `Web Animations API` or a modern framework that you're comfortable with.

### Animate with CSS
```css
/**
 * This is a simplified version without
 * vendor prefixes. With them included
 * (which you will need), things get far
 * more verbose!
 */
.box {
    /* Choose the animation */
    animation-name: movingBox;

    /* The animation’s duration */
    animation-duration: 1300ms;

    /* The number of times we want
        the animation to run */
    animation-iteration-count: infinite;

    /* Causes the animation to reverse
        on every odd iteration */
    animation-direction: alternate;
}

@keyframes movingBox {
    0% {
        transform: translate(0, 0);
        opacity: 0.3;
    }
    25% {
        opacity: 0.9;
    }
    50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
    }
    100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
    }
}
```

### Animate with JavaScript and the Web Animations API
Creating animations with JavaScript is, by comparison, more complex than writing CSS transitions or animations, but it typically provides developers significantly more power. You can use the [Web Animations API](https://w3c.github.io/web-animations/) to either animate specific CSS properties or build composable effect objects.
```javascript
var target = document.querySelector('.box');
var player = target.animate([
    {transform: 'translate(0)'},
    {transform: 'translate(100px, 100px)'}
], 500);
player.addEventListener('finish', function() {
    target.style.transform = 'translate(100px, 100px)';
});
```

### Performance
Animating properties is not free, and some properties are cheaper to animate than others. For example, animating the `width` and `height` of an element changes its geometry and may cause other elements on the page to move or change size. This process is called layout (or reflow), and can be expensive if your page has a lot of elements. Whenever layout is triggered, the page or part of it will normally need to be painted, which is typically even more expensive than the layout operation itself.

Where you can, you should avoid animating properties that trigger layout or paint. For most modern browsers, this means limiting animations to `opacity` or `transform`, both of which the browser can highly optimize; it doesn’t matter if the animation is handled by JavaScript or CSS.

Use the `will-change` to ensure the browser knows that you intend to change an element’s property. This allows the browser to put the most appropriate optimizations in place ahead of when you make the change. Don't overuse `will-change`, however, because doing so can cause the browser to waste resources, which in turn causes even more performance issues.

Modern browsers can animate four things really cheaply:

![cheap-operations](../images/cheap-operations.jpg)

Here are the most popular CSS properties that, when changed, trigger layout:

| | |
| --- | --- |
| width | height |
| padding | margin |
| display | border-width |
| border | top |
| position | font-size |
| float | text-align |
| overflow-y | font-weight |
| overflow | left |
| font-family | line-height |
| vertical-align | right |
| clear | white-space |
| bottom | min-height |

Changing an element may also trigger painting, and the majority of painting in modern browsers is done in software rasterizers. Depending on how the elements in your app are grouped into layers, other elements besides the one that changed may also need to be painted.

| | |
| --- | --- |
| color | border-style |
| visibility | background |
| text-decoration | background-image |
| background-position | background-repeat |
| outline-color | outline |
| outline-style | border-radius |
| outline-width | box-shadow |
| background-size | |

### Animating Composite Properties
There is one CSS property, however, that you might expect to cause paints that sometimes does not: opacity. Changes to opacity can be handled by the GPU during compositing by simply painting the element texture with a lower alpha value. For that to work, however, the element must be the only one in the layer. If it has been grouped with other elements then changing the opacity at the GPU would (incorrectly) fade them too.

In Blink and WebKit browsers a new layer is created for any element which has a CSS transition or animation on opacity, but many developers use translateZ(0) or translate3d(0,0,0) to manually force layer creation. Forcing layers to be created ensures both that the layer is painted and ready-to-go as soon as the animation starts.

### Imperative vs Declarative Animations
Developers often have to decide if they will animate with JavaScript (_imperative_) or CSS (_declarative_). There are pros and cons to each, so let’s take a look:

#### Imperative
The main pro of imperative animations happens to also be its main con: it’s running in JavaScript on the browser’s main thread. The main thread is already busy with other JavaScript, style calculations, layout and painting. Often there is thread contention. This substantially increases the chance of missing animation frames, which is the very last thing you want.

Animating in JavaScript does give you a lot of control: starting, pausing, reversing, interrupting and cancelling are trivial. Some effects, like parallax scrolling, can only be achieved in JavaScript.

#### Declarative
The alternative approach is to write your transitions and animations in CSS. The primary advantage is that the browser can optimize the animation. It can create layers if necessary, and run some operations off the main thread which, as you have seen, is a good thing. The major con of CSS animations for many is that they lack the expressive power of JavaScript animations. It is very difficult to combine animations in a meaningful way, which means authoring animations gets complex and error-prone.

__JS vs CSS__:
* CSS-based animations, and Web Animations where supported natively, are typically handled on a thread known as the __compositor thread__. This is different from the browser's _main thread_, where styling, layout, painting, and JavaScript are executed. This means that if the browser is running some expensive tasks on the main thread, these animations can keep going without being interrupted.
* Other changes to `transform` and `opacity` can, in many cases, also be handled by the _compositor thread_.
* If any animation triggers paint, layout, or both, the _main thread_ will be required to do work. This is true for both CSS- and JavaScript-based animations.

__[Read More](https://developers.google.com/web/fundamentals/design-and-ux/animations/)__
