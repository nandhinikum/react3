const exp=require('express')
const app=exp()
const path=require('path')
const userapi=require("./Api/user-api")
const productapi=require("./Api/product-api")
const adminapi = require('./Api/admin-api')

app.use(exp.static(path.join(__dirname,'./build/')))

app.use("/user",userapi)
app.use("/product",productapi)
app.use("/admin",adminapi)
const mc=require("mongodb").MongoClient;
require('dotenv').config()

//body parsing middlewares

const databaseUrl=process.env.Database_Url;

//connect to db

mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("err in db connection",err)
    }
    else{
        let databaseObj=client.db("testdb")
        let usercollectionObj=databaseObj.collection("usercollection")
        let productcollectionObj=databaseObj.collection("productcollection")
        let admincollectionObj=databaseObj.collection("admincollection")
        let usercartcollectionObj=databaseObj.collection("usercartcollection")

        //sharing collection to apis
        app.set("usercollectionObj",usercollectionObj)
        app.set("productcollectionObj",productcollectionObj)
        app.set("admincollectionObj",admincollectionObj)
        app.set("usercartcollectionObj",usercartcollectionObj)

        console.log("database connected")
    }
})




app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not found`})
})
app.get('/*',(req,res)=>{
     res.sendFile(path.join(__dirname,'./build/index.html'),function(err){
         if(err){
             res.status(500).send(err)
         }
     })
})

app.use((err,req,res,next)=>{
    res.send({message:err.message})
    console.log(err)
})


const port=process.env.PORT||8080;
app.listen(port,()=>console.log(`server started on ${port}`))