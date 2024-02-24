export function strokeOf(options) {
  const { stroke, stroke0, stroke1, stroke2 } = options;
  if (!(stroke || stroke0 || stroke1 || stroke2)) return;
  return {
    ...stroke,
    ...(stroke0 && { ch: stroke0 }),
    ...(stroke1 && { fg: stroke1 }),
    ...(stroke2 && { bg: stroke2 }),
  };
}
