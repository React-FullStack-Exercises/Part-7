import { useState } from 'react'

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'

const BlogForm = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card>
      <Typography variant='h3'>Create new</Typography>
      <CardContent sx={{ maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <TextField
              required
              fullWidth
              variant='outlined'
              label='Title'
              placeholder='Enter blog title...'
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              fullWidth
              variant='outlined'
              label='Author'
              placeholder='Enter blog author...'
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              fullWidth
              variant='outlined'
              label='Url'
              placeholder='Enter blog url...'
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Grid>
          <Grid xs={6} sm={6} item>
            <Button
              variant='contained'
              id='submit-blog-button'
              type='submit'
              color='primary'
              onClick={handleSubmit}
              fullWidth
            >
              Create
            </Button>
          </Grid>
          <Grid xs={6} sm={6} item>
            <Button
              variant='contained'
              id='cancel-blog-form'
              type='submit'
              color='error'
              onClick={onCancel}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BlogForm
