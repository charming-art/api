import * as cm from "@charming-art/charming";

export function circles() {
  return cm.render({
    width: 640,
    height: 640,
    setup: cm.flow(
      cm.range(120),
      cm.map((_, i, data) => (i * Math.PI) / data.length),
      cm.circle({
        x: (t) => Math.cos(t) * Math.cos(t * 3) * 250 + 280,
        y: (t) => Math.sin(t) * Math.cos(t * 3) * 250 + 320,
        r: 10,
      }),
    ),
  });
}
