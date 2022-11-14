const { Router } = require("express");
const authorMode=require('../Models/authorModel')
const blogModel=require('../Models/blogModel')

const Postbloagging=async function(req,res){
    const data=req.body
    const authId=await authorMode.findById(data.authId)

    if(authId)
      {
        const databogging=await blogModel.create(data)
        res.status(201).send({data:databogging})
      }else{
        res.status(400).send({msg:"invalid authorId"})
      }
}






module.exports.Postbloagging=Postbloagging