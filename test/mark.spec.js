import {Mark, app} from "../src/index.js";
import {test, expect} from "vitest";

test("Mark should have expected defaults.", () => {
  const mark = new Mark();
  expect(mark._children).toEqual([]);
  expect(mark._data).toEqual([0]);
  expect(mark._options).toEqual({});
  expect(mark._tag).toBe(undefined);
  expect(mark._update).toBe(null);
  expect(mark._nodes).toBe(null);
  expect(mark._next).toBe(null);
  expect(mark._nodesChildren).toBe(null);
});

test("Mark.clone should return a new Mark with the same properties", () => {
  const mark = new Mark("svg:circle", [1, 2, 3], {cx: 0, cy: 0, r: 10}, []);
  const cloned = mark.clone();
  expect(cloned).toBeInstanceOf(Mark);
  expect(cloned._tag).toBe("svg:circle");
  expect(cloned._data).toEqual([1, 2, 3]);
  expect(cloned._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(cloned._children).toEqual([]);
});

test("app should pass expected params to Mark.render", () => {
  class Test extends Mark {
    render(tag, options, values, context) {
      expect(tag).toBe("svg:circle");
      expect(options).toEqual({cx: 0, cy: 0, r: 10});
      expect(values).toEqual({datum: 0, i: 0, data: [0]});
      expect(context).toEqual({width: 100, height: 200, use: {}});
      return super.render(tag, options, values, context);
    }
  }

  app({draw: [new Test("svg:circle", {cx: 0, cy: 0, r: 10})], width: 100, height: 200}).render();
});
