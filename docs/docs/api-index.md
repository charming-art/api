# API Reference

- [_cm_.**render**](/docs/api-index#cm-render) - render a SVG element.
- [_cm_.**svg**](/docs/api-index#cm-svg) - create a SVG mark.
- [_cm_.**html**](/docs/api-index#cm-html) - create a HTML mark.
- [_cm_.**tag**](/docs/api-index#cm-tag) - create a new mark factory.
- [_mark_.**with**](/docs/api-index#mark-with) - append children to mark.
- [_mark_.**render**](/docs/api-index#mark-render) - render a mark.

## _cm_.render(_options_) {#cm-render}

```js eval t=module
cm.render({
  width: 200,
  height: 100,
  style_background: "black",
  marks: [
    cm.svg("circle", {
      cx: 100,
      cy: 50,
      r: 40,
      fill: "white",
    }),
  ],
});
```

## _mark_.render() {#mark-render}

```js eval t=module
cm.html("span", {
  textContent: "Hello Charming.js",
  style_color: "red",
}).render();
```

## _cm_.svg(_tag[, data[, options]]_) {#cm-svg}

```js eval t=module
cm.render({
  width: 100,
  height: 50,
  marks: [
    cm.svg("circle", [1, 2, 3], {
      cx: (d) => d * 30,
      cy: 25,
      r: 10,
    }),
  ],
});
```

## _cm_.html(_tag[, data[, options]]_) {#cm-html}

```js eval t=module
const table = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

cm.html("table").with([
  cm.html("tr", table).with([
    cm.html("td", (row) => row, {
      textContent: (d) => d,
    }),
  ]),
]).render();
```

## _cm_.tag(_namespace_) {#cm-tag}

```js eval t=module
const math = cm.tag("http://www.w3.org/1998/Math/MathML");

math("math").with([
  math("mrow").with([
    math("mrow").with([
      math("mi", {textContent: "x"}),
      math("mo", {textContent: "∗"}),
      math("mn", {textContent: "2"}),
    ]),
    math("mo", {textContent: "+"}),
    math("mi", {textContent: "y"}),
  ]),
]).render();
```

## _mark_.with(_children_) {#mark-with}

```js eval t=module
const svg = cm.svg;

cm.render({
  width: 100,
  height: 50,
  marks: [
    svg("g", [1, 2, 3], {
      transform: (d) => `translate(${d * 30},${25})`,
      fill: "steelblue",
    }).with([
      svg("circle", [1, 2, 3], {
        r: 10,
      }),
    ]),
  ],
});
```
