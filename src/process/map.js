export function map(callback) {
  return ({data, ...rest}) => ({...rest, data: data.map(callback)});
}
