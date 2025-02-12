# Charming DOM

Create SVG and HTML elements using pure function calls.

## _cm_.**SVG.[tagName](_[attributes,] children_)** {#svg}

Creates an SVG element with the specified attributes and child nodes. The _svg_ object is used to create all SVG elements:

```js eval inspector=false
SVG = cm.SVG;
```

Use _svg.tagName_ to create an element:

```js
SVG.svg(); // Create a svg element.
SVG.circle(); // Create a circle element.
SVG.rect(); // Create a rect element.
```

Specify attributes as an object:

```js eval
SVG.svg({width: 100, height: 100, style: "background:black"});
```

Pass an array of elements as children:

```js eval
SVG.svg({width: 100, height: 100, style: "background:black"}, [
  // Add a circle SVG element as child
  SVG.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
]);
```

Without attributes, specify child elements as an array:

```js eval
// Without specify attributes
SVG.svg([SVG.circle({cx: "50%", cy: "50%", r: 40, fill: "black"})]);
```

Here's how to render a list of elements:

```js eval
SVG.svg(
  [50, 100, 150, 200, 250].map((cx) =>
    SVG.circle({
      cx,
      cy: "50%",
      r: 20,
      fill: "black",
    }),
  ),
);
```

## _cm_.**HTML.[tagName](_[attributes,] children_)** {#HTML}

Similar to cm.SVG, but creates HTML elements instead of SVG elements.
