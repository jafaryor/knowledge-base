## Intersection Observer API
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Intersection information is needed for many reasons, such as:
* Lazy-loading of images or other content as a page is scrolled.
* Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
* Reporting of visibility of advertisements in order to calculate ad revenues.
* Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

Implementing intersection detection in the past involved event handlers and loops calling methods like `Element.getBoundingClientRect()` to build up the needed information for every element affected. Since all this code runs on the main thread, even one of these can cause performance problems.

The Intersection Observer API allows you to configure a callback that is called whenever one element, called the __target__, intersects either the device viewport or a specified element; for the purpose of this API, this is called the __root element__ or __root__.

The degree of intersection between the target element and its root is the __intersection ratio__. This is a representation of the percentage of the target element which is visible as a value between `0.0` and `1.0`.

Read more [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [here](https://blog.angularindepth.com/a-modern-solution-to-lazy-loading-using-intersection-observer-9280c149bbc)
