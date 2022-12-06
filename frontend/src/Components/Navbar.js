import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography,Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CycloneTwoToneIcon from '@mui/icons-material/CycloneTwoTone';
import { useAuthContext } from '../Contexts/useAuthContext';
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export default function Navbar() {
    const {user,dispatch}=useAuthContext();
    var [flag,setflag]=useState(true);
var navigate=useNavigate();
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
            <AppBar  sx={{ position:'relative', display: 'block', backgroundColor: "#4f4f4f" }}>
                <Toolbar   sx={{ display: 'flex',justifyContent:"space-between" }}>
                    <Box>
                    
                    <Typography variant='h2'>Cyclone<CycloneTwoToneIcon sx={{height:"50px",color:"#877665"}}/>Express</Typography>
                    </Box>
                    <Box sx={{ width:"40%", display:"flex",justifyContent:"space-between" }}>
                    <Typography variant="h6" onClick={(()=>navigate('/home'))} sx={{margin:"auto 10px",cursor:"pointer"}} color={"violet"} >Home</Typography>
                    <Typography variant="h6" onClick={(()=>navigate('/Login'))} sx={{margin:"auto 10px",cursor:"pointer"}} color={"violet"} >Login</Typography>
                    <Typography variant="h6" onClick={(()=>navigate('/Signup'))} sx={{margin:"auto 10px",cursor:"pointer"}} color={"violet"} >signup</Typography>
                    <ShoppingCartIcon onClick={(()=>user?navigate('/Cart'):navigate('/Login'))} />
                    </Box>
                    
                   <Box sx={{display:'flex'}}>
                    <Avatar  alt="Remy Sharp" src={user?user.avatar:""} />
                    {user&&<LogoutIcon onClick={(async ()=>{
                        dispatch({type:"LOGOUT"});
                      localStorage.removeItem("AuthContext")
                         

                    navigate('/Login')
                    toast.success('You have successfuly Loged out.',{
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                setflag(!flag);
                })}/>}
                    </Box>
                    </Toolbar>
            
            </AppBar>
        </>
    )
}
