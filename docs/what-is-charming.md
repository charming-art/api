# What is Charming?

**Charming** (or **Charming.js**) is a free, open-source JavaScript library that creates animated and interactive SVG. Built on [EchoX](https://echox.dev/), it lets users write SVG through intuitive function calls and handle dynamic updates using a reactive approach similar to [React](https://react.dev/) or [Vue](https://vuejs.org/).

Charming lets you create dynamic and expressive generative art and visualizations effortlessly. Here's a quick example that give you a sense of Charming:

```js eval t=module
const SVG = cm.SVG;
const state = cm.state({x: 0});
const ticker = cm.ticker();

ticker.on("animate", () => (state.x = Math.abs(Math.sin(Date.now() / 1000) * 200)));

const node = SVG.svg({width: 200, height: 50}, [
  SVG.circle({
    cx: () => state.x,
    cy: 25,
    r: 20,
  }),
]);

document.body.append(node);
```

## Based on SVG

Charming provides a declarative way to create SVG through pure function calls. It exports an _svg_ proxy object to **create SVG elements directly**. For example, to create a white circle on a black background:

```js eval t=module
const SVG = cm.SVG;

const node = SVG.svg({width: 100, height: 100}, [
  SVG.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  SVG.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
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
const SVG = cm.SVG;

const node = SVG.svg({width: 100, height: 100}, [
  SVG.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
  cm.transition(
    {
      keyframes: [
        {attr: {fill: "#E5B442", r: 0}, duration: 1000},
        {attr: {fill: "#EE7A64", r: 40}, duration: 2000},
      ],
    },
    [SVG.circle({cx: 50, cy: 50, r: 40, fill: "#4B68C9"})],
  ),
]);

document.body.append(node);
```

## Reactivity for dynamics

For dynamic features like interactions and animations, Charming uses a reactive state management concept called _Flow_. In a flow, you can define _states_, _computed states_, and _effects_, then bind them to SVG elements. When states change, the elements update automatically—no need to manually sync states and views. For instance, you can easily create a random walker that changes color on mouse hover:

```js eval t=module
const SVG = cm.SVG;
const width = 600;
const height = 150;

const state = cm.state({
  x: width / 2,
  y: height / 2,
  isHovering: false,
  clampedX: (state) => cm.constrain(state.x, 0, width),
  clampedY: (state) => cm.constrain(state.y, 0, height),
  color: (state) => (state.isHovering ? "#4DAAB3" : "black"),
});

const ticker = cm.ticker().on("animate", animate);

function animate() {
  state.x += cm.random(-1, 1);
  state.y += cm.random(-1, 1);
}

const node = SVG.svg({width, height}, [
  SVG.circle({
    cx: () => state.clampedX,
    cy: () => state.clampedY,
    fill: () => state.color,
    r: 20,
    onmouseenter: () => (state.isHovering = true),
    onmouseleave: () => (state.isHovering = false),
  }),
]);

document.body.append(node);
```

## A Collection of Tools

Charming provides a set of modular tools that you can use together or independently. For example,

- [Charming DOM](/charming-dom) - Creating SVG and HTML with pure function calls.
- [Charming Flow](/charming-flow) - Applying dynmics to static SVG and HTML.
- [Charming Vector](/charming-vector) - Manipulating Euclidean vector.
- ...

## Built on and learn with D3

Charming is built with D3 and integrates seamlessly with it. It simplifies D3's complexity, making it more accessible and easier to learn.
