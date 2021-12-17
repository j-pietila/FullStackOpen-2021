import React from "react"
import { render, fireEvent } from "@testing-library/react"
import NewBlogForm from "./NewBlogForm"
import "@testing-library/jest-dom/extend-expect"

test("<NewBlogForm /> submits new blog form with correct data", () => {
  const newBlogHandler = jest.fn()

  const component = render(
    <NewBlogForm createBlog={newBlogHandler} />
  )

  const form = component.container.querySelector("form")
  const inputTitle = component.container.querySelector("input[name='Title']")
  const inputAuthor = component.container.querySelector("input[name='Author']")
  const inputURL = component.container.querySelector("input[name='URL']")

  fireEvent.change(inputTitle, {
    target: { value: "Testing is important" }
  })
  fireEvent.change(inputAuthor, {
    target: { value: "Test Person" }
  })
  fireEvent.change(inputURL, {
    target: { value: "www.test.com" }
  })
  fireEvent.submit(form)

  expect(newBlogHandler.mock.calls).toHaveLength(1)
  expect(newBlogHandler.mock.calls[0][0].title).toBe("Testing is important")
  expect(newBlogHandler.mock.calls[0][0].author).toBe("Test Person")
  expect(newBlogHandler.mock.calls[0][0].url).toBe("www.test.com")
})
