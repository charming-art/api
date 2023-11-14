export function cross(a, b) {
  const n = a.length;
  const c = new Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const m = i * n + j;
      c[m] = [a[i], b[j]];
    }
  }
  return c;
}
