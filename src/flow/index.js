import { flow$append } from "./append.js";
import { flow$map } from "./map.js";
import { flow$each } from "./each.js";
import { flow$call } from "./call.js";
import { flow$filter } from "./filter.js";
import { flow$data } from "./data.js";
import { flow$datum } from "./datum.js";
import { flow$push } from "./push.js";
import { flow$eachRight } from "./eachRight.js";
import { flow$app } from "./app.js";

export function Flow(groups = null, data = null, parent = null, app = null) {
  Object.defineProperties(this, {
    _groups: { value: groups },
    _parent: { value: parent },
    _app: { value: app },
    _data: { value: data },
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
  eachRight: { value: flow$eachRight },
  app: { value: flow$app },
});
