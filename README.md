# Charming: Charm Computing

The data-driven language for creative coding and ASCII art.

## Installing

Charming is typically installed via a package manager such as Yarn or NPM.

```bash
yarn add @charming-art/charming
```

```bash
npm install @charming-art/charming
```

Charming can then imported as a namespace:

```js
import * as cm from "@charming-art/charming";
```

In vanilla HTML, Charming can be imported as an ES module, say from jsDelivr:

```html
<script type="module">
  import * as cm from "https://cdn.jsdelivr.net/npm/@charming-art/charming@0.1/+esm";

  const app = cm.app();

  // ...

  document.body.append(app.render());
</script>
```

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/@charming-art/charming@0.1"></script>
<script>
  const app = cm.app();

  // ...

  document.body.append(app.render());
</script>
```

## Quick Examples

```js
import * as cm from "@charming-art/charming";

const app = cm.app({
  width: 640,
  height: 640,
});

app
  .data(cm.range(240))
  .process(cm.map, (_, i, data) => (i * Math.PI * 2) / data.length)
  .append(cm.circle, {
    x: (t) => Math.cos(t) * Math.cos(t * 3),
    y: (t) => Math.sin(t) * Math.cos(t * 3),
    r: (_, i) => i,
  })
  .transform(cm.mapPosition, { padding: 15 })
  .transform(cm.mapAttrs, {
    r: { range: [1, 15] },
  });

document.body.appendChild(app.render());
```

## API Reference

- [App](#app)
- [Flow](#flow)
- [Renderer](#renderer)
- [Shape](#shape)
- [Transform](#transform)
- [Scale](#scale)
- [Event](#event)
- [Prop](#prop)
- [Color](#color)
- [Array](#array)
- [Math](#math)
- [Constant](#constant)
- [Font](#font)
- [Gradient](#gradient)
- [Helper](#helper)
- [Vector](#vector)

### App

<a name="cm-app" href="#cm-app">#</a> cm.**app**(_[options]_)

<a name="app-data" href="#app-data">#</a> app.**data**(_value_)

<a name="app-datum" href="#app-datum">#</a> app.**datum**(_value_)

<a name="app-append" href="#app-append">#</a> app.**append**(_shape[, options]_)

<a name="app-render" href="#app-render">#</a> app.**render**()

<a name="app-start" href="#app-start">#</a> app.**start**()

<a name="app-stop" href="#app-stop">#</a> app.**stop**()

<a name="app-dispose" href="#app-dispose">#</a> app.**dispose**()

<a name="app-node" href="#app-node">#</a> app.**node**()

<a name="app-prop" href="#app-prop">#</a> app.**prop**(_name_)

<a name="app-on" href="#app-on">#</a> app.**on**(_name, callback_)

<a name="app-call" href="#app-call">#</a> app.**call**(_callback[, arguments…]_)

<a name="app-textBBox" href="#app-textBBox">#</a> app.**textBBox**(_options_)

### Flow

<a name="flow-append" href="#flow-append">#</a> flow.**append**(_shape[, options]_)

<a name="flow-data" href="#flow-data">#</a> flow.**data**(_value_)

<a name="flow-datum" href="#flow-datum">#</a> flow.**datum**(_value_)

<a name="flow-process" href="#flow-process">#</a> flow.**process**(_process, options_)

<a name="flow-transform" href="#flow-transform">#</a> flow.**transform**(_transform, options_)

<a name="flow-call" href="#flow-call">#</a> flow.**call**(_callback[, arguments…]_)

<a name="flow-app" href="#flow-app">#</a> flow.**app**()

### Renderer

<a name="cm-canvas" href="#cm-canvas">#</a> cm.**canvas()**

Constructs a canvas renderer, drawing shapes with [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). It is the default renderer for [app](#cm-app) and there is no need to specify it explicitly.

```js
const app = cm.app({
  height: 200,
  renderer: cm.canvas(), // not necessary
});

app.append(cm.circle, {
  x: 100,
  y: 100,
  r: 50,
  fill: "orange",
});

app.render();
```

<img src="./img/cm-canvas.png" width=640>

<a name="cm-terminal" href="#cm-terminal">#</a> cm.**terminal()**

Returns a promise resolved to a terminal renderer, drawing shapes in a terminal like context.

```js
cm.app({
  renderer: await cm.terminal(),
});
```

Shapes drawn by terminal renders are (typically) not positioned in literal pixels, or colored in literal colors, as in a conventional graphics system. Instead they are positioned in count of terminal's cell and colored by [characters](#cm-cfb).

```js
const app = cm.app({
  mode: "double",
  renderer: await cm.terminal(),
});

app
  .data(cm.range(240, 0, Math.PI * 2))
  .append(cm.group, {
    x: app.prop("width") / 2,
    y: app.prop("height") / 2,
  })
  .append(cm.point, {
    x: (t) => 10 * Math.cos(t) * Math.cos(t * 3),
    y: (t) => 10 * Math.sin(t) * Math.cos(t * 3),
    stroke: cm.cfb(cm.wch("🌟")),
  });

