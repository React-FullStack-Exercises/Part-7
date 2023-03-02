import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { createBlog, selectAllBlogs } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'

// import { Box } from '@mui/system'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)
  const blogFormRef = useRef()

  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap()
      dispatch(
        notify(`a new blog '${blog.title}' by ${blog.author} added`, 'success')
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(notify('error creating new blog' + exception.message, 'error'))
    }
  }

  return (
    <div>
      <Togglable
        buttonLabel='create new blog'
        buttonId='create-blog-button'
        ref={blogFormRef}
      >
        <BlogForm
          onCreate={onCreateBlog}
          onCancel={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <Grid
        container
        spacing={0}
        flexGrow={1}
      >
        {blogs.map((blog) => (
          <Grid key={blog.id} xs={6} p={3} sx={{ minWidth: 400 }}>
            <Card>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {blog.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  by {blog.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  <Link
                    style={{ texDecoration: 'none' }}
                    to={`/blogs/${blog.id}`}
                  >
                    See blog
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home
