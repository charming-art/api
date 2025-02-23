# What is Charming?

**Charming** (or **Charming.js**) is a free, open-source JavaScript library that creates animated and interactive SVG. Charming lets you create dynamic and expressive generative art and visualizations effortlessly. Here's a quick example that give you a sense of Charming:

```js eval t=module
const app = cm.render({
  width: 200,
  height: 50,
  loop: true,
  draw: () => [
    SVG.circle({
      cx: Math.abs(Math.sin(Date.now() / 1000) * 200),
      cy: 25,
      r: 20,
      stroke: "red",
      strokeWidth: 4,
    }),
  ],
});

document.body.append(app.node());
```

## Based on SVG

Charming provides a tagged template literal for building SVG with interpolated attributes. For example, to create a white circle on a black background:

```js eval t=module
const app = cm.render({
  width: 100,
  height: 100,
  draw: () => [
    SVG.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
    SVG.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
  ],
});

document.body.append(app.node());
```

Please refer to [Charming Render](/docs/charming-render) for more information.

## Fluid Transition

Charming makes it easier than ever to create fluid transitions. The exported _transition_ decorators lets you apply transitions declaratively to child nodes, whether SVG or HTML. For example, you can create a circle that smoothly change colors and radius over time.

```js eval code=false
play = Inputs.button("Replay");
```

```js eval t=module,replayable
const app = cm.render({
  width: 100,
  height: 100,
  draw: () => [
    SVG.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
    SVG.circle({
      cx: 50,
      cy: 50,
      r: 40,
      fill: "#4B68C9",
      decorators: [
        {
          type: cm.transition,
          keyframes: [
            {attr: {fill: "#E5B442", r: 0}, duration: 1000},
            {attr: {fill: "#EE7A64", r: 40}, duration: 2000},
          ],
        },
      ],
    }),
  ],
});

document.body.append(app.node());
```

## Incremental Updates

Work in progress.

```js eval t=module
const width = 600;
const height = 150;
let x = width / 2;
let y = height / 2;

const app = cm.render({
  width: 600,
  height: 150,
  loop: true,
  draw: () => {
    x += cm.random(-1, 1);
    y += cm.random(-1, 1);
    x = cm.constrain(x, 0, width);
    y = cm.constrain(y, 0, height);
    return [SVG.circle({cx: x, cy: y, fill: "black", r: 20})];
  },
});

document.body.append(app.node());
```

## Reactivity for Interaction

```js eval t=module
const state = cm.state({clicked: false});

const app = cm.render({
  width: 100,
  height: 100,
  styleBackground: "black",
  draw: () => [
    SVG.circle({
      cx: 50,
      cy: 50,
      r: 40,
      fill: state.clicked ? "red" : "white",
      styleCursor: "pointer",
      onClick: () => (state.clicked = !state.clicked),
    }),
  ],
});

document.body.append(app.node());
```

## A Collection of Tools

Charming provides a set of modular tools that you can use together or independently. For example,

- [Charming Render](/docs/charming-render) - Creating SVG and HTML with pure function calls.
- [Charming Vector](/docs/charming-vector) - Manipulating Euclidean vector.
- [Charming Transition](/docs/charming-transition) - Applying transition to elements.
- ...

## Built on and learn with D3

Charming is built with D3 and integrates seamlessly with it. It simplifies D3's complexity, making it more accessible and easier to learn.
