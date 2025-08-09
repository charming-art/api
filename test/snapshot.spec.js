import {test, expect} from "vitest";
import * as snapshots from "./snapshots.js";

const hasOnly = Object.values(snapshots).some((fn) => fn.only);
const filtered = hasOnly ? Object.fromEntries(Object.entries(snapshots).filter(([, fn]) => fn.only)) : snapshots;

for (const [name, fn] of Object.entries(filtered)) {
  test(`${name} should match snapshot`, async () => {
    await expect(fn()).toMatchFileSnapshot(`./output/${name}.html`);
  });
}
