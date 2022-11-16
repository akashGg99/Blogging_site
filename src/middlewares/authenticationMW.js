const jwt = require('jsonwebtoken')
const authorModel = require('../Models/authorModel')
const blogModel = require('../Models/blogModel')


const authenticate = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]

        if (!token) {
            res.status(400).send({ msg: "Please set x-api-key header" })
        }

        let decodedToken = jwt.verify(token, "Project1-key") //token validity pending. galat token ka error trow karna hai               

        if (!decodedToken) {
            res.status(400).send({ msg: "Enter valid token" })
        }

        next()
    }

    catch (error) {
        res.status(500).send({ msg: "Authentication failure", msg2: error.message })
    }
}


const authorization = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]
        const blogId = req.params.blogId


        if (!token) {
            res.status(400).send({ msg: "Please set x-api-key header" })
        }
        let decodedToken = jwt.verify(token, "Project1-key")     //token validity pending. how to??         
        if (!decodedToken) {
            res.status(400).send({ msg: "Enter valid token" })
        }



        let result = await blogModel.findById(blogId)

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