app.render();
```

<img src="./img/cm-terminal-shape.png" width=640 />

Moreover, it draws ASCII text powered by [figlet.js](https://github.com/patorjk/figlet.js).

```js
const app = cm.app({
  width: 800,
  height: 200,
  mode: "double",
  renderer: await cm.terminal(),
});

app.append(cm.text, {
  x: app.prop("width") / 2,
  y: app.prop("height") / 2,
  text: "charming",
  textBaseline: "middle",
  textAlign: "center",
});

app.render();
```

<img src="./img/cm-terminal-text.png" width=800 />

### Process

<a name="cm-each" href="#cm-each">#</a> cm.**each**

<a name="cm-eachRight" href="#cm-eachRight">#</a> cm.**eachRight**

<a name="cm-filter" href="#cm-filter">#</a> cm.**filter**

<a name="cm-map" href="#cm-map">#</a> cm.**map**

<a name="cm-push" href="#cm-push">#</a> cm.**push**

### Shape

<a name="cm-point" href="#cm-point">#</a> cm.**point**

<a name="cm-link" href="#cm-link">#</a> cm.**link**

<a name="cm-rect" href="#cm-rect">#</a> cm.**rect**

<a name="cm-circle" href="#cm-circle">#</a> cm.**circle**

<a name="cm-triangle" href="#cm-triangle">#</a> cm.**triangle**

<a name="cm-polygon" href="#cm-polygon">#</a> cm.**polygon**

<a name="cm-line" href="#cm-line">#</a> cm.**line**

<a name="cm-path" href="#cm-path">#</a> cm.**path**

<a name="cm-text" href="#cm-text">#</a> cm.**text**

<a name="cm-group" href="#cm-group">#</a> cm.**group**

<a name="cm-clear" href="#cm-clear">#</a> cm.**clear**

### Transform

<a name="cm-mapAttrs" href="#cm-mapAttrs">#</a> cm.**mapAttrs**

Maps abstract attributes to visual attributes with scales. Each scale's options are specified as a nested options object with the corresponding attribute name.

```js
app
  .append(cm.circle, { x: (d) => d[0], y: (d) => d[1] })
  .transform(cm.mapAttrs, {
    x: {}, // scale for x attribute
    y: {}, // scale for y attribute
  });
```

A scale's domain is typically inferred automatically. You can custom a scale explicitly using these options:

- **scale** - [scale](#scale), defaults to [scaleLinear](#cm-scaleLinear)
- **domain** - abstract values, typically _[min, max]_
- **range** - visual values, typically _[min, max]_

```js
app
  .append(cm.circle, { x: (d) => d[0], y: (d) => d[1] })
  .transform(cm.mapAttrs, {
    x: {
      scale: cm.scaleLog,
      range: [0, app.prop("height")],
    },
  });
```

<a name="cm-mapPosition" href="#cm-mapPosition">#</a> cm.**mapPosition**

Map abstract position to visual position. Like [mapAttrs](#cm-mapAttrs), but only maps position attributes to corresponding dimension range.

For x attributes, such as x and x1, the scale's range is _[0, app.prop("width")]_ by default. For y attributes, such as y and y1, the scale's range is _[0, app.prop("height")]_ by default.

- **scaleX** - [scale](#scale) for x attributes, defaults to [scaleLinear](#cm-scaleLinear)
- **scaleY** - [scale](#scale) for y attributes, defaults to [scaleLinear](#cm-scaleLinear)
- **domainX** - abstract values for x attributes, typically _[min, max]_
- **domainY** - abstract values for y attributes, typically _[min, max]_
- **reverseX** - reverses range for x attributes, defaults to false
- **reverseY** - reverses range for y attributes, defaults to false
- **padding** - space between shapes and border, defaults to 0

```js
app
  .append(cm.line, { x: (d) => d[0], y: (d) => d[0] })
  .transform(cm.mapPosition, {
    scaleX: cm.scaleLog,
    reverseY: true,
    padding: 15,
  });
```

### Scale

<a name="cm-scaleLinear" href="#cm-scaleLinear">#</a> cm.**scaleLinear**(_domain, range_)

Constructs a new linear scale with the specified _domain_ and _range_. Linear scales map a continuous, quantitative to a continuous output using a linear transformation.

```js
const scale = cm.scaleLinear([0, 1], [0, 100]);
scale(0); // 0;
scale(0.5); // 50;
scale(1); // 100;
```

<a name="cm-scaleSqrt" href="#cm-scaleSqrt">#</a> cm.**scaleSqrt**(_domain, range_)

Constructs a new sqrt scale with the specified _domain_ and _range_. Sqrt scales are similar to [linear scale](#cm-scaleLinear), except a square root transform is applied to the input domain value before the output range is computed.

```js
const scale = cm.scaleSqrt([0, 1], [0, 100]);
scale(0.09); // 30
scale(0.64); // 80
scale(0.81); // 90
```

<a name="cm-scaleLog" href="#cm-scaleLog">#</a> cm.**scaleLog**(_domain, range_)

Constructs a new log scale with the specified domain and range. Log scales are similar to [linear scale](#cm-scaleLinear), except a logarithmic transform transform is applied to the input domain value before the output range is computed.

```js
const scale = cm.scaleLog([1, 10], [0, 960]);
```

### Event

<a name="event-update" href="#event-update">#</a> app.**on**(_"update", callback_)

The _update_ event is fired repeatedly until [app.stop](#app-stop) is called after calling [app.start](#app-start). For example, to draw a moving rect:

```js
let x = 0;

