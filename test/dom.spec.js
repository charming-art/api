import {svg, html} from "../src/index.js";
import {test, expect} from "vitest";

test("svg should create SVG elements", () => {
  const el = svg.rect();
  expect(el.tagName).toBe("rect");
});

test("svg should ignore then, next, and return", () => {
  expect(svg.then).toBe(undefined);
  expect(svg.next).toBe(undefined);
  expect(svg.return).toBe(undefined);
});

test("html should create HTML elements", () => {
  const el = html.div();
  expect(el.tagName).toBe("DIV");
});

test("html should ignore then, next, and return", () => {
  expect(html.then).toBe(undefined);
  expect(html.next).toBe(undefined);
  expect(html.return).toBe(undefined);
});
