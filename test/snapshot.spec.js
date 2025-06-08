import {test, expect} from "vitest";
import * as snapshots from "./snapshots.js";

test("snapshots", async () => {
  for (const [name, fn] of Object.entries(snapshots)) {
    await expect(fn()).toMatchFileSnapshot(`./output/${name}.html`);
  }
});
