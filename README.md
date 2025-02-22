# Charming

<img src="./img/logo.svg" width="256" alt="logo">

> [!NOTE]
> The current next branch is implementing the new proposal API for production use. Please refer to the [main branch](https://github.com/charming-art/charming/tree/main) for the current release.

The JavaScript library for generative art based on SVG.

```js
import * as cm from "charmingjs";

const SVG = cm.SVG;

const app = cm.render({
  width: 100,
  height: 100,
  draw: [
    SVG.rect({x: 0, y: 0, width: 100, height: 100, fill: "black"}),
    SVG.circle({cx: 50, cy: 50, r: 40, fill: "white"}),
  ],
});

document.body.append(root.app());
```

## Resources 📚

- Documentation - https://charmingjs.org/
- Features - https://charmingjs.org/what-is-charming

## License 📄

MIT@Bairui SU
