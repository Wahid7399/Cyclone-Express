const { Sequelize, QueryTypes } = require('sequelize');
const jwt=require("jsonwebtoken");
const sendforgetlink = require('./sendforgetlink');

module.exports= async function (req,res){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const records = await sequelize.query('select * from user where Email="'+req.body.email+'"', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
       var token= jwt.sign({
            id:records[0].ID,
            email:records[0].email,
password:records[0].password
          }, 'my secret ...', { expiresIn: '10m' });
          var link=`http://localhost:8000/user/resetpassword/${records[0].ID}/${req.body.email}/${token}`
          var email=req.body.email;
          sendforgetlink(link,email)
res.send({sent:true})
}else
res.send({sent:false})
    }