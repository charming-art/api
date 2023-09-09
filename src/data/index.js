import { data$shape } from "./shape.js";
import { data$map } from "./map.js";
import { data$value } from "./value.js";

export function Data(data) {
  Object.defineProperties(this, {
    _maps: { value: [] },
    _shapes: { value: [] },
    _data: { value: data },
  });
}

Object.defineProperties(Data.prototype, {
  map: { value: data$map },
  shape: { value: data$shape },
  value: { value: data$value },
});
