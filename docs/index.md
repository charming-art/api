# Charming

Charming is a free, open-source, lightweight JavaScript library for creative coding. It offers a focused set of APIs for manipulating SVG, Canvas, and HTML in a data-driven style, and is designed to integrate seamlessly with other libraries such as [D3](https://d3js.org/) and [p5](https://p5js.org/).

![examples](/examples.png)

## Why Charming?

SVG and Canvas are two powerful technologies for creating rich visual content in web applications. However, it's not easy to working with native SVG and Canvas APIs. For SVG, you must always specify the namespace:

```js
const svg = document.createElementNS(ns, "svg");
svg.setAttribute("viewBox", "0 0 200 100");
svg.setAttribute("width", "300");
svg.setAttribute("height", "150");
```

For Canvas, you need to handle *devicePixelRatio* to ensure crisp rendering across different display densities:

```js
const ns = "http://www.w3.org/2000/svg";
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
        cx: (d) => d.x,
        cy: (d) => d.y,
        r: (d) => d.r,
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
      cx: (d) => d.x,
      cy: (d) => d.y,
      r: (d) => d.r,
      stroke: "black",
      fill: "transparent",
    }),
  ],
});

document.body.appendChild(svg);
```

## Get Started

Charming is typically installed via a package manager such as Yarn or NPM.

::: code-group

```sh [npm]
$ npm add -S charmingjs
```

```sh [pnpm]
$ pnpm add -S charmingjs
```

```sh [yarn]
$ yarn add -S charmingjs
```

```sh [bun]
$ bun add -S charmingjs
```

:::

Charming can then be imported as a namespace:

```js
import * as cm from "charmingjs";
```

In vanilla HTML, Charming can be imported as an ES module, say from jsDelivr:

```html
<script type="module">
  import * as cm from "https://cdn.jsdelivr.net/npm/charmingjs/+esm";

  const svg = cm.svg("svg");
  document.body.append(svg);
</script>
```

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/charmingjs"></script>
<script>
  const svg = cm.svg("svg");
  document.body.append(svg);
</script>
```

## API Reference

- [_cm_.**svg**](#cm-svg) - creates an SVG element.
- [_cm_.**html**](#cm-html) - creates an HTML element.
- [_cm_.**tag**](/docs/api-index#cm-tag) - creates a new element factory.
- [_cm_.**context2d**](#cm-context2d) - creates a 2D Canvas drawing context.
- [_cm_.**attr**](#cm-attr) - sets or gets attributes for HTML or SVG elements.

### _cm_.svg(_tag[, options]_) {#cm-svg}

Creates an SVG element with the specified _tag_. If the _tag_ is not specified, returns null.

```js eval
cm.svg();
```

#### Applying Attributes

If _options_ is specified, applies the specified attributes to the created SVG element. For kebab-case attributes, specifying them in snake_case is also valid. For styles, specifying them with prefix "style\_" or "style\-".

```js eval
cm.svg("svg", {
  width: 200,
  height: 100,
  viewBox: "0 0 200 100",
  // kebab-case attributes
  "stroke-width": 10,
  stroke_width: 10,
  // styles
  "style-background": "steelblue",
  style_background: "steelblue",
});
```

For the text content of SVG elements, specifying it as _textContent_:

```js eval code=false
(() => {
  return cm.svg("svg", {
    height: 30,
    children: [
      cm.svg("text", {
        dy: "1em",
        textContent: "Hello Charming!",
        fill: "steelblue",
      }),
    ],
  });
})();
```

```js
cm.svg("text", {
  dy: "1em",
  textContent: "Hello Charming!",
  fill: "steelblue",
});
```

If _options.data_ is specified, maps the data to a list of SVG elements and wraps them with a fragment element. If an attribute _value_ is a constant, all the elements are given the same attribute value; otherwise, if an attribute _value_ is a function, it is evaluated for each created element, in order, being passed the current datum (_d_), the current index (_i_), and the current data (_data_). The function’s return value is then used to set each element’s attribute.

```js eval code=false
(() => {
  return cm.svg("svg", {
    width: 200,
    height: 60,
    children: [
      cm.svg("circle", {
        data: [20, 70, 120],
        r: 20,
        cy: 30,
        cx: (d) => d,
        fill: (_, i, data) => `rgb(${i * 100}, ${i * 100}, ${i * 100})`,
      }),
    ],
  });
})();
```

```js
cm.svg("circle", {
  data: [50, 100, 150],
  r: 20,
  cy: 30,
  cx: (d) => d,
  fill: (_, i, data) => {
    const b = i * 100;
    return `rgb(${b}, ${b}, ${b})`;
  },
});
```

#### Appending Nodes

If _options.children_ is specified as an array of SVG elements, appends the elements to this SVG element. Falsy elements will be filtered out. Nested arrays will be flattened before appending.

```js eval
cm.svg("svg", {
  width: 100,
  height: 60,
  children: [
    cm.svg("circle", {r: 20, cy: 30, cx: 20}),
    [cm.svg("rect", {width: 40, height: 40, y: 10, x: 50})], // Nested array,
    null, // Falsy node
    false, // Falsy node
  ],
});
```

If a _child_ is a string, a text node will be created and appended to the parent node:

```js eval code=false
(() => {
  return cm.svg("svg", {
    height: 30,
    children: [
      cm.svg("g", {
        transform: `translate(0, 20)`,
        fill: "steelblue",
        children: [cm.svg("text", ["Hello Charming!"])],
      }),
    ],
  });
})();
```

```js
cm.svg("g", {
  fill: "steelblue",
  children: [cm.svg("text", ["Hello Charming!"])],
});
```

If _options_ is specified as an array, it's a convenient shorthand for _{children: options}_:

```js
cm.svg("svg", [cm.svg("circle"), cm.svg("rect")]);
```

If _options.data_ is specified, for each _child_ in _options.children_, if it is a function, it is evaluated for each created element, in order, being passed the current datum (_d_), the current index (_i_), and the current data (_data_). The function’s return value is then appended to the created element.

```js eval code=false
(() => {
  const g = cm.svg("g", {
    data: [0, 1, 2],
    transform: (d) => `translate(${(d + 1) * 50}, 0)`,
    children: [
      (d, i, data) => {
        const a = i * 100;
        return cm.svg("circle", {
          r: 20,
          cy: 30,
          fill: `rgb(${a}, ${a}, ${a})`,
        });
      },
    ],
  });
  return cm.svg("svg", {width: 200, height: 60, children: [g]});
})();
```

```js
cm.svg("g", {
  data: [0, 1, 2],
  transform: (d) => `translate(${(d + 1) * 50}, 0)`,
  children: [
    (d, i, data) => {
      const a = i * 100;
      return cm.svg("circle", {
        r: 20,
        cy: 30,
        fill: `rgb(${a}, ${a}, ${a})`,
      });
    },
  ],
});
```

If the _child_ is a constant and the _childOptions.data_ is specified, creates a list of child elements using the parent _options.data_ and appends each child to each parent element.

```js eval code=false
(() => {
  const g = cm.svg("g", {
    data: [0, 1, 2],
    transform: (d) => `translate(${d * 50 + 30}, 0)`,
    children: [
      cm.svg("circle", {
        r: 20,
        cy: 30,
        fill: (d, i, data) => {
          const a = i * 100;
          return `rgb(${a}, ${a}, ${a})`;
        },
      }),
    ],
  });
  return cm.svg("svg", {width: 200, height: 60, children: [g]});
})();
```

```js
cm.svg("g", {
  data: [0, 1, 2],
  transform: (d) => `translate(${d * 50 + 30}, 0)`,
  children: [
    cm.svg("circle", {
      r: 20,
      cy: 30,
      fill: (d, i, data) => {
        const a = i * 100;
        return `rgb(${a}, ${a}, ${a})`;
      },
    }),
  ],
});
```

If the _child_ is a constant and the _childOptions.data_ is specified as a constant, for each parent element, appends a list of child elements using the specified _childOptions.data_.

```js eval code=false
(() => {
  const g = cm.svg("g", {
    data: [0, 1],
    transform: (d) => `translate(30, ${d * 50})`,
    children: [
      cm.svg("circle", {
        data: [0, 1, 2],
        r: 20,
        cy: 30,
        cx: (d) => d * 50,
        fill: (d, i, data) => {
          const a = i * 100;
          return `rgb(${a}, ${a}, ${a})`;
        },
      }),
    ],
  });
  return cm.svg("svg", {width: 180, height: 110, children: [g]});
})();
```

```js
cm.svg("g", {
  data: [0, 1],
  transform: (d) => `translate(30, ${d * 50})`,
  children: [
    cm.svg("circle", {
      data: [0, 1, 2],
      r: 20,
      cy: 30,
      cx: (d) => d * 50,
      fill: (d, i, data) => {
        const a = i * 100;
        return `rgb(${a}, ${a}, ${a})`;
      },
    }),
  ],
});
```

If the _child_ is a constant and the _childOptions.data_ is specified as a function, it is evaluated for each parent element, in order, being passed the current datum (_d_), the current index (_i_), and the current data (_data_). The function’s return value is then used to create a list of child elements and append to the current parent element.

```js eval code=false
(() => {
  const g = cm.svg("g", {
    data: [
      [0, 1, 2],
      [3, 4, 5],
    ],
    transform: (d, i) => `translate(30, ${i * 50})`,
    children: [
      cm.svg("circle", {
        data: (row) => row,
        r: 20,
        cy: 30,
        cx: (d, i) => i * 50,
        fill: (d, i, data) => {
          const a = d * 40;
          return `rgb(${a}, ${a}, ${a})`;
        },
      }),
    ],
  });
  return cm.svg("svg", {width: 180, height: 110, children: [g]});
})();
```

```js
cm.svg("g", {
  data: [
    [0, 1, 2],
    [3, 4, 5],
  ],
  transform: (d, i) => `translate(30, ${i * 50})`,
  children: [
    cm.svg("circle", {
      data: (row) => row,
      r: 20,
      cy: 30,
      cx: (d, i) => i * 50,
      fill: (d, i, data) => {
        const a = d * 40;
        return `rgb(${a}, ${a}, ${a})`;
      },
    }),
  ],
});
```

#### Handling Events

If an attribute starts with "on", adds a _listener_ to the created element for the specified event _typename_. When a specified event is dispatched on the created element, the specified _listener_ will be evaluated for the element, being passed the current event (_event_) and the context (_context_). The _context_ is an object with the following attributes:

- **node**: the current node,
- **d**: the current data, if the _options.data_ is specified,
- **i**: the current index, if the _options.data_ is specified,
- **data**: the current data, if the _options.data_ is specified.

```js eval code=false
(() => {
  const onclick = (event, {node}) => {
    const current = cm.attr(node, "style-background");
    const next = current === "steelblue" ? "orange" : "steelblue";
    cm.attr(node, "style-background", next);
  };

  return cm.svg("svg", {
    onclick,
    width: 100,
    height: 100,
    style_background: "steelblue",
    style_cursor: "pointer",
  });
})();
```

```js
const onclick = (event, {node}) => {
  const current = cm.attr(node, "style-background");
  const next = current === "steelblue" ? "orange" : "steelblue";
  cm.attr(node, "style-background", next);
};

cm.svg("svg", {
  onclick,
  width: 100,
  height: 100,
  style_background: "steelblue",
  style_cursor: "pointer",
});
```

If the attribute _value_ is specified as an array, the first element of it will be specified as the _listener_, while the second element will specify the characteristics about the event listener, such as whether it is capturing or passive; see [_element.addEventListener_](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

```js
cm.svg("svg", {onclick: [onclick, {capture: true}]});
```

### _cm_.html(_tag[, options]_) {#cm-html}

Similar to [_cm.svg_](#cm-svg), but creates HTML elements instead.

```js eval
cm.html("div", {
  style_background: "steelblue",
  style_width: "100px",
  style_height: "100px",
});
```

### _cm_.tag(_namespace_) {#cm-tag}

Creates an element factory with the specified _namespace_. For example, creates a math factory for MathML:

```js eval code=false
(() => {
  const math = cm.tag("http://www.w3.org/1998/Math/MathML");

  return math("math", [
    math("mrow", [
      math("mrow", [math("mi", {textContent: "x"}), math("mo", {textContent: "∗"}), math("mn", {textContent: "2"})]),
      math("mo", {textContent: "+"}),
      math("mi", {textContent: "y"}),
    ]),
  ]);
})();
```

```js
const math = cm.tag("http://www.w3.org/1998/Math/MathML");

const node = math("math", [
  math("mrow", [
    math("mrow", [
      // equivalent to math("mi", ["x"])
      math("mi", {textContent: "x"}),
      math("mo", {textContent: "∗"}),
      math("mn", {textContent: "2"}),
    ]),
    math("mo", {textContent: "+"}),
    math("mi", {textContent: "y"}),
  ]),
]);
```

### _cm_.context2d(_options_) {#cm-context2d}

Creates a pixel-perfect 2D Canvas drawing context with the specified options. The following options are supported:

- **width**: the width for the Canvas element, required.
- **height**: the height for the Canvas element, required.
- **dpr**: the _devicePixelRatio_, defaults to `window.devicePixelRatio`.
- **container**: the parent node of the Canvas element. If it is not specified, the Canvas doesn't append to the document. If a string is specified, use it as a selector to query the parent element and append the Canvas to it. If an HTML node is specified, append the node directly.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.fillRect(0, 0, 100, 100);
  context.fillStyle = "white";
  context.beginPath();
  context.arc(50, 50, 25, 0, Math.PI * 2);
  context.fill();
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.fillRect(0, 0, 100, 100);
context.fillStyle = "white";
context.beginPath();
context.arc(50, 50, 25, 0, Math.PI * 2);
context.fill();
```

### _cm_.attr(_node_, _key_[, _value_]) {#cm-attr}

If the _value_ is not specified, gets the current value of the specified key of the specified node attributes.

```js eval inspector=false
const svg = cm.svg("svg", {
  height: 100,
  style_background: "red",
});
```

```js eval
svg.getAttribute("height");
```

```js eval
cm.attr(svg, "style_background");
```

If the _value_ is specified, sets the specified _attribute_ with the specified _value_ to the specified _node_.

```js eval code=false
(() => {
  const svg = cm.svg("svg");
  cm.attr(svg, "width", 100);
  cm.attr(svg, "height", 100);
  cm.attr(svg, "style-background", "steelblue");
  cm.attr(svg, "style-cursor", "pointer");
  cm.attr(svg, "onclick", (event, {node}) => {
    const current = cm.attr(node, "style-background");
    const next = current === "steelblue" ? "orange" : "steelblue";
    cm.attr(node, "style-background", next);
  });
  return svg;
})();
```

```js
const svg = cm.svg("svg");
cm.attr(svg, "width", 100);
cm.attr(svg, "height", 100);
cm.attr(svg, "style-background", "steelblue");
cm.attr(svg, "style-cursor", "pointer");
cm.attr(svg, "onclick", (event, {node}) => {
  const current = cm.attr(node, "style-background");
  const next = current === "steelblue" ? "orange" : "steelblue";
  cm.attr(node, "style-background", next);
});
```

If an event listener is specified as _null_, removes that event listener. Otherwise, removes the older one if exists and adds the new one.

```js
const svg = cm.svg("svg");
cm.attr(svg, "onclick", () => alert("hello charming"));
cm.attr(svg, "onclick", null);
```
