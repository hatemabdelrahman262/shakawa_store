const {MONGO_URI} = require("./config")
const mongoose = require("mongoose")
async function connectDB(){
    try {
        mongoose.connect(String(MONGO_URI)).then(()=>{console.log("database connected")})
    } catch (err) {
        console.error("ERROR:",err)
    }
}
module.exports = connectDB