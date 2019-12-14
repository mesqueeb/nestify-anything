/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {*} payload the value to attach to the nested prop
 * @returns {Object} eg. {a: {path: {like: {this: 'payload'}}}}
 * @export
 */
export declare function createObjectFromPath(path: any, payload: any): {
    [x: number]: any;
};
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {Object} payload object with flat prop paths - eg. {'size.h': 0, 'size.w': 0}
 * @returns {Object} object with nested props - eg. {size: {h: 0, w: 0}}
 * @export
 */
export declare function nestifyObject(payload: any): any;
export default nestifyObject;
