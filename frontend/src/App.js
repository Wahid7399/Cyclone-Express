
import { textAlign } from '@mui/system';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';
import Home from './Components/Home';
import InsertProduct from './Components/InsertProduct';
import ProductDetail from './Components/ProductDetail';
import {Layout} from './Components/Layout'
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import { Verification } from './Components/Verification';
import { useAuthContext } from './Contexts/useAuthContext';
import Cart from './Components/Cart';
import {Footer} from './Components/Footer';
import Updateproduct from './Components/Updateproduct';


function App() {
  // const [post, setPost] = useState(null);

const {user,dispatch}=useAuthContext();
  useEffect(() => {
    if(sessionStorage.getItem("AuthContext"))
    dispatch({type:"restore",payload:JSON.parse(sessionStorage.getItem("AuthContext"))})
    else
    dispatch({type:"restore",payload:{user:null,cart:[]}})
  }, []);
  return (
    <>
    <div style={{height:"100%"}} >
 <Navbar/>

  <Routes>
    <Route path='/home' element={ user ? <Home/>:< Navigate to="/Login"/>}/>
    <Route path='/cart' element={ user ? <Cart/>:< Navigate to="/Login"/>}/>
    <Route path='/Verification' element={ user ? <Verification/>:< Navigate to="/Login"/>}/>
    <Route path='/ForgotPassword' element={ user ? <ForgotPassword/>:< Navigate to="/Login"/>}/>
    <Route path='/' element={user ? <Home/>:< Navigate to="/Login"/>}/>
    <Route path='/Login' element={ !user ? <Login/>:< Navigate to="/home"/>}/>
    <Route path='/Signup' element={!user ?<Signup/>:< Navigate to="/home"/>}/>
    <Route path='/insertproduct' element={user&&user.admin?<InsertProduct/>:< Navigate to="/home"/>} />
    <Route path='/Updateproduct/:id' element={user&&user.admin?<Updateproduct/>:< Navigate to="/home"/>} />
    <Route path='/ProductDetail/:id' element={user ?< ProductDetail />:< Navigate to="/Login"/>}/>
    <Route/>
  </Routes>

    <Footer/>
    </div>
    </>
  );
}

export default App;
