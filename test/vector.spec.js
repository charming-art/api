import * as cm from "../src/index.js";
import { describe, expect, test } from "vitest";

describe("vec", () => {
  test("cm.vec()", () => {
    const v = cm.vec();
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  test("cm.vec(x, y)", () => {
    const v = cm.vec(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });
});

describe("add", () => {
  test("cm.vecAdd(a, b)", () => {
    const a = cm.vec(1, 2);
    const b = cm.vec(2, 3);
    const out = cm.vecAdd(a, b);
    expect(out.x).toBe(3);
    expect(out.y).toBe(5);
  });

  test("vec.add(a)", () => {
    const a = cm.vec(1, 2);
    const b = cm.vec(2, 3);
    expect(a.add(b)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(5);
    expect(b.x).toBe(2);
    expect(b.y).toBe(3);
  });
});

describe("angle", () => {
  test("cm.vecAngle(a)", () => {
    const a = cm.vec(1, 1);
    expect(cm.vecAngle(a)).toBeCloseTo(Math.PI / 4);
    expect(a.x).toBe(1);
    expect(a.y).toBe(1);
  });

  test("vec.angle()", () => {
    const a = cm.vec(1, 1);
    expect(a.angle()).toBeCloseTo(Math.PI / 4);
    expect(a.x).toBe(1);
    expect(a.y).toBe(1);
  });
});

describe("clamp", () => {
  test("cm.vecClamp(a, max)", () => {
    const a = cm.vec(6, 8);
    const b = cm.vecClamp(a, 5);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
    expect(b.x).toBe(3);
    expect(b.y).toBe(4);
  });

  test("cm.vecClamp(a, min, max)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecClamp(a, 10, 15);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(6);
    expect(b.y).toBe(8);
  });

  test("vec.clamp(max)", () => {
    const a = cm.vec(6, 8);
    expect(a.clamp(5)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("vec.clamp(min, max)", () => {
    const a = cm.vec(3, 4);
    expect(a.clamp(10, 15)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
  });

  test("cm.vecClampX(a, max)", () => {
    const a = cm.vec(6, 8);
    const b = cm.vecClampX(a, 5);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
    expect(b.x).toBe(5);
    expect(b.y).toBe(8);
  });

  test("cm.vecClampX(a, min, max)", () => {
    const a = cm.vec(6, 8);
    const b = cm.vecClampX(a, 10, 15);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
    expect(b.x).toBe(10);
    expect(b.y).toBe(8);
  });

  test("vec.clampX(max)", () => {
    const a = cm.vec(6, 8);
    expect(a.clampX(5)).toBe(a);
    expect(a.x).toBe(5);
    expect(a.y).toBe(8);
  });

  test("vec.clampX(min, max)", () => {
    const a = cm.vec(6, 8);
    expect(a.clampX(10, 15)).toBe(a);
    expect(a.x).toBe(10);
    expect(a.y).toBe(8);
  });

  test("cm.vecClampY(a, max)", () => {
    const a = cm.vec(6, 8);
    const b = cm.vecClampY(a, 5);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
    expect(b.x).toBe(6);
    expect(b.y).toBe(5);
  });

  test("cm.vecClampY(a, min, max)", () => {
    const a = cm.vec(6, 8);
    const b = cm.vecClampY(a, 10, 15);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
    expect(b.x).toBe(6);
    expect(b.y).toBe(10);
  });

  test("vec.clampY(max)", () => {
    const a = cm.vec(6, 8);
    expect(a.clampY(5)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(5);
  });

  test("vec.clampY(min, max)", () => {
    const a = cm.vec(6, 8);
    expect(a.clampY(10, 15)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(10);
  });
});

describe("clone", () => {
  test("vec.clone()", () => {
    const a = cm.vec(3, 4);
    const b = a.clone();
    b.set(1, 2);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });
});

describe("cross", () => {
  test("cm.vecCross(a, b)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec(1, 2);
    expect(cm.vecCross(a, b)).toBe(2);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });

  test("vec.cross(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec(1, 2);
    expect(a.cross(b)).toBe(2);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });
});

describe("dist", () => {
  test("cm.vecDist(a, b)", () => {
    const a = cm.vec(4, 6);
    const b = cm.vec(1, 2);
    expect(cm.vecDist(a, b)).toBe(5);
    expect(a.x).toBe(4);
    expect(a.y).toBe(6);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });

  test("cm.vecDist2(a)", () => {
    const a = cm.vec(4, 6);
    const b = cm.vec(1, 2);
    expect(cm.vecDist2(a, b)).toBe(25);
    expect(a.x).toBe(4);
    expect(a.y).toBe(6);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });

  test("cm.dist(b)", () => {
    const a = cm.vec(4, 6);
    const b = cm.vec(1, 2);
    expect(a.dist(b)).toBe(5);
    expect(a.x).toBe(4);
    expect(a.y).toBe(6);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });

  test("cm.dist2(b)", () => {
    const a = cm.vec(4, 6);
    const b = cm.vec(1, 2);
    expect(a.dist2(b)).toBe(25);
    expect(a.x).toBe(4);
    expect(a.y).toBe(6);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });
});

describe("div", () => {
  test("cm.vecDiv(s)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecDiv(a, 0.5);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(6);
    expect(b.y).toBe(8);
  });

  test("vec.div(s)", () => {
    const a = cm.vec(3, 4);
    expect(a.div(0.5)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
  });
});

describe("dot", () => {
  test("cm.vecDot(a, b)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec(1, 2);
    expect(cm.vecDot(a, b)).toBe(11);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });

  test("vec.dot(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec(1, 2);
    expect(a.dot(b)).toBe(11);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
  });
});

describe("cm.vecFromAngle", () => {
  test("cm.vecFromAngle", () => {
    const theta = Math.PI / 3;
    const vec = cm.vecFromAngle(theta);
    expect(vec.x).toBeCloseTo(0.5);
    expect(vec.y).toBeCloseTo(0.5 * Math.sqrt(3));
  });
});

describe("in", () => {
  test("cm.vecInX(a, max)", () => {
    const a = cm.vec(3, 4);
    expect(cm.vecInX(a, 2)).toBe(false);
    expect(cm.vecInX(a, 3)).toBe(true);
    expect(cm.vecInX(a, 4)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);

    expect(cm.vecInX(cm.vec(-2, -2), 2)).toBe(false);
  });

  test("cm.vecInX(a, min, max)", () => {
    const a = cm.vec(3, 4);
    expect(cm.vecInX(a, 1, 2)).toBe(false);
    expect(cm.vecInX(a, 1, 3)).toBe(true);
    expect(cm.vecInX(a, 1, 4)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("cm.vecInY(a, max)", () => {
    const a = cm.vec(3, 4);
    expect(cm.vecInY(a, 3)).toBe(false);
    expect(cm.vecInY(a, 4)).toBe(true);
    expect(cm.vecInY(a, 5)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);

    expect(cm.vecInX(cm.vec(-2, -2), 2)).toBe(false);
  });

  test("cm.vecInY(a, min, max)", () => {
    const a = cm.vec(3, 4);
    expect(cm.vecInY(a, 1, 3)).toBe(false);
    expect(cm.vecInY(a, 1, 4)).toBe(true);
    expect(cm.vecInY(a, 1, 5)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("vec.inX(max)", () => {
    const a = cm.vec(3, 4);
    expect(a.inX(2)).toBe(false);
    expect(a.inX(3)).toBe(true);
    expect(a.inX(4)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);

    expect(cm.vec(-2, -2).inX(2)).toBe(false);
  });

  test("vec.inX(min, max)", () => {
    const a = cm.vec(3, 4);
    expect(a.inX(1, 2)).toBe(false);
    expect(a.inX(1, 3)).toBe(true);
    expect(a.inX(1, 4)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("vec.inY(max)", () => {
    const a = cm.vec(3, 4);
    expect(a.inY(3)).toBe(false);
    expect(a.inY(4)).toBe(true);
    expect(a.inY(5)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);

    expect(cm.vec(-2, -2).inY(2)).toBe(false);
  });

  test("vec.inY(a, min, max)", () => {
    const a = cm.vec(3, 4);
    expect(a.inY(1, 3)).toBe(false);
    expect(a.inY(1, 4)).toBe(true);
    expect(a.inY(1, 5)).toBe(true);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });
});

describe("mag", () => {
  test("cm.vecMag(a)", () => {
    const a = cm.vec(3, 4);
    expect(cm.vecMag(a)).toBe(5);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("cm.vecMag(a, s)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecMag(a, 10);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(6);
    expect(b.y).toBe(8);
  });

  test("vec.mag()", () => {
    const a = cm.vec(3, 4);
    expect(a.mag()).toBe(5);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("vec.mag(s)", () => {
    const a = cm.vec(3, 4);
    expect(a.mag(10)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
  });

  test("vec.norm()", () => {
    const a = cm.vec(0, 0);
    a.mag(10);
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
  });
});

describe("mult", () => {
  test("cm.vecMult(s)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecMult(a, 2);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(6);
    expect(b.y).toBe(8);
  });

  test("vec.mult(s)", () => {
    const a = cm.vec(3, 4);
    expect(a.mult(2)).toBe(a);
    expect(a.x).toBe(6);
    expect(a.y).toBe(8);
  });
});

describe("neg", () => {
  test("cm.vecNeg(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecNeg(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(-3);
    expect(b.y).toBe(-4);
  });

  test("cm.vecNegX(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecNegX(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(-3);
    expect(b.y).toBe(4);
  });

  test("cm.vecNegY(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecNegY(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(3);
    expect(b.y).toBe(-4);
  });

  test("vec.neg()", () => {
    const a = cm.vec(3, 4);
    expect(a.neg()).toBe(a);
    expect(a.x).toBe(-3);
    expect(a.y).toBe(-4);
  });

  test("vec.negX()", () => {
    const a = cm.vec(3, 4);
    expect(a.negX()).toBe(a);
    expect(a.x).toBe(-3);
    expect(a.y).toBe(4);
  });

  test("vec.negY()", () => {
    const a = cm.vec(3, 4);
    expect(a.negY()).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(-4);
  });
});

describe("norm", () => {
  test("cm.vecNorm(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vecNorm(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(0.6);
    expect(b.y).toBe(0.8);
  });

  test("vec.norm()", () => {
    const a = cm.vec(3, 4);
    expect(a.norm()).toBe(a);
    expect(a.x).toBe(0.6);
    expect(a.y).toBe(0.8);
  });

  test("vec.norm()", () => {
    const a = cm.vec(0, 0);
    a.norm();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
  });
});

describe("out", () => {
  test("vec.out(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec();
    expect(a.out(b)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(3);
    expect(b.y).toBe(4);
  });

  test("vec.outX(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec();
    expect(a.outX(b)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(3);
    expect(b.y).toBe(0);
  });

  test("vec.outY(a)", () => {
    const a = cm.vec(3, 4);
    const b = cm.vec();
    expect(a.outY(b)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(0);
    expect(b.y).toBe(4);
  });
});

describe("random", () => {
  test("cm.vecRandom()", () => {
    const a = cm.vecRandom();
    expect(a.x).greaterThanOrEqual(0);
    expect(a.x).lessThanOrEqual(1);
    expect(a.y).greaterThanOrEqual(0);
    expect(a.y).lessThanOrEqual(1);
  });

  test("vec.random()", () => {
    const a = cm.vec(2, 3);
    expect(a.random()).toBe(a);
    expect(a.x).greaterThanOrEqual(0);
    expect(a.x).lessThanOrEqual(1);
    expect(a.y).greaterThanOrEqual(0);
    expect(a.y).lessThanOrEqual(1);
  });
});

describe("set", () => {
  test("vec.set(vec)", () => {
    const a = cm.vec(1, 2);
    const b = cm.vec(3, 4);
    expect(a.set(b)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
    expect(b.x).toBe(3);
    expect(b.y).toBe(4);
  });

  test("vec.set(a, b)", () => {
    const a = cm.vec(1, 2);
    a.set(3, 4);
    expect(a.x).toBe(3);
    expect(a.y).toBe(4);
  });

  test("vec.setX(x)", () => {
    const a = cm.vec(1, 2);
    expect(a.setX(3)).toBe(a);
    expect(a.x).toBe(3);
    expect(a.y).toBe(2);
  });

  test("vec.setY(y)", () => {
    const a = cm.vec(1, 2);
    expect(a.setY(3)).toBe(a);
    expect(a.x).toBe(1);
    expect(a.y).toBe(3);
  });
});

describe("sub", () => {
  test("cm.vecSub(a, b)", () => {
    const a = cm.vec(1, 2);
    const b = cm.vec(2, 4);
    const out = cm.vecSub(a, b);
    expect(out.x).toBe(-1);
    expect(out.y).toBe(-2);
  });

  test("vec.sub(a)", () => {
    const a = cm.vec(1, 2);
    const b = cm.vec(2, 4);
    expect(a.sub(b)).toBe(a);
    expect(a.x).toBe(-1);
    expect(a.y).toBe(-2);
    expect(b.x).toBe(2);
    expect(b.y).toBe(4);
  });
});
