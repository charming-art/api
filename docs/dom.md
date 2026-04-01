# Charming DOM

**Charming DOM** provides a set of functions to create and manipulate DOM elements. The core feature of this module is data-driven, tagged template literal for HTML and SVG elements, which make the relationship between data and DOM elements more explicit and easier to understand.

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

The syntax is inspired by [D3.js](https://d3js.org/). The major difference is that D3.js is excels at describing dynamical data-driven DOM elements with a more fancy API, while Charming is good at describing static data-driven DOM elements with a intuitive syntax. So if you're creating a static visualization of generative art, feel free to use Charming.

## Creating Elements

Charming DOM provides two tagged template literal for creating HTML and SVG elements: `cm.html` and `cm.svg`.

```js
cm.html`<h1>Hello, Charming!</h1>`;
```

If multiple top-level nodes are given, the nodes are implicitly wrapped in a [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).

## Setting Attributes

You can set attributes (or styles, event listeners) by interpolating an object in place of attributes.

```js
cm.html`<h1 ${{id: "title", className: "heading1"}}></h1>`;
```

Kebab-case attributes are typically specified in snake_case:

```js
cm.html`<button ${{aria_label="Close", aria_expanded="false"}}></button>`;
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
html`<span${{
  onmouseover: (event, node) => (node.style.background = "yellow"),
  onmousedown: (event, node) => (node.style.background = "red"),
  onmouseup: (event, node) => (node.style.background = "yellow"),
  onmouseout: (event, node) => (node.style.background = ""),
}}>
  hover me
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
    cx: (d) => i * 100,
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
    // A function child
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

If a data is specified and an attribute starts with "on", adds a _listener_ to the created element for the specified event _typename_. When a specified event is dispatched on the created element, the specified _listener_ will be evaluated for the element, being passed the the current event(or **e**), the current node(or **node**), the current data(or **d**), the current index(or **i**), and the current data array(or **array**).

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

## _cm_.html {#cm-html}

Renders the specified markup as an HTML element and returns it. For more details, please refer to [Creating Elements](#creating-elements).

```js
const html = cm.html`<h1>Hello, Charming!</h1>`;
```

## _cm_.svg {#cm-svg}

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
const svg = cm.svg`<svg></svg`;

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
