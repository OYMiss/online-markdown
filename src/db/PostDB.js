export default class PostDB {
  constructor (idb) {
    this.db = idb
  }

  setCallback(request, onsuccess, onerror) {
    request.onsuccess = onsuccess;
    request.onerror = onerror;
  }

  addPost (newPost, onsuccess, onerror) {
    let request = this.db.transaction(['post'], 'readwrite').objectStore('post').add(newPost)
    this.setCallback(request, onsuccess, onerror)
  }

  updatePost (updatedPost, onsuccess, onerror) {
    let request = this.db.transaction(['post'], 'readwrite').objectStore('post').put(updatedPost)
    this.setCallback(request, onsuccess, onerror)
  }

  listPost (onsuccess, onerror) {
    let request = this.db.transaction('post').objectStore('post').index('postDate').getAll();
    this.setCallback(request, onsuccess, onerror)
  }

  getPost (filename, onsuccess, onerror) {
    let request = this.db.transaction(['post']).objectStore('post').get(filename)
    this.setCallback(request, onsuccess, onerror)
  }

}