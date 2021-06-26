

import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'

import ProductForm  from './ProductForm'
import ViewProducts from './ViewProduct'


export default function Products(){


  return(
        <BrowserRouter>
         <ul className = "nav bg-warning justify-content-center mt-2 ">
             <li className = "nav-item">
               <Link className = "nav-link h5" to ="/ProductForm"> Add Product</Link>
             </li>

             <li className = "nav-item">
               <Link  className = "nav-link h5" to ="/view">view Products</Link>
             </li>
        </ul>

        <Switch>
          <Route path  = "/ProductForm">
          <ProductForm />
          </Route>

          <Route path  = "/view">
          <ViewProducts />
          </Route>
          </Switch>
        </BrowserRouter>


        
        
  )
}
