import {describe, expect, test} from "vitest";
import * as cm from "../src/index.js";

describe("path", () => {
  test("pathLine returns an open line segment path", () => {
    expect(cm.pathLine(1, 2, 3, 4)).toBe("M 1 2 L 3 4");
    expect(cm.pathLine(0, 0, 100, 200)).toBe("M 0 0 L 100 200");
  });

  test("pathCircle returns a closed circle from two arc commands", () => {
    expect(cm.pathCircle(10, 20, 5)).toBe("M 10 15 A 5 5 0 1 0 10 25 A 5 5 0 1 0 10 15");
  });

  test("pathRect returns a closed rectangle path", () => {
    expect(cm.pathRect(0, 0, 100, 50)).toBe("M 0 0 L 100 0 L 100 50 L 0 50 Z");
    expect(cm.pathRect(10, 20, 30, 40)).toBe("M 10 20 L 40 20 L 40 60 L 10 60 Z");
  });

  test("pathEllipse returns a closed ellipse from two elliptical arcs", () => {
    expect(cm.pathEllipse(100, 100, 30, 40)).toBe("M 100 60 A 30 40 0 1 0 100 140 A 30 40 0 1 0 100 60");
  });

  test("pathPolygon returns a closed path through all points", () => {
    expect(
      cm.pathPolygon([
        [0, 0],
        [10, 0],
        [5, 10],
      ]),
    ).toBe("M 0 0 L 10 0 L 5 10 Z");
  });
});
