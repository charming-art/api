import {scaleLinear} from "../scale/scaleLinear.js";

function extent(column) {
  return [Math.min(...column), Math.max(...column)];
}

export function createScale(column, options) {
  const {domain = extent(column), range} = options;
  const scale = scaleLinear({domain, range});
  return (value) => scale(value);
}

export function mapColumn(options) {
  return (data) => {
    const mapped = {};
    for (const [key, option] of Object.entries(options)) {
      if (key in data) {
        const column = data[key];
        const map = createScale(column, option);
        mapped[key] = column.map(map);
      }
    }
    return {...data, ...mapped};
  };
}
