import { Box, Button, TextField, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';

import React, { useState } from 'react'
import axios from 'axios';

export default function ForgotPassword() {
    let [email, setemail] = useState();
    function submitHandler(e){
        e.preventDefault();
        axios.post("http://localhost:8000/user/Forgotpassword",{email}).then((res)=>{
if(res.data.sent){
    toast.success('Reset Password Link have been sent', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
else{
    toast.error('Invalid Email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
        })
    }
  return (
    <div >




    <Box sx={{ borderRadius: '6px', margin: "10% 30%", backgroundColor: "#d0e0e0", padding: "10%" }}>
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
        <form onSubmit={(e) => submitHandler(e)}>
            <Typography sx={{ marginTop: '-30%', marginBottom: '20%' }} varient="h1" fontSize={'40px'}><b>Forgot password</b></Typography>
            <TextField sx={{}}
                // html input attribute
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                onChange={((e) => setemail(e.target.value))}
                // pass down to FormLabel as children
                label="Email"
                required
            />
            


            <Button type='submit' variant='contained' size='large' sx={{ marginTop: "20%" }} >Reset password</Button>

        </form>
        
    </Box>
</div>
  )
}
