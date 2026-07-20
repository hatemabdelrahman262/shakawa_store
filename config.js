const env = require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const RESEND_URI=process.env.RESEND_URI

module.exports = {MONGO_URI,PORT,RESEND_URI}