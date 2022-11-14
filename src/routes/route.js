const express=require("express")
const router=express.Router()
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")


//1.
router.post("/authors",authorController.createAuthor)

//2.
router.post("/blogs",blogController.createBlog)

//3.
router.get("/blogs",blogController.getBlog)




module.exports=router;