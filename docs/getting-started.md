# Getting Started

```bash
npm install charmingjs
```

# Getting Started

There are several way to using Charming.

## Installing from Package Manager

Charming is typically installed via a package manager such as Yarn or NPM.

```bash
yarn add charmingjs
```

```bash
npm install charmingjs
```

Charming can then imported as a namespace:

```js
import * as cm from "charmingjs";
```

## Imported as an ES module

In vanilla HTML, Charming can be imported as an ES module, say from jsDelivr:

```html
<script type="module">
  import * as cm from "https://cdn.jsdelivr.net/npm/charmingjs/+esm";

  const svg = cm.shape.svg();

  document.body.append(svg);
</script>
```

## UMD Bundle

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/charmingjs"></script>
<script>
  const svg = cm.shape.svg();

  document.body.append(svg);
</script>
```
