const exp=require('express');
const expressAsyncHandler = require('express-async-handler');
const adminApi=exp.Router();
const expressErrorHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
adminApi.use(exp.json())

//admin login
adminApi.post('/loginuser',expressErrorHandler(async(req,res,next)=>{
    let adminCollectionObj=req.app.get("admincollectionobj")
    let credentials=req.body;
    let user=await adminCollectionObj.findOne({username:credentials.username})
    if(user===null){
        res.send({message:"invalid user"})

    }
    else if(user.password!==credentials.password){
        res.send({message:"invalid password"})
    }
    else{
         //create and send token
         let token= await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn: 120 })
         //send token to client
         res.send({message:"Login success",token:token,username:credentials.username})
    }


}))




module.exports=adminApi