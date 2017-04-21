'use strict'

import ogen from 'ogen'
import 'isomorphic-fetch'

class Resource {
  constructor (url, params) {
    this.url = url
    this.params = params
  }

  json (options = {}) {
    options = Object.assign({
      data: (response, body) => body,
      total: (response, body) => null,
      limit: 0,
      headers: {
        'Accept': 'application/json'
      }
    }, options)

    // return Observable (collection)
    if (options.next) {
      return ogen(this._json)(this, options)
    }

    // return Promise (single item)
    return this.fetch(this.url, this.params, options)
      .then(({response, body}) => options.data(response, body))
  }

  * _json (collection, options) {
    let url = collection.url
    let params = collection.params
    let counter = 0

    do {
      const page = yield collection.fetch(url, params, options)
        .then(({ response, body }) => ({
          total: options.total(response, body),
          data: options.data(response, body),
          next: options.next(response, body)
        }))

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

  fetch (url, params, options) {
    url = this.build(url, params)

    console.log('Fetching ' + url)

    const request = new Request(url, {
      headers: new Headers(options.headers)
    })

    return fetch(request)
      .then(response => response.json().then(body => ({ response, body })))
  }

  build (url, params = {}) {
    const querystring = Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&')

    return querystring ? url + '?' + querystring : url
  }
}

module.exports = Resource
