function merge() {
  var args = Array.prototype.slice.call(arguments)

  return args.reduce(function (result, obj) {
    if (!obj || typeof obj !== 'object') {
      throw Error('Only provide objects to merge')
    }

    Object.keys(obj).forEach(function (key) {
      result[key] = obj[key]
    })

    return result
  }, {})
}

module.exports = {
  merge: merge
}