function update() {
  app.append(cm.rect, {
    x: x++,
    y: 0,
    width: 100,
    height: 50,
  });
}

app.on("update", update);
```

<a name="event-mouseDown" href="#event-mouseDown">#</a> app.**on**(_"mouseDown", callback_)

The _mouseDown_ event is fired when a mouse button is pressed. For example, to change the background color:

```js
let background = "red";

function mouseDown() {
  background = "blue";
}

app.on("mouseDown", mouseDown);
```

<a name="event-mouseUp" href="#event-mouseUp">#</a> app.**on**(_"mouseUp", callback_)

The _mouseUp_ event is fired when a mouse button is released. For example, to change the background color:

```js
let background = "red";

function mouseUp() {
  background = "blue";
}

app.on("mouseUp", mouseUp);
```

<a name="event-mouseClick" href="#event-mouseClick">#</a> app.**on**(_"mouseClick", callback_)

The _mouseClick_ event is fired when a mouse button is clicked. For example, to change the background color:

```js
let background = "red";

function mouseClick() {
  background = "blue";
}

app.on("mouseClick", mouseClick);
```

<a name="event-beforeEach" href="#event-beforeEach">#</a> app.**on**(_"beforeEach", callback_)

The _beforeEach_ event is fired before each [update event](#event-update) is fired. For example, to begin measuring frame rate by [stats.js](https://github.com/mrdoob/stats.js):

```js
function measure(app) {
  // ...
  app.on("beforeEach", () => {
    stats.begin();
  });
}

app.call(measure);
```

<a name="event-afterEach" href="#event-afterEach">#</a> app.**on**(_"afterEach", callback_)

The _afterEach_ event is fired after each [update event](#event-update) is fired. For example, to end measuring frame rate by [stats.js](https://github.com/mrdoob/stats.js):

```js
function measure(app) {
  // ...
  app.on("afterEach", () => {
    stats.end();
  });
}

app.call(measure);
```

<a name="event-beforeAll" href="#event-beforeAll">#</a> app.**on**(_"beforeAll", callback_)

The _beforeAll_ event is fired before calling [app.start](#app-start). For example, to construct a Stats instance from [stats.js](https://github.com/mrdoob/stats.js):

```js
function measure(app) {
  let stats;

  //...
  app.on("beforeAll", () => {
    const container = document.getElementById("tool");
    stats = new Stats();
    stats.dom.style.position = "inherit";
    stats.dom.style.marginLeft = "1em";
    container.appendChild(stats.dom);
  });
}

app.call(measure);
```

<a name="event-afterAll" href="#event-afterAll">#</a> app.**on**(_"afterAll", callback_)

The _afterAll_ event is fired after calling [app.dispose](#app-dispose). For example, to remove the DOM of a Stats instance from [stats.js](https://github.com/mrdoob/stats.js):

```js
function measure(app) {
  let stats;

  //...
  app.on("afterAll", () => {
    stats.dom.remove();
  });
}

app.call(measure);
```

### Prop

<a name="prop-width" href="#prop-width">#</a> app.**prop**(_"width"_)

If the renderer is not terminal, returns the width of the app in pixel.

```js
const app = cm.app();
app.prop("width"); // 640;
```

If the renderer is [terminal](#cm-terminal), returns the width of the app in cell.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("width"); // 71
```

<a name="prop-height" href="#prop-height">#</a> app.**prop**(_"height"_)

