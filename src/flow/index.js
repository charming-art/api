import { flow$append } from "./append.js";
import { flow$call } from "./call.js";
import { flow$data } from "./data.js";
import { flow$datum } from "./datum.js";
import { flow$app } from "./app.js";
import { flow$process } from "./process.js";

export function Flow(groups = null, data = null, parent = null, app = null) {
  Object.defineProperties(this, {
    _groups: { value: groups },
    _parent: { value: parent },
    _app: { value: app },
    _data: { value: data },
  });
}

Object.defineProperties(Flow.prototype, {
  call: { value: flow$call },
  append: { value: flow$append },
  data: { value: flow$data },
  datum: { value: flow$datum },
  app: { value: flow$app },
  process: { value: flow$process },
});
