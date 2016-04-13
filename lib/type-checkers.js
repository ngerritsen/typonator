function createTypeChecker(typeName) {
  var type = typeName === 'bool' ? 'boolean' : typeName

  if (type === 'array') {
    return function checkType(key, value) {
      if (!value || !value.constructor === Array) {
        throw createTypeError(type, key, value)
      }

      return value
    }
  }

  return function checkType(key, value) {
    if (typeof value !== type) {
      throw createTypeError(type, key, value)
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

var possibleTypes = [
  'number',
  'string',
  'bool',
  'function',
  'object',
  'array'
]

var typeCheckers = possibleTypes.reduce(function (checkers, type) {
  checkers[type] = createTypeChecker(type)
  return checkers
}, {})

module.exports = typeCheckers
