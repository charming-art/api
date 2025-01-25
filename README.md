# Charming

<img src="./img/logo.svg" width="256" alt="logo">

> [!NOTE]
> The current next branch is implementing the new proposal API for production use. Please refer to the [main branch](https://github.com/charming-art/charming/tree/main) for the current release.

The JavaScript library for reactive SVG manipulation.

```js
import {shape, flow, $} from "charmingjs";

const [state] = flow().let("x", 0).join();

requestAnimationFrame(animate);

function animate() {
  state.x = Math.abs(Math.sin(Date.now() / 1000)) * 200;
  requestAnimationFrame(animate);
}

const svg = shape.svg({width: 200, height: 50}, [
  shape.circle({
    cx: $(() => state.x),
    cy: 25,
    r: 20,
  }),
]);

document.body.append(svg);
```

## Resources 📚

- Documentation - https://charmingjs.org/
- Features - https://charmingjs.org/what-is-charming

## License 📄

MIT@Bairui SU
