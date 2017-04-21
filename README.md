# fetch-collection

A wrapper for [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) that makes fetching paginated JSON easier and handles query parameters.

## Install

```js
npm install fetch-collection
```

or

```js
yarn add fetch-collection
```

## Usage

```js
var collection = require('fetch-collection')

const items = collection('https://api.github.com/search/repositories', {
  q: 'language:javascript',
  sort: 'stars',
  order: 'desc'
})

for await (let item of items) {
  // do something with item
}
```

### Custom parsing

Extend the PaginatedCollection class and override the `data` and `next` methods to parse the response as required.
