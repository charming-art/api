export function background({fill}) {
  return () => ({transform: (renderer) => renderer.background({fill})});
}
