const mongoose = require("mongoose")
const sanitize = require("mongo-sanitize")
const {JWT_SECRET,JWT_EXPIRES_IN} =require("dotenv").config()
const {WrongPasswordError} =require("../helpers/errors.js")
const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel.js")
const bcrypt = require("bcrypt");

async function createUser(res,name, password) {
    try {
        const user = await userModel.findOne({ name });
        
        if(!user) {
            const sanitized_pass = await sanitize("password")
            console.log(sanitized_pass)
            const hash = await bcrypt.hash(sanitized_pass,10)
            console.log(hash)
            const user = await userModel.create(
            sanitize({
                name:name,
                password:String(hash)
            })
        );
        console.log("Item created");
        return user;
    }else{
        // if()
        console.log(user)
        const passwordCorrect = await bcrypt.compare(
        password,
        user.password
        );
        if (!passwordCorrect){}
        const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        );
        return token
    }}catch (err) {
        console.error(err);
        throw err;
    }
    
}
module.exports ={createUser}