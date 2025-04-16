# Charming

<a href="https://observablehq.com/d/18b3d6f3affff5bb"><img src="./img/examples.png"  alt="examples"></a>

> [!NOTE]
> The current next branch is implementing the new proposal API for production use. Please refer to the [main branch](https://github.com/charming-art/charming/tree/main) for the current release.

The JavaScript library for generative art based on SVG.

```js
import * as cm from "charmingjs";

const svg = cm.svg("svg", {
  width: 100,
  height: 100,
  children: [
    cm.svg("rect", {x: 0, y: 0, width: 100, height: 100, fill: "black"}),
    cm.svg("circle", {cx: 50, cy: 50, r: 40, fill: "white"}),
  ],
});

document.body.appendChild(svg.render());
```

## Resources 📚

- Documentation - https://charmingjs.org/
- Features - https://charmingjs.org/what-is-charming
- Examples - https://observablehq.com/d/18b3d6f3affff5bb

## License 📄

MIT@Bairui SU
