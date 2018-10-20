## CSS Animation
Transform do not disrupt the normal document flow.

You can list all list all transformations separated by space like so:
```css
transform: rotate(45deg) scale(2) translate(100px, 50px) skew(20deg);
```
> The order is important! If order is changed you will get the different result.

### `perspective`
The `perspective` CSS property determines the distance between the `z=0` plane and the user in order to give a 3D-positioned element some `perspective`. Each 3D element with `z>0` becomes larger; each 3D-element with `z<0` becomes smaller. 

Use `perspective` for the 3D transformation.
