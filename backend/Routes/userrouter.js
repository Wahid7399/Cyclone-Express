const express = require('express')
const dupemail = require('../Controllers/dupemail')
const Forgotpassword = require('../Controllers/Forgotpassword')
const insertuser = require('../Controllers/insertuser')
const Login = require('../Controllers/Login')
const jwt=require("jsonwebtoken")
const resendotp = require('../Controllers/resendotp')
const verification = require('../Controllers/verification')
const verified = require('../Controllers/verified')
const resetpassword = require('../Controllers/resetpassword')
const createpdf = require('../Controllers/createpdf')
const sendreport = require('../Controllers/sendreport')
const usersend = require('../Controllers/usersend')
const userget = require('../Controllers/userget')
const getallmsg = require('../Controllers/getallmsg')
const getalluser = require('../Controllers/getalluser')
const removeuser = require('../Controllers/removeuser')
const sendpdf = require('../Controllers/sendpdf')
const senddataemail = require('../Controllers/senddataemail')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/signup', (req, res) => {
  insertuser(req,res);
})
router.post('/checkemail',(req,res)=>{
    dupemail(req,res);
})
router.post('/sendmsg',(req,res)=>{
   usersend(req,res);
})
router.get('/getmsg/:id',(req,res)=>{
   userget(req,res);
})
router.get('/delete/:id',(req,res)=>{
    removeuser(req,res);
 })

router.get('/getmsg',(req,res)=>{
    getallmsg(req,res);
 })

 router.get('/getalluser',(req,res)=>{
    getalluser(req,res);
 })

router.post('/Login',(req,res)=>{
   Login(req,res)
})
router.post('/verified',(req,res)=>{
   verified(req,res)
})
router.post('/verification',(req,res)=>{
    verification(req,res)
 })
 router.post('/resendotp',(req,res)=>{
    resendotp(req,res)
 })
 router.post('/Forgotpassword',(req,res)=>{
    Forgotpassword(req,res)
 })
 router.post('/chgpass',(req,res)=>{
    resetpassword(req,res)
 })
router.get('/resetpassword/:id/:email/:token',(req,res)=>{
    try{
const payload=jwt.verify(req.params.token,"my secret ...")
res.render('reset',{email:req.params.email})
    }catch(err){
console.log(err.message);
res.send(err.message);
    }
})

router.get('/generatepdf',(req,res)=>{

    createpdf(req,res)
})


router.post('/SENDPDF',(req,res)=>{
sendpdf(req.body.email);
})
router.post('/Sendcart',(req,res)=>{
    var cart=req.body.cart;
    var str="Your Order has been placed and you have to pay $ "+req.body.sum;
senddataemail(str,req.body.email);
})


router.post('/sendpdf',(req,res)=>{
    
    
    sendreport(req,res);
})




module.exports = router