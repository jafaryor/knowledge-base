# Critical Rendering Path
The order in which resources must be loaded for maximum efficiency is called the __Critical Rendering Path__.

### How does the browser rendering engine work?
In order to render content the browser has to go through a series of steps:
1. Document Object Model(DOM)
2. CSS object model(CSSOM)
3. Render Tree
4. Layout
5. Paint.

## 1. Document Object Model
To process a html file and get to the document object model event(DOM) the browser has to go through 4 steps:

1. Convert bytes to characters
2. Identify tokens
3. Convert tokens to nodes
4. Build DOM Tree

__This means that the initial file size of your DOM tree will have a performance cost.__

In order to measure the full time needed for this process, you can record a timeline on chrome devtools while your page is loaded.

In the timeline above you can see that the browser initially sends a request for the html, then it starts receiving the response in chunks of data, and initializes the html parser, as the parser finds any links for CSS or Javascript, it immediatelly sends a request for them, after that it also sends requests for all the other assets found in the rest of the page.

When this process is finished the browser will have the full content of the page, but __to be able to render the browser has to wait for the CSS Object Model, also known as CSSOM event__, which will tell the browser how the elements should look like when rendered.

## 2. CSS Object Model
> CSS Object model is how the browser takes a CSS file and converts it to "rules" it knows how to understand and create the styles you have in your CSS file.

Just as with HTML, the CSS rules need to be converted into something that the browser understands, so these rules go through the same steps as the document object model.

1. Convert bytes to characters
2. Identify tokens
3. Convert tokens to nodes
4. Build CSSOM

In this stage the CSS parser goes through each node and gets the styles attributed to it.

CSS is one of the most important elements of the critical rendering path, because the browser blocks page rendering until it receives and processes all the css files in your page, __CSS is render blocking__

## 3. The Render Tree
__This stage is where the browser combines the DOM and CSSOM__, this process outputs a final render tree, which contains both the content and the style information of all the visible content on the screen.

## 4. Layout
__This stage is where the browser calculates the size and position of each visible element on the page__, every time an update to the render tree is made, or the size of the viewport changes, the browser has to run layout again.

## 5. Paint
__When we get to the paint stage, the browser has to pick up the layout result, and paint the pixels to the screen__, beware in this stage that not all styles have the same paint times, __also combinations of styles can have a greater paint time than the sum of their parts__. For an instance mixing a border-radius with a box-shadow, can triple the paint time of an element instead of using just one of the latter.

> http://www.html5rocks.com/en/tutorials/speed/css-paint-times/

## JavaScript
Javascript is a powerful tool that can manipulate both the DOM and CSSOM, so to execute Javascript, the browser has to wait for the DOM, then it has to download and parse all the CSS files, get to the CSSOM event and only then finally execute Javascript.

When the parser finds a script tag it blocks DOM construction, then waits for the browser to get the file and for the javascript engine to parse the script, this is why __Javascript is parser blocking__.

![Page_rendering](./images/CRP.png)

__Here we can understand the importance of the CSSOM event in the critical rendering path, this single event is blocking rendering and Javascript execution.__

There are only two cases when Javascript does not block on CSSOM:
1. Inlined scripts above the css files `<link>` in the `<head>`;
2. Async scripts.

__Async scripts don’t block DOM construction and don’t have the need to wait for the CSSOM event__, this way your critical rendering path stays free from Javascript interference. This is a crucial part of optimising for the critical rendering path.

# Optimizing the critical rendering path
## 1. Minification & Obfuscation

Make our critical assets as small as possible by minifying and compressing both the html and css. We can further optimize this resources by making use of html and css obfuscation.

Tools:
> https://medium.freecodecamp.org/reducing-css-bundle-size-70-by-cutting-the-class-names-and-using-scope-isolation-625440de600b
https://github.com/webpack-contrib/css-loader
https://code.google.com/p/closure-stylesheets/#Renaming

## 2. Optimising CSS delivery
With our resources optimized we need to get them to the client as fast as possible. A good strategy is to inline our css, so that we can get it to the client with the first html request, allowing the browser to get to the CSSOM event with only one request.

__A good strategy is to inline only the css for the header and the main module of the page, and downloading the remaining css async__. You can hide the unstyled content of the page, while the client waits for the reamining CSS, this is made to avoid the flash of unstyled content.

Tools:
> https://github.com/filamentgroup/loadCSS

If you’re going down this path and you’re using web fonts, __it’s an absolute must to have your webfonts async__. You don’t want to render the styles immediately and have your users waiting on the fonts to see the text, which is probably the most important part of your content.

More:
> http://www.sitepoint.com/improving-font-performance-subsetting-local-storage/

## 3. Achieving the 1s render
In order to make our page render in 1s we need to make our critical html and css fit in approximately 14kb. If we follow the logic mentioned above, this would be the header and the main module of the page.

After achieving the 14kb goal, we need to render the content, but the process of parsing the HTML, CSS, and executing Javascript takes time and resources, in a 3g connection we have ~600ms of 3g networking overhead (4g networks can reduce this overhead), then we need to wait for the server response, which can be ~200ms and then we are left with 200ms to parse the html and css, so it really helps to keep things simple(this is one of the advantages of design principles such as flat design and mobile first).

If you’ve managed to get through the whole process and made all the optimisations mentioned above, congratulations you should now have devivered an instant experience.

More:
> https://developers.google.com/speed/docs/insights/mobile

## 4. Server-Side Rendering

[More about CRP](https://bitsofco.de/understanding-the-critical-rendering-path/)
