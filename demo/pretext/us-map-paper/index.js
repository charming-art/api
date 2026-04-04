import * as cm from "charmingjs";
import * as topojson from "topojson-client";
import * as d3 from "d3";
import ClipperLib from "clipper-lib";
import svgpath from "svgpath";
import statesTopology from "us-atlas/states-10m.json";
import {pointsOnPath} from "points-on-path";
import {stateNotes} from "./state-notes.js";

const geo = topojson.feature(statesTopology, statesTopology.objects.states);

const yBias = 0.06;

function initialZoom(w, h, k) {
  const tx = ((1 - k) * w) / 2;
  const ty = ((1 - k) * h) / 2 + h * yBias;
  return d3.zoomIdentity.translate(tx, ty).scale(k);
}

function fitBounds(b, w, h, extent, biasY = 0) {
  const [[x0, y0], [x1, y1]] = b;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const bw = Math.max(x1 - x0, 1e-6);
  const bh = Math.max(y1 - y0, 1e-6);
  const m = 0.12;
  const k = Math.min((w * (1 - 2 * m)) / bw, (h * (1 - 2 * m)) / bh);
  const [lo, hi] = extent;
  const kk = Math.max(lo, Math.min(hi, k));
  const vx = w / 2;
  const vy = h / 2 + h * biasY;
  return d3.zoomIdentity.translate(vx - kk * cx, vy - kk * cy).scale(kk);
}

function zoomPath(d, t) {
  if (!d) return d;
  const k = t.k;
  const {x, y} = t;
  if (k === 1 && x === 0 && y === 0) return d;
  return svgpath(d).matrix([k, 0, 0, k, x, y]).round(2).toString();
}

function toClipPaths(polylines, s) {
  return polylines
    .map((poly) =>
      poly.map(([x, y]) => ({
        X: Math.round(x * s),
        Y: Math.round(y * s),
      })),
    )
    .filter((p) => p.length >= 3);
}

function clipToD(paths, s) {
  const inv = 1 / s;
  const out = [];
  for (const p of paths) {
    if (!p || p.length < 3) continue;
    out.push(`M${(p[0].X * inv).toFixed(2)},${(p[0].Y * inv).toFixed(2)}`);
    for (let i = 1; i < p.length; i++) out.push(`L${(p[i].X * inv).toFixed(2)},${(p[i].Y * inv).toFixed(2)}`);
    out.push("Z");
  }
  return out.join("");
}

function insetPath(d, px) {
  if (!d || !Number.isFinite(px) || px <= 0) return d;
  const polylines = pointsOnPath(d, 0.4, 1.5).filter((p) => p.length >= 3);
  if (!polylines.length) return d;

  const s = 128;
  const subj = toClipPaths(polylines, s);
  if (!subj.length) return d;

  const off = new ClipperLib.ClipperOffset(2, 0.25 * s);
  off.AddPaths(subj, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon);
  const sol = new ClipperLib.Paths();
  off.Execute(sol, -px * s);
  if (!sol.length) return d;
  return clipToD(sol, s);
}

