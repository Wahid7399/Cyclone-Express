const { Sequelize, QueryTypes } = require('sequelize');

module.exports= async function (req,res){
    const sequelize = new Sequelize('web', 'root', '', {
      host: 'localhost',
      dialect:'mysql' 
    });
    
    const [results, metadata] = await sequelize.query("UPDATE user SET password = '"+req.body.pass+"' WHERE email = '"+req.body.email+"'");
      res.send("Your password have been updated.")
    }