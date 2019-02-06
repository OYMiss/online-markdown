import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import Drawer from '@material-ui/core/Drawer'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import PostListOffline from './PostListOffline'
import profile from '../static/profile.jpg'

export default function (props) {
  const {
    setCurPost,
    onSelect,
    allPost,
    openNewPost,
    openDelPost,
    curPostName,
    newEmptyPost
  } = props

  return (
    <Drawer variant={'permanent'} open PaperProps={{ style: { width: '20%' } }}>
      <ListItem style={{ cursor: 'pointer' }}>
        <Avatar src={profile} style={{ marginLeft: 20, width: 90, height: 90 }}/>
        <ListItemText primary={'OYMiss'} secondary={'I\'m OY'}/>
      </ListItem>
      <PostListOffline curPostName={curPostName} onSelect={onSelect} allPost={allPost}/>
      <div style={{ position: 'fixed', bottom: '2%', left: '10%' }}>
        <Fab color="primary" aria-label="Add" onClick={() => {
          setCurPost(newEmptyPost())
          openNewPost()
        }}>
          <AddIcon/>
        </Fab>
        <Fab style={{ marginLeft: 10 }} color="secondary" aria-label="Delete" onClick={() => {
          openDelPost()
        }}>
          <DeleteIcon/>
        </Fab>
      </div>
    </Drawer>
  )
}
