import {svg} from "../src/index.js";
import {test, expect} from "vitest";

test("svg should create SVG elements", () => {
  const el = svg.rect();
  expect(el.tagName).toBe("rect");
});
