import * as cm from "../src/index.js";
import {test, expect} from "vitest";

test("state(obj) should return reactive object", () => {
  const state = cm.state({a: 1, b: 2, c: () => state.a + state.b});
  expect(state.a).toBe(1);
  expect(state.b).toBe(2);
  expect(state.c).toBe(3);
});
