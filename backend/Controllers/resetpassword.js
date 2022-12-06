const { Sequelize, QueryTypes } = require('sequelize');

module.exports= async function (req,res){
    const sequelize =new Sequelize('database3021', 'wahid123', '12345678', {
      host: 'db4free.net',
      dialect:'mysql' 
    });
    
    const [results, metadata] = await sequelize.query("UPDATE user SET password = '"+req.body.pass+"' WHERE email = '"+req.body.email+"'");
      res.send("Your password have been updated.")
    }