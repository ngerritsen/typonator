function createTypeChecker(type) {
  return function checkType(key, value) {
    if (typeof value !== type) {
      throw Error(
        'Expected ' + key + ' to be of type ' + type +
        ', instead is of type ' + typeof value
      )
    }

    return value
  }
}

var possibleTypes = [
  'number',
  'string',
  'bool',
  'function',
  'object'
]

var typeCheckers = possibleTypes.reduce(function (checkers, type) {
  checkers[type] = createTypeChecker(type)
  return checkers
}, {})

module.exports = typeCheckers
