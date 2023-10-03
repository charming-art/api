export function _maybe(object, method, ...params) {
  if (object[method]) {
    const value = object[method](...params);
    return value;
  } else {
    console.warn(`Unimplemented renderer method: ${method}.`);
  }
}
