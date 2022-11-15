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

//4.
router.put("/blogs/:blogId", blogController.updateBlogs)

//5
router.delete("/blogs/:blogId", blogController.deleteBlogs)

router.delete("/blogs",blogController.deletetsataus)




module.exports=router;