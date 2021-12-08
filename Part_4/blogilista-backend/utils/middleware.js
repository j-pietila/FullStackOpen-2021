const jwt = require("jsonwebtoken")
const logger = require("./logger")
const morgan = require("morgan")
const User = require("../models/user")


morgan.token("response-data", (req, res) => {
  if (Object.keys(res.req.body).length !== 0) {
    return JSON.stringify(res.req.body)
  }
  return " "
})

const morganLogger = morgan(":method :url :status :res[content-length] - :response-time ms :response-data")

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7)
  }
  else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

module.exports = { errorHandler, morganLogger, tokenExtractor, userExtractor, unknownEndpoint }
