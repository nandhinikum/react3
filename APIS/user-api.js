const exp=require('express')
const userapi=exp.Router()
const bcrypt=require('bcryptjs')
const checkToken=require("./middlewares/verifytoken")
const jwt=require('jsonwebtoken')
const multerObj=require('./middlewares/fileUpload')
const expressErrorHandler=require('express-async-handler')

userapi.use(exp.json())


    //createuser using await

    userapi.post('/createuser',multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
       let usercollectionObj=req.app.get("usercollectionObj")
        //get newuser
        let newuser=JSON.parse(req.body.userObj)
        let user=await usercollectionObj.findOne({username:newuser.username})
        if(user===null){
          //hash the password
            let hashedpw=await bcrypt.hash(newuser.password,7)
            //replace password with hash pw
            newuser.password=hashedpw
            newuser.profileImage=req.file.path

            await usercollectionObj.insertOne(newuser)
            res.send({message:"user created"})
        }
        else{
            res.send({message:"already existed"})
        }
    }))

    //user login
    
    userapi.post('/login',expressErrorHandler(async(req,res,next)=>{
        //get user credientials
        let usercollectionObj=req.app.get("usercollectionObj")

        let credientials=req.body;
        //check username

        let user=await usercollectionObj.findOne({username:credientials.username})

        //if user not found
         if(user===null)
         {
             res.send({message:"username invalid"})
         }
         else{
            //compare pw
           let status= await bcrypt.compare(credientials.password,user.password)
           console.log(status)
           //if pw not matched
           if(status===false){
               res.send({message:"invalid password"})
           }
           else{
               //create token
               let token=await jwt.sign({username:credientials.username},'abcdef',{expiresIn:120})
               res.send({message:"login success",token:token,username:credientials.username})
           }


            
        }

    }))

    //add to cart
    userapi.post("/addtocart",expressErrorHandler(async(req,res,next)=>{
        let usercartcollectionObj=req.app.get("usercartcollectionObj")
        //get user cart obj
        let userCartObj=req.body;

        //find user in usercart
        let userInCart=await usercartcollectionObj.findOne({username:userCartObj.username})
        console.log(userCartObj.username)
        

        //new usercart object
        if(userInCart===null){
            //newcartobject
            let products=[];
            products.push(userCartObj.productObj)
            let newUserCartObject={username:userCartObj.username,products:products};

            //insert
            await usercartcollectionObj.insertOne(newUserCartObject)
            res.send({message:"product added to cart"})
        }
        //if user already existed
        else{
            userInCart.products.push(userCartObj.productObj)
            //update
            await usercartcollectionObj.updateOne({username:userCartObj.username},{$set:{...userInCart}})
            res.send({message:"products added to cart"})
        }
    
       
    }))

    //get products
    userapi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
        let usercartcollectionObj=req.app.get("usercartcollectionObj")
        let un=req.params.username;
        let cartObj=await usercartcollectionObj.findOne({username:un})
        res.send({message:cartObj})
    }))


    


// userapi.get('/getusers',(req,res,next)=>{
//     databaseObj.collection("usercollection").find().toArray((err,usersArray)=>{
//         if(err){
//             console.log("err in reading users")
//             res.send({message:err.message})
//         }
//         else{
//             res.send({message:usersArray})
//         }
//     })
// })

//getusers using promises//

// userapi.get('/getusers',(req,res,next)=>{
//     usercollectionObj.find().toArray()
//     .then(userObj=>res.send(userObj))
//     .catch(err=>{
//         console.log(err)
//         res.send({message:err.message})
//     })
// })


//getusers using await

userapi.get('/getusers',expressErrorHandler(async(req,res,next)=>{
    let usercollectionObj=req.app.get("usercollectionObj")
    let userlist=await usercollectionObj.find().toArray()
    res.send({message:userlist})
}))


//getusers by username using promises//

userapi.get('/getusers/:username',(req,res,next)=>{
    let usercollectionObj=req.app.get("usercollectionObj")
    let un =req.params.username
    usercollectionObj.findOne({username:un})
    .then(userObj=>{
        if(userObj==null){
            res.send({message:"user not existed"})
        }
        else{
            res.send({message:userObj})
        }
    })
    .catch()
})

// userapi.get('/getusers/:username',(req,res,next)=>{
//     let un=req.params.username
//     databaseObj.collection("usercollection").findOne({username:un},(err,userObj)=>{
//         if(err){
//             console.log("err in reading data")
//             res.send({message:err.message})
//         }
//         if(userObj===null){
//             res.send({message:"no users found "})
//         }
//         else{
//             res.send({message:userObj})
//         }
//     })
// })


// userapi.put('/updateuser/:username',(req,res)=>{
//     let modifieduser=req.body
//     databaseObj.collection("usercollection").updateOne({username:modifieduser.username},
//         {
//         $set:{
//             email:modifieduser.email,
//             city:modifieduser.city,
//             age:modifieduser.age
//         }
//     },(err,success)=>{
//         if(err){
//             console.log("err in updating",err)
//         }
//         else{
//             res.send({message:"user updated"})
//         }
//     })
// })

//update user using promises//

// userapi.put('/updateuser/:username',(req,res)=>{
//     let modifieduser=req.body
//     usercollectionObj.updateOne({username:modifieduser.username},{$set:{...modifieduser}})
//     .then(updateuser=>res.send({message:"user updated"}))
//     .catch(err=>
//         res.send({message:"user not updated"}))
// })


//update user using await

userapi.put('/updateuser/:username',async(req,res,next)=>{
    let usercollectionObj=req.app.get("usercollectionObj")
    let modifieduser=req.body;
    await usercollectionObj.updateOne({username:modifieduser.username},{$set:{...modifieduser}})
    res.send({message:"user updated"})
})


// userapi.delete('/deleteuser/:username',(req,res)=>{
//     let deleteduser=req.params.username
//    databaseObj.collection("usercollection").deleteOne({username:deleteduser},(err,userObj)=>{
//        if(err){
//            console.log("err in deleting")
//            res.send({message:err.message})
//        }
//        if(userObj===null){
//            res.send({message:"no users deleted"})
//        }
//        else{
//            res.send({message:"deleted"})
//        }
//    })
    
// })

//delete user using promises//

// userapi.delete('/deleteuser/:username',(req,res,next)=>{
//     let deleteduser=req.params.username
//     usercollectionObj.deleteOne({username:deleteduser})
//     .then(deletedObj=>{
//         if(deletedObj===null){
//             res.send({message:"no user deleted"})
//         }
//         else{
//             res.send({message:"user deleted"})
//         }
//     })
//     .catch(err=>{
//         console.log(err)
//         res.send({message:err})
//     })
// })

//deleteuser using await

userapi.delete('/deleteuser/:username',async(req,res,next)=>{
    let usercollectionObj=req.app.get("usercollectionObj")
    let deleteduser=req.params.username
    let deleted=await usercollectionObj.deleteOne({username:deleteduser})
    if(deleted==null){
        res.send("user not existed")
    }
    else{
        res.send({message:"user deleted"})
    }
    
})

//testing route
userapi.get('/testing',checkToken,(req,res,next)=>{
    res.send({message:"Private data"})
})








module.exports=userapi
