const express = require("express");
const helmet = require("helmet");
const path = require("path");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const connectDB = require("./connect");
const {RESEND_URI}=require("./config")
const {createUser} =require("./controllers/user")
const { Resend } = require("resend");
const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
connectDB()

app.get("/shakawa",(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})
// app.get("/shakawa/order",(req,res,next)=>{
//     try {
//         const user = null
//         if(true){
        
//         res.type("text/css");

//         res.send(`
//             .popup{
//             display:flex important!
//             }`);}
//         else{

//         }
//     }catch (err) {
//         console.error(err)
//     }});
    
const supportLimiter = rateLimit({
    windowMs: 1 * 86400000, // 1  day
    max: 2,
    message: "Too many emails. Try again later.",
    // keyGenerator: (req) => req.user.id,
});
app.post("/support",supportLimiter,async(req,res,next)=>{

    const saved_question = req.body
    console.log("sum:",saved_question)
     try {
        console.log("Creating Resend...");
        const resend = new Resend(String(RESEND_URI));

        console.log("Sending email...");
        const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "hatemabdelrahman262@gmail.com",
        subject: "Support Request",
        html: `
        <h4>Email: ${saved_question.email}</h4>
        <p>inquiry: ${saved_question.question}</p>`
        });
        console.log("data:", data);
        console.log(JSON.stringify(error, null, 2));
        
        res.status(200).json({question:saved_question})
}catch(error){
    console.error("err:",error)
}})
app.post("/shakawa/sign_in", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await createUser(res,email, password);
        res.status(201).json({
            success: true,
            user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
app.get("/shakawa/test", (req, res) => {
    res.send("OK");
});

app.listen(3000,()=>{console.log("server listning")})