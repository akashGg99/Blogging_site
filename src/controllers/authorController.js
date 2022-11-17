const { Router } = require("express");
const authorModel=require('../Models/authorModel')
const jwt = require('jsonwebtoken')



const createAuthor = async function(req,res){
  try{
    const data=req.body
    const emailInput=req.body.email

    if(data.fname.length==0 || (typeof data.fname !="string")){  // (typeof data.fname != String) not working??? 
      return res.status(400).send({msg:"please enter your fname properly"})
    }

    if(data.lname.length==0 || (typeof data.lname !="string")) {
     return res.status(400).send({msg:"please enter correct lname"})
    }

    if(data.title.length==0 || !(data.title.includes("Mr","Mrs","Miss"))) {
      return res.status(400).send({msg:"please enter from ['Mr','Mrs','Miss']"})
    }

    if(data.password.length==0 || (typeof data.password !="string")) {
      return res.status(400).send({msg:"please enter password"})
    }

    if(data.email.length==0 || (typeof data.email !="string")) {
      return res.status(400).send({msg:"please enter email"})
    }
    
    let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/           //email regex

    if(!var1.test(emailInput)){
    return res.status(400).send({msg:"Input valid Email"})
    } 

    const emailvalidation = await authorModel.findOne({email:emailInput})
    if(emailvalidation){                                                 //Email validation 
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
    if(input.password.length==0 || (typeof input.password !="string")){
      return res.status(400).send({msg:"please enter password"})
    }
    if(input.email.length==0){
      return res.status(400).send({msg:"please enter email"})
    }

    let var1 = /[a-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}/       
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