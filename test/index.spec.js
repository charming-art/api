import * as cm from "../src/index.js";
import * as cmVector from "charmingjs-vector";
import {test, expect} from "vitest";

test("cm should have expected exports", () => {
  for (const [key, value] of Object.entries(cmVector)) {
    expect(cm[key]).toBe(value);
  }
});
