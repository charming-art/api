import { describe, test, beforeAll, afterAll } from "vitest";
import path from "path";
import * as fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import * as shapes from "./shapes/index.js";
import { createBrowser, createPage, app } from "./browser.js";

const CLASS_NAME = "charming-node";

async function screenshot(page, path) {
  const { x, y, width, height } = await page.evaluate(
    `window.document.getElementsByClassName('${CLASS_NAME}')[0].getBoundingClientRect()`,
  );
  await page.screenshot({
    path,
    clip: { x, y, width, height },
  });
}

function match(expectPath, actualPath, diffPath, { maxError = 0 } = {}) {
  const expectImage = PNG.sync.read(fs.readFileSync(expectPath));
  const actualImage = PNG.sync.read(fs.readFileSync(actualPath));
  const { width, height } = expectImage;
  const diffImage = new PNG({ width, height });
  const mismatch = pixelmatch(expectImage.data, actualImage.data, diffImage.data, width, height, {
    threshold: 0.1,
  });
  const error = mismatch - maxError;
  if (error > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diffImage));
  }
  return error;
}

async function expectMatchSnapshot(page, name) {
  const dir = path.resolve(__dirname, "./output");
  const expect = path.resolve(__dirname, `./output/${name}.png`);
  const actual = path.resolve(__dirname, `./output/${name}-actual.png`);
  const diff = path.resolve(__dirname, `./output/${name}-diff.png`);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(expect)) {
    if (process.env.CI === "true") throw new Error(`Please generate golden image for ${name}`);
    console.warn(`! generate ${name}`);
    await screenshot(page, expect);
  } else {
    await screenshot(page, actual);
    const error = match(expect, actual, diff);
    if (error === 0) fs.unlinkSync(actual);
    else throw new Error(`Mismatch (error: ${error}): ${name}`);
  }
}

describe("shape", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await createBrowser();
    page = await createPage(browser);
  });

  afterAll(async () => {
    await browser.close();
  });

  const entries = Object.entries(shapes);
  const onlys = entries.filter(([, render]) => render.only === true);
  if (process.env.CI === "true" && onlys.length) throw new Error("Remove .only for tests.");

  const tests = onlys.length ? onlys : entries.filter(([, render]) => !render.skip);
  for (const [name] of tests) {
    test(name, async () => {
      await page.goto(app(name));
      await page.waitForSelector(`.${CLASS_NAME}`);
      await expectMatchSnapshot(page, name);
    });
  }
});
