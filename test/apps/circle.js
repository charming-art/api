import * as cm from "@charming-art/charming";

export function circle() {
  return cm.render({
    width: 640,
    height: 640,
    setup: cm.circle({x: 320, y: 320, r: 200}),
  });
}
