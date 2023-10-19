function emitter$off(typename, callback) {
  if (arguments.length === 0) this._ = {};
  else if (arguments.length === 1) this._[typename] = [];
  else {
    const { [typename]: callbacks } = this._;
    const index = callbacks.indexOf(callback);
    if (index === -1) return;
    callbacks.splice(index, 1);
  }
}

function emitter$emit(typename, ...params) {
  const { [typename]: callbacks } = this._;
  if (!callbacks) return;
  for (const callback of callbacks) callback(...params);
}

function emitter$on(typename, callback) {
  const { [typename]: callbacks = [] } = this._;
  callbacks.push(callback);
  this._[typename] = callbacks;
}

export function Emitter() {
  Object.defineProperties(this, {
    _: { value: {}, writable: true },
  });
}

Object.defineProperties(Emitter.prototype, {
  emit: { value: emitter$emit },
  on: { value: emitter$on },
  off: { value: emitter$off },
});
