
import './App.css';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import ViewProduct from './components/ViewProduct';
// import Test from './components/Test'
import Register from './components/Register';
import Products from './components/Products'
import Userprofile from './components/Userprofile';
import Adminprofile from './components/Adminprofile'
import UserCart from './components/UserCart'
//import {Redirect,useRouteMatch,useParams} from 'react-router-dom'
import {useState} from 'react'

function App() {


  const [userLoginState, setUserLoginState] = useState(false)
  const [userState,setUserState]=useState(false)
  const onLogout = () => {
    localStorage.clear();
    setUserLoginState(false)
  }
  
  return (
    <div className="">
       <BrowserRouter>
       <ul className="nav bg-dark justify-content-left">
       <li className="nav-item"><Link className="nav-link text-white" to="/home">Home</Link></li>
       <li className="nav-item"><Link className="nav-link text-white" to="/product">Products</Link></li>

       
       
       {/* <li className="nav-item"><Link className="nav-link text-white" to="/test">Test</Link></li> */}

       <li className="nav-item"><Link className="nav-link text-white" to="/register">REGISTER</Link></li>
      {/* if login state is false */}
       {!userLoginState ?
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white"  >Login</Link>
              </li> :
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => onLogout()}>Logout</Link>
              </li>
            }
       <li className="nav-item"><Link className="nav-link text-white" to="/userprofile"></Link></li>
       <li className="nav-item"><Link className="nav-link text-white" to="/adminprofile"></Link></li>
       <li className="nav-item"><Link className="nav-link text-white" to="/cart"></Link></li>

    
       </ul>
       <Switch>
         
         {/* <Route path="/">
         <Redirect to="/register"/>
         </Route> */}
          {/* <Route path="/">
          <Redirect to="/home"/>
         <Home/>
         </Route>
           */}
          <Route path="/home">
          <Home/>
          </Route>
          <Route path="/product">
          <Products/>
          </Route>

          {/* <Route path="/test">
          <Test/>
          </Route> */}
         <Route path="/login">
         <Login setUserStatus={setUserLoginState} />
         </Route>
         <Route path="/register">
         <Register/>
         </Route>
         <Route path="/userprofile/:username">
           <Userprofile  setUserStateStatus={setUserState}/>
         </Route>
         <Route path="/adminprofile/:username">
           <Adminprofile />
         </Route>
         <Route path="/product/getproducts/:productname">
          <ViewProduct />
         </Route>
         <Route path="/cart">
           <UserCart/>
         </Route>
       </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
