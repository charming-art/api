# Charming

<img src="./img/logo.svg" width="256" alt="logo">

> [!NOTE]
> The current next branch is implementing the new proposal API for production use. Please refer to the [main branch](https://github.com/charming-art/charming/tree/main) for the current release.

The JavaScript library for generative art based on SVG.

```js
import * as cm from "charmingjs";

const SVG = cm.SVG;
const state = cm.state({x: 0});
const ticker = cm.ticker().on("animate", animate);

function animate() {
  state.x = Math.abs(Math.sin(Date.now() / 1000) * 200);
}

const node = SVG.svg({width: 200, height: 50}, [
  SVG.circle({
    cx: () => state.x,
    cy: 25,
    r: 20,
  }),
]);

document.body.append(node);
```

## Resources 📚

- Documentation - https://charmingjs.org/
- Features - https://charmingjs.org/what-is-charming

## License 📄

MIT@Bairui SU
