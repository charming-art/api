export function background({fill}) {
  return () => {
    const transform = (context) => {
      context.fillStyle = fill;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    };
    return {transform};
  };
}
