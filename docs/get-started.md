# Get Started

Charming is typically installed via a package manager such as Yarn or NPM.

::: code-group

```sh [npm]
npm add -S charmingjs
```

```sh [pnpm]
pnpm add -S charmingjs
```

```sh [yarn]
yarn add -S charmingjs
```

```sh [bun]
bun add -S charmingjs
```

:::

Charming can then be imported as a namespace:

```js
import * as cm from "charmingjs";
```

In vanilla HTML, Charming can be imported as an ES module, say from jsDelivr:

```html
<script type="module">
  import * as cm from "https://cdn.jsdelivr.net/npm/charmingjs/+esm";

  const svg = cm.svg("svg");
  document.body.append(svg);
</script>
```

Charming is also available as a UMD bundle for legacy browsers.

```html
<script src="https://cdn.jsdelivr.net/npm/charmingjs"></script>
<script>
  const svg = cm.svg("svg");
  document.body.append(svg);
</script>
```
