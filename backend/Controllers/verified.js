const { Sequelize, QueryTypes } = require('sequelize');

module.exports= async function (req,res){
    const sequelize =new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });
    
    const records = await sequelize.query('select * from user where id='+ req.body.id+' ', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
      res.send({verified:records[0].verified})
}else
res.send({found:false})
    }