import merge from 'merge-anything'

/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {*} payload the value to attach to the nested prop
 * @returns {Object} eg. {a: {path: {like: {this: 'payload'}}}}
 * @export
 */
export function createObjectFromPath (path, payload) {
  // edge cases
  if (!path.includes('.')) return { [path]: payload }
  // start
  const newValue = payload
  // important to set the result here and not return the reduce directly!
  const result = {}
  path.match(/[^.]+/g)
    .reduce((carry, _prop, index, array) => {
      _prop = _prop.replace('_____dot_____', '.')
      const container = (index === array.length - 1)
        ? newValue
        : {}
      carry[_prop] = container
      return container
    }, result)
  return result
}

/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {Object} payload object with flat prop paths - eg. {'size.h': 0, 'size.w': 0}
 * @returns {Object} object with nested props - eg. {size: {h: 0, w: 0}}
 * @export
 */
export function nestifyObject (payload) {
  return Object.entries(payload).reduce((carry, [key, value]) => {
    const nestedObject = createObjectFromPath(key, value)
    return merge(carry, nestedObject)
  }, {})
}

export default nestifyObject
