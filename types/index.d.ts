/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {*} payload the value to attach to the nested prop
 * @returns {object} eg. {a: {path: {like: {this: 'payload'}}}}
 * @export
 */
export declare function createObjectFromPath(path: string, payload: any): object;
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {object} payload object with flat prop paths - eg. {'size.h': 0, 'size.w': 0}
 * @returns {object} object with nested props - eg. {size: {h: 0, w: 0}}
 * @export
 */
export declare function nestifyObject(payload: object): object;
