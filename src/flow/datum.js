export function flow$datum(d) {
  if (arguments.length === 0) return this._groups;
  return this.data([d]);
}
