import * as cm from "../src/index.js";
import {test, expect} from "vitest";

test("cm should export flow", () => {
  expect(cm.flow).toBeDefined();
});
