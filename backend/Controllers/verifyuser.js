const { Sequelize } = require('sequelize');

module.exports= async function (ID){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const [results, metadata] = await sequelize.query("UPDATE user SET verified = 1 WHERE ID = "+ID+"");
   
    }