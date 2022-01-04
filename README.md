# Nestify anything 🧅

<a href="https://www.npmjs.com/package/nestify-anything"><img src="https://img.shields.io/npm/v/nestify-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/nestify-anything"><img src="https://img.shields.io/npm/dw/nestify-anything.svg" alt="Latest Stable Version"></a>

```
npm i nestify-anything
```

Recreates an object from any `nested.props`. A simple and small integration.

Can be used in combination with [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything), which does the exact opposite of this one! 😉

## Meet the family

- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

```js
import { nestifyObject } from 'nestify-anything'

const target = {
  'name': 'Ho-oh',
  'types.fire': true,
  'types.flying': true,
}

nestifyObject(target)
// returns {
//   name: 'Ho-oh',
//   types: { fire: true, flying: true }
// }
```

Currently the library only works with the dot character `'.'` as separator. If you need other characters like slash `'/'`, let me know in an issue!
