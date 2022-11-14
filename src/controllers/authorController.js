const { Router } = require("express");
const authorModel=require('../Models/authorModel')
const blogModel=require('../Models/blogModel')
const mongoose=require('mongoose')
const objectId = mongoose.Types.ObjectId

// const emailValidator = require('deep-email-validator');

// async function isEmailValid(email) {
//   return emailValidator.validate(email)
// }


const createAuthor=async function(req,res){
    const data=req.body
    const emailInput=req.body.email
    // const data1=req.body.userid
    // // if(typeof(data1)==objectId){

    // // }
    // if(!objectId.isValid(data1)){
    //       res.send("error")
    // }
    
    // if(isEmailValid(emailInput))
    // {                           
      
      const emailvalidation = await authorModel.find({email:emailInput})
      if(!emailvalidation){ 
        return res.send({msg:"email already exists!"})
      }


    let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}/

    if(!var1.test(emailInput))
    {
      return res.status(400).send({msg:"Input valid Email"})
    }
 

    const savedata=await authorModel.create(data)
    res.send({data:savedata})
}








module.exports.createAuthor=createAuthor
