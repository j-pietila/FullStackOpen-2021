import React, { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, loggedUser, like, remove }) => {
  const [detailedView, setdetailedView] = useState(false)

  const addLike = (blogToUpdate) => {
    like({
      id: blogToUpdate.id,
      user: blogToUpdate.user,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    })
  }

  const removeBlog = (blogToRemove) => {
    remove(blogToRemove.id)
  }

  if (detailedView) {
    return (
      <div className="blog">
        {blog.title} - {blog.author}
        <button onClick={() => setdetailedView(!detailedView)}>Hide details</button>
        <br></br>
        {blog.url}
        <br></br>
        Likes: {blog.likes}
        <button onClick={() => addLike(blog)}>Like</button>
        <br></br>
        {blog.user.name}
        <br></br>
        {loggedUser.name === blog.user.name &&
          <button onClick={() => removeBlog(blog)}>Remove blog</button>
        }
      </div>
    )
  }

  return (
    <div>
      {blog.title} - {blog.author}
      <button onClick={() => setdetailedView(!detailedView)}>View details</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog
