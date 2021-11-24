const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const app = require("../app")

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test("all blogs are returned with get /api/blogs", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("id field of all blogs is named correctly as 'id'", async () => {
  const response = await api.get("/api/blogs")
  const body = response.body

  body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test("new blog can be added with post /api/blogs", async () => {
  const newBlog = {
    title: "Stay at home and stay fit",
    author: "Arnold Schwarzenegger",
    url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit",
    likes: 9
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAfter = await helper.blogsInDB()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAfter.map(blog => blog.title)
  expect(titles).toContainEqual(
    "Stay at home and stay fit"
  )
})

test("likes default to 0 if no likes provided when adding new blog", async () => {
  const newBlog = {
    title: "Stay at home and stay fit",
    author: "Arnold Schwarzenegger",
    url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAfter = await helper.blogsInDB()
  const addedBlog = blogsAfter.find(blog => blog.title === "Stay at home and stay fit")

  expect(addedBlog.likes).toBe(0)
})

test("new blogs without title and url get rejected as bad requests", async () => {
  const newBlog = {
    author: "Arnold Schwarzenegger",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)

  const blogsAfter = await helper.blogsInDB()
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
})

test("single blog can be deleted with delete /api/blogs/id", async () => {
  const blogsBefore = await helper.blogsInDB()
  const blogToDelete = blogsBefore[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfter = await helper.blogsInDB()

  expect(blogsAfter).toHaveLength(blogsBefore.length - 1)

  const urls = blogsAfter.map(blog => blog.url)

  expect(urls).not.toContain(blogToDelete.url)
})

test("existing blogs fields can be updated with put /api/blogs/id", async () => {
  const blogsBefore = await helper.blogsInDB()
  const blogToUpdate = blogsBefore[0]

  const updatedBlogData = {
    title: "Tim Ferriss Interviews Arnold Schwarzenegger on Psychological Warfare",
    author: "Tim Ferriss",
    url: "https://tim.blog/2015/02/02/arnold-schwarzenegger/",
    likes: 16
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)

  const blogsAfter = await helper.blogsInDB()

  const updatedFields = Object.keys(updatedBlogData)
  const updatedFieldsInDB = {}

  for (const key in blogsAfter[0]) {
    if (updatedFields.includes(key)) {
      updatedFieldsInDB[key] = blogsAfter[0][key]
    }
  }

  expect(Object.entries(updatedFieldsInDB))
    .toEqual(Object.entries(updatedBlogData))
})

afterAll(() => {
  mongoose.connection.close()
})
