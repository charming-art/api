import ml5 from "ml5";
import * as cm from "charmingjs";
import * as d3 from "d3";
import {layoutWithLines} from "@chenglou/pretext";
import {TEXT, TITLE_TEXT} from "./content.js";
import {
  buildTextPath,
  getScreenInsetBounds,
  maskImageDataToPartHoleRings,
  rectToRing,
  unionRingsToHolePathStrings,
  videoBufferDimensions,
} from "./helpers.js";

function getMl5() {
  const m = ml5?.default ?? ml5;
  return m;
}

const TITLE_WRAP_WIDTH = 500;
const TITLE_MARGIN_TOP = 20;
const TITLE_PADDING = 4;

const titleFont = {
  fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Palatino, serif",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "600",
  fontSize: 44,
  lineHeight: 52,
};

const font = {
  fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Palatino, serif",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontSize: 22,
  lineHeight: 22 * 1.5,
};

function computeTitleBlock(layerW, layerH) {
  const inset = getScreenInsetBounds(layerW, layerH);
  const maxOuterW = Math.min(TITLE_WRAP_WIDTH, Math.max(64, inset.innerW - 24));
  const pad = TITLE_PADDING;
  const contentW = Math.max(30, maxOuterW - 2 * pad);
  const prepared = cm.prepare(TITLE_TEXT, titleFont);
  const {lines, height: contentH} = layoutWithLines(prepared, contentW, titleFont.lineHeight);
  const holeW = contentW + 2 * pad;
  const holeH = contentH + 2 * pad;
  const holeX = inset.left + (inset.innerW - holeW) / 2;
  const holeY = inset.top + TITLE_MARGIN_TOP;
  const x = holeX + pad;
  const y = holeY + pad;
  return {
    x,
    y,
    width: contentW,
    height: contentH,
    lines,
    holeX,
    holeY,
    holeW,
    holeH,
  };
}

function buildPathWithBodyHoles(layerW, layerH, bodyRings) {
  const title = computeTitleBlock(layerW, layerH);
  const titleRing = rectToRing(title.holeX, title.holeY, title.holeW, title.holeH);
  const mergedHoles = unionRingsToHolePathStrings([titleRing, ...bodyRings]);
  mergedHoles.sort();
  const pathStr = buildTextPath(layerW, layerH, mergedHoles);
  return {pathStr, title};
}

function main() {
  const layer = document.querySelector("#layer");
  const video = document.querySelector("#webcam");

  let lastPath = "";
  let lastDrawAt = 0;
  const minIntervalMs = 85;

  function syncVideoElSize() {
    const {vw, vh} = videoBufferDimensions(layer.clientWidth, layer.clientHeight);
    video.width = vw;
    video.height = vh;
    video.style.width = `${vw}px`;
    video.style.height = `${vh}px`;
  }

  function drawFromPath(pathStr, titleBlock) {
    const width = layer.clientWidth;
    const height = layer.clientHeight;
    if (width < 4 || height < 4) {
      return;
    }

    const layout = cm.layoutTextInPath({
      text: TEXT,
      path: pathStr,
      repeat: false,
      ...font,
    });

    d3.select(layer)
      .selectAll(".line")
      .data(layout.texts, (_d, i) => i)
      .join("span")
      .attr("class", "line")
      .text((d) => d.text)
      .style("left", (d) => `${d.x}px`)
      .style("top", (d) => `${d.y}px`)
      .style("transform", (d) => `translate(-50%, -50%) rotate(${d.angle}deg)`)
      .style("font", cm.cssFont(font));

    d3.select(layer)
      .selectAll(".title-line")
      .data(titleBlock.lines, (_d, i) => i)
      .join("span")
      .attr("class", "title-line")
      .text((d) => d.text)
      .style("left", (d) => {
        const cx = titleBlock.x + titleBlock.width / 2;
        return `${cx - d.width / 2}px`;
      })
      .style("top", (_d, i) => `${titleBlock.y + i * titleFont.lineHeight + titleFont.lineHeight / 2}px`)
      .style("transform", "translate(0, -50%)")
      .style("font", cm.cssFont(titleFont));
  }

  function redrawWithoutBodySegments() {
    const w = layer.clientWidth;
    const h = layer.clientHeight;
    const {pathStr, title} = buildPathWithBodyHoles(w, h, []);
    drawFromPath(pathStr, title);
  }

  function onSegmentation(result) {
    const now = performance.now();
    if (now - lastDrawAt < minIntervalMs) {
      return;
    }
    lastDrawAt = now;

    const w = layer.clientWidth;
    const h = layer.clientHeight;
    const bodyRings = maskImageDataToPartHoleRings(result?.imageData ?? null, w, h);
    const {pathStr, title} = buildPathWithBodyHoles(w, h, bodyRings);
    if (pathStr === lastPath) {
      return;
    }
    lastPath = pathStr;
    drawFromPath(pathStr, title);
  }

  const ro = new ResizeObserver(() => {
    syncVideoElSize();
    lastPath = "";
    redrawWithoutBodySegments();
  });
  ro.observe(layer);

  async function startSegmentationLoop(model) {
    if (typeof model.detectStart === "function") {
      model.detectStart(video, onSegmentation);
      return () => model.detectStop?.();
    }
    let running = true;
    async function tick() {
      if (!running) {
        return;
      }
      try {
        const result = await model.detect(video);
        onSegmentation(result);
      } catch {}
      if (running) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
    return () => {
      running = false;
    };
  }

  async function bootstrap() {
    const m = getMl5();
    const raw = m.bodySegmentation("BodyPix", {
      architecture: "MobileNetV1",
      multiplier: 0.75,
      outputStride: 16,
      quantBytes: 2,
      maskType: "parts",
      segmentBodyParts: true,
      flipHorizontal: true,
    });
    let segModel = await Promise.resolve(raw);
    if (segModel?.ready?.then) {
      const loaded = await segModel.ready;
      if (typeof loaded?.detect === "function") {
        segModel = loaded;
      }
    }
    if (!segModel || typeof segModel.detect !== "function") {
      redrawWithoutBodySegments();
      return;
    }

    try {
      syncVideoElSize();
      const vw = video.width;
      const vh = video.height;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: {ideal: vw},
          height: {ideal: vh},
        },
      });
      video.srcObject = stream;
      await video.play();
      syncVideoElSize();
      redrawWithoutBodySegments();
      await startSegmentationLoop(segModel);
    } catch {
      redrawWithoutBodySegments();
    }
  }

  syncVideoElSize();
  redrawWithoutBodySegments();
  void bootstrap();
}

main();
