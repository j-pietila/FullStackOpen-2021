import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogURL, setNewBlogURL] = useState("")
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const newBlogHandler = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        resetNewBlogInputs()
        setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const newBlogForm = () => (
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
      <button type="submit">save</button>
    </form>  
  )

  const loginHandler = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedUser", JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      resetLoginInputs()
    }
    catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      resetLoginInputs()
    }
  }

  const loginForm = () => (
    <form onSubmit={loginHandler}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const Notification = ({ notification, errorMessage }) => {
    if (notification !== null) {
      return (
        <div className="notification">
          {notification}
        </div>
      )
    }
    else if (errorMessage !== null) {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    }
    else {
      return null
    }
  }

  const logout = () => {
    window.localStorage.removeItem("loggedUser")
  }

  const resetLoginInputs = () => {
    setUsername("")
    setPassword("")
  }

  const resetNewBlogInputs = () => {
    setNewBlogTitle("")
    setNewBlogAuthor("")
    setNewBlogURL("")
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
        notification={notification}
        errorMessage={errorMessage}
        />
        {loginForm()}
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>Blogs</h2>
        <Notification
          notification={notification}
          errorMessage={errorMessage}
        />
      </div>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <div>
        <h2>Create new blog entry</h2>
        {newBlogForm()}
      </div>
      <div>
        <p></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App
