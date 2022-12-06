const { Sequelize } = require('sequelize');

module.exports= async function (ID){
    const sequelize =new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });
    
    const [results, metadata] = await sequelize.query("UPDATE user SET verified = 1 WHERE ID = "+ID+"");
   
    }