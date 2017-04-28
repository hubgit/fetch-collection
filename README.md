# fetch-collection

A wrapper for [rest-collection-stream](https://www.npmjs.com/package/rest-collection-stream) that makes fetching paginated JSON easier and handles query parameters.

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
}).fetch('json', {
  data: (response, body) => body.items, // return an array of data
  next: (response, body) => body.links.next, // return a string (URL) or an object (params)
}).on('data', item => {
  // do something with item
})

```