function main() {
  const font = {
    fontFamily: '"Iowan Old Style", Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif',
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    fontSize: 16,
  };

  const layer = document.querySelector("#stage .stage__inner");
  const strokePage = "#f5f0e7";
  const fillMap = "#e0d8cc";
  const fillHover = "#d4c8b7";

  let base = {};
  let inset = {};
  let bounds = {};
  let prep = [];
  let w = 0;
  let h = 0;
  const k0 = 0.7;
  let gap = 4;
  let layoutT = d3.zoomIdentity;
  let resizing = false;

  const root = d3
    .select(layer)
    .append("svg")
    .attr("class", "map-svg")
    .attr("role", "img")
    .attr("aria-label", "U.S. Map Paper")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("width", "100%")
    .style("height", "100%")
    .style("z-index", "0")
    .style("display", "block")
    .style("cursor", "grab")
    .style("touch-action", "none");

  const gMap = root.append("g").attr("class", "zoom-layer");
  const gStates = gMap.append("g").attr("class", "paths");
  const gText = root.append("g").attr("class", "map-text-pan").style("pointer-events", "none");
  const gDebug = root.append("g").attr("class", "map-text-path-debug").style("pointer-events", "none");

  const zoom = d3
    .zoom()
    .scaleExtent([0.35, 4])
    .on("zoom", (event) => {
      const t = event.transform;
      gMap.attr("transform", t);
      if (resizing) return;
      if (Math.abs(t.k - layoutT.k) > 1e-9) {
        layoutT = t;
        drawLabels(t);
        gText.attr("transform", null);
        gDebug.attr("transform", null);
      } else {
        const dx = t.x - layoutT.x;
        const dy = t.y - layoutT.y;
        gText.attr("transform", `translate(${dx},${dy})`);
        gDebug.attr("transform", `translate(${dx},${dy})`);
      }
    });

  const stage = d3
    .select(layer)
    .style("cursor", "grab")
    .on("mousedown", () => root.style("cursor", "grabbing"))
    .on("mouseup", () => root.style("cursor", "grab"))
    .on("mouseleave", () => root.style("cursor", "grab"))
    .call(zoom);

  function focusState(f) {
    const name = f.properties.name;
    const b = bounds[name];
    if (!b || !w || !h) return;
    const t = fitBounds(b, w, h, zoom.scaleExtent(), yBias);
    stage.transition().duration(750).ease(d3.easeCubicInOut).call(zoom.transform, t);
  }

  function clearHover() {
    gStates.selectAll(".state-outline").attr("fill", fillMap);
  }

  function drawStates() {
    const sel = gStates
      .selectAll("path.state-outline")
      .data(geo.features, (d) => d.properties.name)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "state-outline")
            .attr("fill", fillMap)
            .attr("stroke", strokePage)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round"),
        (u) => u,
        (exit) => exit.remove(),
      );

    sel
      .attr("vector-effect", "non-scaling-stroke")
      .style("pointer-events", "all")
      .style("cursor", "pointer")
      .style("transition", "fill 120ms ease")
      .attr("stroke-width", gap)
      .attr("d", (d) => base[d.properties.name])
      .on("mouseenter", function () {
        clearHover();
        d3.select(this).attr("fill", fillHover).raise();
      })
      .on("mouseleave", clearHover)
      .on("click", (e, d) => {
        e.stopPropagation();
        focusState(d);
      });
  }

  function drawLabels(t) {
    const rows = [];
    for (const p of prep) {
      const {name, prepared} = p;
      const d0 = inset[name] ?? base[name];
      if (!d0) continue;
      const path = zoomPath(d0, t);
      const {texts} = cm.layoutTextInPath({
        prepared,
        path,
        repeat: false,
        lineHeight: font.fontSize * 1.5,
      });
      for (const item of texts) rows.push({...item, state: name});
    }

    gText
      .attr("font-size", font.fontSize)
      .attr("font-family", font.fontFamily)
      .attr("font-style", font.fontStyle)
      .attr("font-variant", font.fontVariant)
      .attr("font-weight", font.fontWeight)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .selectAll("text.glyph")
      .data(rows, (d, i) =>
        d.start ? `${d.state}-${d.start.segmentIndex}-${d.start.graphemeIndex}` : `${d.state}-${i}`,
      )
      .join(
        (enter) => enter.append("text").attr("class", "glyph"),

        (u) => u,
        (exit) => exit.remove(),
      )
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("transform", (d) => `rotate(${d.angle}, ${d.x}, ${d.y})`)
      .text((d) => d.text);
  }

  function resize() {
    w = layer.clientWidth || 960;
    h = layer.clientHeight || 540;
    const projection = d3.geoAlbersUsa().fitSize([w, h], geo);
    const geoPath = d3.geoPath(projection);

    base = {};
    inset = {};
    bounds = {};
    prep = [];

    for (const f of geo.features) {
      const name = f.properties.name;
      const d0 = geoPath(f);
      if (!d0) continue;
      base[name] = d0;
      bounds[name] = geoPath.bounds(f);
      inset[name] = insetPath(d0, 5);
      const text = stateNotes[name] ?? `${name}. `;
      prep.push({name, prepared: cm.prepare(text, font), text});
    }

    root.attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`);
    gap = Math.max(2, Math.min(10, Math.min(w, h) * 0.004));

    const z = initialZoom(w, h, k0);
    layoutT = z;
    resizing = true;
    gMap.attr("transform", z);
    drawStates();
    drawLabels(z);
    gText.attr("transform", null);
    d3.select(layer).call(zoom.transform, z);
    resizing = false;
  }

  new ResizeObserver(resize).observe(layer);
  resize();
}

main();
