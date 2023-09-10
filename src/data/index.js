import { data$shape } from "./shape.js";
import { data$map } from "./map.js";
import { data$value } from "./value.js";
import { data$each } from "./each.js";

export function Data(data) {
  Object.defineProperties(this, {
    _shapes: { value: [] },
    _data: { value: data, writable: true },
  });
}

Object.defineProperties(Data.prototype, {
  map: { value: data$map },
  each: { value: data$each },
  shape: { value: data$shape },
  value: { value: data$value },
});
