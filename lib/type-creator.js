function create(definition) {
  return function type(data) {
    return createInstance(definition, data)
  }
}

function createInstance(definition, data) {
  return Object.keys(definition).reduce(function (result, key) {
    var checkType = definition[key]

    if (!data.hasOwnProperty(key) && !checkType._hasDefault) {
      throw Error('Expected property ' + key + ' to be defined.')
    }

    result[key] = checkType(key, data[key])
    return result
  }, {})
}

module.exports = {
  create: create
}
