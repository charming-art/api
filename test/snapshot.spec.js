import {describe, test, expect} from "vitest";
import path from "path";
import * as fs from "fs";
import * as apps from "./apps";
import beautify from "js-beautify";
import {JSDOM} from "jsdom";

function withJsdom(run) {
  return async () => {
    const jsdom = new JSDOM("");
    global.window = jsdom.window;
    global.document = jsdom.window.document;
    try {
      return await run();
    } finally {
      delete global.window;
      delete global.document;
    }
  };
}

async function screenshot(path, app) {
  const renderSSR = withJsdom(app);
  const root = await renderSSR();
  root.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const string = beautify.html(root.outerHTML, {
    indent_size: 2,
    inline: ["title", "tspan", "span", "svg", "a", "i"],
    indent_inner_html: false,
  });
  fs.writeFileSync(path, string, {encoding: "utf-8"});
}

function match(expectPath, actualPath) {
  const expectString = fs.readFileSync(expectPath, {encoding: "utf8", flag: "r"});
  const actualString = fs.readFileSync(actualPath, {encoding: "utf8", flag: "r"});
  expect(expectString).toBe(actualString);
}

async function expectMatchSnapshot(name, app) {
  const dir = path.resolve(__dirname, "./output");
  const expect = path.resolve(__dirname, `./output/${name}.svg`);
  const actual = path.resolve(__dirname, `./output/${name}-actual.svg`);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(expect)) {
    if (process.env.CI === "true") throw new Error(`Please generate golden image for ${name}`);
    console.warn(`! generate ${name}`);
    await screenshot(expect, app);
  } else {
    await screenshot(actual, app);
    match(expect, actual);
    fs.unlinkSync(actual);
  }
}

describe("Snapshots", () => {
  for (const [name, app] of Object.entries(apps).filter(([, app]) => app.skip !== true)) {
    test(name, async () => expectMatchSnapshot(name, app));
  }
});
