import * as React from 'react';
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup } from '@mui/material';
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ProductDetail from './ProductDetail'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { useAuthContext } from '../Contexts/useAuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default  function Card(props) {
     let {user}=useAuthContext();
let navigate=useNavigate();
var obj=props.value;
    return (
      <Cards sx={{ height:"450px",width:"380px",margin:"30px auto",backgroundColor:"#b9b9b9" ,textAlign:"center",backgroundSize:"cover" ,padding:'0px' }}>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    
      <ToastContainer />
          <CardMedia

          component="img"
          height='200'
          image={obj.avatar}
          sx={{ objectFit: "fill"}}
          // image={obj.title.includes('"')?`${obj.avatar}`:`./products/${obj.avatar}`}
          alt={obj.title}
          />

          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {obj.title}
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              ${obj.sprice}
            </Typography>
            
          </CardContent>

          <div  sx={{justifyContent:'center', position: 'absolute', bottom: '1px'}}>
               
{user.admin?
<ButtonGroup>
  <Button sx={{bottom:"3px"}} variant='contained' onClick={async ()=>{
                await sessionStorage.setItem('productdata',JSON.stringify(obj));
                 
                 navigate(`/Updateproduct/${(obj.id)}`)
             }} color="warning">Update</Button>
<Button sx={{bottom:"3px"}} onClick={async ()=>{
                await sessionStorage.setItem('productdata',JSON.stringify(obj));
                 
                 navigate(`/ProductDetail/${(obj.id)}`)
             }} variant='contained' >ORDER NOW
                </Button>
               <Button sx={{bottom:"3px"}} onClick={ ()=>{
               axios.get(`http://localhost:8000/product/delete/${obj.id}`)
              
               navigate('/Login');
               toast.success('Product has been deleted', {
                 position: "top-right",
                 autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                
               
                
            }} color="error" variant='contained' >Delete
               </Button>
               </ButtonGroup>
               :
               <Button sx={{bottom:"3px"}} onClick={async ()=>{
                await sessionStorage.setItem('productdata',JSON.stringify(obj));
                 
                 navigate(`/ProductDetail/${(obj.id)}`)
             }} variant='contained' >ORDER NOW
                </Button>
               
               }
          </div>

        </Cards>
      );
}