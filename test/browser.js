import { chromium, firefox } from "playwright";

export async function createBrowser({ type = "chromium" } = {}) {
  const browser = type === "chromium" ? chromium : firefox;
  return await browser.launch();
}

export async function createPage(browser) {
  return await (await browser.newContext({ deviceScaleFactor: 2 })).newPage();
}

export function app(name) {
  return `http://localhost:${process.env.TEST_PORT}/?name=${name}`;
}
