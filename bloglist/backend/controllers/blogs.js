const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')


//  GET
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//  POST
blogsRouter.post('/', async (request, response) => {

  if(!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user.id)
  
  const blog = new Blog({...request.body, user: user.id})

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const blogToReturn = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1
  })

  response.status(201).json(blogToReturn)
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById( request.params.id )
  if (!blogToDelete) {
    return response.status(204).end();
  }
  console.log(request.user);
  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'you are not authorized to delete this blog',
    });
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// PUT
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })
  response.status(202).json(updatedBlog)
})


// Comment controllers
blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment

  const blog = await Blog.findById(request.params.id)

  blog.comments = blog.comments.concat(comment)
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter