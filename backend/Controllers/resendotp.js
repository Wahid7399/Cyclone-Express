const { Sequelize, QueryTypes } = require('sequelize');
const sendpin = require('./sendpin');
const updateotp = require('./updateotp');
function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}
module.exports= async function (req,res){
    var pin=generateRandomNumber()
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });

    
    const records = await sequelize.query('select * from user where id='+ req.body.id+' ', {
        nest: true,
        type: QueryTypes.SELECT
      });
      updateotp(req.body.id,pin);
      if(records.length!=0){
        console.log(records[0].Email)
      sendpin(pin,records[0].Email)
}else
res.send({found:false})
    }