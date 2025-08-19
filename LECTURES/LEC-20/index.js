const express=require('express')
const app=express()
const {m1,m2}=require("./middleware/firstmiddleware")
const {m3}=require("./middleware/pathlevel")
const userRouter=require("./routes/userRoutes")
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(m1)

app.use("/api/users",userRouter)

app.get("/health",m3,(req,res,next)=>{
    console.log("Running Controller Function")
    next();
    res.json({
        status:"ok",
        message:"Health check sucess server runinng ok "

    })
    //console.log("running after response")
})

app.get("/home",(req,res,next)=>{
    console.log("Running home endpoint")
    res.json({
        success:true,
        message:"Welcome to Home Page"
    })
})
app.use(m2)
app.listen(3000,()=>{
    console.log("Server Started")
})
