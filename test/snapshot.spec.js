import { describe, test, beforeAll, afterAll, expect } from "vitest";
import path from "path";
import * as fs from "fs";
import * as apps from "./apps";
import { createBrowser, createPage, app } from "./browser.js";

async function screenshot(page, path) {
  console.log("TODO: screenshot", page, path);
}

function match(expectPath, actualPath) {
  expect(true).toBe(true);
  console.log("TODO: match", expectPath, actualPath);
}

async function expectMatchSnapshot(page, name) {
  const dir = path.resolve(__dirname, "./output");
  const expect = path.resolve(__dirname, `./output/${name}.png`);
  const actual = path.resolve(__dirname, `./output/${name}-actual.png`);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(expect)) {
    if (process.env.CI === "true") throw new Error(`Please generate golden image for ${name}`);
    console.warn(`! generate ${name}`);
    await screenshot(page, expect);
  } else {
    await screenshot(page, actual);
    match(expect, actual);
    fs.unlinkSync(actual);
  }
}

describe("Snapshots", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await createBrowser();
    page = await createPage(browser);
  });

  afterAll(async () => {
    await browser.close();
  });

  const shapes = Object.entries(apps).filter(([name]) => name.startsWith("_"));
  const onlys = shapes.filter(([, render]) => render.only === true);
  if (process.env.CI === "true" && onlys.length) throw new Error("Remove .only for tests.");

  const tests = onlys.length ? onlys : shapes.filter(([, render]) => !render.skip);
  for (const [name] of tests) {
    test(name, async () => {
      await page.goto(app(name));
      await page.waitForSelector(".charming-node");
      await expectMatchSnapshot(page, name);
    });
  }
});
