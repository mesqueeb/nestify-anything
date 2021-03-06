import { merge } from 'merge-anything';

/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {unknown} payload the value to attach to the nested prop
 * @returns {Record<string, unknown>} eg. {a: {path: {like: {this: 'payload'}}}}
 * @export
 */
function createObjectFromPath(path, payload) {
    var _a;
    // edge cases
    if (!path.includes('.'))
        return _a = {}, _a[path] = payload, _a;
    // start
    var newValue = payload;
    // important to set the result here and not return the reduce directly!
    var result = {};
    path.match(/[^.]+/g).reduce(function (carry, _prop, index, array) {
        _prop = _prop.replace('_____dot_____', '.');
        var container = index === array.length - 1 ? newValue : {};
        carry[_prop] = container;
        return container;
    }, result);
    return result;
}
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {Record<string, unknown>} payload object with flat prop paths - eg. {'size.h': 0, 'size.w': 0}
 * @returns {Record<string, unknown>} object with nested props - eg. {size: {h: 0, w: 0}}
 * @export
 */
function nestifyObject(payload) {
    return Object.entries(payload).reduce(function (carry, _a) {
        var key = _a[0], value = _a[1];
        var nestedObject = createObjectFromPath(key, value);
        return merge(carry, nestedObject);
    }, {});
}

export { createObjectFromPath, nestifyObject };
