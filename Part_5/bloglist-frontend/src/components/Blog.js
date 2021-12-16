import React, { useState } from "react"

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

export default Blog
