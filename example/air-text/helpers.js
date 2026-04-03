import * as cm from "charmingjs";
import * as d3 from "d3";
import ClipperLib from "clipper-lib";

export const CLIPPER_SCALE = 256;
export const SCREEN_PATH_PADDING = 20;
export const SCREEN_PATH_PADDING_TOP = 30;
export const MASK_CONTOUR_MAX_DIM = 140;
export const BODYPIX_NUM_PARTS = 24;
export const VIDEO_MAX_LONG_EDGE = 480;

export function videoBufferDimensions(layerW, layerH) {
  const lw = Math.max(2, Math.floor(layerW));
  const lh = Math.max(2, Math.floor(layerH));
  const ar = lw / lh;
  let vw;
  let vh;
  if (lw >= lh) {
    vw = Math.min(VIDEO_MAX_LONG_EDGE, lw);
    vh = Math.max(2, Math.round(vw / ar));
  } else {
    vh = Math.min(VIDEO_MAX_LONG_EDGE, lh);
    vw = Math.max(2, Math.round(vh * ar));
  }
  return {vw, vh};
}

export function rectToRing(x, y, w, h) {
  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
}

export function unionRingsToHolePathStrings(rings) {
  const valid = rings.filter((ring) => ring.length >= 3);
  if (valid.length === 0) {
    return [];
  }
  const s = CLIPPER_SCALE;
  const paths = valid.map((ring) =>
    ring.map(([x, y]) => ({
      X: Math.round(x * s),
      Y: Math.round(y * s),
    })),
  );
  const c = new ClipperLib.Clipper();
  c.AddPaths(paths, ClipperLib.PolyType.ptSubject, true);
  const solution = new ClipperLib.Paths();
  const ok = c.Execute(
    ClipperLib.ClipType.ctUnion,
    solution,
    ClipperLib.PolyFillType.pftNonZero,
    ClipperLib.PolyFillType.pftNonZero,
  );
  const inv = 1 / s;
  if (!ok || !solution.length) {
    return [cm.pathPolygon(valid[0])];
  }
  const out = solution
    .filter((path) => path.length >= 3)
    .map((path) => cm.pathPolygon(path.map(({X, Y}) => [X * inv, Y * inv])));
  return out.length ? out : [cm.pathPolygon(valid[0])];
}

export function getScreenInsetBounds(width, height) {
  const maxPad = Math.max(0, (Math.min(width, height) - 8) / 2);
  const p = Math.min(SCREEN_PATH_PADDING, maxPad);
  const pt = Math.min(SCREEN_PATH_PADDING_TOP, maxPad);
  const innerW = Math.max(1, width - 2 * p);
  const innerH = Math.max(1, height - pt - p);
  return {
    p,
    pt,
    innerW,
    innerH,
    left: p,
    top: pt,
    right: p + innerW,
    bottom: pt + innerH,
  };
}

function clipPolygonRingToInset(ring, left, top, right, bottom) {
  const s = CLIPPER_SCALE;
  if (ring.length < 3) {
    return [];
  }
  const subj = [
    ring.map(([x, y]) => ({
      X: Math.round(x * s),
      Y: Math.round(y * s),
    })),
  ];
  const clip = [
    [
      {X: Math.round(left * s), Y: Math.round(top * s)},
      {X: Math.round(right * s), Y: Math.round(top * s)},
      {X: Math.round(right * s), Y: Math.round(bottom * s)},
      {X: Math.round(left * s), Y: Math.round(bottom * s)},
    ],
  ];
  const c = new ClipperLib.Clipper();
  c.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
  c.AddPaths(clip, ClipperLib.PolyType.ptClip, true);
  const solution = new ClipperLib.Paths();
  const ok = c.Execute(
    ClipperLib.ClipType.ctIntersection,
    solution,
    ClipperLib.PolyFillType.pftNonZero,
    ClipperLib.PolyFillType.pftNonZero,
  );
  if (!ok || !solution.length) {
    return [];
  }
  const inv = 1 / s;
  const out = [];
  for (const path of solution) {
    if (path.length < 3) {
      continue;
    }
    out.push(path.map(({X, Y}) => [X * inv, Y * inv]));
  }
  return out;
}

function samplePartIdGrid(imageData, mw, mh) {
  const iw = imageData.width;
  const ih = imageData.height;
  const ids = new Int32Array(mw * mh);
  const alpha = new Uint8Array(mw * mh);
  for (let j = 0; j < mh; j++) {
    for (let i = 0; i < mw; i++) {
      const sx = Math.min(iw - 1, Math.floor((i + 0.5) * (iw / mw)));
      const sy = Math.min(ih - 1, Math.floor((j + 0.5) * (ih / mh)));
      const o = (sy * iw + sx) * 4;
      const ix = j * mw + i;
      ids[ix] = imageData.data[o];
      alpha[ix] = imageData.data[o + 3];
    }
  }
  return {ids, alpha};
}

function contourBinaryMaskToRings(values, mw, mh, layerW, layerH, minAreaGrid, inset) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }
  if (sum < minAreaGrid) {
    return [];
  }

  const contourGen = d3.contours().size([mw, mh]).smooth(true).thresholds([0.5]);
  const layers = contourGen(values);
  if (!layers.length) {
    return [];
  }

  const multi = layers[0];
  if (!multi.coordinates?.length) {
    return [];
  }

  const sx = layerW / mw;
  const sy = layerH / mh;
  const maxHoleArea = layerW * layerH * 0.45;
  const out = [];

  for (const poly of multi.coordinates) {
    if (!poly?.length) {
      continue;
    }
    const outer = poly[0];
    const aGrid = Math.abs(d3.polygonArea(outer));
    if (aGrid < minAreaGrid || outer.length < 4) {
      continue;
    }
    const aLayer = aGrid * sx * sy;
    if (aLayer > maxHoleArea) {
      continue;
    }
    const scaled = outer.map(([x, y]) => [x * sx, y * sy]);
    const clipped = clipPolygonRingToInset(scaled, inset.left, inset.top, inset.right, inset.bottom);
    for (const ring of clipped) {
      out.push(ring);
    }
  }

  return out;
}

export function maskImageDataToPartHoleRings(imageData, layerW, layerH) {
  if (!imageData?.data || imageData.width < 2 || imageData.height < 2) {
    return [];
  }

  const inset = getScreenInsetBounds(layerW, layerH);
  const iw = imageData.width;
  const ih = imageData.height;
  const scale = Math.min(MASK_CONTOUR_MAX_DIM / iw, MASK_CONTOUR_MAX_DIM / ih, 1);
  const mw = Math.max(8, Math.floor(iw * scale));
  const mh = Math.max(8, Math.floor(ih * scale));

  const {ids, alpha} = samplePartIdGrid(imageData, mw, mh);
  const seen = new Set();
  for (let i = 0; i < ids.length; i++) {
    if (alpha[i] <= 40) {
      continue;
    }
    const pid = ids[i];
    if (pid >= 0 && pid < BODYPIX_NUM_PARTS) {
      seen.add(pid);
    }
  }

  const sortedParts = Array.from(seen).sort((a, b) => a - b);
  const values = new Float64Array(mw * mh);
  const minAreaGrid = 6;
  const holeRings = [];

  for (const pid of sortedParts) {
    for (let i = 0; i < values.length; i++) {
      values[i] = ids[i] === pid && alpha[i] > 40 ? 1 : 0;
    }
    holeRings.push(...contourBinaryMaskToRings(values, mw, mh, layerW, layerH, minAreaGrid, inset));
  }

  return holeRings;
}

export function buildTextPath(width, height, holes) {
  const {p, pt, innerW, innerH} = getScreenInsetBounds(width, height);
  const outer = cm.pathRect(p, pt, innerW, innerH);
  const list = Array.isArray(holes) ? holes.filter(Boolean) : holes ? [holes] : [];
  if (list.length === 0) {
    return outer;
  }
  return `${outer} ${list.join(" ")}`;
}
