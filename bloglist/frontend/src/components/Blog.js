import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import { getLoggedInUser } from '../reducers/userReducer'

import CommentSection from './CommentSection'

import { Paper, Button, Typography, Container, Divider } from '@mui/material'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(getLoggedInUser)
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const removeBlog = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) {
      return
    }
    dispatch(deleteBlog(blog))
    navigate('/')
    dispatch(
      notify(
        `blog '${blog.title}' by ${blog.author} deleted successfully`,
        'success'
      )
    )
  }

  const likeBlog = () => {
    const liked = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id,
    }
    dispatch(updateBlog(liked))
    dispatch(notify(`you liked '${liked.title}' by ${liked.author}`))
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user && user.username === blog.user.username

  // const blogStyle = {
  //   padding: 10,
  //   border: 'solid',
  //   borderWidth: 2,
  //   marginBottom: 5,
  // }

  return (
    <Paper variant='outlined' className='blog'>
      <Container sx={{ m: 3 }}>
        <Typography variant='h5'>
          {blog.title}, by {blog.author}
        </Typography>
        <Typography>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <Typography>
          likes {blog.likes}
        </Typography>
        <Typography>added by {addedBy}</Typography>
        <Button sx={{ mr: 2, mt:2 }} disableElevation={true} variant='contained' color='primary' onClick={likeBlog}>like</Button>
        {own && <Button sx={{ mt:2 }} disableElevation={true} variant='contained' color='error' onClick={removeBlog}>remove</Button>}
      </Container>
      <Divider />
      <CommentSection blog={blog} />
    </Paper>
  )
}
export default Blog
