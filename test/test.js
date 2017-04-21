const collection = require('../dist')

test('adds an encoded query string to the url', () => {
  const result = collection().buildURL('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  })

  expect(result)
    .toBe('https://api.github.com/search/repositories?q=language%3Ajavascript&sort=stars&order=desc')
})

test('fetches an array', async () => {
  const items = collection('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  })

  expect(typeof items).toBe('object')

  // TODO: test for…await…of
})
