const stream = require('rest-collection-stream')

module.exports = function (url, params) {
  return {
    fetch: function (format, options) {
      options = options || {}
      options.uri = url
      options.qs = params
      options.headers = options.headers || {}
      options.headers['User-Agent'] = options.headers['User-Agent'] || 'fetch-collection'

      switch (format) {
        case 'json':
          return stream(options)

        default:
          throw new Error('Unsupported format ' + format)
      }
    }
  }
}
