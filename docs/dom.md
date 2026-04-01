# Charming DOM

**Charming DOM** helps you create and manipulate DOM elements. Its focus is data-driven tagged template literals for HTML and SVG, so data, markup and mapping stay clearly connected in one place.

```js
const svg = cm.svg`<svg ${{width: 200, height: 100}}>
  <circle ${{
    data: circles,
    cx: (d) => d.x,
    cy: (d) => d.y,
    r: (d) => d.r,
  }}/>
</svg>`;
```

The style is inspired by [D3.js](https://d3js.org/). D3.js excels at dynamic, data-driven DOM updates with a rich API; Charming is aimed at static, data-driven markup with a lighter template syntax. It works well for small UIs, static visualizations and generative art.

## Creating Elements

Charming DOM provides two tagged template literals for creating HTML and SVG elements: `cm.html` and `cm.svg`.

```js
cm.html`<h1>Hello, Charming!</h1>`;
```

If multiple top-level nodes are given, the nodes are implicitly wrapped in a [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).

```js
cm.html`
  <h1>Hello A</h1>
  <h1>Hello B</h1>
  <h1>Hello C</h1>
`;
```

## Setting Attributes

You can set attributes (or styles, event listeners) by interpolating an object in place of attributes.

```js
cm.html`<h1 ${{id: "title", className: "heading1"}}></h1>`;
```

Kebab-case attributes are typically specified in snake_case:

```js
cm.html`<button ${{aria_label: "Close", aria_expanded: "false"}}></button>`;
```

But you can also specify them in kebab-case if you prefer:

```js
cm.html`<button ${{"aria-label": "Close", "aria-expanded": "false"}}></button>`;
```

Styles are typically specified with prefix "style\_" or "style\-":

```js
cm.html`<div ${{
  style_background: "steelblue",
  style_width: "100px",
  style_height: "100px",
}}></div>`;
```

Equivalent to:

```js
cm.html`<div ${{
  "style-background": "steelblue",
  "style-width": "100px",
  "style-height": "100px",
}}></div>`;
```

If an attribute starts with "on", it is treated as an event listener.

```js
cm.html`<button ${{onclick: () => alert("Hello, Charming!")}}>Click me!</button>`;
```

The event object and the node are passed as the first and second arguments to the listener.

```js
cm.html`<span ${{
  onmouseover: (event, node) => (node.style.background = "yellow"),
  onmousedown: (event, node) => (node.style.background = "red"),
  onmouseup: (event, node) => (node.style.background = "yellow"),
  onmouseout: (event, node) => (node.style.background = ""),
}}>
  hover me!
</span>`;
```

## Appending Nodes

If an interpolated data value is a node, it is inserted into the result at the corresponding location.

```js
const svg = cm.svg`<svg></svg>`;

cm.html`<div>${svg}</div>`;
```

You can interpolate multiple nodes at once by using an array:

```js
cm.html`<ul>${[
  cm.html`<li>Item 1</li>`, // <li>Item 1</li>
  cm.html`<li>Item 2</li>`, // <li>Item 2</li>
  cm.html`<li>Item 3</li>`, // <li>Item 3</li>
]}</ul>`;
```

Falsy nodes and nested arrays will be filtered out.

```js
cm.html`<ul>${[
  [null, 0, false], // Falsy node
  [cm.html`<li>Item 1</li>`, cm.html`<li>Item 2</li>`],
]}</ul>`;
```

## Binding Data

If a data attribute is specified, the data is mapped to a list of nodes and appended to the parent node. For other attributes, if the value is a constant, all the nodes are given the same attribute value; otherwise, if the value is a function, it is evaluated for each node, in order, being passed the current datum (_d_), the current index (_i_), the current data (_data_), and the current node (_node_) as positional parameters. The function's return value is then used to set each node's attribute.

```js
const items = ["red", "green", "blue"];

cm.svg`<svg>
  <circle ${{
    data: items,
    r: 10, // constant value
    fill: (d) => d, // function value
    cx: (d, i) => i * 100,
    cy: 50,
  }}/>
</svg>`;
```

This is equivalent to the following but with a more concise structure:

```js
const items = ["red", "green", "blue"];

const svg = cm.svg`<svg>${items.map(
  (d, i) =>
    cm.svg`<circle ${{
      r: 10,
      fill: d,
      cx: i * 100,
      cy: 50,
    }}/>`,
)}</svg>`;
```

The child node can also access its ancestor's data by function attributes.

```js
const items = ["red", "green", "blue"];

cm.svg`<svg>
  <g ${{
    data: items,
    transform: (d, i) => `translate(0, ${i * 100})`,
  }}>
    <circle ${{
      r: 10,
      fill: (d) => d, // Accessing item data.
    }}/>
  </g>
</svg>`;
```

Furthermore, the child node can also be a function, which is evaluated for each child node with the same positional parameters as the parent node.

```js
const items = ["red", "green", "blue"];

cm.svg`<svg>
  <g ${{
    data: items,
    transform: (d, i) => `translate(0, ${i * 100})`,
  }}>
    ${(d, i) => cm.svg`<circle ${{r: 10, fill: d}}/>`}
  </g>
</svg>`;
```

If the child data is also a function, it is evaluated for each child node with the same positional parameters as the parent node. The function's return value is then used to set the child node's data. This is useful for rendering nested data, such as a table of data.

```js
const table = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

cm.html`<table>
  <tbody>
    <tr ${{data: table}}>
      <td ${{data: (d) => d}}>
       ${(d) => d}
      </td>
    </tr>
  </tbody>
</table>`;
```

If data is specified and an attribute starts with "on", it adds a _listener_ for that event. When the event fires, the _listener_ receives the current event (**e**), the current node (**node**), the current datum (**d**), the index (**i**), and the data array (**array**).

For all events, the listener receives _(event, node, d, i, array)_. For non-data-driven elements, `d`, `i`, and `array` will be `undefined`.

```js
const items = ["red", "green", "blue"];

cm.svg`<svg>
  <circle ${{
    data: items,
    r: 10,
    fill: (d) => d,
    onclick: (event, node, d, i) => {
      alert(`Item ${i} is ${d}`);
    },
  }}/>
</svg>`;
```

## _cm_.html\`\<markup\>\` {#cm-html}

Renders the specified markup as an HTML element and returns it. For more details, please refer to [Creating Elements](#creating-elements).

```js
const html = cm.html`<h1>Hello, Charming!</h1>`;
```

## _cm_.svg\`\<markup\>\` {#cm-svg}

Renders the specified markup as an SVG element and returns it. For more details, please refer to [Creating Elements](#creating-elements).

```js
const svg = cm.svg`<svg ${{width: 100, height: 100}}></svg>`;
```

## _cm_.attr(_node_, _key_[, _value_]) {#cm-attr}

If _value_ is not specified, gets the current value of the specified key of the specified node attributes.

```js
const div = cm.html`<div ${{id: "title", style_background: "red"}}></div>`;

cm.attr(div, "id"); // "title"
cm.attr(div, "style-background"); // "red"
```

If _value_ is specified, sets the specified _attribute_ with the specified _value_ to the specified _node_.

```js
const svg = cm.svg`<svg></svg>`;

// Set attributes
cm.attr(svg, "width", 100);
cm.attr(svg, "height", 100);

// Set styles
cm.attr(svg, "style-background", "steelblue");
cm.attr(svg, "style-cursor", "pointer");

// Set event listeners
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
const svg = cm.svg`<svg></svg>`;
cm.attr(svg, "onclick", () => alert("hello charming"));
cm.attr(svg, "onclick", null); // Remove the event listener
```
