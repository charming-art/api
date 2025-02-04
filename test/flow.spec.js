import * as cm from "../src/index.js";
import {test, expect} from "vitest";
import {sleep} from "./sleep.js";

test("cm should export flow", () => {
  expect(cm.flow).toBeDefined();
});

test("flow.on(event, callback) should add event listener passing expected params", async () => {
  let click;
  const wait = new Promise((resolve) => (click = resolve));
  const [state] = cm
    .flow()
    .on("click", (event, state) => click({state, event}))
    .join();
  window.dispatchEvent(new MouseEvent("click"));
  const {state: s, event: e} = await wait;
  expect(s).toBe(state);
  expect(e).toBeInstanceOf(MouseEvent);
});

test("flow.on(even, callback) should remove event listener when disposed", async () => {
  let count = 0;
  const [, dispose] = cm
    .flow()
    .on("click", () => count++)
    .join();

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);

  dispose();

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);
});
