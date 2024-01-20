import { Path } from "d3-path";

function appendArray(strings) {
  let command = [strings[0]];
  for (let i = 1, n = strings.length; i < n; i++) {
    command.push(arguments[i]);
    const string = strings[i];
    if (string !== "," && string !== "") {
      if (string.startsWith(",")) {
        const numbers = string
          .split(",")
          .filter((d) => d !== "")
          .map((d) => +d);
        command.push(...numbers);
      } else {
        this._.push(command);
        command = [string];
      }
    }
  }
  this._.push(command);
}

class PathContext extends Path {
  constructor() {
    super();
    this._ = [];
    this._append = appendArray;
  }
  toArray() {
    return this._;
  }
}

export function pathContext() {
  return new PathContext();
}
