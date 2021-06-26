import { useState ,useEffect} from "react";
import axios from "axios";
function userCart(){
    const [cartObj,setCartObj]=useState('')
    useEffect(()=>{
        let username=localStorage.getItem("username")
        axios.get(`/user/getproducts/${username}`)
        .then(res=>{
            setCartObj(res.data.message)
        })
        .catch(err=>{
            console.log("err in reading cart",err)
            alert("something went wrong in getting cart")
        })
    },[])
    return(
        cartObj&&
        
        <div>
            <table className="table">
                <thead>
                    <th>productName</th>
                    <th>model</th>
                    <th>productImg</th>
                </thead>
                <tbody>
                    {
                        cartObj.products.map((product,index)=>{
                            return<tr>
                                <td>{product.productname}</td>
                                <td>{product.model}</td>
                                <td>
                                    <img src={product.productImage}alt=""/>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default userCart;