If the renderer is not [terminal](#cm-terminal), returns the height of the app in pixel.

```js
const app = cm.app();
app.prop("height"); // 480;
```

If the renderer is [terminal](#cm-terminal), returns the height of the app in cell.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("height"); // 26
```

<a name="prop-frameCount" href="#prop-frameCount">#</a> app.**prop**(_"frameCount"_)

Returns the number of frames that have been displayed since the app started. For example, to draw a moving rect:

```js
app.on("update", () =>
  app.append(cm.rect, {
    x: app.frameCount(),
    y: 0,
    width: 10,
    height: 10,
  })
);
```

<a name="prop-frameRate" href="#prop-frameRate">#</a> app.**prop**(_"frameCount"_)

Returns the number of frames to be displayed per second.

```js
app.prop("frameRate"); // 60
```

<a name="prop-mouseX" href="#prop-mouseX">#</a> app.**prop**(_"mouseX"_)

Returns the x coordinate of the mouse position.

```js
app.prop("mouseX"); // 0
```

<a name="prop-mouseY" href="#prop-mouseY">#</a> app.**prop**(_"mouseY"_)

Returns the y coordinate of the mouse position.

```js
app.prop("mouseY"); // 0
```

<a name="prop-mode" href="#prop-mode">#</a> app.**prop**(_"mode"_)

Returns the rendering mode of the app, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("mode"); // "single"
```

<a name="prop-pixelWidth" href="#prop-pixelWidth">#</a> app.**prop**(_"pixelWidth"_)

Returns the computed width of the app in pixel, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("pixelWidth"); // 639
```

<a name="prop-pixelHeight" href="#prop-pixelHeight">#</a> app.**prop**(_"pixelHeight"_)

Returns the computed height of the app in pixel, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("pixelHeight"); // 468;
```

<a name="prop-cellWidth" href="#prop-cellWidth">#</a> app.**prop**(_"cellWidth"_)

Returns the computed width of the cells in pixel, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("cellWidth"); // 9
```

<a name="prop-cellHeight" href="#prop-cellHeight">#</a> app.**prop**(_"cellHeight"_)

Returns the computed height of the cells in pixel, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("cellHeight"); // 18
```

<a name="prop-fontSize" href="#prop-fontSize">#</a> app.**prop**(_"fontSize"_)

Returns the font size used to render text, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("fontSize"); // 15
```

<a name="prop-fontFamily" href="#prop-fontFamily">#</a> app.**prop**(_"fontFamily"_)

Returns the font family used to render text, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("fontFamily"); // "courier-new, courier, monospace"
```

<a name="prop-fontWeight" href="#prop-fontWeight">#</a> app.**prop**(_"fontWeight"_)

Returns the font weight used to render text, which is only for app with a [terminal](#cm-terminal) renderer.

```js
const app = cm.app({ renderer: await cm.terminal() });
app.prop("fontWeight"); // "normal"
```

### Color

<a name="cm-rgb" href="#cm-rgb">#</a> cm.**rgb**(_r[, g[, b]]_)

Returns a string representing the color according to the [CSS Object Model specification](https://drafts.csswg.org/cssom/#serialize-a-css-component-value).

```js
cm.rgb(234, 260, 180); // 'rgb(234, 260, 180)'
```

If only on argument is specified, sets all channels to the same _value_.

```js
cm.rgb(100); // 'rgb(100, 100, 100)'
```

<a name="cm-cfb" href="#cm-cfb">#</a> cm.**cfb**(_ch[, f[, b]]_)

Returns a terminal color object, which is only for app with a [terminal](#cm-terminal) renderer. A terminal color comprises the following three channels:

- _ch_: character
- _f_: CSS Color for the color of the character
- _b_: CSS color for the background cell of the character

If neither _f_ or _b_ are not specified, each defaults to null.

```js
app.append(cm.rect, {
  x: 0,
  y: 0,
  width: 10,
  height: 5,
  fill: cm.cfb("@", "steelblue", "orange"),
  stroke: cm.cfg("+"),
});
```

<a name="cm-wch" href="#cm-wch">#</a> cm.**wch**(_ch_)

Returns a character marked as a wide character, which is only for app with a [terminal](#cm-terminal) in double mode.

```js
const app = cm.app({
  terminal: await cm.terminal(),
  mode: "double",
});

app.append(cm.rect, {
  x: 0,
  y: 0,
  width: 10,
  height: 5,
  fill: cm.cfb(cm.wch("😊")),
});
```

### Array

<a name="cm-range" href="#cm-range">#</a> cm.**range**(_count[, start[, end]]_)

Returns an array of exactly _count_ uniformly-spaced values between _start_ and _end_. If _start_ is not specified, it defaults to 0. If _end_ is not specified, it defaults to 1.

```js
cm.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
cm.range(10, 5); // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]
cm.range(10, 5, 55); // [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
```

<a name="cm-cross" href="#cm-cross">#</a> cm.**cross**(_...arrays_)

Returns the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the specified arrays.

```js
cm.cross([1, 2, 3], [1, 2]); // [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2]]
```

<a name="cm-extent" href="#cm-extent">#</a> cm.**extent**(_array[, accessor]_)

Returns the minium and maximum value in given _array_ using natural order.

```js
cm.extent([4, 3, 2, 2, 7, 3, 5]); // [2, 7]
```

If an optional accessor function is specified, the extent is computed after calling array.map function.

```js
cm.extent(people, (d) => d.age); // [10, 30]
```

### Math

<a name="cm-clamp" href="#cm-clamp">#</a> cm.**clamp**(_value, min, max_)

Constrains the input _value_ within the specified range _[min, max]_.

```js
const x = 10;
cm.clamp(10, 2, 8); // 8
cm.clamp(10, 2, 12); // 10
cm.clamp(10, 12, 20); // 12
```

<a name="cm-random" href="#cm-random">#</a> cm.**random**(_[min[, max]]_)

Generates random number with a uniform distribution, which is within range _\[min, max\)_. If _min_ is not specified, it defaults to 0; if _max_ is not specified, it defaults to 1.

```js
cm.random(); // 0.4418278691734798
cm.random(10); // 3.747820060823679
cm.random(2, 10); // 6.649642684087617
```

<img src="./img/cm-random.png" width=600 alt="cm-random">

<a name="cm-randomNoise" href="#cm-randomNoise">#</a> cm.**randomNoise**(_[octaves[, seed]]_)

Returns a function for generating random numbers with a smooth, continuous random-like distribution, commonly referred to as [Perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise).

The layers of noise is _octaves_ and increasing the number of octaves results in a more variable sequence. If _octaves_ is not specified, it defaults to 0.

A _seed_ can be specified as a real number or as any integer. Two generators instanced with the same seed and octaves generate the same sequence. If _seed_ is not specified, it defaults to 0.

The returned function accept two parameters: _x_ is x coordinate in noise space; _y_ is y coordinate in noise space.

```js
cm.randomNoise()(0.2, 0.1); // 0.04076453205333332
cm.randomNoise(6, 2)(0.2, 0.1); // -0.08489767172063487
```

<img src="./img/cm-randomNoise.png" width=600 alt="cm-randomNoise">

<a name="cm-randomNormal" href="#cm-randomNormal">#</a> cm.**randomNormal**(_[mu[, sigma]]_)

Returns a function for generating random numbers with a [normal(Gaussian) distribution](https://en.wikipedia.org/wiki/Normal_distribution). The expected value of the generated number is _mu_, with given standard deviation sigma. If _mu_ is not specified, it defaults to 0; if _sigma_ is not specified, it defaults to 1.

```js
cm.randomNormal()(); // -2.0897431210663022
cm.randomNormal(30, 10)(); // 31.94829616303788
```

<img src="./img/cm-randomNormal.png" width=600 alt="cm-randomNormal">

### Constant

<a name="cm-two-pi" href="#cm-two-pi">#</a> cm.**TWO_PI**

It is twice the ratio of the circumference of a circle to its diameter.

```js
Math.cos(cm.TOW_PI); // 1
```

### Font

<a name="cm-fontStandard" href="#cm-fontStandard">#</a> cm.**fontStandard**()

Parses and returns the standard font for the fontFamily attribute.

```js
app.append(cm.text, {
  // ...
  fontFamily: cm.fontStandard(),
});
```

<img src="./img/cm-fontStandard.png" width=800 alt="cm-fontStandard">

<a name="cm-fontGhost" href="#cm-fontGhost">#</a> cm.**fontGhost**()

Parses and returns the ghost font for the fontFamily attribute.

```js
app.append(cm.text, {
  // ...
  fontFamily: cm.fontGhost(),
});
```

<img src="./img/cm-fontGhost.png" width=800 alt="cm-fontGhost">

### Gradient

<a name="cm-gradientRainBowX" href="#cm-gradientRainBowX">#</a> cm.**gradientRainBowX**()

Returns the fill attribute with the vertical rainbow gradient.

```js
app.append(cm.text, {
  // ...
  fill: cm.gradientRainBowX(),
});
```

<img src="./img/cm-gradientRainBowX.png" width=800 alt="cm-gradientRainBowX">

<a name="cm-gradientSineBowX" href="#cm-gradientSineBowX">#</a> cm.**gradientSineBowX**()

Returns the fill attribute with the vertical sinebox gradient.

```js
app.append(cm.text, {
  // ...
  fill: cm.gradientRainBowX(),
});
```

<img src="./img/cm-gradientSineBowX.png" width=800 alt="cm-gradientSineBowX">

### Helper

<a name="cm-pathArray" href="#cm-pathArray">#</a> cm.**pathArray**()

Constructs a new path generator like [d3-path](https://d3js.org/d3-path#path) serializer, expect returns an array of path commands instead of a path string. Useful for charming to render the path generated by [d3-shape](https://d3js.org/d3-shape) or [d3-geo](https://d3js.org/d3-geo/path) without parsing it, which is good for performance.

```js
const circle = d3.geoCircle()();
const projection = d3.geoOrthographic().translate([0, 0]).scale(10);
const path = d3.geoPath(projection);

app.append(cm.path, {
  d: () => {
    const context = cm.pathArray();
    path.context(context)(circle);
    return context.toArray();
  },
});
```

See [d3-path](https://d3js.org/d3-path#path) for more [CanvasPathMethods](https://html.spec.whatwg.org/multipage/#canvaspathmethods).

<a name="pathArray-toArray" href="#pathArray-toArray">#</a> pathArray.**toArray**()

Returns the array of path commands.

```js
const context = cm.pathArray();
context.moveTo(0, 0);
context.lineTo(10, 0);
context.lineTo(10, 10);
context.closePath();
context.toArray(); // [["M", 0, 0], ["L", 10, 0], ["L", 10, 10], ["Z"]]
```

### Vector

<a name="cm-vec" href="#cm-vec">#</a> cm.**vec**(_[x[, y]]_)

Constructs a vector with the specified _x_ and _y_ component. If either _x_ or _y_ are not specified, each defaults to 0. The returned vector has the following properties:

- x - x component of the vector
- y - y component of the vector

```js
cm.vec(); // { x: 0, y: 0 }
cm.vec(1); // { x: 1, y: 0 }
cm.vec(2, 3); // { x: 2, y: 3 }
```

<a name="cm-vecFromAngle" href="#cm-vecFromAngle">#</a> cm.**vecFromAngle**(_angle_)

Constructs a vector from the specified _angle_ in radians.

```js
cm.vecFromAngle(Math.PI / 4); // { x: 1, y: 1 }
```

<a name="cm-vecAdd" href="#cm-vecAdd">#</a> cm.**vecAdd**(_a, b_)

Adds the specified _vectors_ and returns a new vector.

```js
const a = cm.vec(1, 2);
const b = cm.vec(2, 3);
const c = cm.vecAdd(a, b);
a; // { x: 1, y: 2 }
b; // { x: 2, y: 3 }
c; // { x: 3, y: 5 }
```

<a name="cm-vecAngle" href="#cm-vecAngle">#</a> cm.**vecAngle**(_a_)

Computes the angle of the specified _vector_.

```js
const a = cm.vec(1, 1);
cm.vecAngle(a); // Math.PI / 4
```

<a name="cm-vecClamp" href="#cm-vecClamp">#</a> cm.**vecClamp**(_a, min[, max]_)

Constrains the magnitude of the specified _vector_ within the specified range _[min, max]_, and returns a new _vector_.

```js
const a = cm.vec(3, 4);
const b = cm.vecClamp(a, 10, 15);
a; // { x: 3, y: 4 }
b; // { x: 6, y: 8 }
```

If two arguments are specified, the second one is interpreted as the _maximum magnitude_, with the minium magnitude defaults to 0.

```js
const a = cm.vec(6, 8);
cm.vecClamp(a, 5); // { a: 3, b: 4 }
```

<a name="cm-vecClampX" href="#cm-vecClampX">#</a> cm.**vecClampX**(_a, min[, max]_)

Constrains the x component of the specified _vector_ within the specified range _[min, max]_, and returns a new _vector_.

```js
const a = cm.vec(6, 8);
const b = cm.vecClampX(a, 10, 15);
a; // { x: 6, y: 8 }
b; // { x: 10, y: 8 }
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(6, 8);
const b = cm.vecClampX(a, 5);
a; // { x: 6, y: 8 }
b; // { x: 5, y: 8 }
```

<a name="cm-vecClampY" href="#cm-vecClampY">#</a> cm.**vecClampY**(_a, min[, max]_)

Constrains the y component of the specified _vector_ within the specified range _[min, max]_, and returns a new _vector_.

```js
const a = cm.vec(6, 8);
const b = cm.vecClampY(a, 10, 15);
a; // { x: 6, y: 8 }
b; // { x: 6, y: 10 }
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(6, 8);
const b = cm.vecClampY(a, 5);
a; // { x: 6, y: 8 }
b; // { x: 6, y: 5 }
```

<a name="cm-vecCross" href="#cm-vecCross">#</a> cm.**vecCross**(_a, b_)

Computes the cross product of the specified _vectors_.

```js
const a = cm.vec(3, 4);
const b = cm.vec(1, 2);
cm.vecCross(a, b); // 2
```

<a name="cm-vecDist" href="#cm-vecDist">#</a> cm.**vecDist**(_a, b_)

Computes the distance of the specified _vectors_.

```js
const a = cm.vec(4, 6);
const b = cm.vec(1, 2);
cm.vecDist(a, b); // 5
```

<a name="cm-vecDist2" href="#cm-vecDist2">#</a> cm.**vecDist2**(_a, b_)

Computes the square distance of the specified _vectors_.

```js
const a = cm.vec(4, 6);
const b = cm.vec(1, 2);
cm.vecDist2(a, b); // 25
```

<a name="cm-vecDiv" href="#cm-vecDiv">#</a> cm.**vecDiv**(_a, value_)

Divides the specified _vector's_ x and y component by the specified _value_, and returns a new _vector_.

```js
const a = cm.vec(3, 4);
const b = cm.vecDiv(a, 0.5);
a; // { x: 3, y: 4 }
b; // { x: 6, y: 8 }
```

<a name="cm-vecDot" href="#cm-vecDot">#</a> cm.**vecDot**(_a, b_)

Computes the dot product of the specified _vectors_.

```js
const a = cm.vec(3, 4);
const b = cm.vec(1, 2);
cm.vecDot(a, b); // 11
```

<a name="cm-vecInX" href="#cm-vecInX">#</a> cm.**vecInX**(_a, min[, max]_)

Returns true if the specified _vector's_ x component is within the specified range _[min, max]_.

```js
const a = cm.vec(3, 4);
cm.vecInX(a, 1, 2); // false
cm.vecInX(a, 1, 3); // true
cm.vecInX(a, 1, 4); // true
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(3, 4);
cm.vecInX(a, 2); // false
cm.vecInX(a, 3); // true
cm.vecInX(a, 4); // true
```

<a name="cm-vecInY" href="#cm-vecInY">#</a> cm.**vecInY**(_a, x[, x1]_)

Returns true if the specified _vector's_ y component is within the specified range _[min, max]_.

```js
const a = cm.vec(3, 4);
cm.vecInY(a, 1, 3); // false
cm.vecInY(a, 1, 4); // true
cm.vecInY(a, 1, 5); // true
```

If two arguments are specified, the second one is interpreted as the maximum value, with the minium value defaults to 0.

```js
const a = cm.vec(3, 4);
cm.vecInY(a, 3); // false
cm.vecInY(a, 4); // true
cm.vecInY(a, 5); // true
```

<a name="cm-vecMag" href="#cm-vecMag">#</a> cm.**vecMag**(_a[, value]_)

If only one argument is specified, computes the magnitude of the specified _vector_.

```js
const a = cm.vec(3, 4);
cm.vecMag(a); // 5
```

If two arguments are specified, sets the magnitude of the specified _vector_ to the specified _value_, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecMag(a, 10);
a; // { x: 3, y: 4 }
b; // { x: 6, y: 8 }
```

<a name="cm-vecMult" href="#cm-vecMult">#</a> cm.**vecMult**(_a, value_)

Multiplies the specified _vector's_ x and y component by the specified _value_, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecMult(a, 2);
a; // { x: 3, y: 4 }
b; // { x: 6, y: 8 }
```

<a name="cm-vecNeg" href="#cm-vecNeg">#</a> cm.**vecNeg**(_a_)

Negates the specified _vector's_ x and y component, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecNeg(a);
a; // { x: 3, y: 4 }
b; // { x: -3, y: -4 }
```

<a name="cm-vecNegX" href="#cm-vecNegX">#</a> cm.**vecNegX**(_a_)

Negates the specified _vector's_ x component, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecNegX(a);
a; // { x: 3, y: 4 }
b; // { x: -3, y: 4 }
```

<a name="cm-vecNegY" href="#cm-vecNegY">#</a> cm.**vecNegY**(_a_)

Negates the specified _vector's_ y component, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecNegY(a);
a; // { x: 3, y: 4 }
b; // { x: 3, y: -4 }
```

<a name="cm-vecNorm" href="#cm-vecNorm">#</a> cm.**vecNorm**(_a_)

Normalizes the specified _vector_, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecNorm(a);
a; // { x: 3, y: 4 }
b; // { x: 0.6, y: 0.8 }
```

<a name="cm-vecRandom" href="#cm-vecRandom">#</a> cm.**vecRandom**()

Returns a unit vector with a random heading, following a uniform distribution.

```js
cm.vecRandom(); // { x: 0.9239434883837478, y: 0.688605153583981 }
```

<a name="cm-vecSub" href="#cm-vecSub">#</a> cm.**vecSub**(_a, b_)

Subtracts the specified _vectors_ and returns a new vector.

```js
const a = cm.vec(1, 2);
const b = cm.vec(2, 4);
const c = cm.vecSub(a, b);
a; // { x: 1, y: 2 }
b; // { x: 2, y: 4 }
c; // { x: -1, y: -2 }
```

<a name="vec-clone" href="#vec-clone">#</a> vec.**clone**()

Clones the _vector_ and returns a new vector.

```js
const a = cm.vec(1, 2);
const b = a.clone();
a === b; // false
b; // { x: 1, y: 2 }
```

<a name="vec-add" href="#vec-add">#</a> vec.**add**(_a_)

Adds the specified _vector_ to the target vector, and returns the target vector.

```js
const a = cm.vec(1, 2);
const b = cm.vec(3, 4);
a.add(b); // a
a; // { x: 4, y: 6 }
```

<a name="vec-angle" href="#vec-angle">#</a> vec.**angle**()

Computes the angle of the target vector.

```js
const a = cm.vec(1, 1);
a.angle(); // Math.PI / 4
```

<a name="vec-clamp" href="#vec-clamp">#</a> vec.**clamp**(_min[, max]_)

Constrains the magnitude of the target vector within the specified range _[min, max]_, and returns it.

```js
const a = cm.vec(3, 4);
a.clamp(10, 15); // a
a; // { x: 6, y: 8 }
```

If two arguments are specified, the second one is interpreted as the _maximum magnitude_, with the minium magnitude defaults to 0.

```js
const a = cm.vec(6, 8);
a.clamp(5); // a
a; // { a: 3, b: 4 }
```

<a name="vec-clampX" href="#vec-clampX">#</a> vec.**clampX**(_min[, max]_)

Constrains the x component of the target _vector_ within the specified range _[min, max]_, and returns it.

```js
const a = cm.vec(6, 8);
a.clampX(10, 15); // a
a; // { x: 10, y: 8 }
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(6, 8);
a.clampX(5); // a
a; // { x: 5, y: 8 }
```

<a name="vec-clampY" href="#vec-clampY">#</a> vec.**clampY**(_min[, max]_)

Constrains the y component of the target _vector_ within the specified range _[min, max]_, and returns it.

```js
const a = cm.vec(6, 8);
a.clampY(10, 15); // a
a; // { x: 6, y: 10 }
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(6, 8);
a.clampY(5);
a; // { x: 6, y: 5 }
```

<a name="vec-cross" href="#vec-cross">#</a> vec.**cross**(_a_)

Computes the cross product of the specified _vector_ and the target vector.

```js
const a = cm.vec(3, 4);
const b = cm.vec(1, 2);
a.cross(b); // 2
```

<a name="vec-dist" href="#vec-dist">#</a> vec.**dist**(_a_)

Computes the distance of the specified _vector_ and the target vector.

```js
const a = cm.vec(4, 6);
const b = cm.vec(1, 2);
a.dist(b); // 5
```

<a name="vec-dist2" href="#vec-dist2">#</a> vec.**dist2**(_a_)

Computes the square distance of the specified _vector_ and the target vector.

```js
const a = cm.vec(4, 6);
const b = cm.vec(1, 2);
a.dist(b); // 25
```

<a name="vec-div" href="#vec-div">#</a> vec.**div**(_value_)

Divides the target vector' x and y component by the specified _value_, and returns it.

```js
const a = cm.vec(3, 4);
a.div(0.5); // a
a; // { x: 6, y: 8 }
```

<a name="vec-dot" href="#vec-dot">#</a> vec.**dot**(_a_)

Computes the dot product of the specified _vector_ and the target vector.

```js
const a = cm.vec(3, 4);
const b = cm.vec(1, 2);
a.dot(b); // 11
```

<a name="vec-inX" href="#vec-inX">#</a> vec.**inX**(_min[, max]_)

Returns true if the target vector's x component is within the specified range _[min, max]_.

```js
const a = cm.vec(3, 4);
a.inX(1, 2); // false
a.inX(1, 3); // true
a.inX(1, 4); // true
```

If two arguments are specified, the second one is interpreted as the _maximum value_, with the minium value defaults to 0.

```js
const a = cm.vec(3, 4);
a.inX(2); // false
a.inX(3); // true
a.inX(4); // true
```

<a name="vec-inY" href="#vec-inY">#</a> vec.**inY**(_min[, max]_)

Returns true if the target vector's y component is within the specified range _[min, max]_.

```js
const a = cm.vec(3, 4);
a.inY(1, 3); // false
a.inY(1, 4); // true
a.inY(1, 5); // true
```

If two arguments are specified, the second one is interpreted as the maximum value, with the minium value defaults to 0.

```js
const a = cm.vec(3, 4);
a.inY(3); // false
a.inY(4); // true
a.inY(5); // true
```

<a name="vec-mag" href="#vec-mag">#</a> vec.**mag**(_[value]_)

If no argument is specified, computes the magnitude of the target vector.

```js
const a = cm.vec(3, 4);
cm.mag(); // 5
```

If one argument is specified, sets the magnitude of the target to the specified _value_, and returns it.

```js
const a = cm.vec(3, 4);
a.mag(10); // a
a; // { x: 6, y: 8 }
```

<a name="vec-mult" href="#vec-mult">#</a> vec.**mult**(_m_)

Multiplies the specified component's x and y by the specified _value_, and returns a new vector.

```js
const a = cm.vec(3, 4);
const b = cm.vecMult(a, 2);
a; // { x: 3, y: 4 }
b; // { x: 6, y: 8 }
```

<a name="vec-neg" href="#vec-neg">#</a> vec.**neg**()

Negates the target vector's x and y component, and returns it.

```js
const a = cm.vec(3, 4);
a.neg(); // a
a; // { x: -3, y: -4 }
```

<a name="vec-negX" href="#vec-negX">#</a> vec.**negX**()

Negates the target vector's x component, and returns it.

```js
const a = cm.vec(3, 4);
a.negX(); // a
a; // { x: -3, y: 4 }
```

<a name="vec-negY" href="#vec-negY">#</a> vec.**negY**()

Negates the target vector's y component, and returns it.

```js
const a = cm.vec(3, 4);
a.negY(); // a
a; // { x: 3, y: -4 }
```

<a name="vec-norm" href="#vec-norm">#</a> vec.**norm**()

Normalizes the target vector, and returns it.

```js
const a = cm.vec(3, 4);
a.norm(); // a
a; // { x: 0.6, y: 0.8 }
```

<a name="vec-set" href="#vec-set">#</a> vec.**set**(_x[, y]_)

If only one argument is specified and it is a vector instance, sets the target vector's x and y component with the source _vector's_ x and y component, and returns the target vector.

```js
const a = cm.vec(1, 2);
const b = cm.vec(3, 4);
a.set(b); // a
a; // { x: 3, y: 4 }
```

If two arguments are specified, sets the target vector's x and y component with the specified _x_ and _y_, and returns it.

```js
const a = cm.vec(1, 2);
a.set(3, 4); // a
a; // { x: 3, y: 4 }
```

<a name="vec-setX" href="#vec-setX">#</a> vec.**setX**(_x_)

Sets the target vector's x component with the specified _x_, and returns it.

```js
const a = cm.vec(1, 2);
a.setX(3); // a
a; // { x: 3, y: 2 }
```

<a name="vec-setY" href="#vec-setY">#</a> vec.**setY**(_y_)

Sets the target vector's y component with the specified _y_, and returns it.

```js
const a = cm.vec(1, 2);
a.setY(3); // a
a; // { x: 1, y: 3 }
```

<a name="vec-sub" href="#vec-sub">#</a> vec.**sub**(_a_)

Subtracts the target vector with the specified vector and returns the target vector.

```js
const a = cm.vec(1, 2);
const b = cm.vec(2, 4);
a.sub(b); // a
a; // { x: -1, y: -2 }
b; // { x: 2, y: 4 }
```
