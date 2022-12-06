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
router.post('/sendpdf',(req,res)=>{
    
    
    sendreport(req,res);
})




module.exports = router