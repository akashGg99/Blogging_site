const { Router } = require("express");
const authorModel=require('../Models/authorModel')
const blogModel=require('../Models/blogModel')
const mongoose=require('mongoose')
const objectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken')



const createAuthor=async function(req,res){
  try{
    const data=req.body
    const emailInput=req.body.email

    if(data.fname.length==0 || (typeof data.fname !="string")){  // (typeof data.fname != String) not working??? 
      return res.status(400).send({msg:"please enter your Fname properly"})
    }
    if(data.lname.length==0) {
     return res.status(400).send({msg:"please enter your lname"})
    }

    if(data.title.length==0 || !(data.title.includes("Mr","Mrs","Miss"))) {
      return res.status(400).send({msg:"please enter from among its['Mr','Mrs','Miss']"})
    }

    if(data.password.length==0) {
      return res.status(400).send({msg:"please enter password"})
    }
    if(data.email.length==0) {
      return res.status(400).send({msg:"please enter email"})
    }
    let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/           //2,3 for .in , .com
    if(!var1.test(emailInput)){
    return res.status(400).send({msg:"Input valid Email"})
    } 

    const emailvalidation = await authorModel.findOne({email:emailInput})
     // console.log(emailvalidation)
    if(emailvalidation)                  //Email validation
    { 
    return res.status(404).send({msg:"email already exists!"})
    }
    const savedata=await authorModel.create(data)
    res.status(201).send({data:savedata})
  }
  catch(error){
    res.status(500).send({msg: error.message})
  }

}
//Token generation

const loginAuthor = async function(req,res){
  try{

    const input=req.body
    if(input.password.length==0){
      return res.status(400).send({msg:"pleas enter password"})
    }
    if(input.email.length==0){
      return res.status(400).send({msg:"pleas enter email"})
    }
    let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/           //2,3 for .in , .com
    if(!var1.test(input.email)){
    return res.status(400).send({msg:"Input valid Email"})
    } 
    const validateInput = await authorModel.findOne(input)

    if(!validateInput){
      return res.status(404).send({msg:"email or password is not valid"})
    }
    let token = jwt.sign(
      { authorId: validateInput._id.toString()}, 
      "Project1-key")

    res.setHeader("x-api-key",token)
    res.status(201).send({token:token})
  }
  catch (error) {
    res.status(500).send({ msg: "Authentication failure", msg2: error.message })
  }
}


module.exports.createAuthor=createAuthor
module.exports.loginAuthor=loginAuthor





















// empty =  true   ||  true = true  ok
// mr   =  false   ||  true =  true ok  
// Mr   =   false  ||  false  = false ok
// if(data.title.length==0 || !(data.title.includes("Mr","Mrs","Miss"))) {
//   return res.status(400).send({msg:"pleas enter from among its['Mr','Mrs','Miss']"})
// }