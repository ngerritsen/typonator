var test = require('ava')
var type = require('..')

test('creates types', function (t) {
  var user = type.create({
    name: type.string,
    age: type.number
  })

  var john = user({
    name: 'John Doe',
    age: 32
  })

  t.deepEqual(john, {
    name: 'John Doe',
    age: 32
  })
})
