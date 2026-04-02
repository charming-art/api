import "./install-canvas-mock.js";
import {afterEach, describe, expect, test} from "vitest";
import {_prepareMemo} from "../src/pretext/index.js";
import * as cm from "../src/index.js";

const defaultLayoutFont = {
  fontSize: 16,
  fontFamily: "Inter",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
};

afterEach(() => {
  cm.clearPrepareCache();
});

describe("prepare", () => {
  test("returns prepared text with font fields copied from options", () => {
    const p = cm.prepare("hello", {
      fontSize: 14,
      fontFamily: "Georgia",
      fontStyle: "italic",
      fontVariant: "normal",
      fontWeight: "600",
    });
    expect(p.fontSize).toBe(14);
    expect(p.fontFamily).toBe("Georgia");
    expect(p.fontStyle).toBe("italic");
    expect(p.fontVariant).toBe("normal");
    expect(p.fontWeight).toBe("600");
  });

  test("uses default font options (Inter 16px, normal)", () => {
    const p = cm.prepare("hi");
    expect(p.fontSize).toBe(16);
    expect(p.fontFamily).toBe("Inter");
    expect(p.fontStyle).toBe("normal");
    expect(p.fontVariant).toBe("normal");
    expect(p.fontWeight).toBe("normal");
  });
});

describe("prepareMemo cache (_prepareMemo)", () => {
  test("same text and font options return the same prepared object", () => {
    const a = _prepareMemo("cache-key", defaultLayoutFont);
    const b = _prepareMemo("cache-key", defaultLayoutFont);
    expect(a).toBe(b);
  });

  test("clearPrepareCache invalidates the memo (next call is a new object)", () => {
    const a = _prepareMemo("cache-key", defaultLayoutFont);
    cm.clearPrepareCache();
    const b = _prepareMemo("cache-key", defaultLayoutFont);
    expect(b).not.toBe(a);
  });
});

describe("clearPrepareCache", () => {
  test("standalone prepare is not memoized (always new references)", () => {
    const a = cm.prepare("x");
    const b = cm.prepare("x");
    expect(a).not.toBe(b);
  });

  test("is safe to call multiple times", () => {
    expect(() => {
      cm.clearPrepareCache();
      cm.clearPrepareCache();
    }).not.toThrow();
  });
});

describe("layoutTextInPath", () => {
  test("returns an object with texts, lines, font fields, and path", () => {
    const path = cm.pathCircle(200, 200, 90);
    const result = cm.layoutTextInPath({
      text: "hello world ".repeat(40),
      path,
      fontSize: 16,
      fontFamily: "Inter",
    });

    expect(result).toMatchObject({
      texts: expect.any(Array),
      lines: expect.any(Array),
      fontSize: 16,
      fontFamily: "Inter",
      fontStyle: "normal",
      fontVariant: "normal",
      fontWeight: "normal",
      path,
    });
  });

  test("hachure lines are segments [ [x1,y1], [x2,y2] ]", () => {
    const result = cm.layoutTextInPath({
      text: "a ".repeat(200),
      path: cm.pathCircle(200, 200, 100),
    });

    expect(result.lines.length).toBeGreaterThan(0);
    for (const seg of result.lines) {
      expect(seg).toHaveLength(2);
      expect(seg[0]).toEqual([expect.any(Number), expect.any(Number)]);
      expect(seg[1]).toEqual([expect.any(Number), expect.any(Number)]);
    }
  });

  test("text items combine Pretext layout lines with x, y, angle, lineHeight", () => {
    const result = cm.layoutTextInPath({
      text: "hello world ".repeat(40),
      path: cm.pathCircle(200, 200, 90),
    });

    expect(result.texts.length).toBeGreaterThan(0);
    for (const item of result.texts) {
      expect(item).toMatchObject({
        text: expect.any(String),
        width: expect.any(Number),
        start: {
          segmentIndex: expect.any(Number),
          graphemeIndex: expect.any(Number),
        },
        end: {
          segmentIndex: expect.any(Number),
          graphemeIndex: expect.any(Number),
        },
        x: expect.any(Number),
        y: expect.any(Number),
        angle: expect.any(Number),
        lineHeight: expect.any(Number),
      });
    }
  });
});
