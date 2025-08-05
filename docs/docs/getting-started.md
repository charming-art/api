# Getting Started

```bash
npm install charmingjs
```

There are several way to using Charming.

## Try Charming Online

The fastest way to get started with Charming is on [p5.js Web Editor](https://editor.p5js.org/Charming.js/sketches/aR6--CqLp)! Open this sketch and play around. Then go to File > Duplicate to fork it!

![p5.js-editor-example](/p5.js-editor-example.png)

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

  const svg = cm.render({
    // ...
  });

  document.body.append(svg);
</script>
```

## UMD Bundle

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/charmingjs"></script>
<script>
  const app = cm.render({
    // ...
  });

  document.body.append(svg);
</script>
```
