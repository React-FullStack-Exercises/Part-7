/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { notify } from './reducers/notificationReducer'
import Notification from './components/Notification'
import {
  selectAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from './reducers/blogsReducer'
import {
  getLoggedInUser,
  userLoggedIn,
  userLoggedOut,
} from './reducers/userReducer'

import Footer from './components/Footer'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const loggedInUser = useSelector(getLoggedInUser)
  const blogs = useSelector(selectAllBlogs)
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(userLoggedIn(user))
        dispatch(notify(`${user.name} logged in`, 'success'))
      })
      .catch(() => {
        dispatch(notify('Wrong username or password', 'error'))
      })
  }

  const handleLogout = async () => {
    if (loggedInUser) {
      dispatch(userLoggedOut())
      dispatch(notify('good bye!', 'success'))
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      // const returnedBlog = await blogService.create(blogObject)
      // setBlogs(blogs.concat(returnedBlog))
      await dispatch(createBlog(blogObject)).unwrap()
      dispatch(
        notify(
          `a new blog '${blogObject.title}' by ${blogObject.author} added`,
          'success'
        )
      )
    } catch (exception) {
      if (exception.response.status === 401) {
        handleLogout()
        return dispatch(notify('Authorization error', 'error'))
      }
      dispatch(notify('error creating new blog', 'error'))
    }
  }

  const increaseLike = async (blog) => {
    // const blog = blogs.find(b => b.id === id)
    // const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const liked = {
        ...blog,
        likes: (blog.likes || 0) + 1,
        user: blog.user.id,
      }
      dispatch(updateBlog(liked))
      dispatch(notify(`you liked '${liked.title}' by ${liked.author}`))
      // await blogService.update(id, changedBlog)
      // setBlogs(blogs.map(b => b.id === id ? changedBlog : b))
    } catch (exception) {
      if (exception.response.status === 401) {
        handleLogout()
        return dispatch(notify('Authorization error', 'error'))
      }
      dispatch(
        notify('the blog post was already deleted from database', 'error')
      )
    }
  }

  const handleDelete = async (blog) => {
    try {
      // await blogService.remove(id)
      // setBlogs(blogs.filter(b => b.id !== id))
      dispatch(deleteBlog(blog))
      dispatch(
        notify(
          `blog '${blog.title}' by ${blog.author} deleted successfully`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(notify('error while deleting blog', 'error'))
    }
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => (
    <Togglable
      buttonLabel="create new blog"
      buttonId="create-blog-button"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blog App</h1>

      <Notification />
      {loggedInUser === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {loggedInUser.name} logged-in <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => increaseLike(blog)}
              handleDelete={() => handleDelete(blog)}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  )
}

export default App
