import * as cm from "../src/index.js";
import {test, expect} from "vitest";
import {sleep} from "./sleep.js";

test("ticker.on(event, callback) should add event listener passing expected params", async () => {
  let click;
  const wait = new Promise((resolve) => (click = resolve));
  cm.ticker().on("click", (event) => click(event));
  window.dispatchEvent(new MouseEvent("click"));
  const event = await wait;
  expect(event).toBeInstanceOf(MouseEvent);
});

test("ticker.on(event, callback) should return itself", () => {
  const ticker = cm.ticker();
  expect(ticker.on("click", () => {})).toBe(ticker);
});

test("ticker.on(even, callback) should remove event listener when disposed", async () => {
  let count = 0;
  const ticker = cm.ticker().on("click", () => count++);

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);

  ticker.dispose();

  window.dispatchEvent(new MouseEvent("click"));
  await sleep(0);
  expect(count).toBe(1);
});

test("ticker.on(animate, callback) should have expected params", async () => {
  let next;
  const wait = new Promise((resolve) => (next = resolve));
  const ticker = cm.ticker().on("animate", (event) => next(event));
  const e = await wait;
  expect(e.elapsed).toBeGreaterThan(0);
  expect(e.frameCount).toBe(1);
  ticker.dispose();
});

test("ticker.on(animate, callback) should remove loop when disposed", async () => {
  let count = 0;
  const ticker = cm.ticker().on("animate", () => count++);

  await sleep(100);
  expect(count).toBeGreaterThan(0);

  ticker.dispose();

  const start = count;
  await sleep(100);
  expect(count).toBe(start);
});

test("flow.on(animate, callback, {frameRate}) should have expected frame rate", async () => {
  let count = 0;
  let count2 = 0;

  const ticker1 = cm.ticker().on("animate", () => count++, {frameRate: 1});
  const ticker2 = cm.ticker().on("animate", () => count2++, {frameRate: 120});

  await sleep(200);
  expect(count2).toBeGreaterThan(count);

  ticker1.dispose();
  ticker2.dispose();
});
