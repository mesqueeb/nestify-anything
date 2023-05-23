import { merge } from 'merge-anything';

function createObjectFromPath(path, payload) {
  if (!path.includes("."))
    return { [path]: payload };
  const newValue = payload;
  const result = {};
  const matches = Array.from(path.matchAll(/[^.]+/g), ([x]) => x);
  let point = result;
  let index = 0;
  for (const _prop of matches) {
    const prop = _prop.replace(/_____dot_____/g, ".");
    const isLast = index++ === matches.length - 1;
    const container = isLast ? newValue : {};
    point[prop] = container;
    point = container;
  }
  return result;
}
function nestifyObject(payload) {
  return Object.entries(payload).reduce((carry, [key, value]) => {
    const nestedObject = createObjectFromPath(key, value);
    return merge(carry, nestedObject);
  }, {});
}

export { createObjectFromPath, nestifyObject };
