const express=require("express")
module.exports=(req,res)=>{
    console.log(req.body)
    res.send("OK")
} 