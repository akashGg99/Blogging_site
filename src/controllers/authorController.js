const { Router } = require("express");
const authorModel=require('../Models/authorModel')
const blogModel=require('../Models/blogModel')



const authorpost=async function(req,res){
    const data=req.body
    const savedata=await authorModel.create(data)
    res.send({data:savedata})

}
const Postbloagging=async function(req,res){
    const data=req.body
    const authId=await authorModel.findById(data.authId)

    if(authId)
      {
        const databogging=await blogModel.create(data)
        res.status(201).send({data:databogging})
      }else{
        res.status(400).send({msg:"invalid authorId"})
      }
}





module.exports.authorpost=authorpost
module.exports.Postbloagging=Postbloagging