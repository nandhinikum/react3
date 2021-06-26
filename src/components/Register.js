import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
function Register(){
    const {register,handleSubmit,formState:{errors}}=useForm();
    let history=useHistory()
    const [file,setFile]=useState(null)
    
    const onFormsubmit=(userObj)=>{
      
        let formData=new FormData();
        //adding image to formdata obj
        formData.append('photo',file,file.name)
        //add userobj to formdata
        formData.append("userObj",JSON.stringify(userObj))
      //pass it to the userapi by http post request
       axios.post('/user/createuser',formData)
       .then(res=>{
        alert(res.data.message)
        history.push('/login')
        console.log(res)
       })   
      
 }
 const onFileSelect=(event)=>{
     console.log(event.target.files[0])
    setFile(event.target.files[0])
}
    return(
        <div>
        <h1>User Registration</h1>
           <form className="bg-info w-50 mx-auto mt-3" onSubmit={handleSubmit(onFormsubmit)}>
               <label className="form-control-label ms-5 mt-4">Username</label>
               <input type="text" className="form-control ms-5 w-50" {...register('username',{required:true,minLength:6})}></input>
               {errors.username?.type==='required' && <p className="text-danger">username required</p>}
               {errors.username?.type==='minLength' && <p className="text-danger">minimum length should be 6</p>}
               <label className="form-control-label ms-5">Password</label>
               <input type="password" className="form-control ms-5 w-50" {...register('password',{required:true,minLength:6})}></input>
               {errors.password?.type==='required' && <p className="text-danger">password required</p>}
               <label className="form-control-label ms-5">Email</label>
               <input type="email" className="form-control ms-5 w-50" {...register('email',{required:true})}></input>
               {errors.email?.type==='required' && <p>email required</p>}
               <label className="form-control-label ms-5">Mobile</label>
               <input type="number" className="form-control ms-5 w-50" {...register('mobile',{required:true})}></input>
               {errors.mobile?.type==='required' && <p>enter mobile number</p>}
               <input type="file" name="photo" className="form-control w-50 ms-5 mt-3" onChange={(e=>onFileSelect(e))}></input>
               <button className="btn btn-primary m-5">REGISTER</button>
           </form>
        </div>
    )
}

export default Register