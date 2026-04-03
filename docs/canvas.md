# Charming Canvas

**Charming Canvas** wraps common 2D canvas setup and drawing so you spend less time on boilerplate. The helpers return or use a standard **`CanvasRenderingContext2D`**—nothing is hidden, so you can mix Charming calls with any native 2D API.

Setting up a sharp canvas on a high-DPI screen is verbose by hand:

```js
const width = 100;
const height = 100;
const dpr = window.devicePixelRatio;
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
context.scale(dpr, dpr);

context.beginPath();
context.moveTo(10, 10);
context.lineTo(width - 10, height - 10);
context.stroke();
```

With Charming, creation and a line look like this:

```js
const context = cm.context2d({width: 100, height: 100});
cm.strokeLine(context, 10, 10, 90, 90);
```

You still set `strokeStyle`, `fillStyle`, `lineWidth`, and so on on the same context:

```js
const context = cm.context2d({width: 100, height: 100});
context.strokeStyle = "black";
context.lineWidth = 2;
context.strokeRect(10, 10, 80, 80);
cm.strokeLine(context, 10, 10, 90, 90);
```

## _cm_.context2d(_options_) {#cm-context2d}

Returns a **pixel-aligned** 2D context: the canvas backing store is sized to `width * dpr` by `height * dpr`, CSS size uses `width` and `height`, and the context is scaled so you draw in CSS pixels.

Options:

- **width** — CSS width of the canvas (default `300`).
- **height** — CSS height (default `150`).
- **dpr** — device pixel ratio (default `window.devicePixelRatio`).
- **container** — If set, the canvas is appended: a string is treated as a `querySelector` selector; a node is used as the parent. If omitted, append `context.canvas` yourself.

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

## _cm_.cssFont(_options_) {#cm-css-font}

Returns a **CSS `font` shorthand** string suitable for `CanvasRenderingContext2D#font`, DOM `element.style.font`, or libraries that accept a font string (for example D3’s `.style("font", …)`).

Options (all optional):

- **fontStyle** — default `"normal"`.
- **fontVariant** — default `"normal"`.
- **fontWeight** — default `"normal"`.
- **fontSize** — default `10`; may be a number (interpreted as pixels) or a string with units, e.g. `"1.2rem"`.
- **fontFamily** — default `"sans-serif"`.

Extra keys on the options object are ignored. The result has normalized spacing.

```js eval code=false
(() => {
  const context = cm.context2d({width: 220, height: 56});
  context.fillStyle = "orange";
  context.fillRect(0, 0, 220, 56);
  context.fillStyle = "#222";
  context.font = cm.cssFont({fontSize: 22, fontFamily: "Georgia, serif"});
  context.textBaseline = "middle";
  context.fillText("Hello Canvas!", 12, 28);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 220, height: 56});
context.font = cm.cssFont({
  fontStyle: "italic",
  fontWeight: "700",
  fontSize: 18,
  fontFamily: "system-ui, sans-serif",
});
context.fillText("Hello Canvas!", 10, 30);
```

## _cm_.strokeLine(_context_, _x1_, _y1_, _x2_, _y2_) {#cm-stroke-line}

Strokes from (_x1_, _y1_) to (_x2_, _y2_) using the current stroke style and line width.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.strokeStyle = "black";
  context.lineWidth = 2;
  cm.strokeLine(context, 10, 10, 90, 90);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.strokeStyle = "black";
context.lineWidth = 2;
cm.strokeLine(context, 10, 10, 90, 90);
```

## _cm_.fillCircle(_context_, _cx_, _cy_, _r_) {#cm-fill-circle}

Fills a circle at (_cx_, _cy_) with radius _r_ using the current fill style.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.fillStyle = "steelblue";
  cm.fillCircle(context, 50, 50, 35);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.fillStyle = "steelblue";
cm.fillCircle(context, 50, 50, 35);
```

## _cm_.strokeCircle(_context_, _cx_, _cy_, _r_) {#cm-stroke-circle}

Strokes a circle at (_cx_, _cy_) with radius _r_ using the current stroke style and line width.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.strokeStyle = "teal";
  context.lineWidth = 3;
  cm.strokeCircle(context, 50, 50, 35);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.strokeStyle = "teal";
context.lineWidth = 3;
cm.strokeCircle(context, 50, 50, 35);
```

## _cm_.strokeEllipse(_context_, _cx_, _cy_, _rx_, _ry_) {#cm-stroke-ellipse}

Strokes an axis-aligned ellipse at (_cx_, _cy_) with radii _rx_ and _ry_.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.strokeStyle = "purple";
  context.lineWidth = 2;
  cm.strokeEllipse(context, 50, 50, 40, 25);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.strokeStyle = "purple";
context.lineWidth = 2;
cm.strokeEllipse(context, 50, 50, 40, 25);
```

## _cm_.fillEllipse(_context_, _cx_, _cy_, _rx_, _ry_) {#cm-fill-ellipse}

Fills an axis-aligned ellipse at (_cx_, _cy_) with radii _rx_ and _ry_.

```js eval code=false
(() => {
  const context = cm.context2d({width: 100, height: 100});
  context.fillStyle = "coral";
  cm.fillEllipse(context, 50, 50, 42, 28);
  return context.canvas;
})();
```

```js
const context = cm.context2d({width: 100, height: 100});
context.fillStyle = "coral";
cm.fillEllipse(context, 50, 50, 42, 28);
```
