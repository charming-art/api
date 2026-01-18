# Why Charming?

SVG and Canvas are two powerful technologies for creating rich visual content in web applications. However, it's not easy to working with native SVG and Canvas APIs. For SVG, you must always specify the namespace:

```js
const ns = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(ns, "svg");
svg.setAttribute("viewBox", "0 0 200 100");
svg.setAttribute("width", "300");
svg.setAttribute("height", "150");
```

For Canvas, you need to handle *devicePixelRatio* to ensure crisp rendering across different display densities:

```js
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300 * devicePixelRatio;
canvas.height = 150 * devicePixelRatio;
canvas.style.width = 300 + "px";
canvas.style.height = 150 + "px";
ctx.scale(devicePixelRatio, devicePixelRatio);
```

While numerous tools exist in the ecosystem to simplify these workflows, they often introduce additional abstractions and features that can increase complexity and reduce flexibility.

For those who want to access Canvas and SVG directly without writing too much boilerplate code, introducing Charming:

```js
const svg = cm.svg("svg", {width: 300, height: 150, viewBox: "0 0 200 100"});
const ctx = cm.context2d({width: 300, height: 150});
```

That's it!

Oh, one more thing. Since most SVG creations are data-driven, Charming also has a declarative API to facilitate this process inspired by some existing visualization systems like [AntV G2](https://g2.antv.antgroup.com/), [Observable Plot](https://observablehq.com/plot/) and [D3](https://d3js.org/).

```js eval code=false
(() => {
  function circles(x, y, r, data = []) {
    if (r < 16) return;
    data.push({x, y, r});
    circles(x - r / 2, y, r * 0.5, data);
    circles(x + r / 2, y, r * 0.5, data);
    circles(x, y - r / 2, r * 0.5, data);
    circles(x, y + r / 2, r * 0.5, data);
    return data;
  }

  const svg = cm.svg("svg", {
    width: 480,
    height: 480,
    children: [
      cm.svg("circle", {
        data: circles(240, 240, 200),
        cx: ({d}) => d.x,
        cy: ({d}) => d.y,
        r: ({d}) => d.r,
        stroke: "black",
        fill: "transparent",
      }),
    ],
  });

  return svg;
})();
```

```js
function circles(x, y, r, data = []) {
  if (r < 16) return;
  data.push({x, y, r});
  circles(x - r / 2, y, r * 0.5, data);
  circles(x + r / 2, y, r * 0.5, data);
  circles(x, y - r / 2, r * 0.5, data);
  circles(x, y + r / 2, r * 0.5, data);
  return data;
}

const svg = cm.svg("svg", {
  width: 480,
  height: 480,
  children: [
    cm.svg("circle", {
      data: circles(240, 240, 200),
      cx: ({d}) => d.x,
      cy: ({d}) => d.y,
      r: ({d}) => d.r,
      stroke: "black",
      fill: "transparent",
    }),
  ],
});

document.body.appendChild(svg);
```
