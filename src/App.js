import React, { useEffect, useState } from 'react'

import Editor from './editor/Editor'
import FileBar from './view/FileBar'
import NewPost from './view/NewPost'
import DeletePost from './view/DeletePost'

import 'katex/dist/katex.min.css'
import './static/mde.css'
import './static/App.css'

const defaultPost = {
  title: 'Hello',
  filename: 'no-select',
  category: 'local',
  content: '',
  author: 'OY',
  postDate: new Date().toISOString()
}

let cm = null

function App (props) {
  const { db } = props
  // all curPost.content is not up to date
  const [notSelect, setNotSelect] = useState(true)
  const [curPost, setCurPost] = useState(defaultPost)
  const [allPost, setAllPost] = useState([])
  const [newPostOn, setNewPostOn] = useState(false)
  const [delPostOn, setDelPostOn] = useState(false)

  useEffect(() => {
    db.listPost((event) => {
      setAllPost(event.target.result)
    })
  }, [allPost.length])

  function onChange (content) {
    let updatedPost = { ...curPost, content }
    setCurPost(updatedPost)
    db.updatePost(updatedPost)
  }

  function pushPost (newPost) {
    db.addPost(newPost)
    setAllPost([...allPost, newPost])
  }

  function onSelect (filename) {
    if (curPost.filename === filename) return
    db.getPost(filename, (event) => {
      console.log('setCurPost: ' + event.target.result.filename)
      if (cm) cm.value(event.target.result.content)
      setNotSelect(false)
      setCurPost(event.target.result)
    })
  }

  // ESC will make side disappeared
  // This code will move when rewrite editor
  if (cm && !cm.isSideBySideActive()) cm.toggleSideBySide()

  let editor =
    <Editor
      post={curPost}
      onChange={onChange}
      getMdeInstance={(instance) => {cm = instance}}
      customAction={() => alert('you click an custom action.')}
    />
  if (notSelect) {
    editor = <div/>
  }

  return (
    <div style={{ fontSize: '1.1rem' }}>
      <NewPost open={newPostOn} setOpen={setNewPostOn} onSubmit={(filename) => {
        let newPost = { filename, postDate: new Date().toISOString() }
        pushPost(newPost)
        setCurPost(newPost)
        setNotSelect(false);
      }}/>
      <DeletePost filename={curPost.filename} open={delPostOn} setOpen={setDelPostOn} onDelete={(filename) => {
        db.deletePost(filename)
        setNotSelect(true)
        setAllPost(allPost.slice(allPost.length - 1, 1))
      }}/>

      <FileBar allPost={allPost}
               onSelect={onSelect}
               curPostName={curPost.filename}
               openDelPost={() => {
                 if (notSelect) {
                   alert('select one to continue.')
                 } else if (allPost.length <= 1) {
                   alert('you must have on post')
                 } else {
                   setDelPostOn(true)
                 }
               }}
               openNewPost={() => setNewPostOn(true)}/>
      {editor}
    </div>
  )
}

export default App
