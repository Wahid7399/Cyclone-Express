import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

const validatesubmit = values => {
    let flag = true;
    if (!values.name) {
        toast.error('Name is required', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    } else if (values.name.length > 30) {
        toast.error('Name must be 30 characters or less', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    }

    if (!values.email) {
        toast.error('Email is required', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        toast.error('Invalid email address', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    }
    if (!values.password) {
        toast.error('Password is required', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    } else if (values.password.length < 8) {
        toast.error('Password should at least 8 characters', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    }

    if (values.password != values.conpassword) {
        toast.error('Confirm password should match', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        flag = false;
    }

    return flag;
};

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.name) {

        errors.name = 'Required';
    } else if (values.name.length > 30) {

        errors.name = 'Must be 30 characters or less';
    }

    if (!values.email) {

        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {

        errors.email = 'Invalid email address';
    }
    if (!values.password) {

        errors.password = "invalid"
    } else if (values.password.length < 8) {

        errors.password = "invalid"
    }

    if (values.password != values.conpassword) {

        errors.conpassword = "invalid"
    }

    return errors;
};

export default function Signup() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            conpassword: '',
        },
        validatesubmit,
        onSubmit: values => {
            if (validatesubmit(values)) {
                var flag = true;

                axios.post("http://localhost:8000/user/checkemail", { email: values.email }).then((res) => {
                    if (res.data.isAvailable) {
                        flag = false;
                        toast.error('Email already exist', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                if (flag) {
                    // alert(JSON.stringify(values, null, 2));
                    var obj = {
                        "email": values.email,
                        "name": values.name,
                        "password": values.password,
                        "role": "customer",
                        "avatar": "https://api.lorem.space/image/face?w=640&h=480&r=7978"
                    }
                    axios.post("http://localhost:8000/user/signup", obj).then((res) => {
                        if (res.data.message) {
                            toast.error('User cannot be added', {
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
                            toast.success('Your account have been created', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                    )
                }

            }
        },
    });

    return (
        <Container maxWidth="xs">
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
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"

                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Grid>



                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                name="conpassword"
                                label="Confirm Password"
                                type="password"
                                id="conpassword"
                                autoComplete="connew-password"
                                value={formik.values.conpassword}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>

    );
}