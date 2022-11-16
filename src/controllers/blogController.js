
const { default: mongoose } = require("mongoose")
const { find } = require("../Models/authorModel")
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

const objectId = mongoose.Types.ObjectId


//2.
const createBlog = async function (req, res) {
  try {
    const data = req.body

    const authId = await authorModel.findById(data.authorId)

    if (authId) {
      const datablogging = await blogModel.create(data)

      res.status(201).send({ data: datablogging })
    } else {
      res.status(400).send({ msg: "invalid authorId" })
    }
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}



//3.
const getBlog = async function (req, res) {
  try {
    const { authorId, category, tags, subcategory } = req.query

    let obj1 = {
      isDeleted: false,
      isPublished: true,
    }

    if (authorId) {
      obj1.authorId = authorId
    }

    if (category) {
      obj1.category = category
    }

    if (tags) {
      obj1.tags = tags
    }

    if (subcategory) {
      obj1.subcategory = subcategory
    }

    // console.log(obj1)

    const result = await blogModel.find(obj1)

    if (result) {
      res.status(201).send({ msg: result })
    }
    else {
      res.status(404).send({ msg: "Nothing Found" })
    }
  
  }

  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}



//4.
const updateBlogs = async function (req, res) {
  try {
      const input = req.params.blogId
      if (!objectId.isValid(input)) {
        return res.status(404).send({ msg: "invalid blogId" })   // required validation
      }
      const { title, body, tags, subcategory } = req.body
      const blogId = await blogModel.find({ _id: input, isDeleted: false })
      if (!blogId) {
        res.status(404).send({ msg: "blogId not found" })
      }
      const updateEntry = await blogModel.findByIdAndUpdate({ _id: input, isPublished: false },
        {
          $set: { title: title, body: body }, $push: { tags: tags, subcategory: subcategory }, $set: { isPublished: true, publishedAt: new Date() }
        }, { new: true })
      res.status(200).send({ msg: updateEntry })
    }
    catch (error) {
      res.status(500).send({ msg: error.message })
    }
}

//5.
const deleteBlogs = async function (req, res) {
  try {
    const input = req.params.blogId

    const findData = await blogModel.findOneAndUpdate({ _id: input, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true })
    if (!findData) {
      return res.status(404).send({ msg: "document is not found" })
    }
    res.status(200).send({ msg: findData })
  }

  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}

//6.
const deletesataus = async function (req, res) {
  try {
    const { category, authorId, tags, subcategory } = req.query
    const obj1 = {
      isDeleted: false,
      isPublished: false
    }

    if (category) {
      obj1.category = category
    }

    if (authorId) {
      obj1.authorId = authorId
    }


    if (tags) {
      obj1.tags = tags
    }

    if (subcategory) {
      obj1.subcategory = subcategory
    }
    const getdata = await blogModel.find(obj1)
    if (!getdata.length) {
      return res.status(404).send({ msg: "document doesn't exist " })
    } else {
      res.status(200).send({ getdata })
    }
  } 
  
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deletetsataus = deletesataus

