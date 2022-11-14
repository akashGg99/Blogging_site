
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")


//api1..
const Handler1 = async function (req, res) {
    // const filterInput1 = req.query.autherId
    // const filterInput2 = req.query.category
  
    const result = await blogModel.find({ IsDeleted: false, isPublished: true })
  
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
  
    const result = await blogModel.findById({ autherId:filterInput1} || { category:filterInput2})
  
    if (result) {
      res.status(200).send({ msg: result })
    }
    else {
      res.status(404).send({ msg: "Nothing Found" })
    }
  }


  module.exports.Handler1=Handler1
  module.exports.Handler2=Handler2
