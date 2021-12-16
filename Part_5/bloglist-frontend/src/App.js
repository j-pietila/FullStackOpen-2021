import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const newBlogHandler = (blogObject) => {
    newBlogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // Need new get from db to populate new blog user field with name and username.
        // Back-end returns only user id as the user info.
        blogService
          .getAll()
          .then(blogs => {
            setBlogs(blogs)
          })
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

  const updateBlog = (blogObject) => {
    const updatedBlog = blogs.find(blog => blog.id === blogObject.id)

    blogService
      .update(updatedBlog.id, blogObject)
      .then(returnedBlog => {
        returnedBlog.user = updatedBlog.user
        setBlogs(blogs.map(blog => updatedBlog.id !== blog.id ? blog : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(`Error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove ${blogToRemove.title} from blog list?`)) {
      blogService
        .remove(blogToRemove.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blogToRemove.id !== blog.id))
          setNotification(`Blog ${blogToRemove.title} by ${blogToRemove.author} removed`)
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
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={newBlogFormRef}>
      <NewBlogForm createBlog={newBlogHandler} />
    </Togglable>
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

  const sortBlogsByLikes = () => {
    blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
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
        {newBlogForm()}
      </div>
      <div>
        <p></p>
        {sortBlogsByLikes()}
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user}
            like={updateBlog}
            remove={removeBlog}
          />
        )}
      </div>
    </>
  )
}

export default App
