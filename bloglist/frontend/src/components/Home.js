import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createBlog, selectAllBlogs } from '../reducers/blogsReducer';
import { notify } from '../reducers/notificationReducer';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)
  const blogFormRef = useRef()


  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap()
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`,'success'))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(notify('error creating new blog' + exception.message, 'error'))
    }
  }

  const style = {
    padding: 5,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog' buttonId='create-blog-button' ref={blogFormRef}>
        <BlogForm
          onCreate={onCreateBlog}
          onCancel={() => blogFormRef.current.toggleVisibility}
        />
      </Togglable>

      <div>
        {
          blogs.map((blog) => (
            <div key={blog.id} style={style}>
              <h3>{blog.title}</h3>
              <h4>by {blog.author}</h4>
              <button>
                <Link
                  style={{ texDecoration: 'none' }}
                  to={`/blogs/${blog.id}`}
                >
                  see blog
                </Link>
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default Home