export function range(length, start, end) {
  if (arguments.length === 1) return Array.from({ length }, (_, i) => i);
  if (arguments.length === 2) [start, end] = [0, start];
  const step = (end - start) / length;
  return Array.from({ length }, (_, i) => start + i * step);
}
