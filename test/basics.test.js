var test = require('ava')
var type = require('..')

test('creates types', t => {
  const user = type.create({
    name: type.string,
    age: type.number,
    premium: type.bool,
    friends: type.array
  })

  t.deepEqual(user({
    name: 'John',
    age: 32,
    premium: true,
    friends: [ 'Bill' ]
  }), {
    name: 'John',
    age: 32,
    premium: true,
    friends: [ 'Bill' ]
  })

  t.deepEqual(user({
    name: 'Bill',
    age: 45,
    premium: false,
    friends: [ 'John' ],
    gender: 'male'
  }), {
    name: 'Bill',
    age: 45,
    premium: false,
    friends: [ 'John' ]
  }, 'Ignores non-specified properties')
})

test('types throw when passed invalid types', t => {
  const user = type.create({
    name: type.string,
    age: type.number
  })

  t.throws(() =>
    user({
      name: 'John',
      age: '32'
    }),
    'Expected age to be of type number, instead is of type string.',
    'Throws when invalid value type is passed'
  )

  t.throws(() =>
    user({
      name: 'John'
    }),
    'Expected property age to be defined.',
    'Throws when specified property is missing'
  )
})
