import * as cm from "charmingjs";
import * as d3 from "d3";
import svgpath from "svgpath";

function computeYinYangPaths({cx, cy, radius, k}) {
  const radius1 = radius * k;
  const radius2 = (radius / 5) * k;
  const radius3 = (radius / 5) * (1 - k);
  const radius4 = radius * (1 - k);

  // Use d3.path() so the canvas-arc recipe becomes an SVG path string.
  const p = d3.path();
  p.moveTo(cx, cy - radius);
  p.arc(cx, cy + (radius1 - radius), radius1, -Math.PI / 2, Math.PI / 2);
  p.arc(cx, cy + radius1, radius4, -Math.PI / 2, Math.PI / 2, true);
  p.arc(cx, cy, radius, Math.PI / 2, -Math.PI / 2);

  // Dots as subpaths (kept for clip correctness with evenodd).
  p.moveTo(cx + radius2, cy + (radius1 - radius));
  p.arc(cx, cy + (radius1 - radius), radius2, 0, 2 * Math.PI, true);
  p.moveTo(cx + radius3, cy + radius1);
  p.arc(cx, cy + radius1, radius3, 0, 2 * Math.PI);

  const yin = p.toString();
  const yang = `${cm.pathCircle(cx, cy, radius)} ${yin}`;
  return [yin, yang];
}

function main() {
  const font = {
    fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Palatino, serif",
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 32,
  };

  const layer = document.querySelector("#stage .stage__inner");

  function draw(t = (Date.now() / 20000) % 1) {
    const width = layer.clientWidth || 800;
    const height = layer.clientHeight || 800;
    const radius = Math.min(width, height) / 2 - 30;
    const cx = width / 2;
    const cy = height / 2;

    const r = t * 2 * Math.PI;
    const k = (Math.sin(r) + 1) / 2;
    const a = t * 360;
    const [yin, yang] = computeYinYangPaths({cx, cy, radius, k});
    const yinRotated = svgpath(yin).rotate(a, cx, cy).toString();
    const yangRotated = svgpath(yang).rotate(a, cx, cy).toString();

    const yinDescription =
      "Yin represents stillness, darkness, and inward movement in Chinese philosophy. It is often associated with the moon, nighttime, coolness, and rest—things that contract, settle, and absorb. Yin can be seen in moments of quiet, recovery, and reflection, such as sleeping, listening, or turning inward to think and feel. It provides grounding, depth, and restoration, allowing energy to be conserved and renewed beneath the surface. More broadly, Yin reflects all forces that are passive, hidden, and internally directed. It appears in natural cycles like sunset, winter, and downward growth, where energy slows down and turns inward. In human life, Yin can be seen in introspection, patience, care, and emotional awareness—situations where stillness and receptivity are more important than action. It is also connected to intuition and sensitivity, helping people process experiences, understand themselves, and respond thoughtfully rather than react impulsively. At the same time, Yin is not meant to exist on its own. In the Yin Yang framework, every expression of Yin contains a trace of Yang, and too much Yin can lead to imbalance, such as passivity, stagnation, or withdrawal. This is why Yin always exists in a dynamic relationship with Yang, constantly adjusting and transforming. True harmony comes not from remaining still, but from allowing Yin to support and balance Yang, creating a continuous and natural flow between rest and activity.";

    const yangDescription =
      "Yang represents energy, brightness, and outward movement in Chinese philosophy. It is often associated with the sun, daytime, heat, and action—things that expand, rise, and express themselves. Yang can be seen in moments of activity, growth, and creativity, such as working, speaking, or pushing forward toward a goal. It brings strength, momentum, and transformation, helping things develop and change. More broadly, Yang reflects all forces that are active, visible, and externally directed. It is present in natural cycles like sunrise, summer, and upward growth, where energy is at its peak and things are moving toward expansion. In human life, Yang can be seen in ambition, leadership, communication, and physical movement—any situation where energy is being projected outward into the world. It is also connected to clarity and decisiveness, helping people take action, make choices, and shape their environment. At the same time, Yang is not meant to exist on its own. In the Yin Yang framework, every expression of Yang carries a seed of Yin within it, and excessive Yang can lead to imbalance, such as burnout, aggression, or overstimulation. This is why Yang always exists in a dynamic relationship with Yin, continuously shifting and adjusting. True harmony comes not from maximizing Yang, but from allowing it to rise and fall naturally in balance with its counterpart, creating a stable yet ever-changing flow of energy.";

    const darkLayout = cm.layoutTextInPath({
      text: yinDescription.repeat(24),
      path: yinRotated,
      ...font,
    });

    const lightLayout = cm.layoutTextInPath({
      text: yangDescription.repeat(22),
      path: yangRotated,
      ...font,
    });

    d3.select(layer)
      .selectAll(".line")
      .data([
        ...darkLayout.texts.map((d) => ({...d, type: "dark"})),
        ...lightLayout.texts.map((d) => ({...d, type: "light"})),
      ])
      .join("span")
      .attr("class", (d) => `${d.type} line`)
      .text((d) => d.text)
      .style("left", (d) => `${d.x}px`)
      .style("top", (d) => `${d.y}px`)
      .style("transform", (d) => `translate(-50%, -50%) rotate(${d.angle}deg)`)
      .style("font", cm.cssFont(font));
  }

  let timer = null;
  let t = 0;

  const slider = document.querySelector("#phase-offset");
  const button = document.querySelector("#play-pause");

  slider.addEventListener("input", (event) => {
    pause();
    const value = event.target.value;
    t = +value;
    draw(value);
  });

  button.addEventListener("click", () => {
    if (timer) pause();
    else play();
  });

  function setPlayingUi(playing) {
    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", playing ? "Pause animation" : "Play animation");
  }

  function play() {
    setPlayingUi(true);
    timer = d3.interval(() => {
      t += 0.003;
      if (t > 0.5) t = -0.5;
      slider.value = t;
      draw(t);
    }, 1000 / 24);
  }

  function pause() {
    if (!timer) return;
    timer.stop();
    timer = null;
    setPlayingUi(false);
  }

  const resizeObserver = new ResizeObserver(() => {
    draw(t);
  });
  resizeObserver.observe(layer);

  play();
}

main();
