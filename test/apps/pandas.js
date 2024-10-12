import * as cm from "@charming-art/charming";

export function pandas() {
  return cm.render({
    width: 600,
    height: 600,
    setup: cm.group(
      cm.background({fill: "black"}),
      cm.circle({x: 150, y: 150, r: 100, fill: "white"}), // Left Ear
      cm.circle({x: 150, y: 150, r: 90, fill: "black"}),
      cm.circle({x: 450, y: 150, r: 100, fill: "white"}), // Right ear
      cm.circle({x: 450, y: 150, r: 90, fill: "black"}),
      cm.circle({x: 300, y: 300, r: 260, fill: "white"}), // Face
      cm.circle({x: 150, y: 300, r: 80}), // Left eye
      cm.circle({x: 300, y: 300, r: 20}), // Nose
      cm.circle({x: 450, y: 300, r: 40}), // Right eye
    ),
  });
}
