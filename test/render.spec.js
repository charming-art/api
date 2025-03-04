import {render, SVG} from "../src/index.js";
import {test, expect} from "vitest";

test("cm.render should set textContent for SVG text element corretly.", () => {
  const node = render({draw: [SVG.text({textContent: "hello world"})]}).node();
  const text = node.querySelector("text");
  expect(text.textContent).toBe("hello world");
});
