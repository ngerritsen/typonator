var utility = require('./utility')

var nativeTypes = [
  'number',
  'string',
  'bool',
  'function',
  'object'
]

function createTypeChecker(typeName) {
  var type = typeName === 'bool' ? 'boolean' : typeName

  return function checkType(key, value) {
    if (typeof value !== type || type === null) {
      throw createTypeError(type, key, value)
    }

    return value
  }
}

function checkArray(key, value) {
  if (!value || !value.constructor === Array) {
    throw createTypeError('array', key, value)
  }

  return value
}

function custom (name, predicate) {
  return function checkType(key, value) {
    if (!predicate(value)) {
      throw Error('Expected ' + key + ' to be of custom type ' + name + '.')
    }

    return value
  }
}

function createTypeError(type, key, value) {
  return Error(
    'Expected ' + key + ' to be of type ' + type +
    ', instead is of type ' + typeof value + '.'
  )
}

var typeCheckers = nativeTypes.reduce(function (checkers, type) {
  checkers[type] = createTypeChecker(type)
  return checkers
}, {})

module.exports = utility.merge(
  typeCheckers,
  {
    array: checkArray,
    custom: custom
  }
)
