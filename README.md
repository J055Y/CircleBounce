# CircleBounce
Canvas animation of bouncy circles in JavaScript.

Each circle bounces off of the canvas bounds and lines with varying opacity are drawn between neighbouring circles within a given distance. Circles within a given distance of the mouse will be pushed in the direction of mouse movement.

### Installation
You can either download the `circles.js` file from this repository, or use the following NPM package:
```shell script
npm i @j055y/circle-bounce
```

## How to Use
When creating a new instance of a CircleCanvas object, there are three arguments you need to be aware of.
```javascript
let circleCanvas = new CircleCanvas(numberOfCircles, velocity, colour);
```
 - `numberOfCircles` takes a positive integer
 - `velocity` takes any valid number
 - `colour` takes a string of either a hexadecimal colour value or "random"

For most use cases, you can simply copy the following snippet and alter the given arguments as needed.
```html
<script>
    let circleCanvas = new CircleCanvas(200, 4, "random");
    document.querySelector("canvas").id = Object.keys({circleCanvas})[0];
</script>
```
## Demo
[Demo Link](https://j055y.net/CircleBounce/ "CircleBounce Demo")
![Bouncy Circles](https://i.imgur.com/ABLX7aL.png)
