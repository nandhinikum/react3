import axios from "axios"
import {useHistory,useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'


function ViewProduct(props){
    let[productobj,setproductobj]=useState([])
    let userState=props.userState;
    let history=useHistory()
    // let params=useParams()
    // let productname=params.productname

    useEffect(()=>{
     axios.get("/product/getproducts")
     .then(res=>{
        
         setproductobj(res.data.message)
         console.log(res.data.message)
         console.log(productobj)
        
         
                    
     })
     .catch(err=>console.log(err.message))
     
     
    },[])
   
    
            // console.log(productobj)
            

    return(
        <div className="row mt-4 ms-3">
          
                {
                    productobj.map((prodObj,ind)=>{
                        return(
                            <div className="col-sm-3 mt-5" key={ind}>
                            <div className="card">
                                <img src={prodObj.profileImage} width="100%"></img>
                                <div className="card-body text-center">
                                    <p className="text-primary"><strong className="text-dark">ProductName:</strong>{prodObj.productname}</p>
                                    <p className="text-primary"><strong className="text-dark">Model:</strong>{prodObj.model}</p>
                                    <p className="text-danger"><strong className="text-dark">Price:</strong>{prodObj.price}</p>
                                    <p className="text-primary"><strong className="text-dark">Description:</strong>{prodObj.description}</p>


                            {userState ?
                                <button className="btn float-end btn-success" onClick={()=>props.addProductTocart(prodObj)}>Add To cart</button>
                                 :
                                 <hr></hr>
             
                            }


                                </div>
                                </div>
                                </div>
                        )
                    })
                }
              
            
        </div>
    )
}
export default ViewProduct