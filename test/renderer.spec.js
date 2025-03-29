import {app, Renderer, svg} from "../src/index.js";
import {test, expect} from "vitest";

class TestRenderer extends Renderer {
  create(tag) {
    return document.createElement(tag.split(":")[1]);
  }
  attrs(node, attrs) {
    node.__attrs__ = attrs;
  }
  events(node, events) {
    node.__events__ = events;
  }
}

test("Renderer should create elements with expected tag names.", () => {
  const renderer = new TestRenderer();
  const root = app({renderer, draw: [svg("div", {x: 10, onTap: () => {}})]}).render();
  const div = root.querySelector("div");
  expect(div).not.toBeNull();
  expect(div.__attrs__).toEqual({x: 10});
  expect(div.__events__).toEqual({onTap: expect.any(Function)});
  expect(div.nodeName).toBe("DIV");
});
