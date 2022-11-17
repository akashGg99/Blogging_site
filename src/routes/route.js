const express=require("express")
const router=express.Router()
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")
const middleware= require('../middlewares/authenticationMW')


//1.
router.post("/authors",authorController.createAuthor)

//2.
router.post("/blogs", middleware.authenticate, blogController.createBlog)

//3.
router.get("/blogs", middleware.authenticate, blogController.getBlog)


//4.
router.put("/blogs/:blogId", middleware.authenticate, middleware.authorization, blogController.updateBlogs)

//5
router.delete("/blogs/:blogId", middleware.authenticate, middleware.authorization, blogController.deleteBlogs)

//6
router.delete("/blogs",middleware.authenticate, middleware.authorization,blogController.deleteByQuery)




//7 token generated
router.post("/login",authorController.loginAuthor)

router.all("/*", (req,res) => {res.status(404).send( {msg:"Enter correct address"} ) }   )


module.exports=router;