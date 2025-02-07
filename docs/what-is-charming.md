# What is Charming?

**Charming** (or **Charming.js**) is a free, open-source JavaScript library for animated and interactive SVGs. Charming is based on [EchoX](https://echox.dev/), allowing users to write SVGs intuitively with pure function calls and applying reactivity for dynamics in the similar style of [React](https://react.dev/) or [Vue](https://vuejs.org/).

Charming is useful for crafting dynamic and expressive generative art and visualization with minimal effort. Here’s a quick example to give you a sense of Charming:

```js eval t=module
import {svg, flow} from "charmingjs";

const state = flow()
  .state("x", 0)
  .on("loop", () => (state.x = Math.abs(Math.sin(Date.now() / 1000) * 200)))
  .join();

const node = svg.svg({width: 200, height: 50}, [
  svg.circle({
    cx: state.select("x"),
    cy: 25,
    r: 20,
  }),
]);

document.body.append(node);
```

## Based on SVG

Charming provides a declarative way to creating SVG with pure function calls. A _shape_ proxy object exported to **create SVG elements directly**. For example, to create a white circle in a black background:

```js eval t=module
import {svg} from "charmingjs";

const node = svg.svg({width: 100, height: 100}, [
  svg.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  svg.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
]);

document.body.append(node);
```

Please refer to [Charming DOM](/charming-dom) for more information.

## Modern Transition

```js eval code=false
play = Inputs.button("Replay");
```

```js eval t=module,replayable
import {svg, transition} from "charmingjs";

const node = svg.svg({width: 100, height: 100}, [
  svg.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  transition(
    {
      keyframes: [
        {attr: {fill: "#E5B442", r: 0}, duration: 1000},
        {attr: {fill: "#EE7A64", r: 40}, duration: 2000},
      ],
    },
    [svg.circle({cx: 50, cy: 50, r: 40, fill: "#4B68C9"})],
  ),
]);

document.body.append(node);
```

## Uses reactivity for dynamics

## Composable

<!-- ```js
const Walker = component((props, flow) => {
  const state = flow()
    .let("x", props.x)
    .let("y", props.y)
    .on("loop", () => {
      state.x += cm.random(-1, 1);
      state.y += cm.random(-1, 1);
    });
  return svg.circle({cx: state.use("x"), cy: state.use("y")});
});

const walkers = cm.range(10).map(() =>
  Walker({
    x: cm.random(width),
    y: cm.random(height),
  }),
);

const node = svg.svg({}, walkers);

document.body.append(node);
``` -->

## A collection of tools

## Built and works with D3
