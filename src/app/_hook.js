export function addHook(app, name, ...params) {
  const hooks = app._hooks;
  const register = hooks[name] || [];
  register.push([...params]);
  app._hooks[name] = register;
}

export function useHook(app, name) {
  const hooks = app._hooks;
  const register = hooks[name] || [];
  for (const [callback, ...params] of register) {
    callback(...params);
  }
}
