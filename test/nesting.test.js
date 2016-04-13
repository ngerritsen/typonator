var test = require('ava')
var type = require('..')

test('can nest types', t => {
  var car = type.create({
    speed: type.number
  })

  var person = type.create({
    name: type.string,
    car: type.type(car)
  })

  t.deepEqual(person({
    name: 'John',
    car: {
      speed: 100
    }
  }), {
    name: 'John',
    car: {
      speed: 100
    }
  })
})
