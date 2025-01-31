import * as cm from "../src/index.js";
import {test, expect} from "vitest";

test("cm should have expected exports", () => {
  expect(cm.$).toBeDefined();
  expect(cm.html).toBeDefined();
});
