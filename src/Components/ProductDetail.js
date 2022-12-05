
import Cards from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';

import ButtonGroup from '@mui/material/ButtonGroup';
import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextareaValidator from './TextareaValidator';
import BasicRating from './BasicRating';
import { useAuthContext } from '../Contexts/useAuthContext';




export default function Card() {
    var obj=JSON.parse(window.localStorage.getItem('productdata'));
var navigate=useNavigate();
var {user,dispatch}=useAuthContext();
    var [count,setcount]=React.useState(0);
var [imgarr,setimagearr]=React.useState([...JSON.parse(obj.images)]);
var [myimage,setmyimage]=React.useState(obj.avatar);

    return (
    <>
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
        <Cards sx={{width:"700px",margin:"10px auto",backgroundColor:"#b9b9b9" ,backgroundSize:"cover" }}>
          <CardMedia
            component="img"
            sx={{ objectFit: "fill"}}
            height="400px"
            image={myimage}
          />

          <stack display='row'>
            {imgarr.map((item,i)=>
          {
            var bord="";
            if(item==myimage)
            bord="5px solid #555";

         return <img style={{ border:bord ,margin:"2px 2px",cursor:"pointer"}} src={item} width="60px" height="60px" onClick={(()=> {
            setmyimage(item);
            
        })} />
     } ) }
        </stack>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {obj.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {obj.description}
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              ${obj.sprice}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent:'center'}}>
            <ButtonGroup>
                <Button  onClick={(()=>{
                    if(count>0)
                    setcount(count-1)
                })}>-</Button>
                <Button>{count<0?0:count}</Button>
                <Button onClick={(()=>setcount(count+1))}>+</Button>
            </ButtonGroup>
            
           
          </CardActions>
          <CardActions sx={{justifyContent:'center'}}>
            <Button onClick={(()=>{
                if(!user){
                    navigate('/Login');
                }
                else
                if(count!==0){
                    var cartdata={
                     id:obj.id ,  title: obj.title,price:obj.sprice,count:count
                    }
                    dispatch({type:"Add item",payload:cartdata});
            toast.success('Item is added to cart', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                    setcount(0);
                }
                else{
                    toast.error('Please specify the item counts', {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                }
                

            })} variant='contained'>{ <ShoppingCartIcon/>}Add to cart</Button>
            
          </CardActions>
          <BasicRating/>
        </Cards>
        <TextareaValidator/>
        </>
      );
}


