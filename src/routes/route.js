const express=require("express")
const router=express.Router()
const authorController=require("../controllers/authorController")

router.post("/bloggingpost",authorController.Postbloagging)



