export function continuous(domain, range, { transform }) {
  const [d, d1] = domain.map(transform);
  const [r, r1] = range;
  return (x) => {
    const n = transform(x);
    const t = d1 - d === 0 ? 0.5 : (n - d) / (d1 - d);
    return r * (1 - t) + t * r1;
  };
}
