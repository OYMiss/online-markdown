import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function (props) {
  const {open, setOpen, onSubmit} = props;
  // const [open, setOpen] = React.useState(false)

  function handleClose () {
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete the table to create a New post.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename-input-text"
            label="File Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            onSubmit(document.getElementById('filename-input-text').value)
            handleClose()
          }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
