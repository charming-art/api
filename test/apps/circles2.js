import * as cm from "@charming-art/charming";

export function circles2() {
  return cm.render({
    width: 640,
    height: 640,
    setup: cm.flow(
      cm.range(120),
      cm.map((_, i, data) => (i * Math.PI) / data.length),
      cm.group(
        {x: (t) => Math.cos(t) * Math.cos(t * 3) * 250 + 280},
        cm.group(
          {y: (t) => Math.sin(t) * Math.cos(t * 3) * 250 + 320},
          cm.group(cm.circle({r: 10, x: 0, y: 0}), cm.circle({r: 3, x: 0, y: 0, fill: "white"})),
        ),
      ),
    ),
  });
}
