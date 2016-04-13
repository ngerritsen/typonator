[![Build Status](https://travis-ci.org/ngerritsen/typonator.svg?branch=master)](https://travis-ci.org/ngerritsen/typonator)

# typonator

A small library to work with types in Javascript.

- _Typonator creates data types, not classes or module like structures._
- _Typonator has no dependencies!_
- _Typonator weighs only ~1kb minified!_
- _Typonator lets you create custom value types_
- _Works with libraries like lodash or underscore for value type checking_

## Guide

```
npm install typonator
```

### Creating types

Typonator lets you create type factories. You can use the built in value types of typonator:

```js
var t = require('typonator')

var user = t.create({
  name: t.string
  age: t.number
})
```

Built in value types:

- number
- string
- bool
- function
- object
- array

Typonator is even cleaner in ES6:

```js
import { create, string, number } from 'typonator'

const user = create({
  name: string
  age: number
})
```

### Custom value type checkers

You can also create custom type checkers, give a name and a predicate that returns true or false. This allows you to create your own specialized type checkers or use libraries like lodash or underscore.

```js
var user = create({
  age: t.custom('int', _.isInteger), // using lodash
  gender: t.custom('gender', isGender)
})

function isGender (value) {
  return value === 'm' || value === 'f'
}
```

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
