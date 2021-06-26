export default function Item(props)
{
    let prObj=props.prObj
return(
    <div className='card'>
        <div className="card-header"><img src={prObj.profileImage} className="w-100 img-fluid" alt="" /></div>
        <div className="cardbody" >
            
            <h4>Name:{prObj.productname}</h4>
            <h4>Price:{prObj.price}</h4>
            <h4>Brand:{prObj.Brand}</h4>
            <button className="btn btn-warning">Buy Now</button>
        </div>
    </div>
)
}