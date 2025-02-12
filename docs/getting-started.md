# Getting Started

```bash
npm install charmingjs
```

There are several way to using Charming.

## Try Online

Charming uses [Observable Notebook](https://observablehq.com/platform/notebooks) as its playground, try this [starter notebook](https://observablehq.com/d/7b4e552feea11ed3)!

## Installing from Package Manager

Charming is typically installed via a package manager such as Yarn or NPM.

::: code-group

```sh [npm]
$ npm add -S charmingjs
```

```sh [pnpm]
$ pnpm add -S charmingjs
```

```sh [yarn]
$ yarn add -S charmingjs
```

```sh [bun]
$ bun add -S charmingjs
```

:::

Charming can then imported as a namespace:

```js
import * as cm from "charmingjs";
```

## Imported as an ES module

In vanilla HTML, Charming can be imported as an ES module, say from jsDelivr:

```html
<script type="module">
  import * as cm from "https://cdn.jsdelivr.net/npm/charmingjs/+esm";

  const node = cm.SVG.svg();

  document.body.append(node);
</script>
```

## UMD Bundle

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/charmingjs"></script>
<script>
  const svg = cm.SVG.svg();

  document.body.append(node);
</script>
```
