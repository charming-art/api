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

  document.body.append(app.render().node());
</script>
```

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/@charming-art/charming@0.1"></script>
<script>
  const app = cm.app();

  // ...

  document.body.append(app.render().node());
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
  .transform(cm.mapAttrs, {
    x: { range: [15, app.prop("width") - 30] },
    y: { range: [15, app.prop("height") - 30] },
    r: { range: [1, 15] },
  });

document.body.appendChild(app.render().node());
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
- [Vector](#vector)
- [Constant](#constant)
- [Font](#font)
- [Gradient](#gradient)
- [Helper](#helper)

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

<a name="cm-terminal" href="#cm-terminal">#</a> cm.**terminal()**

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

<a name="cm-mapPosition" href="#cm-mapPosition">#</a> cm.**mapPosition**

### Scale

<a name="cm-scaleLinear" href="#cm-scaleLinear">#</a> cm.**scaleLinear**(_domain, range_)

<a name="cm-scaleSqrt" href="#cm-scaleSqrt">#</a> cm.**scaleSqrt**(_domain, range_)

<a name="cm-scaleLog" href="#cm-scaleLog">#</a> cm.**scaleLog**(_domain, range_)

### Event

<a name="event-update" href="#event-update">#</a> event.**update**

<a name="event-mouseDown" href="#event-mouseDown">#</a> event.**mouseDown**

<a name="event-mouseUp" href="#event-mouseUp">#</a> event.**mouseUp**

<a name="event-mouseClick" href="#event-mouseClick">#</a> event.**mouseClick**

<a name="event-beforeEach" href="#event-beforeEach">#</a> event.**beforeEach**

<a name="event-afterEach" href="#event-afterEach">#</a> event.**afterEach**

<a name="event-beforeAll" href="#event-beforeAll">#</a> event.**beforeAll**

<a name="event-afterAll" href="#event-afterAll">#</a> event.**afterAll**

### Prop

<a name="prop-width" href="#prop-width">#</a> prop.**width**

<a name="prop-height" href="#prop-height">#</a> prop.**height**

<a name="prop-pixelWidth" href="#prop-pixelWidth">#</a> prop.**pixelWidth**

<a name="prop-pixelHeight" href="#prop-pixelHeight">#</a> prop.**pixelHeight**

<a name="prop-frameCount" href="#prop-frameCount">#</a> prop.**frameCount**

<a name="prop-frameRate" href="#prop-frameRate">#</a> prop.**frameRate**

<a name="prop-mouseX" href="#prop-mouseX">#</a> prop.**mouseX**

<a name="prop-mouseY" href="#prop-mouseY">#</a> prop.**mouseY**

<a name="prop-mode" href="#prop-mode">#</a> prop.**mode**

<a name="prop-cellWidth" href="#prop-cellWidth">#</a> prop.**cellWidth**

<a name="prop-cellHeight" href="#prop-cellHeight">#</a> prop.**cellHeight**

<a name="prop-fontSize" href="#prop-fontSize">#</a> prop.**fontSize**

<a name="prop-fontFamily" href="#prop-fontFamily">#</a> prop.**fontFamily**

<a name="prop-fontWeight" href="#prop-fontWeight">#</a> prop.**fontWeight**

### Color

<a name="cm-rgb" href="#cm-rgb">#</a> cm.**rgb**(_r[, g[, b]]_)

<a name="cm-cfb" href="#cm-cfb">#</a> cm.**cfb**(_ch[, f[, b]]_)

<a name="cm-wch" href="#cm-wch">#</a> cm.**wch**(_ch_)

### Array

<a name="cm-range" href="#cm-range">#</a> cm.**range**(_count[, start[, end]]_)

<a name="cm-cross" href="#cm-cross">#</a> cm.**cross**(_array…_)

<a name="cm-extent" href="#cm-extent">#</a> cm.**extent**(_array[, valueof]_)

### Math

<a name="cm-clamp" href="#cm-clamp">#</a> cm.**clamp**(_x, low, high_)

<a name="cm-random" href="#cm-random">#</a> cm.**random**(_low, high_)

<a name="cm-randomNoise" href="#cm-randomNoise">#</a> cm.**randomNoise**(_[octaves[, seed]]_)

<a name="cm-randomNormal" href="#cm-randomNormal">#</a> cm.**randomNormal**(_[mu[, sigma]]_)

### Vector

<a name="cm-vec" href="#cm-vec">#</a> cm.**vec**(_[x[, y]]_)

<a name="cm-vecFromAngle" href="#cm-vecFromAngle">#</a> cm.**vecFromAngle**(_theta_)

<a name="cm-vecAdd" href="#cm-vecAdd">#</a> cm.**vecAdd**(_a, b_)

<a name="cm-vecAngle" href="#cm-vecAngle">#</a> cm.**vecAngle**(_a_)

<a name="cm-vecClamp" href="#cm-vecClamp">#</a> cm.**vecClamp**(_a, m[, m1]_)

<a name="cm-vecClampX" href="#cm-vecClampX">#</a> cm.**vecClampX**(_a, x[, x1]_)

<a name="cm-vecClampY" href="#cm-vecClampY">#</a> cm.**vecClampY**(_a, x[, x1]_)

<a name="cm-vecCross" href="#cm-vecCross">#</a> cm.**vecCross**(_a, b_)

<a name="cm-vecDist" href="#cm-vecDist">#</a> cm.**vecDist**(_a, b_)

<a name="cm-vecDiv" href="#cm-vecDiv">#</a> cm.**vecDiv**(_a, m_)

<a name="cm-vecDot" href="#cm-vecDot">#</a> cm.**vecDot**(_a, b_)

<a name="cm-vecInX" href="#cm-vecInX">#</a> cm.**vecInX**(_a, x[, x1]_)

<a name="cm-vecInY" href="#cm-vecInY">#</a> cm.**vecInY**(_a, x[, x1]_)

<a name="cm-vecMag" href="#cm-vecMag">#</a> cm.**vecMag**(_a[, m]_)

<a name="cm-vecMult" href="#cm-vecMult">#</a> cm.**vecMult**(_a, m_)

<a name="cm-vecNeg" href="#cm-vecNeg">#</a> cm.**vecNeg**(_a_)

<a name="cm-vecNegX" href="#cm-vecNegX">#</a> cm.**vecNegX**(_a_)

<a name="cm-vecNegY" href="#cm-vecNegY">#</a> cm.**vecNegY**(_a_)

<a name="cm-vecNorm" href="#cm-vecNorm">#</a> cm.**vecNorm**(_a_)

<a name="cm-vecRandom" href="#cm-vecRandom">#</a> cm.**vecRandom**()

<a name="cm-vecSub" href="#cm-vecSub">#</a> cm.**vecSub**(_a, b_)

<a name="vec-clone" href="#vec-clone">#</a> vec.**clone**()

<a name="vec-add" href="#vec-add">#</a> vec.**add**(_a_)

<a name="vec-angle" href="#vec-angle">#</a> vec.**angle**()

<a name="vec-clamp" href="#vec-clamp">#</a> vec.**clamp**(_m[, m1]_)

<a name="vec-clampX" href="#vec-clampX">#</a> vec.**clampX**(_x[, x1]_)

<a name="vec-clampY" href="#vec-clampY">#</a> vec.**clampY**(_x[, x1]_)

<a name="vec-cross" href="#vec-cross">#</a> vec.**cross**(_a_)

<a name="vec-dist" href="#vec-dist">#</a> vec.**dist**(_a_)

<a name="vec-div" href="#vec-div">#</a> vec.**div**(_m_)

<a name="vec-dot" href="#vec-dot">#</a> vec.**dot**(_a_)

<a name="vec-inX" href="#vec-inX">#</a> vec.**inX**(_x[, x1]_)

<a name="vec-inY" href="#vec-inY">#</a> vec.**inY**(_x[, x1]_)

<a name="vec-mag" href="#vec-mag">#</a> vec.**mag**(_[s]_)

<a name="vec-mult" href="#vec-mult">#</a> vec.**mult**(_m_)

<a name="vec-neg" href="#vec-neg">#</a> vec.**neg**()

<a name="vec-negX" href="#vec-negX">#</a> vec.**negX**()

<a name="vec-negY" href="#vec-negY">#</a> vec.**negY**()

<a name="vec-norm" href="#vec-norm">#</a> vec.**norm**()

<a name="vec-set" href="#vec-set">#</a> vec.**set**(_x[, y]_)

<a name="vec-setX" href="#vec-setX">#</a> vec.**setX**(_x_)

<a name="vec-setY" href="#vec-setY">#</a> vec.**setY**(_x_)

<a name="vec-sub" href="#vec-sub">#</a> vec.**sub**(_a_)

### Constant

<a name="cm-two-pi" href="#cm-two-pi">#</a> cm.**TWO_PI**

### Font

<a name="cm-fontStandard" href="#cm-fontStandard">#</a> cm.**fontStandard**()

<a name="cm-fontGhost" href="#cm-fontGhost">#</a> cm.**fontStandard**()

### Gradient

<a name="cm-gradientRainBowX" href="#cm-gradientRainBowX">#</a> cm.**gradientRainBowX**()

<a name="cm-gradientSineBowX" href="#cm-gradientSineBowX">#</a> cm.**gradientSineBowX**()

### Helper

<a name="cm-pathArray" href="#cm-pathArray">#</a> cm.**pathArray**()
