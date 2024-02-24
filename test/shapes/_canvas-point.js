import * as cm from "../../src/index.js";
import { cell } from "../utils/cell.js";

function testDefaults(app) {
  app.append(cm.point, {});
}

function testDefaultPositions(app) {
  app.append(cm.point, { x: 100, y: 100 });
}

function testStrokeWidth(app) {
  app.append(cm.point, { x: 100, y: 100, strokeWidth: 50 });
}

function testStroke(app) {
  app.append(cm.point, { x: 100, y: 100, strokeWidth: 50, stroke: "orange" });
}

export function _canvasPoint() {
  return cell({
    cellWidth: 200,
    tests: [testDefaults, testDefaultPositions, testStrokeWidth, testStroke],
  });
}
