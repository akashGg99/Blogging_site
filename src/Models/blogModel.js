
  const mongoose = require('mongoose')
  const objectId = mongoose.Schema.Types.ObjectId
  
  
  const blogSchema = new mongoose.Schema({
        title: {
          type: String, 
          required: true
        },
        body: {
          type: String,
          required: true
        },
        authorId: {
          type: objectId,
          ref: "Author",
          required: true
        },
        tags: [String],
        category: {
          type: String,
          required: true
        },
        subcategory: [String-[String]],
        isDeleted: {
          type: Boolean,
          default: false
        },
        deletedAt: String,
        isPublished: {
          type: String,
          default: false
        },
        publishedAt: String
  
  },{ timestamps: true})
  
  module.exports = mongoose.model('Blogs', blogSchema)