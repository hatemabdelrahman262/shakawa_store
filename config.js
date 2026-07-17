const env = require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000

module.exports = {MONGO_URI,PORT}