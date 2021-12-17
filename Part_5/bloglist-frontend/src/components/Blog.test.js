import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"
import "@testing-library/jest-dom/extend-expect"

describe("<Blog >", () => {
  let component
  let like
  let remove

  beforeEach(() => {
    like = jest.fn()
    remove = jest.fn()

    const user = {
      name: "Test User",
      username: "test.user"
    }

    const blog = {
      author: "Test Person",
      likes: 12,
      title: "Testing is important",
      url: "www.test.com",
      user: user
    }

    component = render(
      <Blog
        blog={blog}
        loggedUser={user}
        like={like}
        remove={remove}
      />
    )
  })

  test("renders only blog title and author by default", () => {
    expect(component.container).toHaveTextContent("Testing is important - Test Person")
    expect(component.container).not.toHaveTextContent("Likes: 12")
    expect(component.container).not.toHaveTextContent("www.test.com")
  })

  test("renders also blog likes and url after view details button pressed", async () => {
    const button = component.getByText("View details")
    fireEvent.click(button)

    expect(component.container).toHaveTextContent("Testing is important - Test Person")
    expect(component.container).toHaveTextContent("Likes: 12")
    expect(component.container).toHaveTextContent("www.test.com")
  })

  test("registers like button presses correctly", () => {
    const button = component.getByText("View details")
    fireEvent.click(button)

    const likeButton = component.getByText("Like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})
