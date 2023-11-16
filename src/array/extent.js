export function extent(values, valueof = (d) => d) {
  const min = Math.min(...values.map(valueof));
  const max = Math.max(...values.map(valueof));
  return [min, max];
}
