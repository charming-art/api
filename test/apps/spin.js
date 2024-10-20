import * as cm from "@charming-art/charming";

export function spin() {
  return cm.render({
    width: 640,
    height: 640,
    loop: () => {
      const t = Date.now() / 1000;
      return cm.group(
        cm.background({fill: "white"}),
        cm.circle({x: 320, y: 320, r: 120, fill: "black"}),
        cm.circle({x: 320 + Math.cos(t) * 200, y: 320 + Math.sin(t) * 200, r: 40, fill: "black"}),
      );
    },
  });
}
