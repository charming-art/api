import {create, svg, Mark} from "../src/index.js";
import {test, expect} from "vitest";

function html(tag, data, options) {
  return new Mark(tag, data, options);
}

test("cm.create() should render without options.", () => {
  const node = create().render();
  expect(node.nodeName).toBe("svg");
});

test("cm.create(options) should draw without draw option.", () => {
  const node = create({}).render();
  expect(node.nodeName).toBe("svg");
});

test("root.render() should return span element if contains only one svg element.", () => {
  const node = create().render([svg("svg", {})]);
  expect(node.nodeName).toBe("SPAN");
});

test("root.render() should return span element if only contains non-svg elements.", () => {
  const node = create().render([html("div", {})]);
  expect(node.nodeName).toBe("SPAN");
});

test("root.render() should set textContent for SVG text element correctly.", () => {
  const node = create().render([svg("text", {textContent: "hello world"})]);
  const text = node.querySelector("text");
  expect(text.textContent).toBe("hello world");
});

test("root.dispose() should stop timer when dispose() is called.", async () => {
  const root = create({loop: true});
  const node = root.render(({time}) => [svg("circle", {id: "circle", r: time})]);
  const circle = node.querySelector("#circle");
  const r = circle.getAttribute("r");
  root.dispose();
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(circle.getAttribute("r")).toBe(r);
});

test("root.render() should pass time and frameCount for draw callback when loop is false.", () => {
  let t;
  let f;
  create().render(({time, frameCount}) => {
    t = time;
    f = frameCount;
    return [];
  });
  expect(t).toBe(0);
  expect(f).toBe(0);
});

test("root.create({use}) should define decorators for marks.", () => {
  const color = (node, color) => {
    node.setAttribute("fill", color);
    node.setAttribute("stroke", color);
    return node;
  };

  const node = create({use: {color}}).render([svg("circle", {r: 10, color: "red"})]);

  const circle = node.querySelector("circle");
  expect(circle.getAttribute("fill")).toBe("red");
  expect(circle.getAttribute("stroke")).toBe("red");
});
