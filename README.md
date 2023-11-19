# Charming: Charm Computing

The data-driven creative coding language with high performance and multi styles.

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

## A simple example

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
  .transform(cm.mapProps, {
    x: { range: [15, app.prop("width") - 30] },
    y: { range: [15, app.prop("height") - 30] },
    r: { range: [1, 15] },
  });

document.body.appendChild(app.render().node());
```

## API Reference

### App

### Flow

### Process

### Shape

### Transform

### Scale

### Array

### Math

### Vector

### Color

### Constant

### Font

### Gradient

### Helper
