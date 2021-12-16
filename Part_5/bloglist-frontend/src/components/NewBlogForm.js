import React, { useState } from "react"
import PropTypes from "prop-types"

const NewBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogURL, setNewBlogURL] = useState("")

  const newBlogHandler = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    })

    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogURL("")
  }

  return (
    <div>
      <h2>Create new blog entry</h2>
      <form onSubmit={newBlogHandler}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogURL}
            name="URL"
            onChange={({ target }) => setNewBlogURL(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm
