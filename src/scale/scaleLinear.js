export function scaleLinear({domain, range}) {
  return (x) => {
    const [x0, x1] = domain;
    const [y0, y1] = range;
    if (x0 === x1) return y0;
    return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  };
}
