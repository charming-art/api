import {test, expect} from "vitest";
import * as snapshots from "./snapshots.js";

for (const [name, fn] of Object.entries(snapshots)) {
  test(`${name} should match snapshot`, async () => {
    await expect(fn()).toMatchFileSnapshot(`./output/${name}.html`);
  });
}
