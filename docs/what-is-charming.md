# What is Charming?

```js eval t=module
import {shape, reactive, $} from "charmingjs";

const [scope] = cm.reactive().let("x", 0).join();

requestAnimationFrame(animate);

function animate() {
  scope.x = Math.sin(Date.now() / 1000) * 200;
  requestAnimationFrame(animate);
}

const svg = shape.svg({width: 200, height: 50}, [
  shape.circle({
    cx: cm.$(() => scope.x),
    cy: 25,
    r: 20,
  }),
]);

document.body.append(svg);
```
