
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")


//2.
const createBlog = async function (req, res) {
try{
    const data = req.body

    const authId = await authorModel.findById(data.authorId)

    if (authId){
      const databogging = await blogModel.create(data)

      res.status(201).send({ data: databogging })
    } else {
      res.status(400).send({ msg: "invalid authorId" })
    }
}
catch(error){
  res.status(500).send({msg: error.message}) }
}


//3.
const getBlog = async function (req, res) {
try{
    const { authorId, category, tags, subcategory } = req.query

    let obj1 = {
      isDeleted: false,
      isPublished: true,
    }

    if(authorId) {
      obj1.authorId = authorId
    }

    if(category) {
      obj1.category = category
    }

    if(tags) {
      obj1.tags = tags
    }

    if(subcategory) {
      obj1.subcategory = subcategory
    }

    // console.log(obj1)

    const result = await blogModel.find(obj1)

    if (result) {
      res.status(200).send({ msg: result })
    }
    else {
      res.status(404).send({ msg: "Nothing Found" }) }

}
catch(error){
  res.status(500).send({msg: error.message})
}
}



module.exports.createBlog = createBlog
module.exports.getBlog = getBlog

