jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

const resource = require('../lib')
const nextLinkHeader = require('next-fetch-link-header')

test('adds an encoded query string to the url', () => {
  const collection = resource('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  })

  const result = collection.build(collection.url, collection.params)

  expect(result)
    .toBe('https://api.github.com/search/repositories?q=language%3Ajavascript&sort=stars&order=desc')
})

test('fetches an array', (done) => {
  let pages = 0

  resource('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  }).json({
    total: (response, body) => body.total_count,
    data: (response, body) => body.items,
    next: nextLinkHeader,
    limit: 2 // only fetch 2 pages
  }).subscribe(page => {
    // console.log(page)
    pages++
    expect(page.data).toHaveLength(30)
  }, error => {
    done.fail(error)
  }, () => {
    expect(pages).toBe(2)
    done()
  })
})
