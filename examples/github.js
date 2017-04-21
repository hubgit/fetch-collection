'use strict'

const parseLinkHeader = require('parse-link-header')
const collection = require('../lib')

collection('https://api.github.com/search/code', {
  q: 'test user:hubgit'
}).json({
  total: (response, body) => body.total_results,
  data: (response, body) => body.items,
  next: (response, body) => {
    const header = response.headers.get('link')
    const links = parseLinkHeader(header)

    return links.next ? links.next.url : null
  }
}).subscribe(page => {
  console.log(page)
  for (let item of page.data) {
    console.log(item)
  }
}, err => {
  console.error(err)
}, () => {
  console.log('finished!')
})
