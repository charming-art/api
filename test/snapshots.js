import {svg, html} from "../src/index.js";

export function strictNull() {
  return svg();
}

export function strictString() {
  return svg(1);
}

export function setAttributes() {
  return svg("svg", {
    width: 100,
    height: 200,
  });
}

export function setSnakeCaseAttributes() {
  return svg("svg", {
    font_size: 100,
    stroke_width: 2,
  });
}

export function setKebabCaseAttributes() {
  return svg("svg", {
    "font-size": 100,
    "stroke-width": 2,
  });
}

export function setTextContent() {
  return svg("svg", {
    textContent: "hello",
  });
}

export function setInnerHTML() {
  return svg("svg", {
    innerHTML: `<g><text>hello</text></g>`,
  });
}

export function setStyle() {
  return svg("svg", {
    style_font_size: "100px",
    style_stroke_width: 2,
  });
}

export function setFunctionAttributes() {
  return svg("svg", {
    width: () => 100,
    height: () => 200,
  });
}

export function setChildren() {
  return svg("svg", {children: [svg("g"), svg("text", {textContent: "hello"})]});
}

export function setFalsyChildren() {
  return svg("svg", {children: [svg("g"), null, false, undefined, svg("text", {textContent: "hello"})]});
}

export function setFunctionChildren() {
  return svg("svg", {children: () => [svg("g"), svg("text", {textContent: "hello"})]});
}

export function setDataDrivenAttributes() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("circle", [1, 2, 3], {
        cx: (d) => d * 20,
        cy: 50,
        r: 10,
      }),
    ],
  });
}

export function setDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", [1, 2, 3], {
        children: (d) => [
          svg("circle", {
            cx: d * 20,
            cy: 50,
            r: 10,
          }),
        ],
      }),
    ],
  });
}

export function cloneDataDrivenChildren() {
  return svg("svg", {
    width: 100,
    height: 100,
    children: [
      svg("g", [1, 2, 3], {
        transform: (d) => `translate(${d * 20}, 50)`,
        children: [svg("circle", {r: 10})],
      }),
    ],
  });
}

export function fragmentRoot() {
  return svg("circle", [1, 2, 3], {
    cx: (d) => d * 20,
    cy: 50,
    r: 10,
  });
}

export function htmlAttributes() {
  return html("div", {
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
  });
}
