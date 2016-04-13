[![Build Status](https://travis-ci.org/ngerritsen/typonator.svg?branch=master)](https://travis-ci.org/ngerritsen/typonator)

# typonator

A small library to work with types in Javascript.

- Typonator creates data types, not classes or module-like structures.
- Typonator creates plain Javascript objects
- Typonator has no dependencies!
- Typonator weighs only ~1kb minified!
- Typonator lets you create custom value types
- Works with libraries like lodash or underscore for value type checking

[Jump to Api Reference](#api-reference)

## Guide

- [Installation](#installation)
- [Creating types](#creating-types)
- [Using types](#using-types)

### Installation

```
npm install typonator
```

[Back to top ↑](#guide)

### Creating types

Typonator lets you create type factories. You can use the built in value types of typonator:

```js
var t = require('typonator')

var user = t.create({
  name: t.string
  age: t.number
})
```

Typonator is even cleaner in ES6:

```js
import { create, string, number } from 'typonator'

const user = create({
  name: string
  age: number
})
```

#### Default values

By chaining a type checker with `.default(value)` you can specify a default. If the property is not defined or undefined, it will use the default one (it will not type check the default value).

```js
var point = create({
  x: t.number.default(0)
  y: t.number.default(0)
})

var treeTop = point({ y: 20 }) // => { x: 0, y: 20 }
```

#### Custom value type checkers

You can also create custom type checkers, give a name and a predicate that returns true or false. This allows you to create your own specialized type checkers or use libraries like lodash or underscore. Custom types can also have default values.

```js
var user = t.create({
  age: t.custom('int', _.isInteger), // using lodash
  gender: t.custom('gender', isGender)
})

function isGender (value) {
  return value === 'm' || value === 'f'
}
```

[Back to top ↑](#guide)

### Using types

Use types as follows:

```js
var newUser = user({
  name: 'John Doe',
  age: 32
})

/* newUser is: {
  name: 'John Doe',
  age: 32
} */
```

Types throw an error when the wrong, or not all values are provided

```js
// Trows an error
var newUser = user({
  name: 'John Doe',
  age: 'thirty-two'
})

// Also trows an error
var newUser = user({
  age: 32
})

var newUser = user({
  name: 'John Doe',
  age: 32
})
```

Types ignore and filter out non-specified properties

```js
var newUser = user({
  name: 'John Doe',
  age: 32,
  gender: 'male'
})

/* newUser is: {
  name: 'John Doe',
  age: 32
} */
```

[Back to top ↑](#guide)

## Api reference

#### `t.create(definition: Object<key, typeChecker>) => type: Function`

#### `t.custom(name: String, predicate: Function) => typeChecker: Function`

#### `typeChecker.default(value: Any) => typeCheckerWithDefault: Function`

#### Built in type checkers:

#### `t.number`
#### `t.string`
#### `t.bool`
#### `t.function`
#### `t.object`
#### `t.array`

[Back to top ↑](#guide)
