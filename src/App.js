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
  filename: 'default',
  category: 'local',
  content: '# Welcome \n This is HelloWorld! \n ## nice math? \n $$\ne^{-j\\omega}\n$$',
  author: 'OY',
  postDate: new Date().toISOString()
}

const newEmptyPost = () => ({ ...defaultPost, content: '' })

let cm = null

function App (props) {
  const { db } = props
  // all curPost.content is not up to date
  const [curPost, setCurPost] = useState(defaultPost)
  const [allPost, setAllPost] = useState([])
  const [newPostOn, setNewPostOn] = useState(false)
  const [delPostOn, setDelPostOn] = useState(false)

  useEffect(() => {
    const filename = curPost.filename
    db.getPost(filename, (event) => {
      if (!event.target.result) {
        console.log('create ' + filename)
        pushPost(curPost)
      } else {
        setCurPost(event.target.result)
      }
    }, () => {
      console.log('get curPost error')
    })
  }, [])

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
    console.log('setAll')
  }

  // ESC will make side disappeared
  // This code will move when rewrite editor
  if (cm && !cm.isSideBySideActive()) cm.toggleSideBySide()

  return (
    <div style={{ fontSize: '1.1rem' }}>
      <NewPost open={newPostOn} setOpen={setNewPostOn} onSubmit={(filename) => {
        let newPost = { ...curPost, filename, postDate: new Date().toISOString() }
        pushPost(newPost)
        setCurPost(newPost)
      }}/>
      <DeletePost filename={curPost.filename} open={delPostOn} setOpen={setDelPostOn} onDelete={(filename) => {
        db.deletePost(filename)
        setAllPost(allPost.slice(allPost.length - 1, 1))
      }}/>

      <FileBar allPost={allPost}
               setCurPost={setCurPost}
               curPostName={curPost.filename}
               newEmptyPost={newEmptyPost}
               onSelect={(filename) => {
                 if (curPost.filename === filename) return
                 db.getPost(filename, (event) => {
                   console.log('setCurPost' + event.target.result.filename)
                   setCurPost(event.target.result)
                   cm.value(event.target.result.content)
                 })
               }}
               openDelPost={() => setDelPostOn(true)}
               openNewPost={() => setNewPostOn(true)}/>
      <Editor copyPost={() => setNewPostOn(true)} onSave={(content) => pushPost({ ...curPost, content })}
              onChange={onChange} post={curPost}
              getMdeInstance={(instance) => {
                cm = instance
              }}/>
    </div>
  )
}

export default App
