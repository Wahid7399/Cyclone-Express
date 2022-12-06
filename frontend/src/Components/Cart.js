import React from 'react'
import {ButtonGroup, Grid} from '@mui/material';
import AppBar from '@mui/material/AppBar';
// import { myStore } from '../Store/Store';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveIcon from '@mui/icons-material/Remove';
// import { useSelector } from 'react-redux/es/exports'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import TableCell from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useAuthContext } from '../Contexts/useAuthContext';
export default function Cart() {

     let {cart,dispatch}=useAuthContext();
  let sum=0;
  return (
    <div style={{marginTop:'40px'}}>
         <ToastContainer
         position="top-right"
         autoClose={2000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         />
         <ToastContainer />

        <Typography sx={{textAlign:'center'}} variant='h3'>CART<ShoppingCartIcon size='large'/></Typography>
               <br/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        {cart.map((row) =>{
            sum+=row.count*row.price;
            return (
            <TableRow key={row.desc}>
              <TableCell>
                <ButtonGroup   variant="text" size='small'>
                <Button onClick={(()=>{
                      row.count++;
                      dispatch({type:"increment item",payload:row});
                })} > <AddIcon/></Button>
                <Button onClick={(()=>{
                     row.count--;
                     dispatch({type:"decrement item",payload:row});
                 
                })} color="error" > <RemoveIcon/></Button>
                </ButtonGroup>
                {row.title}

                </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">${row.price}</TableCell>
              <TableCell align="right">${row.count*row.price}</TableCell>
            </TableRow>
        
          )})}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">${sum}</TableCell>
          </TableRow>
       
      </Table>

    </TableContainer>
    <Button sx={{margin:"10px"}} variant="contained" size='large' >Place Order</Button>
    <Button onClick={(()=>{
           dispatch({type:'Empty cart'})
         toast.success('Your cart have been emptied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    
    })}  color='error' sx={{marginTop:"10px"}} variant="contained" size='large' ><RemoveShoppingCartIcon/>Empty Cart</Button>
 
    <br/>
   
    </div>
  )
}
