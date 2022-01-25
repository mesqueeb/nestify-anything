'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mergeAnything = require('merge-anything');

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
    const matches = path.match(/[^.]+/g) || [];
    matches.reduce((carry, _prop, index, array) => {
        _prop = _prop.replace('_____dot_____', '.');
        const container = index === array.length - 1 ? newValue : {};
        carry[_prop] = container;
        return container;
    }, result);
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
        return mergeAnything.merge(carry, nestedObject);
    }, {});
}

exports.createObjectFromPath = createObjectFromPath;
exports.nestifyObject = nestifyObject;
