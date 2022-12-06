const { Sequelize, QueryTypes } = require('sequelize');
const createpdf = require('./createpdf');
const sendpdf = require('./sendpdf');

module.exports= async function (req,res){
    // createpdf(req,res);
    const sequelize =new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });


    
    const records = await sequelize.query('select * from user where id='+ req.body.id+' ', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
      sendpdf(records[0].Email);
      res.send({flag:true})
}else
res.send({flag:false})
}
