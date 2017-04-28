jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

const collection = require('../lib')

test('creates a stream', function () {
  const result = collection('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  })

  expect(typeof result).toBe('object')
  expect(typeof result.fetch).toBe('function')
})

test('fetches a paginated array', function (done) {
  const stream = collection('https://api.github.com/search/repositories', {
    q: 'language:javascript',
    sort: 'stars',
    order: 'desc'
  }).fetch('json', {
    data: function (response, body) {
      return body.items
    }
  })

  var pageLimit = 3
  // var itemLimit = 50

  stream.on('page', function (options, res, body) {
    // if (options.pageIndex === 0) console.log(body.total_count)
    if (--pageLimit === 0) stream.destroy()
  }).on('total', function (total) {
    expect(typeof total).toBe('number')
  }).on('data', function (item) {
    expect(typeof item).toBe('object')
    expect(typeof item.stargazers_count).toBe('number')
    // if (--itemLimit === 0) stream.destroy()
  }).on('close', function () {
    expect(pageLimit).toBe(0)
    // console.log(pageLimit, itemLimit)
    done()
  }).on('error', function (err) {
    done.fail(err)
  })
})
