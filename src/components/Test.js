import React, { useEffect } from 'react'
import axios from 'axios'


export default function Test(){
    //get token
    let token =localStorage.getItem("token")

    //adding token to header of req object
    let apiURL="http://localhost:8080"

    //create an axios object
    let authAxios= axios.create({
        baseURL:apiURL,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    useEffect(()=>{
        authAxios.get(`/user/testing`)
        .then(res=>{
            let result=res.data;
            alert(result.message)
        })
        .catch(err=>alert(err.message))
    })

    return(
        <div>
            <h1 className="text-center">Test</h1>
        </div>
    )
}

