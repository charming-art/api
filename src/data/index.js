import { data$shape } from "./shape.js";
import { data$map } from "./map.js";
import { data$value } from "./value.js";
import { data$each } from "./each.js";
import { data$filter } from "./filter.js";

export function Data(data, app) {
  Object.defineProperties(this, {
    _shapes: { value: [] },
    _data: { value: data, writable: true },
    _app: { value: app },
  });
}

Object.defineProperties(Data.prototype, {
  map: { value: data$map },
  each: { value: data$each },
  filter: { value: data$filter },
  shape: { value: data$shape },
  value: { value: data$value },
});
