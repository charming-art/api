# Charming Pretext

**Charming Pretext** is a small layer on top of [Pretext](https://github.com/chenglou/pretext) for text-based data visualization and generative art. It exposes an intuitive API for **flowing text inside closed shapes** described by an SVG [`d`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) path. Pure-arithmetic measurement and line breaking keep Charming Pretext fast without DOM layout.

![pretext-map](/pretext/map.png)

## Demos

Live examples run at [pretext.charmingjs.org](https://pretext.charmingjs.org/). The source for those demos lives in the repo under [`demo/pretext`](https://github.com/charming-art/api/tree/main/demo/pretext).

## Computing layout

Use [_cm_.**layoutTextInPath**](#cm-layout-text-in-path) with a string and a **closed** path. It returns `texts` (fragments with positions and angles), `lines` (hachure segments, useful for debugging), and the font fields and `path` you passed in.

```js eval
const layout = cm.layoutTextInPath({
  text: "Hello, Charming Pretext! I love generative art!",
  path: cm.pathCircle(160, 160, 150), // Builds a circle path string.
  fontSize: 12,
  fontFamily: "Inter",
});
```

You then draw `layout.texts` with Canvas or SVG (see below).

## Rendering with Canvas

Each item in `layout.texts` has `text`, `x`, `y`, and `angle` (in degrees). Apply transforms to the context before drawing each fragment.

```js eval code=false
renderPretextWithCanvas(Object.assign({}, layout, {width: 320, height: 320}));
```

```js
const context = cm.context2d({width: 400, height: 300});
context.fillStyle = "#222";
context.font = `${layout.fontSize}px ${layout.fontFamily}`;
context.textAlign = "center";
context.textBaseline = "middle";

for (const t of layout.texts) {
  context.save();
  context.translate(t.x, t.y);
  context.rotate((t.angle * Math.PI) / 180);
  context.fillText(t.text, 0, 0);
  context.restore();
}
```

## Rendering with SVG

With [_cm_.**svg**](/dom#cm-svg), bind `texts` to `<text>` nodes and use `transform` for position and rotation.

```js eval code=false
renderPretext(Object.assign({}, layout, {width: 320, height: 320}));
```

```js
const svg = cm.svg`<svg ${{
  width: 320,
  height: 320,
  viewBox: "0 0 320 320",
}}>
  <text ${{
    data: layout.texts,
    text_anchor: "middle",
    dominant_baseline: "central",
    font_size: `${layout.fontSize}px`,
    font_family: layout.fontFamily,
    transform: (d) => `translate(${d.x}, ${d.y}) rotate(${d.angle})`,
    textContent: (d) => d.text,
  }}/>
</svg>`;
```

## Setting line height

You can set line height by passing **`lineHeight`** into `layoutTextInPath`. The default is `fontSize * 1.5`.

```js eval code=false
renderPretext(
  Object.assign(
    {},
    cm.layoutTextInPath({
      text: "Hello, Charming Pretext! I love generative art!",
      path: cm.pathCircle(160, 160, 150),
      fontSize: 12,
      fontFamily: "Inter",
      lineHeight: 30,
    }),
    {width: 320, height: 320},
  ),
);
```

```js
const layout = cm.layoutTextInPath({
  //...
  lineHeight: 30,
});
```

## Rotating text

You can also change how the fill lines run by passing **`angle`** (degrees) into `layoutTextInPath`. That rotates the hachure direction and gives you more control over how the text follows the shape.

```js eval code=false
renderPretext(
  Object.assign(
    {},
    cm.layoutTextInPath({
      text: "Hello, Charming Pretext! I love generative art!",
      path: cm.pathCircle(160, 160, 150),
      fontSize: 12,
      fontFamily: "Inter",
      angle: 25,
    }),
    {width: 320, height: 320},
  ),
);
```

```js
const layout = cm.layoutTextInPath({
  //...
  angle: 25,
});
```

## Disabling repetition

By default, when the text runs out, the cursor resets and layout continues. Set **`repeat`** to `false` to stop instead of cycling—useful when you have enough text to fill the shape once.

```js eval code=false
renderPretext(
  Object.assign(
    {},
    cm.layoutTextInPath({
      text: "Hello, Charming Pretext! I love generative art!",
      path: cm.pathCircle(160, 160, 150),
      fontSize: 12,
      fontFamily: "Inter",
      repeat: false,
    }),
    {width: 320, height: 320},
  ),
);
```

```js
const layout = cm.layoutTextInPath({
  //...
  repeat: false,
});
```

## Preparing explicitly

By default, `cm.layoutTextInPath` prepares your string from the given font options and memoizes that work by text and font settings. As long as those stay the same, you can call it again with a new `path` (or other options) without remeasuring the string.

If you prefer to avoid that machinery—or you want to reuse one prepared value yourself—call `cm.prepare` explicitly and pass the result as **`prepared`** to `cm.layoutTextInPath`.

```js
const prepared = cm.prepare(longText, {
  fontSize: 14,
  fontFamily: "Inter",
});

const layout = cm.layoutTextInPath({
  text: longText,
  prepared,
  path: cm.pathCircle(200, 200, 150),
});
```

## How it works

First, the path is turned into polylines with [`points-on-path`](https://github.com/subairui/points-on-path). Then [`hachure-fill`](https://github.com/rough-stuff/hachure-fill) generates parallel line segments inside the shape at `lineHeight` spacing, optionally rotated by `angle`. Finally, along each segment, Pretext’s `layoutNextLine` fills the available width with text from the prepared string. If you're interested in the implementation, please read the [source code](https://github.com/charming-art/api/blob/main/src/pretext/index.js) for more information. Suggestions and feedback are welcome!

## _cm_.prepare(_text_, _options_) {#cm-prepare}

Builds a Pretext **prepared** value with the specified options.

- **fontSize** — default `16`.
- **fontFamily** — default `"Inter"`.
- **fontStyle** — default `"normal"`.
- **fontVariant** — default `"normal"`.
- **fontWeight** — default `"normal"`.
- Any extra keys are forwarded to Pretext’s [`prepareWithSegments`](https://github.com/chenglou/pretext).

The return value includes Pretext’s fields plus `fontSize`, `fontFamily`, `fontStyle`, `fontVariant`, and `fontWeight` for convenience.

```js
const prepared = cm.prepare("Measure me", {
  fontSize: 16,
  fontFamily: "Inter",
});
```

## _cm_.layoutTextInPath(_options_) {#cm-layout-text-in-path}

Computes text positions with the specified options.

- **text** — source string (required).
- **path** — closed SVG path `d` (required).
- **fontSize** — default `16` (same as [`prepare`](#cm-prepare)).
- **fontFamily** — default `"Inter"`.
- **fontStyle** — default `"normal"`.
- **fontVariant** — default `"normal"`.
- **fontWeight** — default `"normal"`.
- **prepared** — optional Pretext prepared object from `prepare`.
- **lineHeight** — spacing between lines; default `fontSize * 1.5`.
- **angle** — rotation of lines in degrees; default `0`.
- **repeat** — whether to loop the text to fill the shape; default `true`.

Returns an object with:

- **texts** — array of fragments.
- **lines** — array of segments `[[x1, y1], [x2, y2]]`.
- **path** — the input `d` string.
- **fontSize** — effective font size used for the layout.
- **fontFamily** — effective font family.
- **fontStyle** — effective font style.
- **fontVariant** — effective font variant.
- **fontWeight** — effective font weight.

## _cm_.clearPrepareCache() {#cm-clear-prepare-cache}

Clears Charming’s memoized `prepare` cache and Pretext’s global `clearCache()`. Call it in long-running apps or tests if you need to free memory or reset measurement state.

```js
cm.clearPrepareCache();
```

```js eval code=false inspector=false
function renderPretext({
  texts,
  lines,
  width = 400,
  height = 400,
  fontSize = 16,
  fontFamily = "Inter",
  fontStyle = "normal",
  fontVariant = "normal",
  fontWeight = "normal",
  path,
}) {
  return cm.svg`<svg ${{
    width,
    height,
    viewBox: `0 0 ${width} ${height}`,
    overflow: "visible",
  }}>
    <path ${{
      d: path,
      fill: "none",
      stroke: "black",
      stroke_width: 1,
    }}/>
    <text ${{
      data: texts,
      text_anchor: "middle",
      dominant_baseline: "central",
      font_size: `${fontSize}px`,
      font_family: fontFamily,
      font_style: fontStyle,
      font_variant: fontVariant,
      font_weight: fontWeight,
      transform: (text) => `translate(${text.x}, ${text.y}) rotate(${text.angle})`,
      textContent: (text) => text.text,
    }}/>
  </svg>`;
}
```

```js eval code=false inspector=false
function renderPretextWithCanvas({
  texts,
  lines,
  width = 400,
  height = 400,
  fontSize = 16,
  fontFamily = "Inter",
  fontStyle = "normal",
  fontVariant = "normal",
  fontWeight = "normal",
  path,
}) {
  const context = cm.context2d({width, height});
  context.fillStyle = "#222";
  context.font = `${fontSize}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  context.stroke(new Path2D(path));

  for (const t of texts) {
    context.save();
    context.translate(t.x, t.y);
    context.rotate((t.angle * Math.PI) / 180);
    context.fillText(t.text, 0, 0);
    context.restore();
  }

  return context.canvas;
}
```
