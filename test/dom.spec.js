import {svg, html} from "../src/index.js";
import {test, expect} from "vitest";

test("svg should render a svg element with __htl__", () => {
  const node = svg`<svg></svg>`;
  expect(node).toBeInstanceOf(SVGElement);
  expect(node.__htl__).toBe(true);
});

test("html should render a html element with __htl__", () => {
  const node = html`<div></div>`;
  expect(node).toBeInstanceOf(HTMLElement);
  expect(node.__htl__).toBe(true);
});

test("svg should return null for null input", () => {
  expect(svg``).toBe(null);
});

test("svg should render nested svg elements", () => {
  expect(svg`<svg><circle></circle></svg>`.outerHTML).toBe("<svg><circle></circle></svg>");
});

test("html should warp nodes with a span element", () => {
  // prettier-ignore
  expect(html`<div></div><div></div>`.outerHTML).toBe("<span><div></div><div></div></span>");
});

test("svg should wrap nodes with a g element", () => {
  expect(svg`<circle></circle><rect></rect>`.outerHTML).toBe("<g><circle></circle><rect></rect></g>");
});

test("svg should render with a interpolated object value", () => {
  expect(svg`<svg ${{width: 100, height: 100}}></svg>`.outerHTML).toBe('<svg width="100" height="100"></svg>');
});

test("svg should render with interpolated object values", () => {
  expect(svg`<svg ${{width: 100, height: 100}} ${{height: 5, viewBox: "0 0 100 5"}}></svg>`.outerHTML).toBe(
    '<svg width="100" height="5" viewBox="0 0 100 5"></svg>',
  );
});

test("svg should ignore all non object values", () => {
  expect(svg`<svg width=10 ${1} ${false} ${[1, 2, 3]} ${new Date()}></svg>`.outerHTML).toBe("<svg></svg>");
});

test("svg should render with a interpolated node value", () => {
  expect(svg`<svg>${svg`<circle></circle>`}</svg>`.outerHTML).toBe("<svg><circle></circle></svg>");
});

test("svg should render with interpolated node values", () => {
  expect(
    svg`<svg>
      ${svg`<circle></circle>`}
      ${svg`<rect></rect>`}
    </svg>`.outerHTML,
  ).toBe("<svg><circle></circle><rect></rect></svg>");
});

test("svg should ignore false nodes", () => {
  expect(svg`<svg>${null}${undefined}${false}${0}</svg>`.outerHTML).toBe("<svg>0</svg>");
});

test("svg should render array of non-node nodes", () => {
  expect(svg`<svg>${[1, 2, 3]}</svg>`.outerHTML).toBe("<svg>123</svg>");
});

test("svg should render array of node nodes", () => {
  expect(svg`<svg>${[1, 2, 3].map((d) => svg`<text>${d}</text>`)}</svg>`.outerHTML).toBe(
    "<svg><text>1</text><text>2</text><text>3</text></svg>",
  );
});
