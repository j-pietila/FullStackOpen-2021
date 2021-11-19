const logger = require("./logger")
const morgan = require("morgan")


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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

module.exports = { errorHandler, morganLogger, unknownEndpoint }
