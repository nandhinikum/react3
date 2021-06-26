//import cloudinary based module
const cloudinary=require("cloudinary").v2;
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")


//configure cloudinary
cloudinary.config({
    cloud_name:'dz47orgon',
    api_key:'966141454648973',
    api_secret:'v3jTueJQJbA0vteyB7krqYxAyMw'
})


//configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
       cloudinary:cloudinary,
       params:async(req,file)=>{
           return{
               folder:"first",
               public_id:file.filename+'-'+Date.now()
           }
       }


})


//configure multer 
const multerObj=multer({storage:clStorage})


module.exports=multerObj;