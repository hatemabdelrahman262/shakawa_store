const express = require("express");
const helmet = require("helmet");
const path = require("path")
const connectDB = require("./connect");
const { Resend } = require("resend");
const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
connectDB()
app.get("/shakawa",(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.post("/support",(req,res,next)=>{
    const saved_question = req.body
    console.log(saved_question)
    res.status(200).json({question:saved_question})
})
app.post("/shakawa/emails", async (req, res, next) => {
    console.log("Route hit");

    try {
        console.log("Creating Resend...");
        const resend = new Resend("re_Y7tM45c5_LbnYaNGAgztccH1ji9ShGncJ");

        console.log("Sending email...");
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "hatemabdelrahman262@gmail.com",
            subject: "nigger digger",
            html: "<h1>sybau!</h1>"
        });

        console.log(response);
        console.log("Email sent successfully!");
        console.log("Email ID:", data.id);
        res.status(200).send("Email sent");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});
app.get("/shakawa/test", (req, res) => {
    res.send("OK");
});

app.listen(3000,()=>{console.log("server listning")})