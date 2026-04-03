import {pointsOnPath} from "points-on-path";
import {hachureLines} from "hachure-fill";
import {layoutNextLine, prepareWithSegments, clearCache} from "@chenglou/pretext";

function dist(line) {
  const [p1, p2] = line;
  return Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function px(n) {
  return typeof n === "number" ? `${n}px` : n;
}

function useMemo(fn) {
  const cache = new Map();
  const memoized = (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
  const clear = () => cache.clear();
  return [memoized, clear];
}

const [prepareMemo, clearPrepareMemo] = useMemo((text, opts) => prepare(text, opts));

/** Memoized `prepare` for `layoutTextInPath`; exposed as `_prepareMemo` for tests only. */
export {prepareMemo as _prepareMemo};

export function layoutTextInPath({
  text,
  fontSize = 16,
  fontFamily = "Inter",
  fontStyle = "normal",
  fontVariant = "normal",
  fontWeight = "normal",
  path,
  angle = 0,
  prepared = prepareMemo(text, {fontSize, fontFamily, fontStyle, fontVariant, fontWeight}),
  lineHeight = parseFloat(fontSize) * 1.25,
  repeat = true,
}) {
  const points = pointsOnPath(path);
  const lines = hachureLines(points, Math.round(lineHeight), angle);
  const space = prepared.discretionaryHyphenWidth;

  let cursor = {segmentIndex: 0, graphemeIndex: 0};

  const texts = [];

  place: for (const link of lines) {
    const width = dist(link);
    if (!width) continue;
    let currentWidth = 0;
    while (currentWidth < width) {
      const diffW = width - currentWidth;
      // One space for the text, one space for the space between text.
      if (diffW < space * 2) break;
      let text = layoutNextLine(prepared, cursor, diffW);
      if (text === null) {
        if (!repeat) break place;
        cursor = {segmentIndex: 0, graphemeIndex: 0};
        text = layoutNextLine(prepared, cursor, diffW);
      }
      cursor = text.end;
      const rotate = -angle;
      const r = currentWidth + text.width / 2;
      text.x = link[0][0] + r * Math.cos(degToRad(rotate));
      text.y = link[0][1] + r * Math.sin(degToRad(rotate));
      text.angle = rotate;
      text.lineHeight = lineHeight;
      texts.push(text);
      currentWidth += text.width + space;
    }
  }

  return {texts, lines, fontSize, fontFamily, fontStyle, fontVariant, fontWeight, path};
}

/**
 * Builds the CSS `font` string for Pretext measurement (same order as the `font` shorthand).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font
 */
export function prepare(
  text,
  {
    fontSize = 16,
    fontFamily = "Inter",
    fontStyle = "normal",
    fontVariant = "normal",
    fontWeight = "normal",
    ...rest
  } = {},
) {
  const font = `${fontStyle} ${fontVariant} ${fontWeight} ${px(fontSize)} ${fontFamily}`.replace(/\s+/g, " ").trim();
  const prepared = prepareWithSegments(text, font, rest);
  prepared.fontSize = fontSize;
  prepared.fontFamily = fontFamily;
  prepared.fontStyle = fontStyle;
  prepared.fontVariant = fontVariant;
  prepared.fontWeight = fontWeight;
  return prepared;
}

export function clearPrepareCache() {
  clearPrepareMemo();
  clearCache();
}
