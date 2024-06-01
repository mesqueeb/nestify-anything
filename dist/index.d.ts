/**
 * creates an object from a path
 *
 * @param path a.path.like.this
 * @param payload the value to attach to the nested prop
 * @returns eg. `{a: {path: {like: {this: 'payload'}}}}`
 */
export declare function createObjectFromPath(path: string, payload: unknown): {
    [key in string]: unknown;
};
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param payload object with flat prop paths - eg. `{ 'size.h': 0, 'size.w': 0 }`
 * @returns object with nested props - eg. `{ size: { h: 0, w: 0 } }`
 * @example
 * const result = nestifyObject({ 'size.h': 0, 'size.w': 0 })
 * // result is:
 * { size: { h: 0, w: 0 } }
 */
export declare function nestifyObject(payload: {
    [key in string]: unknown;
}): {
    [key in string]: unknown;
};
