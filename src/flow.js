export function flow(raw, ...transforms) {
  return ({data: prev} = {data: []}) => {
    if (typeof raw === "function") {
      return prev.map((item, i, array) => {
        let data = {data: raw(item, i, array)};
        for (const transform of transforms) data = transform(data);
        return data;
      });
    } else {
      let data = {data: raw};
      for (const transform of transforms) data = transform(data);
      return data;
    }
  };
}
