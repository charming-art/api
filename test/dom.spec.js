import {describe, expect, test, vi} from "vitest";
import * as cm from "../src/index.js";

describe("attr", () => {
  test("attr(dom, key, value) should set attribute", () => {
    const div = document.createElement("div");
    cm.attr(div, "class", "hello");
    cm.attr(div, "style-color", "red");
    cm.attr(div, "textContent", "hello");
    expect(div.getAttribute("class")).toBe("hello");
    expect(div.style.color).toBe("red");
    expect(div.textContent).toBe("hello");
  });

  test("attr(dom, key, value) should set property", () => {
    const input = document.createElement("input");
    cm.attr(input, "checked", true);
    expect(input.checked).toBe(true);
  });

  test("attr(dom, key, value) should set innerHTML", () => {
    const div = document.createElement("div");
    cm.attr(div, "innerHTML", "<span>hello</span>");
    expect(div.innerHTML).toBe("<span>hello</span>");
  });

  test("attr(dom, event, value) should set event", () => {
    const div = document.createElement("div");
    const click = vi.fn();
    cm.attr(div, "onclick", click);
    div.dispatchEvent(new Event("click"));
    expect(click).toHaveBeenCalledWith(expect.any(Event), div, undefined, undefined, undefined);
  });

  test("attr(dom, key, null) should remove attribute", () => {
    const input = document.createElement("input");
    cm.attr(input, "checked", true);
    cm.attr(input, "class", "hello");
    cm.attr(input, "style-color", "red");
    cm.attr(input, "textContent", "hello");
    cm.attr(input, "checked", null);
    cm.attr(input, "class", null);
    cm.attr(input, "style-color", null);
    cm.attr(input, "textContent", null);
    expect(input.checked).toBe(false);
    expect(input.getAttribute("class")).toBe(null);
    expect(input.style.color).toBe("");
    expect(input.textContent).toBe("");
  });

  test("attr(dom, event, value) should override event", () => {
    const div = document.createElement("div");
    const click = vi.fn();
    const click2 = vi.fn();
    cm.attr(div, "onclick", click);
    cm.attr(div, "onclick", click2);
    div.dispatchEvent(new Event("click"));
    expect(click).not.toHaveBeenCalled();
    expect(click2).toHaveBeenCalled();
  });

  test("attr(dom, event, null) should remove events", () => {
    const div = document.createElement("div");
    const click = vi.fn();
    cm.attr(div, "onclick", click);
    cm.attr(div, "onclick", null);
    div.dispatchEvent(new Event("click"));
    expect(click).not.toHaveBeenCalled();
  });

  test("attr(dom, key) should get attribute", () => {
    const div = document.createElement("div");
    cm.attr(div, "class", "hello");
    cm.attr(div, "style-color", "red");
    cm.attr(div, "textContent", "hello");
    expect(cm.attr(div, "class")).toBe("hello");
    expect(cm.attr(div, "style-color")).toBe("red");
    expect(cm.attr(div, "textContent")).toBe("hello");
    expect(cm.attr(div, "width")).toBe(null);
  });

  test("attr(dom, event) should get event", () => {
    const div = document.createElement("div");
    const click = vi.fn();
    cm.attr(div, "onclick", click);
    expect(cm.attr(div, "onclick")).toBeDefined();
  });
});

describe("event", () => {
  test("svg(tag, options) should set events", () => {
    const click = vi.fn();
    const root = cm.svg`<svg ${{onclick: click}} />`;
    const event = new Event("click");
    root.dispatchEvent(event);
    expect(click).toHaveBeenCalledWith(event, root, undefined, undefined, undefined);
  });

  test("svg(tag, options) should pass datum to event handler", () => {
    const click = vi.fn();
    const root = cm.svg`<svg ${{data: [1, 2, 3], onclick: click}} />`;
    const el = root.children[0];
    const event = new Event("click");
    el.dispatchEvent(event);
    expect(click).toHaveBeenCalledWith(event, el, 1, 0, [1, 2, 3]);
  });
});
