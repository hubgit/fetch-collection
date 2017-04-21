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

collection('https://api.github.com/search/repositories', {
  q: 'language:javascript',
  sort: 'stars',
  order: 'desc'
}).json({
    data: (response, body) => body.items,
}).subscribe(page => {
  for (let item of page.data) {
    // do something with item
  }
})

```

### Custom parsing

Pass `data` and `next` functions as options to the `json` method to control extraction and pagination respectively.
