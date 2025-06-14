import {html, tag, svg, render, renderMark} from "../src/index.js";

export function strictNull() {
  return renderMark(svg());
}

export function strictString() {
  return renderMark(svg(1));
}

export function setAttributes() {
  return render({
    width: 100,
    height: 200,
  });
}

export function setSnakeCaseAttributes() {
  return render({
    font_size: 100,
    stroke_width: 2,
  });
}

export function setKebabCaseAttributes() {
  return render({
    "font-size": 100,
    "stroke-width": 2,
  });
}

export function setTextContent() {
  return render({
    textContent: "hello",
  });
}

export function setInnerHTML() {
  return render({
    innerHTML: "<g><text>hello</text></g>",
  });
}

export function setStyle() {
  return render({
    style_font_size: "100px",
    style_stroke_width: 2,
  });
}

export function setFunctionAttributes() {
  return render({
    width: () => 100,
    height: () => 200,
  });
}

export function setChildren() {
  return render({
    marks: [
      svg("g"),
      svg("text", {
        textContent: "hello",
      }),
    ],
  });
}

export function setZeroChildren() {
  return renderMark(html("div").with([0]));
}

export function setFalsyChildren() {
  return render({
    marks: [
      svg("g"),
      null,
      false,
      undefined,
      svg("text", {
        textContent: "hello",
      }),
    ],
  });
}

export function setNonMarkChildren() {
  return renderMark(
    html("div").with([
      "hello",
      html("span").with(["world"]), // Similar to textContent
      Date("2025-01-01"),
      {key: "foo"},
    ]),
  );
}

export function setDataDrivenNonMarkChildren() {
  return renderMark(
    html("div").with([
      svg("span", [1, 2, 3]).with([
        (d, i) => `${i}-${d}`, // Data-driven textContent
      ]),
    ]),
  );
}

export function setDataDrivenAttributes() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("circle", [1, 2, 3], {
        cx: (d) => d * 20,
        cy: 50,
        r: 10,
      }),
    ],
  });
}

export function setListChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      [1, 2, 3].map((d) =>
        svg("circle", {
          r: d,
        }),
      ),
    ],
  });
}

export function setNestedListChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      [1, 2, 3].map((d) =>
        svg("circle", {
          r: d,
        }),
      ),
    ],
  });
}

export function setDataDrivenChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("g", [1, 2, 3]).with([
        svg("circle", {
          cx: (d) => d * 20,
          cy: 50,
          r: 10,
        }),
      ]),
    ],
  });
}

export function setDataDrivenChildrenWithoutOptions() {
  return render({
    width: 100,
    height: 100,
    marks: [svg("g", [1, 2, 3])],
  });
}

export function setNestedChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("g", [1, 2, 3]).with([
        svg("g").with([
          svg("circle", {
            cx: (d) => d * 20,
            cy: 50,
            r: 10,
          }),
        ]),
      ]),
    ],
  });
}

export function setNestedDataDrivenChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("g", [1, 2, 3]).with([
        svg("g", [4, 5]).with([
          svg("circle", {
            cx: (d) => d * 5,
            cy: 50,
            r: 10,
          }),
        ]),
      ]),
    ],
  });
}

export function setTable() {
  const table = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907],
  ];
  return renderMark(
    html("table").with([
      html("tr", table).with([
        html("td", (row) => row, {
          textContent: (d) => d,
        }),
      ]),
    ]),
  );
}

export function setNestedCallbackDataDrivenChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("g", [1, 2, 3]).with([
        svg("g", (d) => Array.from({length: d}, (_, i) => i)).with([
          svg("circle", {
            cx: (d) => d * 5,
            cy: 50,
            r: 10,
          }),
        ]),
      ]),
    ],
  });
}

export function cloneDataDrivenChildren() {
  return render({
    width: 100,
    height: 100,
    marks: [
      svg("g", [1, 2, 3], {
        transform: (d) => `translate(${d * 20}, 50)`,
      }).with([
        svg("circle", {
          r: 10,
        }),
      ]),
    ],
  });
}

export function fragmentRoot() {
  return renderMark(
    svg("circle", [1, 2, 3], {
      cx: (d) => d * 20,
      cy: 50,
      r: 10,
    }),
  );
}

export function htmlAttributes() {
  return renderMark(
    html("div", {
      className: "hello",
      disabled: true,
      checked: true,
      selected: true,
      readOnly: true,
      hidden: true,
      placeholder: "hello",
      title: "hello",
      alt: "hello",
      href: "https://charmingjs.org",
      src: "https://charmingjs.org",
    }),
  );
}

export function mathXL() {
  const math = tag("http://www.w3.org/1998/Math/MathML");
  return renderMark(
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
    ]),
  );
}
