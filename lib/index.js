const PaginatedCollection = require('./PaginatedCollection')

module.exports = function (url, params) {
  return new PaginatedCollection(url, params)
}
