export function background({fill}) {
  return (data) => ({...data, transform: (renderer) => renderer.background({fill})});
}
