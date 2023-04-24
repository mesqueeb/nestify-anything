import { merge } from 'merge-anything';

/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {unknown} payload the value to attach to the nested prop
 * @returns {Record<string, unknown>} eg. `{a: {path: {like: {this: 'payload'}}}}`
 */
function createObjectFromPath(path, payload) {
    // edge cases
    if (!path.includes('.'))
        return { [path]: payload };
    // start
    const newValue = payload;
    // important to set the result here and not return the reduce directly!
    const result = {};
    const matches = Array.from(path.matchAll(/[^.]+/g), ([x]) => x);
    let point = result;
    let index = 0;
    for (const _prop of matches) {
        const prop = _prop.replace(/_____dot_____/g, '.');
        const isLast = index++ === matches.length - 1;
        const container = isLast ? newValue : {};
        point[prop] = container;
        point = container;
    }
    return result;
}
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {Record<string, unknown>} payload object with flat prop paths - eg. `{ 'size.h': 0, 'size.w': 0 }`
 * @returns {Record<string, unknown>} object with nested props - eg. `{ size: { h: 0, w: 0 } }`
 * @example
 * const result = nestifyObject({ 'size.h': 0, 'size.w': 0 })
 * // result is:
 * { size: { h: 0, w: 0 } }
 */
function nestifyObject(payload) {
    return Object.entries(payload).reduce((carry, [key, value]) => {
        const nestedObject = createObjectFromPath(key, value);
        return merge(carry, nestedObject);
    }, {});
}

export { createObjectFromPath, nestifyObject };
