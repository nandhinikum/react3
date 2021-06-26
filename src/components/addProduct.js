import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {useState} from 'react'

function Addproduct(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    let history=useHistory()
    const [file,setFile]=useState(null)
   
    const onFormsubmit=(productObj)=>{
      
        let formData=new FormData();
        //adding image to formdata obj
        formData.append('photo',file,file.name)
        //add userobj to formdata
        formData.append("productObj",JSON.stringify(productObj))
      //pass it to the userapi by http post request
       axios.post('/product/createproduct',formData)
       .then(res=>{
        alert(res.data.message)
        history.push('/viewproduct')
        
       })   
      
 }
 const onFileSelect=(event)=>{
     console.log(event.target.files[0])
    setFile(event.target.files[0])
}

    return(
        <div className="container w-100 mx-auto">
            <form className="mx-auto" onSubmit={handleSubmit(onFormsubmit)}>
                
                <label className="form-control-label ms-5 mt-4" >Productname</label>
                <input type="text" className="form-control w-25 ms-5" required {...register('productname')}></input>
                <label className="form-control-label ms-5 mt-4">Model</label>
                <input type="text" className="form-control w-25 ms-5" required {...register('model')}></input>
                <label className="form-control-label ms-5 mt-4">Price</label>
                <input type="number" className="form-control w-25 ms-5" required {...register('price')}></input>
                <label className="form-control-label ms-5 mt-4">description</label>
                <textarea className="form-control w-25 ms-5" {...register('description')}></textarea>
                <input type="file" name="photo" className="form-control w-25 ms-5 mt-3" onChange={(e=>onFileSelect(e))}></input>
                <button className="btn btn-primary m-5">ADD</button>
            </form>
            <h1></h1>
        </div>
    )
}
export default Addproduct









