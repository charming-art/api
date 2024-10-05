# What is Flow?

```js eval
cm.render({
  width: 640,
  height: 640,
  init: cm.flow(
    cm.range(120),
    cm.map((_, i, data) => (i * Math.PI) / data.length),
    cm.circle({
      x: (t) => Math.cos(t) * Math.cos(t * 3) * 250 + 280,
      y: (t) => Math.sin(t) * Math.cos(t * 3) * 250 + 320,
      r: 10,
    })
  ),
});
```
