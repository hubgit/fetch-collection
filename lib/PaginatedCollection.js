'use strict'

import 'isomorphic-fetch'

class PaginatedCollection {
  constructor (url, params = {}) {
    this.url = url
    this.params = params
  }

  async * [Symbol.asyncIterator] () {
    let url = this.url
    let params = this.params

    do {
      let page

      try {
        page = await this.fetch(this.buildURL(url, params))
      } catch (e) {
        console.error(e)
        return
      }

      for (let item of page.data) {
        yield item
      }

      switch (typeof page.next) {
        case 'string':
          url = page.next
          params = {}
          break
        case 'object':
          Object.assign(params, page.next)
          break
        default:
          url = null
          break
      }
    } while (url)
  }

  async data (response, body) {
    return body
  }

  async next (response, body) {
    return null
  }

  async fetch (url) {
    console.log('Fetching ' + url)

    let response = await fetch(url)
    let body = await response.json()
    let data = await this.data(response, body)
    let next = await this.next(response, body)

    return { data, next }
  }

  buildURL (url, params = {}) {
    const querystring = Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&')

    return querystring ? url + '?' + querystring : url
  }
}

module.exports = PaginatedCollection
