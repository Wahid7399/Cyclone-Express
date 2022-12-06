import { Button, ButtonGroup, FormGroup, FormLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import React from 'react'
import { useAuthContext } from '../Contexts/useAuthContext';

export const Verification = () => {
    var navigate = useNavigate();
    const { user } = useAuthContext();
    function resendotp() {

        axios.post("http://localhost:8000/user/resendotp", { id: user.id }).then((res) => {
            toast.success('OTP has been sent.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })

    }
    function handlesubmit() {

        var data = document.getElementById("standard-basic").value;
        axios.post("http://localhost:8000/user/verification", { id: user.id, otp: data }).then((res) => {
            if (!res.data.verified) {

                toast.error('Invalid OTP', {
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
                toast.success('Verified Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/home');
            }
        })

    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>

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

            <FormGroup>
                <Typography color={"red"} variant='h6'>You are not verified User</Typography>
                <TextField id="standard-basic" name="pin" label="Enter 6 digit OTP" variant="standard" />
                <br />
                <ButtonGroup>
                    <Button onClick={() => { handlesubmit() }} variant='contained'>Confirm</Button>
                    <Button onClick={() => { resendotp() }} variant='contained'>Resend OTP</Button>
                </ButtonGroup>
            </FormGroup>
        </div>
    )
}
