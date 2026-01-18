# Charming Canvas

## _cm_.context2d(_options_) {#cm-context2d}

Creates a pixel-perfect 2D Canvas drawing context with the specified options. The following options are supported:

- **width**: the width for the Canvas element, defaults to 300.
- **height**: the height for the Canvas element, defaults to 150.
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
