const express = require("express")
const bodyparser = require("body-parser")
const { application } = require("express")  //bydefault 
const route=require('./routes/route')
const { default: mongoose } = require("mongoose")


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:true}))

mongoose.connect("mongodb+srv://modassar123:modassar1234@test.ahxnnau.mongodb.net/project-database",{
   useNewUrlParser:true
})
.then(()=>console.log("MongoDB is connected"))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(process.env.PORT||3000,function(){
    console.log("Express app runing on "+(process.env.PORT||3000))
})