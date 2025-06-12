import {test, expect, vi} from "vitest";
import {svg, renderMark} from "../src/index.js";

test("svg(tag, options) should set events", () => {
  const click = vi.fn();
  const root = renderMark(svg("svg", {onclick: click}));
  root.dispatchEvent(new Event("click"));
  expect(click).toHaveBeenCalled();
});

test("svg(tag, options) should pass datum to event handler", () => {
  const click = vi.fn();
  const root = renderMark(svg("svg", [1, 2, 3], {onclick: click}));
  const el = root.children[0];
  const event = new Event("click");
  el.dispatchEvent(event);
  expect(click).toHaveBeenCalledWith(event, 1, 0, [1, 2, 3]);
});
