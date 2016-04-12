var typeCheckers = require('./type-checkers')

function create(definition) {
  return function type(data) {
    return createInstance(definition, data)
  }
}

function createInstance(definition, data) {
  return Object.keys(definition).reduce(function (result, key) {
    result[key] = definition[key](key, data[key])
    return result
  }, {})
}

var typeCreator = typeCheckers
typeCreator.create = create

module.exports = typeCreator
