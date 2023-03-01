import { useState } from 'react'

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
    <div>
      <h2>Create a new Blog</h2>
      <form>
        <div>
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id='submit-blog-button' type='submit' onClick={handleSubmit}>create</button>
        <button id='cancel-blog-form' type='submit' onClick={onCancel}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm
