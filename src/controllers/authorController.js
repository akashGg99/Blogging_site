const { Router } = require("express");

const Postbloagging=async function(req,res){
    const data=req.body
    const authId=await autherMode.findById(data.authId)

    if(authId)
      {
        const databogging=await bobModel.create(data)
        res.status(201).send({data:databogging})
      }else{
        res.status(400).send({msg:"invalid authorId"})
      }
}

module.exports.Postbloagging=Postbloagging