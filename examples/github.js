'use strict'

const parseLinkHeader = require('parse-link-header')
const PaginatedCollection = require('../lib/PaginatedCollection')

class GitHubCollection extends PaginatedCollection {
  async data (response, body) {
    return body.items
  }

  async next (response, body) {
    let header = response.headers.get('link')
    let links = parseLinkHeader(header)

    return links.next ? links.next.url : null
  }
}

async function iterate (items) {
  for await (let item of items) {
    console.log('item', item)
  }
}

let items = new GitHubCollection('https://api.github.com/search/code', {
  q: 'test user:hubgit'
})

iterate(items).then(() => {
  console.log('finished!')
})
