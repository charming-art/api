import {test, expect, vi} from "vitest";
import {attr} from "../src/attr.js";

test("attr(dom, key, value) should set attribute", () => {
  const div = document.createElement("div");
  attr(div, "class", "hello");
  attr(div, "style-color", "red");
  attr(div, "textContent", "hello");
  expect(div.getAttribute("class")).toBe("hello");
  expect(div.style.color).toBe("red");
  expect(div.textContent).toBe("hello");
});

test("attr(dom, key, value) should set property", () => {
  const input = document.createElement("input");
  attr(input, "checked", true);
  expect(input.checked).toBe(true);
});

test("attr(dom, key, value) should set innerHTML", () => {
  const div = document.createElement("div");
  attr(div, "innerHTML", "<span>hello</span>");
  expect(div.innerHTML).toBe("<span>hello</span>");
});

test("attr(dom, event, value) should set event", () => {
  const div = document.createElement("div");
  const click = vi.fn();
  attr(div, "onclick", click);
  div.dispatchEvent(new Event("click"));
  expect(click).toHaveBeenCalledWith({event: expect.any(Event), node: div});
});

test("attr(dom, key, null) should remove attribute", () => {
  const input = document.createElement("input");
  attr(input, "checked", true);
  attr(input, "class", "hello");
  attr(input, "style-color", "red");
  attr(input, "textContent", "hello");
  attr(input, "checked", null);
  attr(input, "class", null);
  attr(input, "style-color", null);
  attr(input, "textContent", null);
  expect(input.checked).toBe(false);
  expect(input.getAttribute("class")).toBe(null);
  expect(input.style.color).toBe("");
  expect(input.textContent).toBe("");
});

test("attr(dom, event, value) should override event", () => {
  const div = document.createElement("div");
  const click = vi.fn();
  const click2 = vi.fn();
  attr(div, "onclick", click);
  attr(div, "onclick", click2);
  div.dispatchEvent(new Event("click"));
  expect(click).not.toHaveBeenCalled();
  expect(click2).toHaveBeenCalled();
});

test("attr(dom, event, null) should remove events", () => {
  const div = document.createElement("div");
  const click = vi.fn();
  attr(div, "onclick", click);
  attr(div, "onclick", null);
  div.dispatchEvent(new Event("click"));
  expect(click).not.toHaveBeenCalled();
});

test("attr(dom, key) should get attribute", () => {
  const div = document.createElement("div");
  attr(div, "class", "hello");
  attr(div, "style-color", "red");
  attr(div, "textContent", "hello");
  expect(attr(div, "class")).toBe("hello");
  expect(attr(div, "style-color")).toBe("red");
  expect(attr(div, "textContent")).toBe("hello");
  expect(attr(div, "width")).toBe(null);
});

test("attr(dom, event) should get event", () => {
  const div = document.createElement("div");
  const click = vi.fn();
  attr(div, "onclick", click);
  expect(attr(div, "onclick")).toBeDefined();
});
