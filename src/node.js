export function Node(data = null, children = [], parent = null) {
  Object.defineProperties(this, {
    _data: { value: data, writable: true },
    _children: { value: children, writable: true },
    _parent: { value: parent },
  });
}
