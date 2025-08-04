/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { expect, test } from 'vitest'
import { createObjectFromPath, nestifyObject } from '../src/index.js'

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

test('createObjectFromPath ... not', () => {
  let payload, path, res
  path = 'nest\\.nonce'
  payload = true
  res = createObjectFromPath(path, payload)
  expect(res).toEqual({ 'nest.nonce': true })
  path = 'a\\.path\\.like\\.this'
  res = createObjectFromPath(path, payload)
  expect(res).toEqual({ 'a.path.like.this': true })
})

test('nestifyObject ... not', () => {
  let payload, res
  payload = { 'size\\.h': 0, 'size\\.w': 0 }
  res = nestifyObject(payload)
  expect(res).toEqual({ 'size.h': 0, 'size.w': 0 })
})

test('nestifyObject with mixed keys', () => {
  let payload, res
  payload = {
    'user.name': 'John',
    'user.age': 30,
    'user\\.email': 'john@example.com',
    'settings.theme': 'dark',
    'settings\\.api\\.key': 'secret123',
  }
  res = nestifyObject(payload)
  expect(res).toEqual({
    'user': {
      name: 'John',
      age: 30,
    },
    'user.email': 'john@example.com',
    'settings': {
      theme: 'dark',
    },
    'settings.api.key': 'secret123',
  })
})

test('createObjectFromPath with mixed escaped and non-escaped dots', () => {
  let payload, path, res
  path = 'nested.some\\.dotted\\.key.deep'
  payload = true
  res = createObjectFromPath(path, payload)
  expect(res).toEqual({ nested: { 'some.dotted.key': { deep: true } } })
})

test('nestifyObject with mixed escaped and non-escaped dots', () => {
  let payload, res
  payload = { 'nested.some\\.dotted\\.key.deep': true }
  res = nestifyObject(payload)
  expect(res).toEqual({ nested: { 'some.dotted.key': { deep: true } } })
})
