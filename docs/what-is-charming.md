# What is Charming?

**Charming** (or **Charming.js**) is a free, open-source JavaScript library that creates animated and interactive SVG. Built on [EchoX](https://echox.dev/), it lets users write SVG through intuitive function calls and handle dynamic updates using a reactive approach similar to [React](https://react.dev/) or [Vue](https://vuejs.org/).

Charming lets you create dynamic and expressive generative art and visualizations effortlessly. Here's a quick example that give you a sense of Charming:

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

Charming provides a declarative way to create SVG through pure function calls. It exports an _svg_ proxy object to **create SVG elements directly**. For example, to create a white circle on a black background:

```js eval t=module
import {svg} from "charmingjs";

const node = svg.svg({width: 100, height: 100}, [
  svg.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  svg.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
]);

document.body.append(node);
```

Please refer to [Charming DOM](/charming-dom) for more information.

## Fluid Transition

Charming makes it easier than ever to create fluid transitions. The exported _transition_ component lets you apply transitions declaratively to child nodes, whether SVG or HTML. For example, you can create a circle that smoothly change colors and radius over time.

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

## Reactivity for dynamics

For dynamic features like interactions and animations, Charming uses a reactive state management concept called _Flow_. In a flow, you can define _states_, _computed states_, and _effects_, then bind them to SVG elements. When states change, the elements update automatically—no need to manually sync states and views. For instance, you can easily create a random walker that changes color on mouse hover:

```js eval t=module
import {flow, random, constrain} from "charmingjs";

const width = 600;
const height = 150;

const state = flow()
  .state("x", width / 2)
  .state("y", height / 2)
  .state("isHovering", false)
  .computed("clampedX", (state) => constrain(state.x, 0, width))
  .computed("clampedY", (state) => constrain(state.y, 0, height))
  .computed("color", (state) => (state.isHovering ? "#4DAAB3" : "black"))
  .on("loop", (event, state) => {
    state.x += random(-1, 1);
    state.y += random(-1, 1);
  })
  .join();

const node = svg.svg({width, height}, [
  svg.circle({
    cx: state.select("clampedX"),
    cy: state.select("clampedY"),
    fill: state.select("color"),
    r: 20,
    onmouseenter: () => (state.isHovering = true),
    onmouseleave: () => (state.isHovering = false),
  }),
]);

document.body.append(node);
```

## Component over class

Components in Charming are reusable UI and logic elements. Using the _component_ function, you can define a function that accepts _props_ and _flow_ parameters to return SVG elements. For example, to define a random _walker component_:

```js eval t=moduleWalker
import {component, random, constrain} from "charmingjs";

const walker = component((props, flow) => {
  const {width, height} = props;

  const state = flow()
    .state("x", width / 2)
    .state("y", height / 2)
    .state("isHovering", false)
    .computed("clampedX", (state) => constrain(state.x, 0, width))
    .computed("clampedY", (state) => constrain(state.y, 0, height))
    .computed("color", (state) => (state.isHovering ? "#4DAAB3" : "black"))
    .on("loop", (event, state) => {
      state.x += random(-1, 1);
      state.y += random(-1, 1);
    })
    .join();

  return svg.circle({
    cx: state.select("clampedX"),
    cy: state.select("clampedY"),
    fill: state.select("color"),
    r: 20,
    onmouseenter: () => (state.isHovering = true),
    onmouseleave: () => (state.isHovering = false),
  });
});
```

You can then use this _walker component_ like any other SVG element:

```js eval t=module
import {svg} from "charmingjs";

const width = 600;
const height = 150;

const node = svg.svg({width, height}, [
  walker({width, height}),
  walker({width, height}),
  walker({width, height}),
  walker({width, height}),
]);

document.body.append(node);
```

Note that the concept of a component is very similar to a class—both enable reusable and maintainable code. However, Charming favors components over classes, which we'll discuss next.

## Composition over inheritance

What if we want to draw a random walker with a rectangle element? When using classes, we would typically use inheritance to override the display function. However, in Charming, you can define a _useWalker composition_ like this:

```js eval t=moduleUseWalker
import {svg, random, constrain} from "charmingjs";

const useWalker = (flow, width, height) =>
  flow()
    .state("x", width / 2)
    .state("y", height / 2)
    .state("isHovering", false)
    .computed("clampedX", (state) => constrain(state.x, 0, width))
    .computed("clampedY", (state) => constrain(state.y, 0, height))
    .computed("color", (state) => (state.isHovering ? "#4DAAB3" : "black"))
    .on("loop", (event, state) => {
      state.x += random(-1, 1);
      state.y += random(-1, 1);
    })
    .join();
```

You can then use this _useWalker composition_ in your square walker component:

```js eval t=moduleSquareWalker
import {svg, component} from "charmingjs";

const squareWalker = component((props, flow) => {
  const state = useWalker(flow, props.width, props.height);

  return svg.rect({
    x: state.select((state) => state.clampedX - 20),
    y: state.select((state) => state.clampedY - 20),
    fill: state.select("color"),
    width: 40,
    height: 40,
    onmouseenter: () => (state.isHovering = true),
    onmouseleave: () => (state.isHovering = false),
  });
});
```

And draw two walkers like this:

```js eval t=module
import {svg, range} from "charmingjs";

const width = 600;
const height = 150;

const node = svg.svg({width, height}, [
  walker({width, height}),
  squareWalker({width, height}), // Use SquareWalker
]);

document.body.append(node);
```

This pattern lets you break down common logic into separate, reusable compositions. For instance, you can extract hovering behavior into its own composition and implement it like this:

```js
const squareWalker = component((props, flow) => {
  const walker = useWalker(flow, props.width, props.height);
  const hover = useHover(flow);

  return svg.rect({
    x: walker.select((state) => state.clampedX - 20),
    y: walker.select((state) => state.clampedY - 20),
    fill: walker.select("color"),
    width: 40,
    height: 40,
    onmouseenter: hover.set(true),
    onmouseleave: hover.set(false),
  });
});
```

With composition, you don't have to use multiple inheritance like this:

```js
class Hover() {}
class HoverableWalker extends Hover() {}
class SquareWalker extends HoverableWalker() {}
```

or

```js
class Hover() {}
class Walker extends Hover() {}
class SquareWalker extends Hover, Walker {}
```

## A Collection of Tools

Charming provides a set of modular tools that you can use together or independently. For example,

- [Charming DOM](/charming-dom) - Creating SVG and HTML with pure function calls.
- [Charming Flow](/charming-flow) - Applying fine-grained state observation.
- [Charming Vector](/charming-vector) - Manipulating Euclidean vector.
- ...

## Built on and learn with D3

Charming is built with D3 and integrates seamlessly with it. It simplifies D3's complexity, making it more accessible and easier to learn.
