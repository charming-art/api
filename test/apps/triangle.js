import * as cm from "@charming-art/charming";

export async function triangle() {
  return cm.render({
    width: 640,
    height: 480,
    renderer: await cm.webgpu(),
    setup: cm.triangle(),
  });
}
