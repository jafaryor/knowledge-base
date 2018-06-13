# CSS
According to the [CSS2 specification](http://www.w3.org/TR/CSS21/intro.html#processing-model), the term canvas describes "the space where the formatting structure is rendered": where the browser paints the content. The canvas is infinite for each dimension of the space but browsers choose an initial width based on the dimensions of the viewport.

## CSS Box model
The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out (выложен) according to the visual formatting model. Each box has a content area (e.g. text, an image, etc.) and optional surrounding padding, border, and margin areas.

> ![box-model](./images/box-model.jpg)

All elements have a `display` property that determines the type of box that will be generated.

Example
```
block: generates a block box.
inline: generates one or more inline boxes.
none: no box is generated.
```

The default is `inline` but the browser style sheet may set other defaults. For example: the default display for the `<div>` element is block. Default style sheet example can be found [here](http://www.w3.org/TR/CSS2/sample.html).

## Positioning scheme
There are three schemes:
* __Normal__: the object is positioned according to its place in the document. This means its place in the render tree is like its place in the `DOM` tree and laid out according to its box type and dimensions.
* __Float__: the object is first laid out like normal flow, then moved as far left or right as possible.
* __Absolute__: the object is put in the render tree in a different place than in the `DOM` tree.

The positioning scheme is set by the `position` property and the `float` attribute.
* `static` and `relative` cause a normal flow.
* `absolute` and `fixed` cause absolute positioning.

The way the box is laid out is determined by:
* ### Box type

    * `block`: forms a block–has its own rectangle in the browser window. Blocks are formatted vertically one after the other.
    * `inline-block`: does not have its own block, but is inside a containing block. Inlines are formatted horizontally.

    Inline boxes are put inside lines or "line boxes". The lines are at least as tall as the tallest box but can be taller, when the boxes are aligned "baseline"–meaning the bottom part of an element is aligned at a point of another box other then the bottom. If the container width is not enough, the inlines will be put on several lines. This is usually what happens in a paragraph.

    > ![lines](./images/lines.png)

* ### Box dimensions
* ### Positioning scheme

    * `relative`: Relative positioning–positioned like usual and then moved by the required delta.

        > ![relative-positioning](./images/relative-positioning.png)

    * `float`: A float box is shifted to the left or right of a line. The interesting feature is that the other boxes flow around it.

    * `absolute` and `fixed`: The layout is defined exactly regardless of the normal flow. The element does not participate in the normal flow. The dimensions are relative to the container. In fixed, the container is the viewport. Note: the fixed box will not move even when the document is scrolled!

        > ![absolute-and-fixed-positioning](./images/absolute-and-fixed-positioning.png)


* ### External information such as image size and the size of the screen

### Layered representation
This is specified by the `z-index` CSS property. It represents the third dimension of the box: its position along the "z axis".

The boxes are divided into stacks (called stacking contexts). In each stack the back elements will be painted first and the forward elements on top, closer to the user. In case of overlap the foremost element will hide the former element. The stacks are ordered according to the z-index property. Boxes with "z-index" property form a local stack. The viewport has the outer stack.
