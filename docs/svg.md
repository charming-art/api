# Charming SVG

## _cm_.svg(_tag[, options]_) {#cm-svg}

Creates an SVG element with the specified _tag_. If the _tag_ is not specified, returns null.

```js eval
cm.svg();
```

### Applying Attributes

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

If _options.data_ is specified, maps the data to a list of SVG elements and wraps them with a fragment element. If an attribute _value_ is a constant, all the elements are given the same attribute value; otherwise, if an attribute _value_ is a function, it is evaluated for each created element, in order, being passed the current datum (_d_), the current index (_i_), the current data (_data_), and the current node (_node_) as positional parameters. The function's return value is then used to set each element's attribute.

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
        fill: (d, i) => `rgb(${i * 100}, ${i * 100}, ${i * 100})`,
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
  fill: (d, i) => {
    const b = i * 100;
    return `rgb(${b}, ${b}, ${b})`;
  },
});
```

### Appending Nodes

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

If _options.data_ is specified, for each _child_ in _options.children_, if it is a function, it is evaluated for each created element, in order, being passed the current datum (_d_), the current index (_i_), the current data (_data_), and the current node (_node_) as positional parameters. The function's return value is then appended to the created element.

```js eval code=false
(() => {
  const g = cm.svg("g", {
    data: [0, 1, 2],
    transform: (d) => `translate(${d * 50 + 30}, 0)`,
    children: [
      (d, i) => {
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
    (d, i) => {
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
        fill: (d, i) => {
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
      fill: (d, i) => {
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
        fill: (d, i) => {
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
      fill: (d, i) => {
        const a = i * 100;
        return `rgb(${a}, ${a}, ${a})`;
      },
    }),
  ],
});
```

If the _child_ is a constant and the _childOptions.data_ is specified as a function, it is evaluated for each parent element, in order, being passed the current datum (_d_), the current index (_i_), the current data (_data_), and the current node (_node_) as positional parameters. The function's return value is then used to create a list of child elements and append to the current parent element.

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
        data: (d) => d,
        r: 20,
        cy: 30,
        cx: (d, i) => i * 50,
        fill: (d, i) => {
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
      data: (d) => d,
      r: 20,
      cy: 30,
      cx: (d, i) => i * 50,
      fill: (d, i) => {
        const a = d * 40;
        return `rgb(${a}, ${a}, ${a})`;
      },
    }),
  ],
});
```

### Handling Events

If an attribute starts with "on", adds a _listener_ to the created element for the specified event _typename_. When a specified event is dispatched on the created element, the specified _listener_ will be evaluated for the element, being passed the following positional parameters:

- **event** (or **e**): the current event,
- **node**: the current node,
- **d**: the current data (if the _options.data_ is specified, otherwise `undefined`),
- **i**: the current index (if the _options.data_ is specified, otherwise `undefined`),
- **array**: the current data array (if the _options.data_ is specified, otherwise `undefined`).

For all events, the listener receives _(event, node, d, i, array)_. For non-data-driven elements, `d`, `i`, and `array` will be `undefined`.

```js eval code=false
(() => {
  const onclick = (event, node) => {
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
const onclick = (event, node) => {
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

## _cm_.html(_tag[, options]_) {#cm-html}

Similar to [_cm.svg_](#cm-svg), but creates HTML elements instead.

```js eval
cm.html("div", {
  style_background: "steelblue",
  style_width: "100px",
  style_height: "100px",
});
```

## _cm_.tag(_namespace_) {#cm-tag}

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

## _cm_.attr(_node_, _key_[, _value_]) {#cm-attr}

If _value_ is not specified, gets the current value of the specified key of the specified node attributes.

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

If _value_ is specified, sets the specified _attribute_ with the specified _value_ to the specified _node_.

```js eval code=false
(() => {
  const svg = cm.svg("svg");
  cm.attr(svg, "width", 100);
  cm.attr(svg, "height", 100);
  cm.attr(svg, "style-background", "steelblue");
  cm.attr(svg, "style-cursor", "pointer");
  cm.attr(svg, "onclick", (event, node) => {
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
cm.attr(svg, "onclick", (event, node) => {
  const current = cm.attr(node, "style-background");
  const next = current === "steelblue" ? "orange" : "steelblue";
  cm.attr(node, "style-background", next);
});
```

If _value_ is specified as null, remove that attribute.

```js
cm.attr(input, "checked", null);
cm.attr(div, "class", null);
cm.attr(div, "style-color", null);
cm.attr(span, "textContent", null);
```

If an event listener is specified as _null_, removes that event listener. Otherwise, removes the older one if exists and adds the new one.

```js
const svg = cm.svg("svg");
cm.attr(svg, "onclick", () => alert("hello charming"));
cm.attr(svg, "onclick", null);
```
