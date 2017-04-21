const Resource = require('./Resource')

module.exports = function (url, params) {
  return new Resource(url, params)
}
