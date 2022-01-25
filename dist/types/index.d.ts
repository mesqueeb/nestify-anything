/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {unknown} payload the value to attach to the nested prop
 * @returns {Record<string, unknown>} eg. `{a: {path: {like: {this: 'payload'}}}}`
 */
export declare function createObjectFromPath(path: string, payload: unknown): Record<string, unknown>;
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
export declare function nestifyObject(payload: Record<string, unknown>): Record<string, unknown>;
