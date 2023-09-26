import { data$shape } from "./shape.js";
import { data$map } from "./map.js";
import { data$each } from "./each.js";
import { data$call } from "./call.js";
import { data$filter } from "./filter.js";
import { data$data } from "./data.js";
import { data$datum } from "./datum.js";

export function Data({ data, app, shape = null, parent = null, value = null }) {
  Object.defineProperties(this, {
    _data: { value: data, writable: true },
    _value: { value: value, writable: true },
    _shape: { value: shape },
    _children: { value: [] },
    _parent: { value: parent },
    _app: { value: app },
  });
}

Object.defineProperties(Data.prototype, {
  map: { value: data$map },
  each: { value: data$each },
  filter: { value: data$filter },
  call: { value: data$call },
  shape: { value: data$shape },
  data: { value: data$data },
  datum: { value: data$datum },
});
