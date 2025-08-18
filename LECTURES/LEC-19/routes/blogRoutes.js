const express = require("express");
const router = express.Router();  //small ----> application

const{postaddBlog,getreadBlog,getreadBlogById,deleteBlog,putupdateBlog} = require("../controller/blogController.js");
router.post("/",postaddBlog)
router.get("/",getreadBlog)
router.get("/:id",getreadBlogById)
//delete blog
router.delete("/:blogId",deleteBlog)

//update blog
router.put("/:blogId",putupdateBlog)

module.exports = router;  //exporting the router to use in index.js