
const { default: mongoose, Types } = require("mongoose")
const authorModel = require("../Models/authorModel")
const blogModel = require("../Models/blogModel")

const objectId = mongoose.Types.ObjectId


//2.
const createBlog = async function (req, res) {
  try {
    const data = req.body

    const { title, body, authorId, category } = data
    if (!title) {
      return res.status(404).send({ msg: "title is required" })
    }
    if (!body) {
      return res.status(404).send({ msg: "body is required" })
    }
    if (!authorId) {
      return res.status(404).send({ msg: "authorid is required" })
    }
    if (!category) {
      return res.status(404).send({ msg: "category is required" })
    }

    if (data.title) {
      if (data.title.length == 0 || (typeof data.title != "string")) {
        return res.status(400).send({ msg: "please enter title properly" })
      }
    } else{
      return res.status(400).send({ msg: "you missed enter title" })
    }

    if (data.body) {
      if (data.body.length == 0 || (typeof data.body != "string")) {
        return res.status(400).send({ msg: "please enter data" })
      }
    } else {
      return res.status(400).send({ msg: "you missed enter body" })
    }

    if (data.authorId) {
      if (data.authorId.length == 0 || (typeof data.authorId != "string")) {
        return res.status(400).send({ msg: "please enter authorid" })
      }
    } else {
      return res.status(400).send({ msg: "you missed enter authorId" })
    }

    if (!objectId.isValid(data.authorId)) {
      return res.status(400).send({ msg: "please enter valid authorId" })
    }

    if (data.category) {
      if (data.category.length == 0 || (typeof data.category != "string")) {
        return res.status(400).send({ msg: "please enter category" })
      }
    } else {
      return res.status(400).send({ msg: "you missed enter category" })
    }

    if (data.isPublished) {
      if (data.isPublished.length == 0 || typeof data.isPublished != "boolean") {
        return res.status(400).send({ msg: "please enter properly isPusblished" })
      } else if (data.isPublished == true) {
        data.publishedAt = publishedAt = new Date()
      }
    }

    const authId = await authorModel.findById(data.authorId)

    if (authId) 
    {
      const datablogging = await blogModel.create(data)
      res.status(201).send({ data: datablogging })
    }
    else {
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

    //Adding content to above object for DB call
    if (authorId) {
      obj1.authId = authorId
      if (authorId.length == 0 || !objectId.isValid(authorId)) {
        return res.status(400).send({ msg: "please enter authorid properly" })
      }
    }
    if (category) {
      obj1.category = category
      if (obj1.category.length == 0 || typeof category != "string") {
        return res.status(400).send({ mag: "please eneter category " })
      }
    }
    if (tags) {
      obj1.tags = tags
      if (tags.length == 0 || typeof tags != "string") {
        return res.status(400).send({ mag: "please eneter tags " })
      }
    }
    if (subcategory) {
      obj1.subcategory = subcategory
      if (subcategory.length == 0 || typeof subcategory != "string") {
        return res.status(400).send({ mag: "please eneter subcategory " })
      }
    }

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

    if (input) {
      if (input.length == 0 || !objectId.isValid(input))
        return res.status(400).send({ msg: "please enter blogId  properly in params" })
    } else {
      return res.status(400).send({ msg: "you missed enter blogId in params" })
    }

    const { title, body, tags, subcategory } = req.body

    if (title) {
      if (!title.length == 0 || (typeof title != "string")) {
        return res.status(400).send({ mag: "please enter proper title " })
      }
    }
    if (body) {
      if (!body || (typeof body != "string")) {
        return res.status(400).send({ mag: "please enter proper body " })
      }
    }
    if (tags) {
      if (tags.length == 0 || (typeof tags != "string")) {
        return res.status(400).send({ mag: "please enter proper tags " })
      }
    }
    if (subcategory) {
      if (!subcategory || (typeof subcategory != "string")) {
        return res.status(400).send({ mag: "please enter subcategory " })
      }
    }

    const updateEntry = await blogModel.findByIdAndUpdate({ _id: input, isDeleted: false, isPublished: false },
      { $set: { title: title, body: body, isPublished: true, publishedAt: new Date() }, $push: { tags: tags, subcategory: subcategory } },
      { new: true })

    if (!updateEntry) {
      return res.status(404).send({ msg: "blog not found" })
    }
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

    if (input == "" || input) {
      if (input.length == 0 || !objectId.isValid(input))
        return res.status(400).send({ msg: "please enter blogId  properly in params" })
    } else {
      return res.status(400).send({ msg: "you missed enter blogId in params" })
    }


    const findData = await blogModel.findOneAndUpdate({ _id: input, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true })

    if (!findData) {
      return res.status(404).send({ msg: "document is not found" })
    }
    res.status(200).send({ msg: "Document deleted" })
  }

  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


//6.
const deleteByQuery = async function (req, res) {
  try {
    
    const obj1 = {
      isDeleted: false,
      isPublished: false,
    }

    const { category, authorId, tags, subcategory } = req.query

    if (category) {
      obj1.category = category;
      if (obj1.category == 0 || (typeof category != "string"))
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


    const findDeleteData = await blogModel.findOneAndUpdate(obj1,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true })

    if (!findDeleteData) {
      return res.status(404).send({ msg: "documnet is not found " })
    }
    res.status(200).send({ msg: "Item Deleted" })

  } catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteByQuery = deleteByQuery

