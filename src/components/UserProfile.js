import axios from 'axios'
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import ViewProduct from './ViewProduct'
import UserCart from './UserCart'

function Userprofile(props){
    let setUserStateStatus=props.setUserStateStatus
     const history=useHistory()
    // const logout=()=>{
    //     localStorage.clear()
    //     history.push('/login')
    // }
    let params=useParams()
    let[userobj,setUserobj]=useState('')
    let username=params.username
    console.log("username",username)
    useEffect(()=>{
        axios.get(`/user/getusers/${username}`)
        .then(res=>{
            userobj=res.data;
            setUserobj({...userobj.message})
            props.setUserStateStatus(true)
            
        })
    },[username])

    //function to make post to usercart api
    const addProductTocart=(productObj)=>{
        //get username from local storage
        let username=localStorage.getItem("username")
        //prodobj.username=username
        let newObj={username,productObj}
        console.log("product added by user",newObj)
        //make post req
        axios.post('/user/addtocart',newObj)
        .then(res=>{
            let responseObj=res.data
            
            alert(responseObj.message)
             history.push('/cart')
         
        })
        .catch(err=>{
            console.log("err in adding to cart",err)
            alert("something went wrong")
        })

    }
    
    return(
        <div> 
            <div className="float-end mb-4">       
           <h5 className="">Welcome,{username}</h5>
           <img className="rounded " src={userobj.profileImage} width="30px"></img> 
           </div>

           <BrowserRouter>
           <ul className="nav bg-light justify-content-left">
               <li className="nav-item">
               <Link className= "nav-link text-danger" to="/viewproduct">ViewProduct</Link></li>
                  <li> <Link className= "nav-link text-danger" to="/cart">Cart</Link>
               </li>
           </ul>
           {/* <ViewProduct userState={setUserStateStatus} addProductTocart={addProductTocart}/> */}
           <Switch>
           <Route path="/viewproduct">
                   <ViewProduct userState={setUserStateStatus} addProductTocart={addProductTocart}/>
               </Route>
               <Route path="/cart">
                   <UserCart/>
               </Route>
           </Switch>
           
           </BrowserRouter>
           
            
                    
        </div>
    )
}

export default Userprofile
