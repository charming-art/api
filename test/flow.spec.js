import * as cm from "../src/index.js";
import {test, expect} from "vitest";
import {sleep} from "./sleep.js";

test("cm should export flow", () => {
  expect(cm.flow).toBeDefined();
});

test("flow.on(event, callback) should add event listener passing expected params", async () => {
  let click;
  const wait = new Promise((resolve) => (click = resolve));
  const state = cm
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
  const state = cm
    .flow()
    .on("click", () => count++)
    .join();

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);

  state.dispose();

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);
});

test("flow.on(loop, callback) should have expected params", async () => {
  let next;
  const wait = new Promise((resolve) => (next = resolve));
  const state = cm
    .flow()
    .on("loop", (event, state) => next({state, event}))
    .join();
  const {event: e, state: s} = await wait;
  expect(s).toBe(state);
  expect(e.elapsed).toBeGreaterThan(0);
  expect(e.frameCount).toBe(1);
  state.dispose();
});

test("flow.on(loop, callback) should remove loop when disposed", async () => {
  let count = 0;
  const state = cm
    .flow()
    .on("loop", () => count++)
    .join();

  await sleep(100);
  expect(count).toBeGreaterThan(0);

  state.dispose();

  const start = count;
  await sleep(100);
  expect(count).toBe(start);
});

test("flow.on(loop, callback, {frameRate}) should have expected frame rate", async () => {
  let count = 0;
  let count2 = 0;

  const state = cm
    .flow()
    .on("loop", () => count++, {frameRate: 1})
    .join();

  const state2 = cm
    .flow()
    .on("loop", () => count2++, {frameRate: 120})
    .join();

  await sleep(200);
  expect(count2).toBeGreaterThan(count);

  state.dispose();
  state2.dispose();
});
