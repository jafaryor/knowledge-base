## Reconciliation (примирение)

When you use React, at a single point in time you can think of the `render()` function as creating a tree of React elements. On the next state or props update, that `render()` function will return a different tree of React elements. React then needs to figure out how to efficiently update the UI to match the most recent tree.

There are some generic solutions to this algorithmic problem of generating the minimum number of operations to transform one tree into another. However, the [state of the art algorithms](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf) have a complexity in the order of `O(n^3)` where n is the number of elements in the tree.

If we used this in React, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic `O(n)` algorithm based on two assumptions:

1. Two elements of different types will produce different trees.
2. The developer can hint at which child elements may be stable across different renders with a `key` prop.

In practice, these assumptions are valid for almost all practical use cases.

### The Diffing Algorithm
When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.
* __Elements Of Different Types__

    Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch. Going from `<a>` to `<img>`, or from `<Article>` to `<Comment>`, or from `<Button>` to `<div>` - any of those will lead to a full rebuild.

    When tearing down a tree, old DOM nodes are destroyed. Component instances receive `componentWillUnmount()`. When building up a new tree, new DOM nodes are inserted into the DOM. Component instances receive `componentWillMount()` and then` componentDidMount()`. Any state associated with the old tree is lost.

    Any components below the root will also get unmounted and have their state destroyed.

    ```jsx
    <div>
        <Counter />
    </div>

    <span>
        <Counter />
    </span>
    ```
    This will destroy the old `Counter` and remount a new one.

* __DOM Elements Of The Same Type__

    When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes.

    When updating `style`, React also knows to update only the properties that changed. For example:
    ```jsx
    <div style={{color: 'red', fontWeight: 'bold'}} />

    <div style={{color: 'green', fontWeight: 'bold'}} />
    ```
    When converting between these two elements, React knows to only modify the `color` style, not the `fontWeight`.

    After handling the DOM node, React then recurses on the children.

* __Component Elements Of The Same Type__

    When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls `componentWillReceiveProps()` and `componentWillUpdate()` on the underlying instance.

    Next, the `render()` method is called and the diff algorithm recurses on the previous result and the new result.

* __Recursing On Children__

    By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.

    For example, when adding an element at the end of the children, converting between these two trees works well:
    ```jsx
    <ul>
        <li>first</li>
        <li>second</li>
    </ul>

    <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
    </ul>
    ```
    React will match the two `<li>first</li>` trees, match the two `<li>second</li>` trees, and then insert the `<li>third</li>` tree.

    > __If you implement it naively, inserting an element at the beginning has worse performance. React will mutate every child instead of realizing it can keep it.__

* __Keys__

    In order to solve this issue, React supports a `key` attribute. When children have keys, React uses the `key` to match children in the original tree with children in the subsequent tree. For example, adding a `key` to our inefficient example above can make the tree conversion efficient:
    ```jsx
    <ul>
        <li key="2015">Duke</li>
        <li key="2016">Villanova</li>
    </ul>

    <ul>
        <li key="2014">Connecticut</li>
        <li key="2015">Duke</li>
        <li key="2016">Villanova</li>
    </ul>
    ```

    Now React knows that the element with key `'2014'` is the new one, and the elements with the keys `'2015'` and `'2016'` have just moved.

    Reorders can also cause issues with component state when indexes are used as keys. Component instances are updated and reused based on their key. If the key is an index, moving an item changes it. As a result, component state for things like uncontrolled inputs can get mixed up and updated in unexpected ways.

### Tradeoffs
It is important to remember that the reconciliation algorithm is an implementation detail. React could rerender the whole app on every action; the end result would be the same. Just to be clear, rerender in this context means calling `render` for all components, it doesn’t mean React will unmount and remount them. It will only apply the differences following the rules stated in the previous sections.

Because React relies on heuristics, if the assumptions behind them are not met, performance will suffer.
* The algorithm will not try to match subtrees of different component types. If you see yourself alternating between two component types with very similar output, you may want to make it the same type. In practice, we haven’t found this to be an issue.
* Keys should be stable, predictable, and unique. Unstable keys (like those produced by `Math.random()`) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.