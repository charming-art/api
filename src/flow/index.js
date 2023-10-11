import { flow$append } from "./append.js";
import { flow$map } from "./map.js";
import { flow$each } from "./each.js";
import { flow$call } from "./call.js";
import { flow$filter } from "./filter.js";
import { flow$data } from "./data.js";
import { flow$datum } from "./datum.js";
import { flow$push } from "./push.js";
import { flow$pull } from "./pull.js";

export function Flow({ data, app, shape = null, parent = null, value = null }) {
  Object.defineProperties(this, {
    _data: { value: data, writable: true },
    _value: { value: value, writable: true },
    _shape: { value: shape },
    _children: { value: [] },
    _parent: { value: parent },
    _app: { value: app },
  });
}

Object.defineProperties(Flow.prototype, {
  map: { value: flow$map },
  each: { value: flow$each },
  filter: { value: flow$filter },
  call: { value: flow$call },
  append: { value: flow$append },
  data: { value: flow$data },
  datum: { value: flow$datum },
  push: { value: flow$push },
  pull: { value: flow$pull },
});
