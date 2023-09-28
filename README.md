# @charming-art/app

The data-driven JavaScript renderer.

## Installing

```js
import * as cm from "@charming-art/app";

const app = cm.app({
  width: 640,
  height: 640,
});

app
  .data(Array.from({ length: 240 }, (_, i) => i))
  .map((_, i, data) => (i * Math.PI * 2) / data.length)
  .append(cm.circle, {
    x: {
      value: (t) => Math.cos(t) * Math.cos(t * 3),
      range: [15, app.width() - 30],
    },
    y: {
      value: (t) => Math.sin(t) * Math.cos(t * 3),
      range: [15, app.height() - 30],
    },
    r: {
      value: (_, i) => i,
      range: [1, 15],
    },
  });

document.body.appendChild(app.render());
```
