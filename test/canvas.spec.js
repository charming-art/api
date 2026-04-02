import {describe, expect, test} from "vitest";
import {cssFont} from "../src/canvas/index.js";

describe("cssFont", () => {
  test("uses defaults when called with no arguments", () => {
    expect(cssFont()).toBe("normal normal normal 10px sans-serif");
  });

  test("builds CSS font shorthand from options", () => {
    expect(
      cssFont({
        fontStyle: "italic",
        fontVariant: "normal",
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Georgia, serif",
      }),
    ).toBe("italic normal 700 16px Georgia, serif");
  });

  test("ignores unknown keys on the options object", () => {
    expect(
      cssFont({
        fontSize: 12,
        fontFamily: "serif",
        lineHeight: 32,
      }),
    ).toBe("normal normal normal 12px serif");
  });

  test("collapses extra whitespace in the result", () => {
    expect(cssFont({fontStyle: "italic  ", fontWeight: "  bold", fontSize: 10, fontFamily: "  A  "})).toBe(
      "italic normal bold 10px A",
    );
  });
});
