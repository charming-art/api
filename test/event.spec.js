import {test, expect, vi} from "vitest";
import {svg} from "../src/index.js";

test("svg(tag, options) should set events", () => {
  const click = vi.fn();
  const root = svg("svg", {onclick: click});
  const event = new Event("click");
  root.dispatchEvent(event);
  expect(click).toHaveBeenCalledWith(event, root, undefined, undefined, undefined);
});

test("svg(tag, options) should pass datum to event handler", () => {
  const click = vi.fn();
  const root = svg("svg", {data: [1, 2, 3], onclick: click});
  const el = root.children[0];
  const event = new Event("click");
  el.dispatchEvent(event);
  expect(click).toHaveBeenCalledWith(event, el, 1, 0, [1, 2, 3]);
});
