import { merge } from 'merge-anything'

/**
 * creates an object from a path
 *
 * @param path a.path.like.this
 * @param payload the value to attach to the nested prop
 * @returns eg. `{a: {path: {like: {this: 'payload'}}}}`
 */
export function createObjectFromPath(path: string, payload: unknown): { [key in string]: unknown } {
  // edge cases
  if (!path.includes('.')) return { [path]: payload }
  // start
  const newValue = payload
  // important to set the result here and not return the reduce directly!
  const result: { [key in string]: unknown } = {}

  const matches = Array.from(path.matchAll(/[^.]+/g), ([x]) => x)
  let point = result
  let index = 0
  for (const _prop of matches) {
    const prop = _prop.replace(/_____dot_____/g, '.')
    const isLast = index++ === matches.length - 1
    const container: any = isLast ? newValue : {}
    point[prop] = container
    point = container
  }

  return result
}

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
export function nestifyObject(payload: { [key in string]: unknown }): { [key in string]: unknown } {
  return Object.entries(payload).reduce((carry, [key, value]) => {
    const nestedObject = createObjectFromPath(key, value)
    return merge(carry, nestedObject)
  }, {})
}
