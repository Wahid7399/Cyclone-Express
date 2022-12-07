import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, CardContent, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Updateproduct() {
    var obj=JSON.parse(window.sessionStorage.getItem('productdata'));
    var navigate = useNavigate();
    let [title, settitle] = useState(obj.title);
    let [price, setprice] = useState(obj.sprice);
    let [category, setcategory] = useState(obj.category);
    let [description, setdescription] = useState(obj.description);
    let [mainimg, setmainimg] = useState();
    let [extra_img, setextraimg] = useState();


    function submitHandler(e) {
        
        toast.success('Your Product has been inserted', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // axios.post("http://localhost:8000/product/insert",{title,price,category,description}).then((res)=>{
        //     console.log(res.data);
        // })

    }
    return (
        <>
            <Box sx={{ borderRadius: '6px', margin: "10% 30%", backgroundColor: "#d0e0e0", padding: "10%", textAlign: "center" }}>
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

                <form action={`http://localhost:8000/product/update/${obj.id}`} method="post" encType='multipart/form-data'  
                //  onSubmit={(e) => submitHandler(e)}
                >
                    <Typography sx={{ marginTop: '-30%', marginBottom: '20%' }} varient="h1" fontSize={'40px'}><b>Add Product</b></Typography>
                    <TextField sx={{}}
                        // html input attribute
                        name="title"
                        type="text"
                        placeholder="Title"
                        defaultValue={obj.title}
                        onChange={((e) => settitle(e.target.value))}
                        // pass down to FormLabel as children
                        label="Title"
                        required
                    />
                    <br />
                    <br />
                    <br />
                    <TextField sx={{}}
                        name="bprice"
                        type="text"
                        defaultValue={obj.bprice}
                        onChange={((e) => setprice(e.target.value))}
                        placeholder="Buying Price $"
                        label="Buying Price $"
                        required
                    />
                    <br />
                    <br />
                    <br />
                    <TextField sx={{}}
                        name="sprice"
                        defaultValue={obj.sprice}
                        type="text"
                        onChange={((e) => setprice(e.target.value))}
                        placeholder="Selling Price $"
                        label="Selling Price $"
                        required
                    />
                    <br />
                    <br />
                    <br />
                    <TextField sx={{}}
                        name="quantity"
                        type="text"
                        defaultValue={obj.quantity}
                        onChange={((e) => setprice(e.target.value))}
                        placeholder="Quantity"
                        label="Quantity"
                        required
                    />
                    <br />
                    <br />
                    <br />
                    <TextField sx={{}}
                        name="description"
                        type="text"
                        defaultValue={obj.description}
                        onChange={((e) => setdescription(e.target.value))}
                        placeholder="Description"
                        label="Description"
                        required
                    />
                    <br />
                    <br />
                    <br />
                    <FormControl sx={{width:"83%"}}>
                    <InputLabel id="Category">Category</InputLabel>
      <Select
        labelId="Category"
        id="Category"
        placeholder="Category"
        name="category"
   
      
        label="Category"
       
        onChange={((e)=>{setcategory(e.target.value)})}
      >
        <MenuItem value="" defaultValue={obj.category}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={"clothes"}>Clothes</MenuItem>
        <MenuItem value={"electronics"}>Electronics</MenuItem>
        <MenuItem value={"furniture"}>Furniture</MenuItem>
        <MenuItem value={"shoes"}>Shoes</MenuItem>
        <MenuItem value={"others"}>Others</MenuItem>
      </Select>
      </FormControl>
                    <br />
                    <br />
                    <br />
                    
                    <label className='btn' id="file">Choose Images</label>
                    <br />
                    <input name="productphotos" style={{marginLeft:"23px"}} type="file" id='file'  multiple />
                    <Button onClick={((e)=>{submitHandler(e)})} type='submit' variant='contained' size='large' sx={{ marginTop: "20%" }} >Update PRODUCT</Button>
                </form>
            </Box>
        </>
    )
}
