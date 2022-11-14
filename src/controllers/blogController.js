
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")



const createBlog=async function(req,res){
  const data=req.body

  const authId = await authorModel.findById(data.authorId)

  if(authId)
    {
      const databogging=await blogModel.create(data)
      
      res.status(201).send({data:databogging})
    }else{
      res.status(400).send({msg:"invalid authorId"})
    }
}






//api1..
const getBlog = async function (req, res) {

  const{authorId,category,tags,subcategory}=req.query

    let obj1= {
      isDeleted: false,
      ispublished:true,
    }

    if(category){
      obj1.category=category
    }
    if(tags){
      obj1.tags=tags
    }
    if(subcategory){
      obj1.subcategory=subcategory
    }


    const result = await blogModel.find(obj1)

    if (result) {
      res.status(200).send({ msg: result })
    }
    else {
      res.status(404).send({ msg: "Nothing Found" })
    }
  }



  //api 2.
  const Handler2 = async function (req, res) {
    const filterInput1 = req.query.autherId
    const filterInput2 = req.query.category
    // const filterInput3 = req.query.
    // const filterInput4 = req.query.category

  
    const result = await blogModel.findById({ autherId:filterInput1} || { category:filterInput2})
  
    if (result) {
      res.status(200).send({ msg: result })
    }
    else {
      res.status(404).send({ msg: "Nothing Found" })
    }
  }












  module.exports.createBlog=createBlog
  module.exports.getBlog=getBlog
 
