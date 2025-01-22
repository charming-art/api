import * as cm from "charmingjs";
import {test, expect} from "vitest";

test("cm should have expected  exports", () => {
  expect(cm.$).toBeDefined();
  expect(cm.reactive).toBeDefined();
  expect(cm.shape).toBeDefined();
});
