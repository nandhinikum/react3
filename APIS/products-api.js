const exp=require('express')
const productapi=exp.Router()
const multerObj=require('./middlewares/fileUpload')







productapi.use(exp.json())





//create product using await
productapi.post('/createproduct',multerObj.single('photo'),async(req,res,next)=>{
    let productcollectionObj=req.app.get("productcollectionObj")
    let newproduct=JSON.parse(req.body.productObj)
    console.log(newproduct)
    let product=await productcollectionObj.findOne({model:newproduct.model})
    //if existed//
    if(product===null){

        newproduct.profileImage=req.file.path
        await productcollectionObj.insertOne(newproduct)
        res.send({message:"New product created"})
    }
    else{
        res.send({message:"product already existed"})
    }
})


//get product using await

productapi.get('/getproducts',async(req,res,next)=>{
    let productcollectionObj=req.app.get("productcollectionObj")
    let product=await productcollectionObj.find().toArray()
    if(product==null){
        res.send({message:"no products found"})
    }
    else{
        res.send({message:product})
    }
   
})

//getproduct by productname using await

productapi.get('/getproducts/:productname',async(req,res,next)=>{
    let productcollectionObj=req.app.get("productcollectionObj")
    let pn=req.params.productname
    let prodObj=await productcollectionObj.findOne({productname:pn})
    //if not existed
    if(prodObj===null){
        res.send({message:"Product not existed"})
    }
    else{
        res.send({message:prodObj})
    }
})

//delete product using await

productapi.delete('/deleteproduct/:productname',async(req,res,next)=>{
    let productcollectionObj=req.app.get("productcollectionObj")
    let deletedproduct=req.params.productname
    let deleted=await productcollectionObj.deleteOne({productname:deletedproduct})
    if(deleted==null){
        res.send("product not existed")
    }
    else{
        res.send({message:"product deleted"})
    }
})



//updateproduct using await//

productapi.put('/updateproduct/:productname',async(req,res,next)=>{
    let productcollectionObj=req.app.get("productcollectionObj")
    let modifiedproduct=req.body;
    await productcollectionObj.updateOne({productname:modifiedproduct.productname},{$set:{...modifiedproduct}})
    res.send({message:"Product updated"})
})




module.exports=productapi