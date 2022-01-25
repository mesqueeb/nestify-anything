/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { test, expect } from 'vitest'
import { createObjectFromPath, nestifyObject } from '../src/index'

test('createObjectFromPath', () => {
  let payload, path, res
  path = 'nest.once'
  payload = true
  res = createObjectFromPath(path, payload)
  expect(res).toEqual({ nest: { once: true } })
  path = 'a.path.like.this'
  res = createObjectFromPath(path, payload)
  expect(res).toEqual({ a: { path: { like: { this: true } } } })
})

test('nestifyObject', () => {
  let payload, res
  payload = { 'size.h': 0, 'size.w': 0 }
  res = nestifyObject(payload)
  expect(res).toEqual({ size: { h: 0, w: 0 } })
})
