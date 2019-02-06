import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import PostItem from './PostItem'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function (props) {
  const { allPost, onSelect, curPostName } = props
  return (
    <ExpansionPanel square defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography variant={'h6'}>{capitalizeFirstLetter('local')}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: 0 }}>
        <List style={{ cursor: 'pointer', width: '100%' }}>
          {allPost.map((post) => <PostItem key={post.filename} post={post} onSelect={onSelect} curPostName={curPostName}/>)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


