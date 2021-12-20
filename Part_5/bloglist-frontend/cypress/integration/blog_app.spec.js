describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Test Person",
      username: "test.person",
      password: "password"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("login form is shown if not logged in", function () {
    cy.contains("Log in to application")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe("login",function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test.person")
      cy.get("#password").type("password")
      cy.get("#login-button").click()
      cy.contains("Test Person logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test.person")
      cy.get("#password").type("wrongpassword")
      cy.get("#login-button").click()
      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
      cy.get("html")
        .should("not.contain", "Test Person logged in")
    })
  })

  describe("when logged in", function () {
    beforeEach(function() {
      cy.login({ username: "test.person", password: "password" })
    })

    it("a new blog can be created", function () {
      cy.contains("Create new blog").click()
      cy.get("#title").type("A glorious test blog")
      cy.get("#author").type("Master Tester")
      cy.get("#url").type("www.testingisimportant.com")
      cy.contains("Save").click()
      cy.contains("A glorious test blog")
    })

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "A glorious test blog",
          author: "Master Tester",
          url: "www.testingisimportant.com"
        })
      })

      it("it can be liked", function () {
        cy.contains("A glorious test blog")
          .contains("View details")
          .click()
        cy.contains("Likes: 0")
        cy.contains("Like").click()
        cy.contains("Like").click()
        cy.contains("Likes: 2")
      })

      it("it can be removed by the user that added it", function () {
        cy.contains("A glorious test blog")
          .contains("View details")
          .click()
        cy.contains("Remove blog").click()
        cy.get(".notification")
          .should("contain", "A glorious test blog by Master Tester removed")
          .and("have.css", "color", "rgb(0, 128, 0)")
      })

      it("it cannot be removed by a user that isn't the original adder", function () {
        const user2 = {
          name: "Test Person Two",
          username: "test.person2",
          password: "password2"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user2)

        localStorage.clear()
        cy.login({ username: "test.person2", password: "password2" })
        cy.contains("Test Person Two logged in")

        cy.contains("A glorious test blog")
          .contains("View details")
          .click()
        cy.contains("Remove blog")
          .should("not.exist")
      })
    })

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "A glorious test blog",
          author: "Master Tester",
          url: "www.testingisimportant.com/1"
        })
        cy.createBlog({
          title: "A second glorious test blog",
          author: "Master Tester",
          url: "www.testingisimportant.com/2"
        })
        cy.createBlog({
          title: "A third glorious test blog",
          author: "Master Tester",
          url: "www.testingisimportant.com/3"
        })
      })

      it("the blogs are arranged by likes from most to least likes", function () {
        cy.contains("A second glorious test blog")
          .contains("View details")
          .click()
        cy.contains("Like").click()
        cy.contains("Like").click()
        cy.contains("Hide details").click()

        cy.contains("A third glorious test blog")
          .contains("View details")
          .click()
        cy.contains("Like").click()

        cy.contains("A second glorious test blog")
          .contains("View details")
          .click()
        cy.contains("A glorious test blog")
          .contains("View details")
          .click()

        const correctBlogOrder = [
          "A second glorious test blog",
          "A third glorious test blog",
          "A glorious test blog"
        ]

        cy.get(".blog").each(function(blog, index, blogs) {
          expect(blogs).to.have.length(3)
          expect(Cypress.$(blog).text()).to.have.string(correctBlogOrder[index])
        })
      })
    })
  })
})
