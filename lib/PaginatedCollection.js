'use strict'

import ogen from 'ogen'
import 'isomorphic-fetch'

class PaginatedCollection {
  constructor (url, params) {
    this.url = url
    this.params = params
  }

  json (options = {}) {
    return ogen(this._json)(this, options)
  }

  * _json (collection, options) {
    let url = collection.url
    let params = collection.params
    let counter = 0

    const defaults = {
      data: async (response, body) => body,
      total: async (response, body) => null,
      limit: 0,
      headers: {
        'Accept': 'application/json'
      }
    }

    options = Object.assign(defaults, options)

    do {
      // TODO: this yields the whole page object
      const page = yield collection.fetch(collection.build(url, params), options)

      // TODO: somehow yield just the individual items
      // for (const item of page.data) {
      //   yield item
      // }

      // no pagination
      if (!options.next) break

      // reached the limit
      if (options.limit && ++counter === options.limit) break

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

  async fetch (url, options) {
    console.log('Fetching ' + url)

    const request = new Request(url, {
      headers: new Headers(options.headers)
    })

    const response = await fetch(request)
    const body = await response.json()

    // console.log(body)

    if (options.next) {
      return {
        total: options.total(response, body),
        data: options.data(response, body),
        next: options.next(response, body)
      }
    }

    return options.data(response, body)
  }

  build (url, params = {}) {
    const querystring = Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&')

    return querystring ? url + '?' + querystring : url
  }
}

module.exports = PaginatedCollection
