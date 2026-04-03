import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {stateNotes as existingStateNotes} from "./state-notes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, "state-notes.js");

const API = "https://en.wikipedia.org/w/api.php";

const TITLE_OVERRIDES = {
  Georgia: "Georgia (U.S. state)",
  Washington: "Washington (state)",
  "New York": "New York (state)",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function firstParagraph(s) {
  const t = String(s ?? "").trim();
  if (!t) return "";
  return t.split(/\n{2,}/)[0].trim();
}

function trimToCompleteSentence(s, maxChars = 700) {
  const t = String(s ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!t) return "";
  let clipped = t;
  if (t.length > maxChars) {
    clipped = t.slice(0, maxChars);
    const lastSpace = clipped.lastIndexOf(" ");
    if (lastSpace > 0) clipped = clipped.slice(0, lastSpace);
  }
  let lastEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("?"), clipped.lastIndexOf("!"));
  if (lastEnd >= 0 && lastEnd >= Math.floor(clipped.length * 0.65)) {
    let out = clipped.slice(0, lastEnd + 1);
    // Avoid ending on common abbreviations like "U.S." where the extract continues mid-sentence.
    const abbrevEnd = /\b(?:U\.S|U\.K|St|Mt|Dr|Mr|Ms|Mrs|Prof|Sr|Jr|[A-Z])\.$/;
    while (abbrevEnd.test(out)) {
      const prev = out.slice(0, -1);
      const prevEnd = Math.max(prev.lastIndexOf("."), prev.lastIndexOf("?"), prev.lastIndexOf("!"));
      if (prevEnd < 0) break;
      out = prev.slice(0, prevEnd + 1);
    }
    return out;
  }
  return clipped;
}

function formatObjectAsModule(obj) {
  const lines = [];
  lines.push("/**");
  lines.push(" * First paragraph of the English Wikipedia article for each U.S. state (and D.C.).");
  lines.push(" * Source: MediaWiki API (intro extract). Regenerate: `node fetch-state-notes.mjs`");
  lines.push(" */");
  lines.push("export const stateNotes = {");
  for (const [k, v] of Object.entries(obj)) {
    lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }
  lines.push("};");
  lines.push("");
  return lines.join("\n");
}

async function fetchExtract(title) {
  const url = new URL(API);
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("formatversion", "2");
  url.searchParams.set("prop", "extracts");
  url.searchParams.set("exintro", "1");
  url.searchParams.set("explaintext", "1");
  url.searchParams.set("exsectionformat", "plain");
  url.searchParams.set("redirects", "1");
  url.searchParams.set("titles", title);

  const headers = {
    "user-agent": "charmingjs-us-map-paper/regen (local dev)",
    accept: "application/json",
  };

  let lastErr;
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, {headers});
    if (res.ok) {
      const json = await res.json();
      const page = json?.query?.pages?.[0];
      const extract = page?.extract;
      if (!extract) throw new Error(`No extract for "${title}"`);
      return extract;
    }
    lastErr = new Error(`HTTP ${res.status} ${res.statusText}`);
    if (res.status === 429 || res.status >= 500) {
      await sleep(750 * Math.pow(1.6, attempt));
      continue;
    }
    break;
  }
  throw lastErr ?? new Error("Fetch failed");
}

async function main() {
  const names = Object.keys(existingStateNotes);
  const out = {};

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const title = TITLE_OVERRIDES[name] ?? name;
    const label = `${i + 1}/${names.length} ${name}`;
    try {
      const extract = await fetchExtract(title);
      const para = firstParagraph(extract);
      const cleaned = trimToCompleteSentence(para, 900);
      out[name] = cleaned;
      // eslint-disable-next-line no-console
      console.log("ok", label, `(${cleaned.length} chars)`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("warn", label, String(err?.message ?? err));
      out[name] = existingStateNotes[name];
    }
    await sleep(260);
  }

  const moduleText = formatObjectAsModule(out);
  await fs.writeFile(OUT_FILE, moduleText, "utf8");
  // eslint-disable-next-line no-console
  console.log("wrote", OUT_FILE);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exitCode = 1;
});
