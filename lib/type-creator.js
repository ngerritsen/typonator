function create(definition) {
  return function type(data) {
    return createInstance(definition, data)
  }
}

function createInstance(definition, data) {
  return Object.keys(definition).reduce(function (result, key) {
    if (!data.hasOwnProperty(key)) {
      throw Error('Expected property ' + key + ' to be specified.')
    }

    result[key] = definition[key](key, data[key])
    return result
  }, {})
}

module.exports = {
  create: create
}
