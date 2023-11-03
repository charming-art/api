export function memberize(compute) {
  return function (...params) {
    compute(this, this, ...params);
    return this;
  };
}
