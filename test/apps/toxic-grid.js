import * as cm from "../../src/index.js";
import { frame } from "./_frame.js";
import { dispose } from "./_dispose.js";
import { stats } from "./_stats.js";
import { physics2d, geom } from "toxiclibsjs";
const { Vec2D } = geom;
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = physics2d;
const { GravityBehavior } = physics2d.behaviors;

export function toxicGrid() {
  const app = cm.app({
    width: 640,
    height: 240,
  });

  const world = new VerletPhysics2D();

  const gravity = new GravityBehavior(new Vec2D(0, 1));
  world.addBehavior(gravity);

  const cols = 65;
  const rows = 20;
  const w = app.prop("width") / (cols - 1);
  const x = (i) => i % cols;
  const y = (i) => (i / cols) | 0;

  const particles = cm.range(cols * rows).map((i) => {
    const m = x(i);
    const n = y(i);
    const particle = new VerletParticle2D(m * w, 0);
    if (m % 4 === 0 && n === 0) particle.lock();
    world.addParticle(particle);
    return particle;
  });

  const springs = particles.flatMap((d, i, array) => {
    const S = [];
    const m = x(i);
    const n = y(i);
    if (m !== cols - 1) {
      const d1 = array[i + 1];
      const s1 = new VerletSpring2D(d, d1, w, 0.25);
      S.push(s1);
      world.addSpring(s1);
    }
    if (n !== rows - 1) {
      const d2 = array[i + cols];
      const s2 = new VerletSpring2D(d, d2, w, 0.25);
      S.push(s2);
      world.addSpring(s2);
    }
    return S;
  });

  function update() {
    world.update();
    app.append(cm.background, { fill: "#fff" });
    app.data(springs).append(cm.link, {
      x: (d) => d.a.x,
      y: (d) => d.a.y,
      x1: (d) => d.b.x,
      y1: (d) => d.b.y,
      stroke: cm.rgb(0),
      strokeWidth: 2,
    });
  }

  return app.on("update", update).call(dispose).call(stats).call(frame).start();
}
