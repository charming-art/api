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
}) {
  const points = pointsOnPath(path);
  const lines = hachureLines(points, Math.round(lineHeight), angle);

  let cursor = {segmentIndex: 0, graphemeIndex: 0};

  const texts = [];
  for (const link of lines) {
    const width = dist(link);
    if (!width) continue;
    let currentWidth = 0;
    while (currentWidth < width) {
      const diffW = width - currentWidth;
      let text = layoutNextLine(prepared, cursor, diffW);
      if (text === null) {
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
      currentWidth += text.width + prepared.discretionaryHyphenWidth;
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
  const font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`.replace(/\s+/g, " ").trim();
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
