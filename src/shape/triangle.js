export function triangle(renderer, I, value) {
  if (renderer.triangles) {
    renderer.triangles(I, value);
  }
}
