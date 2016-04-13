var test = require('ava')
var type = require('..')

test('can use default values', t => {
  var song = type.create({
    rating: type.custom('rating', isRating).default(1),
    album: type.string.default('Various')
  })

  function isRating (value) {
    return typeof value === 'number' && value >= 0 && value <= 5
  }

  t.deepEqual(song({}), {
    rating: 1,
    album: 'Various'
  }, 'Does not use default for non specified values')

  t.deepEqual(song({
    rating: 2,
    album: 'My album'
  }), {
    rating: 2,
    album: 'My album'
  }, 'Does not use default for specified values')

  t.deepEqual(song({
    rating: 0,
    album: ''
  }), {
    rating: 0,
    album: ''
  }, 'Does not use default for falsy values')

  t.throws(() =>
    song({
      rating: 6
    }),
    'Expected rating to be of custom type rating.'
  )
})
