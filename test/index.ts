/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import test from 'ava'
import { createObjectFromPath, nestifyObject } from '../src/index'

test('createObjectFromPath', t => {
  let payload, path, res
  path = 'nest.once'
  payload = true
  res = createObjectFromPath(path, payload)
  t.deepEqual(res, { nest: { once: true } })
  path = 'a.path.like.this'
  res = createObjectFromPath(path, payload)
  t.deepEqual(res, { a: { path: { like: { this: true } } } })
})

test('nestifyObject', t => {
  let payload, res
  payload = { 'size.h': 0, 'size.w': 0 }
  res = nestifyObject(payload)
  t.deepEqual(res, { size: { h: 0, w: 0 } })
})
