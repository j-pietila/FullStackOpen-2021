const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const loginRouter = require("./controllers/login")
const usersRouter = require("./controllers/users")
const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch(error => {
    logger.error("Error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.morganLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
