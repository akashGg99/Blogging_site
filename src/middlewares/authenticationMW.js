const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const blogModel = require('../Models/blogModel')
const objectId = mongoose.Types.ObjectId



const authenticate = function (req, res, next) {
  try {
    const token = req.headers["x-api-key"]

    if (!token) {
      res.status(400).send({ msg: "Please set x-api-key header" })
    }

    jwt.verify(token, "Project1-key", (err, decode) => {
      if (err) {
        return res.status(400).send({ status: false, msg: "Incorrect Token" })
      }
      (decode == true)
      next()
    })
  }
  catch (error) {
    res.status(500).send({ msg: "Authentication failure", msg2: error.message })
  }
}



const authorization = async function (req, res, next) {
  try {
    const token = req.headers["x-api-key"]
    const blogId = req.params.blogId
    const { authorId, tags, category, subcategory } = req.query

    const obj1 = {
      isDeleted: false,
      isPublished: false
    }

    if (category) {
      obj1.category = category;
      if (obj1.category == 0 || (typeof tags != "string"))
        return res.status(400).send({ msg: "please enter category" })
    }

    if (authorId) {
      obj1.authorId = authorId
      if (obj1.authorId.length == 0 || !(objectId.isValid(obj1.authorId))) {
        return res.status(400).send({ msg: "please enter authorid properly" })
      }
    }
    if (tags) {
      obj1.tags = tags
      if (obj1.tags.length == 0 || (typeof tags != "string")) {
        return res.status(400).send({ msg: "please enter tags" })
      }
    }
    if (subcategory) {
      obj1.subcategory = subcategory
      if (obj1.subcategory.length == 0 || (typeof subcategory != "string")) {
        return res.status(400).send({ msg: "please enter subcategory" })
      }
    }


    if (!token) {
      res.status(400).send({ msg: "Please set x-api-key in header" })
    }
    let decodedToken = jwt.verify(token, "Project1-key")
    if (!decodedToken) {
      res.status(400).send({ msg: "Enter valid token" })
    }

    if (blogId) {
      let result = await blogModel.findById(blogId)

      // console.log(result)
      if (!result) { res.status(404).send({ msg: "Blog not found.." }) }

      // console.log(decodedToken.authorId)
      // console.log(result.authorId)

      if (decodedToken.authorId !== result.authorId.toString()) {
        res.status(401).send({ msg: "User Not authorised" })
      }
      else {
        next()
      }

    } else {

      let count = 0
      let result = await blogModel.find({ obj1 })
      if (!result.length) { res.send("not found") }
      for (let i = 0; i < result.length; i++) {
        if (decodedToken.authorId === result[i].authorId.toString()) {
          count++
        }
      }
      if (count == 0) {
        return res.status(401).send({ msg: "User Not authorised" })
      }
      next()
    }
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }

}





module.exports.authenticate = authenticate
module.exports.authorization = authorization




























//.............................. auth with auther id from query params and path params ..................................
/*
const authorization = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]

        const blogId = req.params.blogId
        const inputfromQuery = req.query
       
        if(!blogId){ res.status(404).send({msg: "enter blog id to be deleted"})}

            // //alternative to get blogs author id
            //  if(!blogId){
            //     const {tags, authorId, category, subcategory} = inputfromQuery
            //     const result = await blogModel.find({tags:tags} || {authorId:authorId} || {category:category} || {subcategory:subcategory})

            //     if(!result){res.send("not found")}

            //     if (decodedToken.authorId !== result.authorId.toString()) {
            //         res.status(401).send({ msg: "User Not authorised 2.." })
            //     }
            //     else {
            //         next()
            //     }
            //  }

        if (!token) {
            res.status(400).send({ msg: "Please set x-api-key header" })
        }
        let decodedToken = jwt.verify(token, "Project1-key")     //token validity pending. how to??         
        if (!decodedToken) {
            res.status(400).send({ msg: "Enter valid token" })
        }

        let result = await blogModel.findById(blogId)
        // let result = await blogModel.findById({ _id:blogId, _id: inputfromQuery._id })

        if(!result){ res.status(404).send( {msg: "nothing found.."})}

        // console.log(decodedToken.authorId)
        // console.log(result.authorId.toString())

        if (decodedToken.authorId !== result.authorId.toString()) {
            res.status(401).send({ msg: "User Not authorised" })
        }
        else {
            next()
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Authentication failure", msg2: error.message })
    }
}




*/