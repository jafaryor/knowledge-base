Tooltip implementation with pure CSS.

Use `data-*` attribute to store your custom data related to the element:
```html
<div class=container>
    <button
        class="btn tooltip"
        data-tooltip="First"
        data-position="top">
    </button>

    <button
        class="btn tooltip"
        data-tooltip="Second"
        data-position="right"
        data-highlight-click="on">
    </button>

    <button
        class="btn tooltip"
        data-tooltip="Third"
        data-position="bottom">
    </button>

    <button
        class="btn tooltip"
        data-tooltip="Fourth"
        data-position="left">
    </button>
</div>
```

Use `attr(data-tooltip)` to access `data-*` attribute:
```css
.btn {
    diplay: block;
    position: relative;
    cursor: pointer;
    margin: 10px 0;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: black;
}

.tooltip::before {
    content: attr(data-tooltip);
    position: absolute;
    z-index: 1;
    display: none;
    padding: 6px 12px;
    color: black;
    background-color: yellow;
}

.tooltip:hover::before {
    display: block;
}

.tooltip[data-position='top']::before {
    top: -100%;
    left: 0;
}

.tooltip[data-position='right']::before {
    top: 0;
    left: 100%;
}

.tooltip[data-position='bottom']::before {
    top: 100%;
    left: 0;
}

.tooltip[data-position='left']::before {
    top: 0;
    left: -100%;
}
```

Use `dataset` property to access `data-*` attribute:
```js
var highlight = document.querySelectorAll('.tooltip');

highlight.forEach(function(item) {
    if (item.dataset.highlightClick === 'on') {
        item.addEventListener('click', function() {
            item.style.backgroundColor = 'red';
        });
    }
});
```