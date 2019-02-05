import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const selectedStyle = {
  borderLeft: '5px solid #0e188c7a',
  background: '#6633990f'
}

export default function (props) {
  const { post, curPostName, onSelect } = props
  return (
    <ListItem key={post.filename}
              style={post.filename === curPostName ? selectedStyle : null}
              onClick={() => onSelect(post.filename)} button>
      <ListItemText style={{ paddingLeft: 20 }} primary={post.filename} secondary={
        new Date(post.postDate).toLocaleDateString([], {
          year: 'numeric', month: 'short', day: '2-digit'
        })
      }/>
    </ListItem>
  )
}