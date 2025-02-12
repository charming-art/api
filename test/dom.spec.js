import {SVG, HTML} from "../src/index.js";
import {test, expect} from "vitest";

test("svg should create SVG elements", () => {
  const el = SVG.rect();
  expect(el.tagName).toBe("rect");
});

test("svg should ignore then, next, and return", () => {
  expect(SVG.then).toBe(undefined);
  expect(SVG.next).toBe(undefined);
  expect(SVG.return).toBe(undefined);
});

test("html should create HTML elements", () => {
  const el = HTML.div();
  expect(el.tagName).toBe("DIV");
});

test("html should ignore then, next, and return", () => {
  expect(HTML.then).toBe(undefined);
  expect(HTML.next).toBe(undefined);
  expect(HTML.return).toBe(undefined);
});
