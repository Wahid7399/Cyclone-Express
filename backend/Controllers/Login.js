const { Sequelize, QueryTypes } = require('sequelize');

module.exports= async function (req,res){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
   
    
    const records = await sequelize.query('select * from user where Email="'+req.body.email+'" and password="'+req.body.password+'"', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
res.send({found:true,id:records[0].ID,avatar:records[0].avatar})
}else
res.send({found:false})
    }