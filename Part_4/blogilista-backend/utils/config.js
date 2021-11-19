require("dotenv").config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT

module.exports = { PORT, MONGODB_URI }