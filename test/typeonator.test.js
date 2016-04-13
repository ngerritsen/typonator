var test = require('ava')
var type = require('..')

test('creates types', function (t) {
  var user = type.create({
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

test('types throw when passed invalid types', function (t) {
  var user = type.create({
    name: type.string,
    age: type.number
  })

  t.throws(
    function () {
      user({
        name: 'John',
        age: '32'
      })
    },
    'Expected age to be of type number, instead is of type string.',
    'Throws when invalid value type is passed'
  )

  t.throws(
    function () {
      user({
        name: 'John'
      })
    },
    'Expected property age to be specified.',
    'Throws when specified property is missing'
  )
})

test('can create custom type checkers', function (t) {
  function isGender (value) {
    return value === 'male' || value === 'female'
  }

  var user = type.create({
    name: type.string,
    gender: type.custom('gender', isGender)
  })

  t.deepEqual(user({
    name: 'John',
    gender: 'male'
  }), {
    name: 'John',
    gender: 'male'
  })

  t.throws(
    function () {
      user({
        name: 'John',
        gender: 'notagender'
      })
    },
    'Expected gender to be of custom type gender.',
    'Throws when custom value check fails'
  )

})
