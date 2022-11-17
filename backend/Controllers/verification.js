const { Sequelize, QueryTypes } = require('sequelize');
const verifyuser = require('./verifyuser');

module.exports= async function (req,res){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const records = await sequelize.query('select * from user where id='+ req.body.id+' ', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
      if(req.body.otp==records[0].pin){
verifyuser(req.body.id);
res.send({verified:true})
      }
      else{
        res.send({verified:false})
      }
}else
res.send({found:false})
    }