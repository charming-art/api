import * as cm from "../../src/index.js";
import { cell } from "../utils/cell.js";

function testDefaults(app) {
  app.append(cm.circle, {});
}

function testDefaultPositions(app) {
  app.append(cm.circle, { r: 100 });
}

function testColors(app, width, height) {
  app.append(cm.circle, {
    x: width / 2,
    y: height / 2,
    r: 50,
    fill: "steelblue",
    stroke: "orange",
  });
}

function testStrokeWidth(app, width, height) {
  app.append(cm.circle, {
    x: width / 2,
    y: height / 2,
    r: 50,
    fill: "steelblue",
    stroke: "orange",
    strokeWidth: 10,
  });
}

function testOpacity1(app, width, height) {
  app.append(cm.circle, {
    x: width / 2,
    y: height / 2,
    r: 50,
    fill: "steelblue",
    stroke: "orange",
    strokeWidth: 10,
    strokeOpacity: 0.5,
    fillOpacity: 0.5,
  });
}

function testOpacity2(app, width, height) {
  app.append(cm.circle, {
    x: width / 2,
    y: height / 2,
    r: 50,
    fill: "rgba(85, 128, 176, 0.8)",
    stroke: "rgba(255, 165, 0, 0.8)",
    strokeWidth: 10,
  });
}

function testOpacityPriority(app, width, height) {
  app.append(cm.circle, {
    x: width / 2,
    y: height / 2,
    r: 50,
    fill: "rgba(85, 128, 176, 0.8)",
    stroke: "rgba(255, 165, 0, 0.8)",
    strokeWidth: 10,
    strokeOpacity: 0.5,
    fillOpacity: 0.5,
  });
}

export function _canvasCircle() {
  return cell({
    cellWidth: 200,
    tests: [
      testDefaults,
      testDefaultPositions,
      testColors,
      testStrokeWidth,
      testOpacity1,
      testOpacity2,
      testOpacityPriority,
    ],
  });
}
