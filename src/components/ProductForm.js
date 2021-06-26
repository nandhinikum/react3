

import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios';

function ProductForm() {
    let {register,handleSubmit,formState:{errors}}=useForm();

    const [file,setFile] = useState(null)

    let history=useHistory();


    const onFormSubmit=(productObj)=>{

        //create Formdata object
        let formData=new FormData();
        //add image to formData Obj
        formData.append('photo',file,file.name)
        //add productObj to fromData Obj
        formData.append("productObj",JSON.stringify(productObj))

        //pass it to the user api by making http post req
        axios.post('/product/createproduct',formData)
              .then(res=>{
                  alert(res.data.message)

                  history.push('/viewProducts')
              })

    
    }
    //when file is selected
    const onFileSelect=(event)=>{

       setFile( event.target.files[0])
    
    }







    return (
        <div>
            <h1 className="text-center text-warning mt-4">Create product</h1>
            <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/* product name */}
            <label htmlFor="pn" className="mt-5">ProductName</label>
            <input type="text" id="pn" {...register('productname',{required:true,minLength:3})} className="form-control mb-3" />
            {/*username validation */}
            {errors.productname?.type=== 'required' && <p className="text-danger">*productname is required</p>}
            {errors.productname?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}


            {/* product price */}
            <label htmlFor="p">Price</label>
            <input type="number" id="p" {...register('price',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*productprice is required</p>}

            {/* brand */}
            <label htmlFor="b">Brand</label>
            <input type="text" id="b" {...register('Brand',{required:true})} className="form-control mb-3" />
            {/*password validation */}
            {errors.mail && <p className="text-danger">*Enter Brand</p>}


           
            {/* file  */}
            <input type="file" name="photo" className="form-control md-3" onChange={(e=>onFileSelect(e))}/>

        

            <button type="submit" className="btn btn-success">Create Product</button>
        </form>
        </div>
    )
}

export default ProductForm