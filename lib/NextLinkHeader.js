const parseLinkHeader = require('parse-link-header')

module.exports = function (response, body) {
  const header = response.headers.get('link')
  const links = parseLinkHeader(header)

  return links.next ? links.next.url : null
}
