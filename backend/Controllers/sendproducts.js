const { Sequelize, QueryTypes } = require('sequelize');


module.exports= async function (req,res){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const records = await sequelize.query('select * from product', {
        nest: true,
        type: QueryTypes.SELECT
      });
      if(records.length!=0){
    res.send(records);
}else
res.send([])
 }