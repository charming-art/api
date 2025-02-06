import * as cm from "../src/index.js";
import {test, expect} from "vitest";

test("cm should have expected exports", () => {
  expect(cm.html).toBeDefined();
  expect(cm.svg).toBeDefined();
  expect(cm.flow).toBeDefined();
  expect(cm.component).toBeDefined();
});
