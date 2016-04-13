var test = require('ava')
var type = require('..')

test('can create custom type checkers', t => {
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

  t.throws(() =>
    user({
      name: 'John',
      gender: 'notagender'
    }),
    'Expected gender to be of custom type gender.',
    'Throws when custom value check fails'
  )
})
