import * as cm from "@charming-art/charming";

export function rock() {
  return cm.render({
    width: 640,
    height: 640,
    setup: cm.group(
      {x: 320, y: 320, rotate: Math.PI / 4},
      cm.flow(
        cm.range(10),
        cm.circle({x: 0, y: (_, i) => i, r: (_, i) => i}),
        cm.mapColumn({
          y: {range: [-250, 250]},
          r: {range: [5, 50]},
        }),
      ),
    ),
  });
}
