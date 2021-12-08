const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const Blog = require("../models/blog")
const User = require("../models/user")
const app = require("../app")

const api = supertest(app)


const addTestUser = async () => {
  await api
    .post("/api/users")
    .send({
      username: "arnold.schwarzenegger",
      name: "Arnold Schwarzenegger",
      password: "pumpingIron"
    })
}

const getToken = async () => {
  var token = ""

  const response = await api
    .post("/api/login")
    .send({
      "username": "arnold.schwarzenegger",
      "password": "pumpingIron"
    })

  token = response.body.token

  return token
}

describe("Blog handling", () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await addTestUser()
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
    const token = await getToken()

    const newBlog = {
      title: "Stay at home and stay fit",
      author: "Arnold Schwarzenegger",
      url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit",
      likes: 9
    }

    await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
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

  test("new blog cannot be added without a proper user token", async () => {
    const newBlog = {
      title: "Stay at home and stay fit",
      author: "Arnold Schwarzenegger",
      url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit",
      likes: 9
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/)
  })

  test("likes default to 0 if no likes provided when adding new blog", async () => {
    const token = await getToken()

    const newBlog = {
      title: "Stay at home and stay fit",
      author: "Arnold Schwarzenegger",
      url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit"
    }

    await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfter = await helper.blogsInDB()
    const addedBlog = blogsAfter.find(blog => blog.title === "Stay at home and stay fit")

    expect(addedBlog.likes).toBe(0)
  })

  test("new blogs without title and url get rejected as bad requests", async () => {
    const token = await getToken()

    const newBlog = {
      author: "Arnold Schwarzenegger",
    }

    await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDB()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

  test("single blog can be deleted with delete /api/blogs/id", async () => {
    const token = await getToken()

    const newBlog = {
      title: "Stay at home and stay fit",
      author: "Arnold Schwarzenegger",
      url: "http://www.schwarzenegger.com/fitness/post/stay-at-home-and-stay-fit",
      likes: 9
    }

    await api
      .post("/api/blogs")
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsBefore = await helper.blogsInDB()
    const blogToDelete = await Blog.find({ title: "Stay at home and stay fit" })

    await api
      .delete(`/api/blogs/${blogToDelete[0].id}`)
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
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
})

describe("User handling", () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test("all users are returned with get /api/users", async () => {
    const response = await api.get("/api/users")

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test("new user can be created with post /api/users", async () => {
    const newUser = {
      username: "mikko.mallikas",
      name: "Mikko Mallikas",
      password: "salainensana"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const users = await helper.usersInDB()
    const usernames = users.map(user => user.username)

    expect(usernames).toContainEqual(newUser.username)
  })

  test("new username must be unique", async () => {
    const newUser = {
      username: "clint.eastwood",
      password: "callaghan"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })

  test("username must exist when creating new user", async () => {
    const newUser = {
      username: "",
      password: "salainensana"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })

  test("new usernames under 3 characters long are rejected", async () => {
    const newUser = {
      username: "mi",
      password: "salainensana"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })

  test("password must exist when creating new user", async () => {
    const newUser = {
      username: "mikko.mallikas",
      password: ""
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })

  test("new passwords under 3 characters long are rejected", async () => {
    const newUser = {
      username: "mikko.mallikas",
      password: "sa"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
