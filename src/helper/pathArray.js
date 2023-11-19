import { path as d3Path } from "d3-path";

function appendArray(strings) {
  const command = [strings[0]];
  for (let i = 1, n = strings.length; i < n; i++) {
    command.push(arguments[i]);
  }
  this._.push(command);
}

function toArray() {
  return this.toString();
}

export function pathArray() {
  const path = d3Path();
  Object.assign(path, { _: [], _append: appendArray, toArray: toArray });
  return path;
}
