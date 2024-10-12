import * as cm from "@charming-art/charming";

export function rings() {
  const x = (t) => Math.cos(t) * Math.cos(t * 3) * 250 + 280;
  const y = (t) => Math.sin(t) * Math.cos(t * 3) * 250 + 320;
  return cm.render({
    width: 640,
    height: 640,
    setup: cm.flow(
      cm.range(120),
      cm.map((_, i, data) => (i * Math.PI) / data.length),
      cm.group(
        cm.circle({x, y, r: 10}), // Outer ring
        cm.circle({x, y, r: 3, fill: "white"}), // Inner ring
      ),
    ),
  });
}
