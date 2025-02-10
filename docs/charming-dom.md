# Charming DOM

Create SVG and HTML elements using pure function calls.

## _cm_.**svg.[tagName](_[attributes,] children_)** {#svg}

Creates an SVG element with the specified attributes and child nodes. The _svg_ object is used to create all SVG elements:

```js eval inspector=false
svg = cm.svg;
```

Use _svg.tagName_ to create an element:

```js
svg.svg(); // Create a svg element.
svg.circle(); // Create a circle element.
svg.rect(); // Create a rect element.
```

Specify attributes as an object:

```js eval
svg.svg({width: 100, height: 100, style: "background:black"});
```

Pass an array of elements as children:

```js eval
svg.svg({width: 100, height: 100, style: "background:black"}, [
  // Add a circle SVG element as child
  svg.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
]);
```

Without attributes, specify child elements as an array:

```js eval
// Without specify attributes
svg.svg([svg.circle({cx: "50%", cy: "50%", r: 40, fill: "black"})]);
```

Here's how to render a list of elements:

```js eval
svg.svg(
  [50, 100, 150, 200, 250].map((cx) =>
    svg.circle({
      cx,
      cy: "50%",
      r: 20,
      fill: "black",
    }),
  ),
);
```

## _cm_.**html.[tagName](_[attributes,] children_)** {#html}

Similar to cm.svg, but creates HTML elements instead of SVG elements.
