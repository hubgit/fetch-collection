jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

const resource = require('../lib')

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
  resource('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  }).json({
    data: async (response, body) => body.items,
    limit: 1
  }).subscribe(data => {
    expect(data).toHaveLength(30)
    done()
  }, error => {
    done.fail(error)
  })
})
