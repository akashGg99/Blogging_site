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



//Second Api

const Handler2 = async function(req,res){
  const filterInput =req.query
 const result1= await blogModel.find({IsDeleted:false, isPublished:true})
     if(result1){
                 res.status(200).send({ msg: result1 })
                }
        else{
        res.status(404).send({msg:"Nothing Found"}) 
        }
}

module.exports.Postbloagging=Postbloagging