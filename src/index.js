import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import PostDB from './db/PostDB'

import * as serviceWorker from './serviceWorker'

let idbOpenDBRequest = indexedDB.open('cachedPost', 1)

idbOpenDBRequest.onerror = function (event) {
  console.error('can\'t open indexedDB ', event.target.result)
}

idbOpenDBRequest.onsuccess = function (event) {
  console.log('open indexedDB successfully')
  const db = new PostDB(event.target.result)
  ReactDOM.render(<App db={db}/>, document.getElementById('root'))
}

idbOpenDBRequest.onupgradeneeded = function (event) {
  console.log('creating/updating indexedDB')
  let objectStore = event.target.result.createObjectStore("post", { keyPath: "filename" });
  objectStore.createIndex("postDate", "postDate", { unique: false });
  objectStore.createIndex("category", "category", { unique: false });
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
