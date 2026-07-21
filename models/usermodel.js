const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{type:String,required:[true,"name is required"],min:1},
    password:{type:String,required:true}
},{timestamps:true})
const user = new mongoose.model("userModel",userSchema)
module.exports = user;