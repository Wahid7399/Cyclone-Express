const express=require ("express")
const insertproduct = require("../Controllers/insertproduct")
const router = express.Router()

router.post("/insert",(req,res)=>{
    insertproduct(req,res)
})




module.exports = router
