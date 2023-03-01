
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import { getLoggedInUser } from '../reducers/userReducer'

import CommentSection from './CommentSection'


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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <h2>{blog.title}, by {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={likeBlog}>like</button>
        </div>
        <div>added by {addedBy}</div>
        {own && <button onClick={removeBlog}>remove</button>}
      </div>
      <CommentSection blog={blog}/>
    </div>
  )
}
export default Blog
