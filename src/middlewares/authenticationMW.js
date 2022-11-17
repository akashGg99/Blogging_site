
const jwt = require('jsonwebtoken')
const blogModel = require('../Models/blogModel')


const authenticate = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]

        if (!token) {
            res.status(400).send({ msg: "Please set x-api-key header" })
        }

         jwt.verify(token, "Project1-key",(err,decode) =>{ 
        if(err){
            return res.status(400).send({status: false, msg:"Incorrect Token"}) 
        } 
        (decode==true)
          next()

        } )
    }
    catch (error) {
        res.status(500).send({ msg: "Authentication failure", msg2: error.message })
    }
}



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