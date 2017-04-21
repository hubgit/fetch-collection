# fetch-collection

A wrapper for [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) that makes fetching paginated JSON easier and handles query parameters.

## Install

```js
yarn add fetch-collection
```

## Usage

```js
var collection = require('fetch-collection')

collection('https://api.github.com/search/repositories', {
  q: 'language:javascript',
  sort: 'stars',
  order: 'desc'
}).json({
   data: (response, body) => body.items, // return data
   next: (response, body) => body.links.next, // return a string (URL) or an object (params)
   limit: 3 // only fetch the first 3 pages
}).subscribe(page => {
  for (let item of page.data) {
    // do something with item
  }
})

```
