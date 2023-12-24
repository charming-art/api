export function continuous(domain, range, { transform, unknown, interpolate = (d) => d }) {
  const [d, d1] = domain.map(transform);
  const [r, r1] = range;
  return (x) => {
    if (x === null || Number.isNaN(x)) return unknown;
    const n = transform(x);
    const t = d1 - d === 0 ? 0.5 : (n - d) / (d1 - d);
    return interpolate(r * (1 - t) + t * r1);
  };
}
