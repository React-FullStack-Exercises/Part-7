import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'

import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
} from '@mui/material'

import CommentIcon from '@mui/icons-material/Comment'

const CommentSection = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    if (blog.comments.some((c) => c === comment)) {
      dispatch(notify('Someone has already posted this comment', 'error'))
    } else {
      dispatch(postComment({ id: blog.id, comment }))
      dispatch(notify(`comment '${comment}' posted`, 'success'))
    }
    setComment('')
  }

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant='h6'>Comments</Typography>
      <form onSubmit={addComment}>
        <TextField
          type='text'
          value={comment}
          placeholder='Type your comment here...'
          label='comment'
          onChange={(event) => setComment(event.target.value)}
          size='small'
          sx={{ maxWidth: 400, mr: 1 }}
        />
        <Button size='large' type='submit' variant='outlined' color='primary'>
          add
        </Button>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary={comment}/>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default CommentSection
