const middleware = require("../utils/middleware")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400)
      .json({ error: "blog title or url missing" })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog.toJSON())
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  else {
    return response.status(401).json({ error: "unauthorized delete operation" })
  }
})

module.exports = blogsRouter
