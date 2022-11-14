const express=require("express")
const router=express.Router()
const authorController=require("../controllers/authorController")
const blogController=require("../controllers/blogController")


router.post("/authorpost",authorController.authorpost)
router.post("/bloggingpost",authorController.Postbloagging)



//Get APIs
router.get("/blogs",blogController.Handler1)

router.get("/blogs",blogController.Handler2)

