var utility = require('./utility')
var typeCheckers = require('./type-checkers')
var typeCreator = require('./type-creator')

module.exports = utility.merge(
  typeCheckers,
  typeCreator
)
