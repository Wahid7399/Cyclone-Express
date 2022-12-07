const express=require ("express")
const multer = require("multer");
const addcomment = require("../Controllers/addcomment");
const deleteproduct = require("../Controllers/deleteproduct");
const getcomment = require("../Controllers/getcomment");
const insertproduct = require("../Controllers/insertproduct");
const sendproducts = require("../Controllers/sendproducts");
const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,'../frontend/public/products');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now()+".jpg");
    }
  });
  
  var upload = multer({ storage : storage }).array('productphotos',10);

router.post("/insert",
(req,res,next)=>{
    upload(req,res,function(err) {
     
        if(err) {
          console.log(err)
            return res.end("Error uploading file.");
        }
        next();
    }
    );
},(req,res)=>{
insertproduct(req,res);
}
)
router.get('/get/:page',(req,res)=>{
  sendproducts(req,res)
})

router.get('/delete/:id',(req,res)=>{
  deleteproduct(req,res)
})

router.post('/addcomment',(req,res)=>{
  addcomment(req,res)
})
router.post('/getcomment',(req,res)=>{
  getcomment(req,res)
})


module.exports = router
