const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const Blogs=require("./model/user")

app.post("/blogs",async (req,res)=>{
    let {title,body}=req.body;
    let newBlog=new Blogs({
        title:title,
        body:body,
        date: Date.now()
    })
    await newBlog.save()
    res.json({
        success:true,
        data:newBlog,
        message:"new Blog added Successfully"
    })
})


app.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog
    });
})

app.get("/blogs/:id",async(req,res)=>{
    let {id}=req.params
    let blog=await Blogs.findOne({_id:id});
    res.json({
        sucess:true,
        data:blog
    });
})

// app.post("/blogs",(req,res)=>{
//     let {title,body}=req.body;
//     console.log(title,body);
//     res.send("got it");
// })

app.get('/', (req, res) => {
  res.send("hello")
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));