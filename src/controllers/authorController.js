const { Router } = require("express");
const authorModel=require('../Models/authorModel')
const blogModel=require('../Models/blogModel')
const mongoose=require('mongoose')
const objectId = mongoose.Types.ObjectId



const createAuthor=async function(req,res){
try{
  const data=req.body
  const emailInput=req.body.email
                        
  const emailvalidation = await authorModel.find({email:emailInput})

  if(emailvalidation)                  //Email validation
  { 
  return res.status(404).send({msg:"email already exists!"})
  }


let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/
    if(!var1.test(emailInput)){
      return res.status(400).send({msg:"Input valid Email"})
      }
  
const savedata=await authorModel.create(data)
res.status(201).send({data:savedata})

}
catch(error){
  res.status(500).send({msg: error.message})
}

}



module.exports.createAuthor=createAuthor









//.... extra code

    // const data1=req.body.userid
    // // if(typeof(data1)==objectId){

    // // }
    // if(!objectId.isValid(data1)){
    //       res.send("error")
    // }
    
    // if(isEmailValid(emailInput))
    // {    