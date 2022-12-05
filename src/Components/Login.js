import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import { StyleSheet } from '@emotion/utils';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../Contexts/useAuthContext';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ContactlessOutlined } from '@mui/icons-material';

export default function Login() {
    var navigate = useNavigate();
    var {dispatch}=useAuthContext();
    let [email, setemail] = useState();
    let [person, setperson] = useState("User");
    let [passw, setpassw] = useState();

    var submitHandler = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/user/Login", { email, password: passw,person:person }).then((res) => {

            if (res.data.found) {
               
                // sessionStorage.setItem('user', res.data.id);
                
                dispatch({type:"LOGIN",payload:res.data});
              

                navigate('/');
                toast.success('You have successfuly Loged In', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                
                navigate('/Login')
                toast.error('Invalid user or password', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }

        }).catch(err=>{
            console.log(err);
        })




    }
    return (
        <div >




            <Box sx={{ borderRadius: '6px', margin: "10% 30%", backgroundColor: "#d0e0e0", padding: "10%",textAlign:"center" }}>
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
                
                    <Typography sx={{ marginTop: '-30%', marginBottom: '20%' }} varient="h1" fontSize={'40px'}><b>Login Here</b></Typography>
                    <FormControl sx={{width:"83%"}}>
                    <InputLabel id="Login">Login</InputLabel>
      <Select
        labelId="Login"
        id="Login"
        name="Login"
   
      
        label="Login"
       
        onChange={((e)=>{setperson(e.target.value)
      
        })}
      >
        
        <MenuItem  value={"User"}>User Login</MenuItem>
        <MenuItem value={"Admin"}>Admin Login</MenuItem>
        
      </Select>
      </FormControl>
      <br />
                    <br />
                    <br />
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
                    <br />
                    <br />
                    <br />
                    <TextField sx={{}}
                        name="password"
                        type="password"
                        onChange={((e) => setpassw(e.target.value))}
                        placeholder="password"
                        label="Password"
                        required
                    />


                    <Button type='submit' variant='contained' size='large' sx={{ marginTop: "20%" }} >Login</Button>

                </form>
                <Link style={{ marginTop: "20%" }} to='/Signup'><p>Do you want to signup?</p></Link>
                <Link style={{ marginTop: "20%" }} to='/ForgotPassword'><p>Forgot Password?</p></Link>
            </Box>
        </div>
    )
}
