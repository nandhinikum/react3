import {useHistory} from 'react-router-dom'
import Userprofile from './Userprofile'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react';


function Login(props){
    const {register,handleSubmit,formState:{errors}}=useForm();
   const history=useHistory()
   
    const onSubmit=(credientials)=>{
         
            axios.post(`/${credientials.userType}/login`,credientials)
            .then(res=>{
                let responseObj=res.data
                if(responseObj.message==='login success'){
                
                    localStorage.setItem("token",responseObj.token)
                    localStorage.setItem("username",JSON.stringify(responseObj.username))
                    props.setUserStatus(true)
                    if(credientials.userType==='user'){
                        history.push(`/userprofile/${responseObj.username}`)
                        
                    }
                    if(credientials.userType==='admin'){
                        history.push(`/adminprofile/${responseObj.username}`)
                        
                    }                   
                }
                //if login failed
                else{
                    alert(responseObj.message)
                }
            })                            
        }
   

return(
    <div className=" container w-100 p-5" >
        <h1>LOGIN </h1>
        
    <form className="mx-auto w-75  mt-5" onSubmit={handleSubmit(onSubmit)}>
    <input type="radio" name="admin" value="admin"  {...register('userType')}>
        </input>
        <label className="form-control-label" value="admin">ADMIN</label>
        <input type="radio" name="user" value="user"  {...register('userType')}></input>
        <label className="form-control-label" value="user">USER</label>
        
        <input type="text" id="un" className="form-control w-50 " placeholder="USERNAME" {...register('username',{required:true})}></input>
        {errors.username?.type==='required' && <p className="text-warning ms-5">*Username is required</p>}
      
        <input type="password" id="pw" className="form-control w-50 mt-3" placeholder="PASSWORD" {...register('password',{required:true,minLength:5})}></input>
        {errors.password?.type=='minLength' && <p className="text-warning ">*minlength should be 5</p>}         
        <button type="submit" className="btn btn-warning mt-4">submit</button>

    </form>
    </div>
    )
}

export default Login