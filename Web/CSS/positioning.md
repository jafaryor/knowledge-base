## Positioning
Positioning allows you to move an element from where it would be placed when in normal flow to another location. Positioning isn’t a method for creating your main page layouts. However there are useful techniques for certain layout patterns that rely on the position property.

There are five types of `position` property:
* `static` - is the default that every element gets — it just means "put the element into its normal position in the document layout flow — nothing special to see here".
* `relative` - allows you to offset an item from the position in normal flow it would have by default.

    > __But its place won't be occupied by siblings.__

* `absolute` - is used to completely remove an element from normal flow, and place it using offsets from a containing block.

    > __But its place will be occupied by siblings.__

    Absolute positioning needs __positioning context__ — which element the absolutely positioned element is positioned relative to. By default, it is the `<html>` element.

    We can change the positioning context by putting `position: relative | absolute | fixed | sticky` to any parent of the absolute positioned element.

    How it finds positioning context: It goes up from its direct parent to the `<html>` tag. The first element with __non-static positioning__ will be its positioning context, otherwise positioning context will be `<html>`.

* `fixed` - removes our element from document flow, in the same way as absolute positioning. However instead of the offsets beign applied from the container, they are applied from the viewport.
* `sticky` - is a newer positioning method which makes an element act like position: `static` until it hits a defined offset from the viewport, at which point it acts like position: `fixed`.