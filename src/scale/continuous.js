function interpolateNumber(a, b) {
  return (t) => a * (1 - t) + t * b;
}

function normalizeNumber(a, b) {
  return (n) => (b - a === 0 ? 0.5 : (n - a) / (b - a));
}

export function continuous(domain, [r, r1] = [0, 1], { transform, unknown, interpolate = interpolateNumber(r, r1) }) {
  const [d, d1] = domain.map(transform);
  const normalize = normalizeNumber(d, d1);
  return (x) => {
    if (x === null || Number.isNaN(x)) return unknown;
    return interpolate(normalize(transform(x)));
  };
}
