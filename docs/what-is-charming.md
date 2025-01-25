# What is Charming?

**Charming** (or **Charming.js**) is a free, open-source JavaScript library for animated and interactive SVGs. Charming is based on [EchoX](https://echox.dev/), allowing users to write SVGs intuitively with pure function calls and applying reactivity for dynamics in the similar style of [React](https://react.dev/) or [Vue](https://vuejs.org/).

Charming is useful for crafting dynamic and expressive generative art and visualization with minimal effort. Here’s a quick example to give you a sense of Charming:

```js eval t=module
import {shape, flow, $} from "charmingjs";

const [state] = flow().let("x", 0).join();

requestAnimationFrame(animate);

function animate() {
  state.x = Math.abs(Math.sin(Date.now() / 1000) * 200);
  requestAnimationFrame(animate);
}

const svg = shape.svg({width: 200, height: 50}, [
  shape.circle({
    cx: $(() => state.x),
    cy: 25,
    r: 20,
  }),
]);

document.body.append(svg);
```

## Charming creates SVGs

Charming provides a declarative way to creating SVGs with pure function calls. A _shape_ proxy object exported to **create SVG elements directly**. For example, to create a white circle in a black background:

```js eval t=module
import {shape} from "charmingjs";

const svg = shape.svg({width: 100, height: 100}, [
  shape.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  shape.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
]);

document.body.append(svg);
```

Please refer to [Charming Shape](/charming-shape) for more information.

## Charming uses reactivity for dynamics

## Charming is composable

## Charming is a collection of tools

## Charming works with D3
