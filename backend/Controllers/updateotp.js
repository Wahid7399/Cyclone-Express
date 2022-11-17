const { Sequelize } = require('sequelize');

module.exports= async function (ID,pin){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const [results, metadata] = await sequelize.query("UPDATE user SET pin = "+pin+" WHERE ID = "+ID+"");
   
    }