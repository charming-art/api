# Charming DOM

Create SVG and HTML elements using pure function calls.

## _cm_.**svg** {#svg}

A tagged template literal for building SVG with specified attributes and children.

Create an element without attributes:

```js
cm.svg`<svg></svg>`;
```

Specify attributes as an object:

```js eval
cm.svg`<svg ${{width: 100, height: 100, style: "background:black"}}></svg>`;
```

Specify multiple attribute objects:

```js eval
cm.svg`<svg 
  ${{width: 100, style: "background:black"}} 
  ${{height: 100, style: "background:steelblue"}}
></svg>`;
```

Pass an array of elements as children:

```js eval
// Add a circle SVG element as child
cm.svg`<svg ${{width: 100, height: 100, style: "background:black"}}>
  <circle ${{cx: 50, cy: 50, r: 40, fill: "white"}} />
</svg>`;
```

Without attributes, specify child elements as an array:

```js eval
// Without specify attributes
cm.svg`<svg>
  <circle ${{cx: "50%", cy: "50%", r: 40, fill: "black"}} />
</svg>`;
```

Here's how to render a list of elements:

```js eval
cm.svg`<svg>${[50, 100, 150, 200, 250].map(
  (cx) =>
    cm.svg`<circle ${{
      cx,
      cy: "50%",
      r: 20,
      fill: "black",
    }}/>`,
)}
</svg>`;
```

## _cm_.**html**

Similar to [cm.svg](#svg), but creates HTML elements instead of SVG elements.
