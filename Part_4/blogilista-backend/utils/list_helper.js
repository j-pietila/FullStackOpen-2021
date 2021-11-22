const _ = require("lodash")

const dummy = (blogs) => {
  // Return 1 always
  if (blogs) {
    return 1
  }
  else {
    return 1
  }
}

const favoriteBlog = (blogs) => {
  // Return blog with most likes as an blog object
  if (blogs.length === 0) {
    return {}
  }

  let mostLikes = blogs.reduce((likes, blog) => {
    if (blog.likes > likes) {
      likes = blog.likes
    }
    return likes
  }, 0)

  let blogWithMostLikes = blogs.find(blog => blog.likes === mostLikes)

  let favoriteBlog = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  // Return author with most blogs and amount of blogs he/she has written as an object
  if (blogs.length === 0) {
    return {}
  }

  let uniqueAuthorsAndBlogs = _.countBy(blogs, (blog) => {
    return blog.author
  })

  let authorWithMostBlogs = {
    author: "",
    blogs: 0
  }

  _.forEach(uniqueAuthorsAndBlogs, (value, key) => {
    if (value > authorWithMostBlogs.blogs) {
      authorWithMostBlogs.author = key
      authorWithMostBlogs.blogs = value
    }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  // Return author with most likes and amount of likes received as an object
  if (blogs.length === 0) {
    return {}
  }

  let uniqueAuthorsBlogObjects = _.intersectionBy(blogs, "author")
  let uniqueAuthorNames = _.map(uniqueAuthorsBlogObjects, "author")
  let uniqueAuthors = Object.fromEntries(uniqueAuthorNames.map(name => [name, 0]))

  _.forEach(blogs, (blog) => {
    uniqueAuthors[blog.author] += blog.likes
  })

  let authorWithMostLikes = {
    author: "",
    likes: 0
  }

  _.forEach(uniqueAuthors, (value, key) => {
    if (value > authorWithMostLikes.likes) {
      authorWithMostLikes.author = key
      authorWithMostLikes.likes = value
    }
  })

  return authorWithMostLikes
}

const totalLikes = (blogs) => {
  // Return sum of likes among all blogs
  let totalLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return totalLikes
}

module.exports = { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes }
