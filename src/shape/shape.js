export function shape(callback) {
  callback._composite = true;
  return callback;
}
