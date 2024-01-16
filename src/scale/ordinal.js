export function ordinal(domain, range, { unknown } = {}) {
  const map = new Map(domain.map((d, i) => [d, i]));
  return (x) => {
    const i = map.get(x);
    if (i === undefined) return unknown;
    return range[i % range.length];
  };
}

ordinal.ordinal = true;
