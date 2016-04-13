var test = require('ava')
var type = require('..')

test('creates types', function (t) {
  var user = type.create({
    name: type.string,
    age: type.number
  })

  var john = user({
    name: 'John',
    age: 32
  })

  var bill = user({
    name: 'Bill',
    age: 45,
    gender: 'male'
  })

  t.deepEqual(john, {
    name: 'John',
    age: 32
  })

  t.deepEqual(bill, {
    name: 'Bill',
    age: 45
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
