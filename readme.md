# typonator

A small library to work with types in Javascript.

- _Typonator creates data types, not classes or class/module like structures._
- _Typonator has no dependencies!_
- _Typonator weighs only ~1kb!_

## Guide

Typonator lets you create type factories. These can use the built in types of typonator.

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

Use types as follows:

```js
const newUser = user({
  name: 'John Doe',
  age: 32
})

/* New user is now: {
  name: 'John Doe',
  age: 32
} */
```

Types throw an error when the wrong, or not all values are provided

```js
// Trows an error
const newUser = user({
  name: 'John Doe',
  age: 'thirty-two'
})

// Also trows an error
const newUser = user({
  age: 32
})

const newUser = user({
  name: 'John Doe',
  age: 32
})
```

Types ignore and filter out non-specified properties

```js
const newUser = user({
  name: 'John Doe',
  age: 32,
  gender: 'male'
})

/* New user is now: {
  name: 'John Doe',
  age: 32
} */
```
